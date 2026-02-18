<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class PostController extends Controller
{
    /**
     * Lister tous les posts avec pagination
     */
    public function index(Request $request)
    {
        $perPage = $request->query('per_page', 10);
        
        $posts = Post::with(['user', 'comments', 'likes'])
            ->latest()
            ->paginate($perPage);

        return response()->json($posts, 200);
    }

    /**
     * Récupérer un post spécifique
     */
    public function show($id)
    {
        $post = Post::with(['user', 'comments.user', 'likes'])->find($id);

        if (!$post) {
            return response()->json(['message' => 'Post non trouvé'], 404);
        }

        return response()->json($post, 200);
    }

    /**
     * Créer un nouveau post
     */
    public function store(Request $request)
    {
        // Validation
        $validator = Validator::make($request->all(), [
            'content' => 'required|string|min:1',
            'image' => 'nullable|string', // base64 ou URL
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        // Créer le post
        $post = Post::create([
            'user_id' => Auth::id(),
            'content' => $request->content,
            'image' => $request->image ?? null,
        ]);

        return response()->json([
            'message' => 'Post créé',
            'post' => $post->load('user'),
        ], 201);
    }

    /**
     * Modifier un post
     */
    public function update(Request $request, $id)
    {
        $post = Post::find($id);

        if (!$post) {
            return response()->json(['message' => 'Post non trouvé'], 404);
        }

        // Vérifier que c'est l'auteur
        if ($post->user_id !== Auth::id()) {
            return response()->json(['message' => 'Non autorisé'], 403);
        }

        // Validation
        $validator = Validator::make($request->all(), [
            'content' => 'required|string|min:1',
            'image' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        // Mettre à jour
        $post->update([
            'content' => $request->content,
            'image' => $request->image ?? $post->image,
        ]);

        return response()->json([
            'message' => 'Post mis à jour',
            'post' => $post,
        ], 200);
    }

    /**
     * Supprimer un post
     * Note: Les commentaires et likes sont automatiquement supprimés via cascade
     */
    public function destroy($id)
    {
        $post = Post::find($id);

        if (!$post) {
            return response()->json(['message' => 'Post non trouvé'], 404);
        }

        // Vérifier que c'est l'auteur
        if ($post->user_id !== Auth::id()) {
            return response()->json(['message' => 'Non autorisé'], 403);
        }

        $post->delete();

        return response()->json([
            'message' => 'Post supprimé',
        ], 200);
    }
}
