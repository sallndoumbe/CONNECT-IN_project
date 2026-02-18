<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    /**
     * Register - Créer un nouveau compte utilisateur
     */
    public function register(Request $request)
    {
        // Validation des données
        $validator = Validator::make($request->all(), [
            'email' => 'required|email|unique:users,email',
            'firstname' => 'required|string|min:2',
            'lastname' => 'required|string|min:2',
            'password' => 'required|string|min:8|confirmed',
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

        // Retourner la réponse
        return response()->json([
            'message' => 'Inscription réussie',
            'user' => [
                'id' => $user->id,
                'email' => $user->email,
                'firstname' => $user->firstname,
                'lastname' => $user->lastname,
            ],
        ], 201);
    }

    /**
     * Login - Connecter un utilisateur
     */
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

        // Authentifier l'utilisateur
        Auth::login($user);

        return response()->json([
            'message' => 'Connexion réussie',
            'user' => [
                'id' => $user->id,
                'email' => $user->email,
                'firstname' => $user->firstname,
                'lastname' => $user->lastname,
            ],
        ], 200);
    }

    /**
     * Logout - Déconnecter un utilisateur
     */
    public function logout(Request $request)
    {
        Auth::logout();

        return response()->json([
            'message' => 'Déconnexion réussie',
        ], 200);
    }
}
