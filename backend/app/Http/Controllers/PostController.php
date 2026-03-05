<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;

class PostController extends Controller
{
     /* Lister tous les posts avec pagination, recherche, filtrage et tri*/
    public function index(Request $request)
    {
        $perPage = $request->query('per_page', 10);
        $search = $request->query('search', null);
        $sort = $request->query('sort', 'latest'); // latest, popular
        $fromDate = $request->query('from_date', null);
        $toDate = $request->query('to_date', null);
        
        $query = Post::with(['user', 'comments', 'likes'])->where('deleted_at', null);

        // Recherche par contenu
        if ($search) {
            $query->where('content', 'LIKE', '%' . $search . '%');
        }

        // Filtrage par date
        if ($fromDate) {
            $query->whereDate('created_at', '>=', $fromDate);
        }
        if ($toDate) {
            $query->whereDate('created_at', '<=', $toDate);
        }

        // Tri
        if ($sort === 'popular') {
            $query->withCount('likes')
                  ->orderBy('likes_count', 'desc')
                  ->latest();
        } else {
            $query->latest();
        }

        $posts = $query->paginate($perPage);

        return response()->json($posts, 200);
    }

     /* Récupérer un post spécifique */
    public function show($id)
    {
        $post = Post::with(['user', 'comments.user', 'likes'])->find($id);

        if (!$post) {
            return response()->json(['message' => 'Post non trouvé'], 404);
        }

        return response()->json($post, 200);
    }

     /* Créer un nouveau post */
    public function store(Request $request)
    {
        // Validation
        $validator = Validator::make($request->all(), [
            'content' => 'required|string|min:1',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:5120', // 5MB max
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        // Traiter l'image
        $imageUrl = null;
        if ($request->hasFile('image')) {
            $file = $request->file('image');
            $filename = 'posts/' . Auth::id() . '_' . time() . '.' . $file->getClientOriginalExtension();
            Storage::disk('public')->put($filename, file_get_contents($file));
            $imageUrl = Storage::disk('public')->url($filename);
        }

        // Créer le post
        $post = Post::create([
            'user_id' => Auth::id(),
            'content' => $request->content,
            'image' => $imageUrl,
        ]);

        // Recharger avec les relations
        $post->load('user');

        return response()->json($post, 201);
    }

     /* Modifier un post */
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
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:5120',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        // Traiter la nouvelle image
        $imageUrl = $post->image;
        if ($request->hasFile('image')) {
            // Supprimer l'ancienne image si elle existe
            if ($post->image) {
                Storage::disk('public')->delete(str_replace(Storage::disk('public')->url(''), '', $post->image));
            }
            // Créer la nouvelle
            $file = $request->file('image');
            $filename = 'posts/' . Auth::id() . '_' . time() . '.' . $file->getClientOriginalExtension();
            Storage::disk('public')->put($filename, file_get_contents($file));
            $imageUrl = Storage::disk('public')->url($filename);
        }

        // Mettre à jour
        $post->update([
            'content' => $request->content,
            'image' => $imageUrl,
        ]);

        // Recharger avec les relations
        $post->load('user');

        return response()->json($post, 200);
    }

     /* Supprimer un post*/
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

        // Supprimer l'image associée
        if ($post->image) {
            Storage::disk('public')->delete(str_replace(Storage::disk('public')->url(''), '', $post->image));
        }

        $post->delete();

        return response()->json([
            'message' => 'Post supprimé',
        ], 200);
    }
}
