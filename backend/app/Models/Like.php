<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Like extends Model
{
    use HasFactory;

    const UPDATED_AT = null; // Pas de colonne updated_at, seulement created_at

    protected $fillable = [
        'post_id',
        'user_id',
    ];

    /**
     * Relation : Post liké
     */
    public function post()
    {
        return $this->belongsTo(Post::class);
    }

    /**
     * Relation : Utilisateur qui like
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
