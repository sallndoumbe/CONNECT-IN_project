<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\Auth;

class Post extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'user_id',
        'content',
        'image',
    ];

    protected $appends = [
        'likes_count',
        'comments_count',
        'user_has_liked',
    ];

     /* Relation : Auteur du post */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

     /* Relation : Commentaires sur ce post */
    public function comments()
    {
        return $this->hasMany(Comment::class);
    }

     /* Relation : Likes sur ce post */
    public function likes()
    {
        return $this->hasMany(Like::class);
    }

    /* Attribut calculé : Nombre de likes */
    public function getLikesCountAttribute()
    {
        return $this->likes()->count();
    }

    /* Attribut calculé : Nombre de commentaires */
    public function getCommentsCountAttribute()
    {
        return $this->comments()->count();
    }

    /* Attribut calculé : L'utilisateur connecté a-t-il liké ce post */
    public function getUserHasLikedAttribute()
    {
        if (!Auth::check()) {
            return false;
        }
        return $this->likes()->where('user_id', Auth::id())->exists();
    }
}
