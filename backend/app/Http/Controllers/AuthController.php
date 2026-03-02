<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    
    public function register(Request $request)
    {
        // Validation des données
        $validator = Validator::make($request->all(), [
            'email' => 'required|email|unique:users,email',
            'firstname' => 'required|string|min:2',
            'lastname' => 'required|string|min:2',
            'password' => 'required|string|min:8|confirmed',
        ], [
            'email.required' => 'L\'email est requis',
            'email.email' => 'L\'email doit être valide',
            'email.unique' => 'Cet email est déjà utilisé',
            'firstname.required' => 'Le prénom est requis',
            'firstname.min' => 'Le prénom doit contenir au moins 2 caractères',
            'lastname.required' => 'Le nom est requis',
            'lastname.min' => 'Le nom doit contenir au moins 2 caractères',
            'password.required' => 'Le mot de passe est requis',
            'password.min' => 'Le mot de passe doit contenir au moins 8 caractères',
            'password.confirmed' => 'Les mots de passe ne correspondent pas',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        // Créer l'utilisateur
        $user = User::create([
            'email' => $request->email,
            'firstname' => $request->firstname,
            'lastname' => $request->lastname,
            'password' => Hash::make($request->password),
        ]);

        // Générer le token Sanctum
        $token = $user->createToken('auth_token')->plainTextToken;

        // Retourner la réponse avec token
        return response()->json([
            'token' => $token,
            'user' => [
                'id' => $user->id,
                'email' => $user->email,
                'firstname' => $user->firstname,
                'lastname' => $user->lastname,
            ],
        ], 201);
    }

    
    public function login(Request $request)
    {
        // Validation des données
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        // Chercher l'utilisateur
        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json([
                'message' => 'Email ou mot de passe incorrect',
            ], 401);
        }

        // Générer le token Sanctum
        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'token' => $token,
            'user' => [
                'id' => $user->id,
                'email' => $user->email,
                'firstname' => $user->firstname,
                'lastname' => $user->lastname,
            ],
        ], 200);
    }

    
    public function logout(Request $request)
    {
        // Révoquer le token de l'utilisateur actuel
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'message' => 'Déconnexion réussie',
        ], 200);
    }

    /* Demander la réinitialisation du mot de passe */
    public function forgotPassword(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $user = User::where('email', $request->email)->first();

        if (!$user) {
            // Ne pas révéler si l'email existe ou non pour des raisons de sécurité
            return response()->json([
                'message' => 'Si cet email existe, un lien de réinitialisation a été envoyé.',
            ], 200);
        }

        // Générer un token de réinitialisation
        $token = bin2hex(random_bytes(32));
        
        // Stocker le token dans password_reset_tokens
        \DB::table('password_reset_tokens')->updateOrInsert(
            ['email' => $request->email],
            [
                'email' => $request->email,
                'token' => Hash::make($token),
                'created_at' => now(),
            ]
        );

        // En production, vous enverriez un email ici
        // Pour le développement, on retourne le token
        return response()->json([
            'message' => 'Si cet email existe, un lien de réinitialisation a été envoyé.',
            'token' => $token, // À retirer en production
            'email' => $request->email, // À retirer en production
        ], 200);
    }

    /* Réinitialiser le mot de passe */
    public function resetPassword(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'token' => 'required|string',
            'password' => 'required|string|min:8|confirmed',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        // Vérifier le token
        $resetRecord = \DB::table('password_reset_tokens')
            ->where('email', $request->email)
            ->first();

        if (!$resetRecord) {
            return response()->json([
                'message' => 'Token invalide ou expiré',
            ], 400);
        }

        // Vérifier que le token correspond
        if (!Hash::check($request->token, $resetRecord->token)) {
            return response()->json([
                'message' => 'Token invalide ou expiré',
            ], 400);
        }

        // Vérifier que le token n'a pas plus de 60 minutes
        $createdAt = new \DateTime($resetRecord->created_at);
        $now = new \DateTime();
        $diff = $now->getTimestamp() - $createdAt->getTimestamp();
        
        if ($diff > 3600) { // 60 minutes
            return response()->json([
                'message' => 'Token expiré',
            ], 400);
        }

        // Mettre à jour le mot de passe
        $user = User::where('email', $request->email)->first();
        
        if (!$user) {
            return response()->json([
                'message' => 'Utilisateur non trouvé',
            ], 404);
        }

        $user->password = Hash::make($request->password);
        $user->save();

        // Supprimer le token utilisé
        \DB::table('password_reset_tokens')
            ->where('email', $request->email)
            ->delete();

        return response()->json([
            'message' => 'Mot de passe réinitialisé avec succès',
        ], 200);
    }
}
