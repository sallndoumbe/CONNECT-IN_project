<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Post extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'content',
        'image',
    ];

    /**
     * Relation : Auteur du post
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Relation : Commentaires sur ce post
     */
    public function comments()
    {
        return $this->hasMany(Comment::class);
    }

    /**
     * Relation : Likes sur ce post
     */
    public function likes()
    {
        return $this->hasMany(Like::class);
    }
}
