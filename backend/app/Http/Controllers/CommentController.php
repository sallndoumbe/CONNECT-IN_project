<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class CommentController extends Controller
{
     /* Lister tous les commentaires d'un post*/
    public function index($post_id)
    {
        $post = Post::find($post_id);

        if (!$post) {
            return response()->json(['message' => 'Post non trouvé'], 404);
        }

        $comments = Comment::where('post_id', $post_id)
            ->with('user')
            ->latest()
            ->get();

        return response()->json($comments, 200);
    }

     /* Créer un nouveau commentaire */
    public function store(Request $request, $post_id)
    {
        $post = Post::find($post_id);

        if (!$post) {
            return response()->json(['message' => 'Post non trouvé'], 404);
        }

        // Validation
        $validator = Validator::make($request->all(), [
            'content' => 'required|string|min:1',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        // Créer le commentaire
        $comment = Comment::create([
            'post_id' => $post_id,
            'user_id' => Auth::id(),
            'content' => $request->content,
        ]);

        // Créer une notification si ce n'est pas son propre post
        if ($post->user_id !== Auth::id()) {
            NotificationController::notify(
                $post->user_id,
                Auth::id(),
                'comment',
                'Nouveau commentaire',
                Auth::user()->firstname . ' a commenté votre post',
                $post_id,
                $comment->id
            );
        }

        // Recharger avec les relations
        $comment->load('user');

        return response()->json($comment, 201);
    }

    
     /* Mettre à jour un commentaire */
     
    public function update(Request $request, $id)
    {
        $comment = Comment::find($id);

        if (!$comment) {
            return response()->json(['message' => 'Commentaire non trouvé'], 404);
        }

        // Vérifier que c'est l'auteur
        if ($comment->user_id !== Auth::id()) {
            return response()->json(['message' => 'Non autorisé'], 403);
        }

        // Validation
        $validator = Validator::make($request->all(), [
            'content' => 'required|string|min:1',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        // Mettre à jour
        $comment->update([
            'content' => $request->content,
        ]);

        // Recharger avec les relations
        $comment->load('user');

        return response()->json($comment, 200);
    }

    

     /* Supprimer un commentaire */

    public function destroy($id)
    {
        $comment = Comment::find($id);

        if (!$comment) {
            return response()->json(['message' => 'Commentaire non trouvé'], 404);
        }

        // Vérifier que c'est l'auteur
        if ($comment->user_id !== Auth::id()) {
            return response()->json(['message' => 'Non autorisé'], 403);
        }

        $comment->delete();

        return response()->json([
            'message' => 'Commentaire supprimé',
        ], 200);
    }
}
