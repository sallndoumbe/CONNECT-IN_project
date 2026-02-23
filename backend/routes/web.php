<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return response()->json([
        'message' => 'Backend Connect\'In',
        'status' => 'running',
        'documentation' => [
            'public_routes' => [
                'POST /api/register' => 'Enregistrement utilisateur',
                'POST /api/login' => 'Connexion utilisateur',
                'GET /api/posts' => 'Lister tous les posts',
                'GET /api/posts/{id}' => 'Récupérer un post spécifique',
                'GET /api/posts/{id}/comments' => 'Lister les commentaires d\'un post'
            ],
            'protected_routes' => [
                'Authentification requise (Sanctum Token)',
                'POST /api/logout' => 'Se déconnecter',
                'GET /api/users/profile' => 'Récupérer le profil utilisateur',
                'PUT /api/users/profile' => 'Mettre à jour le profil',
                'PUT /api/users/password' => 'Changer le mot de passe',
                'DELETE /api/users/profile' => 'Supprimer le compte',
                'POST /api/posts' => 'Créer un post',
                'PUT /api/posts/{id}' => 'Modifier un post',
                'DELETE /api/posts/{id}' => 'Supprimer un post',
                'POST /api/posts/{post_id}/comments' => 'Ajouter un commentaire',
                'PUT /api/comments/{id}' => 'Modifier un commentaire',
                'DELETE /api/comments/{id}' => 'Supprimer un commentaire',
                'POST /api/posts/{post_id}/like' => 'Liker un post',
                'DELETE /api/posts/{post_id}/like' => 'Retirer un like'
            ]
        ]
    ]);
});
