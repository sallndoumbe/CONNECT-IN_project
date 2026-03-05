<?php

namespace App\Http\Controllers;

use App\Models\Like;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LikeController extends Controller
{
     /* Liker un post */
    public function store($post_id)
    {
        $post = Post::find($post_id);

        if (!$post) {
            return response()->json(['message' => 'Post non trouvé'], 404);
        }

        // Vérifier si l'utilisateur a déjà liké ce post
        $existingLike = Like::where('post_id', $post_id)
            ->where('user_id', Auth::id())
            ->first();

        if ($existingLike) {
            return response()->json([
                'message' => 'Vous avez déjà liké ce post',
            ], 409);
        }

        // Créer le like
        Like::create([
            'post_id' => $post_id,
            'user_id' => Auth::id(),
        ]);

        // Créer une notification si ce n'est pas son propre post
        if ($post->user_id !== Auth::id()) {
            NotificationController::notify(
                $post->user_id,
                Auth::id(),
                'like',
                'Nouveau like',
                Auth::user()->firstname . ' a aimé votre post',
                $post_id
            );
        }

        $likesCount = Like::where('post_id', $post_id)->count();

        return response()->json([
            'message' => 'Like ajouté',
            'likes_count' => $likesCount,
        ], 201);
    }

     /* Retirer un like d'un post*/
    public function destroy($post_id)
    {
        $post = Post::find($post_id);

        if (!$post) {
            return response()->json(['message' => 'Post non trouvé'], 404);
        }

        // Trouver et supprimer le like
        $like = Like::where('post_id', $post_id)
            ->where('user_id', Auth::id())
            ->first();

        if (!$like) {
            return response()->json([
                'message' => 'Vous n\'aviez pas liké ce post',
            ], 404);
        }

        $like->delete();

        $likesCount = Like::where('post_id', $post_id)->count();

        return response()->json([
            'message' => 'Like supprimé',
            'likes_count' => $likesCount,
        ], 200);
    }
}
