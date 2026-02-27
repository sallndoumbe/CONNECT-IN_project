<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasFactory, Notifiable, HasApiTokens;

    
    protected $fillable = [
        'email',
        'name',
        'firstname',
        'lastname',
        'password',
        'image',
        'bio',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

     /* Relation : Posts créés par cet utilisateur*/
    public function posts()
    {
        return $this->hasMany(Post::class);
    }

     /* Relation : Commentaires écrits par cet utilisateur*/
    public function comments()
    {
        return $this->hasMany(Comment::class);
    }

     /* Relation : Posts likés par cet utilisateur*/
    public function likes()
    {
        return $this->hasMany(Like::class);
    }
}
