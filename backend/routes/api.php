<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\LikeController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Routes publiques (sans authentification)
Route::middleware('api')->group(function () {
    
    // Authentification
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class, 'login']);
    
    // Posts publics (lecture seule)
    Route::get('/posts', [PostController::class, 'index']);
    Route::get('/posts/{id}', [PostController::class, 'show']);
    Route::get('/posts/{id}/comments', [CommentController::class, 'index']);
});

// Routes protégées (nécessitent authentification)
Route::middleware(['auth:sanctum'])->group(function () {
    
    // Authentification
    Route::post('/logout', [AuthController::class, 'logout']);
    
    // Profil utilisateur
    Route::get('/users/profile', [UserController::class, 'profile']);
    Route::put('/users/profile', [UserController::class, 'updateProfile']);
    Route::put('/users/password', [UserController::class, 'changePassword']);
    Route::delete('/users/profile', [UserController::class, 'deleteAccount']);
    
    // Posts
    Route::post('/posts', [PostController::class, 'store']);
    Route::put('/posts/{id}', [PostController::class, 'update']);
    Route::delete('/posts/{id}', [PostController::class, 'destroy']);
    
    // Commentaires
    Route::post('/posts/{post_id}/comments', [CommentController::class, 'store']);
    Route::put('/comments/{id}', [CommentController::class, 'update']);
    Route::delete('/comments/{id}', [CommentController::class, 'destroy']);
    
    // Likes
    Route::post('/posts/{post_id}/like', [LikeController::class, 'store']);
    Route::delete('/posts/{post_id}/like', [LikeController::class, 'destroy']);
});
