<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Post;
use App\Models\Comment;
use App\Models\Like;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
     /* Récupérer le profil de l'utilisateur connecté */
    public function profile()
    {
        $user = Auth::user();

        return response()->json([
            'id' => $user->id,
            'email' => $user->email,
            'firstname' => $user->firstname,
            'lastname' => $user->lastname,
            'bio' => $user->bio,
            'image' => $user->image,
            'created_at' => $user->created_at,
        ], 200);
    }

    /* Mettre à jour le profil de l'utilisateur */
    public function updateProfile(Request $request)
    {
        $user = Auth::user();

        // Validation
        $validator = Validator::make($request->all(), [
            'firstname' => 'sometimes|string|min:2',
            'lastname' => 'sometimes|string|min:2',
            'bio' => 'sometimes|string|max:500',
            'image' => 'sometimes|nullable|string', // base64 ou URL
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        // Mettre à jour
        $user->update($request->only(['firstname', 'lastname', 'bio', 'image']));

        return response()->json([
            'id' => $user->id,
            'email' => $user->email,
            'firstname' => $user->firstname,
            'lastname' => $user->lastname,
            'bio' => $user->bio,
            'image' => $user->image,
        ], 200);
    }

     /* Changer le mot de passe*/
    public function changePassword(Request $request)
    {
        $user = Auth::user();

        // Validation - accepte 'password'/'password_confirmation' pour compatibilité frontend
        $validator = Validator::make($request->all(), [
            'current_password' => 'required|string',
            'password' => 'required|string|min:8|confirmed',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        // Vérifier le mot de passe actuel
        if (!Hash::check($request->current_password, $user->password)) {
            return response()->json([
                'message' => 'Le mot de passe actuel est incorrect',
            ], 401);
        }

        // Mettre à jour le mot de passe
        $user->update([
            'password' => Hash::make($request->password),
        ]);

        return response()->json([
            'message' => 'Mot de passe changé',
        ], 200);
    }

    /**
     * Mettre à jour la photo de profil
     */
    public function updateProfilePicture(Request $request)
    {
        $user = Auth::user();

        // Validation
        $validator = Validator::make($request->all(), [
            'profile_picture' => 'required|image|mimes:jpeg,png,jpg,gif,webp|max:5120', // 5MB max
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        // Supprimer l'ancienne photo si elle existe
        if ($user->profile_picture) {
            \Illuminate\Support\Facades\Storage::disk('public')->delete(str_replace(\Illuminate\Support\Facades\Storage::disk('public')->url(''), '', $user->profile_picture));
        }

        // Sauvegarder la nouvelle photo
        $file = $request->file('profile_picture');
        $filename = 'profile-pictures/' . $user->id . '_' . time() . '.' . $file->getClientOriginalExtension();
        \Illuminate\Support\Facades\Storage::disk('public')->put($filename, file_get_contents($file));
        $photoUrl = \Illuminate\Support\Facades\Storage::disk('public')->url($filename);

        // Mettre à jour l'utilisateur
        $user->update(['profile_picture' => $photoUrl]);

        return response()->json([
            'profile_picture' => $user->profile_picture,
            'message' => 'Photo de profil mise à jour',
        ], 200);
    }

    /**
     * Supprimer le compte
     */
    public function destroy(Request $request)
    {
        $user = Auth::user();

        // Validation
        $validator = Validator::make($request->all(), [
            'keep_content' => 'sometimes|boolean',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $keepContent = $request->input('keep_content', false);

        if ($keepContent) {

            $deletedUser = User::where('email', 'deleted@user.local')->first();
            
            if (!$deletedUser) {
                $deletedUser = User::create([
                    'email' => 'deleted@user.local',
                    'firstname' => 'Utilisateur',
                    'lastname' => 'Supprimé',
                    'password' => Hash::make(uniqid()),
                ]);
            }

            // Mettre à jour les posts
            Post::where('user_id', $user->id)->update([
                'user_id' => $deletedUser->id,
            ]);

            // Mettre à jour les commentaires
            Comment::where('user_id', $user->id)->update([
                'user_id' => $deletedUser->id,
            ]);
        } else {
            // Option 2 : Supprimer tous les posts et commentaires
            Comment::where('user_id', $user->id)->delete();
            Post::where('user_id', $user->id)->delete(); // Cela supprime aussi les commentaires restants via cascade
        }

        // Supprimer les likes (toujours)
        Like::where('user_id', $user->id)->delete();

        // Supprimer l'utilisateur
        $user->delete();

        return response()->json([
            'message' => 'Compte supprimé',
        ], 200);
    }
}
