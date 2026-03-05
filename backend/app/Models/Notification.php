<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Notification extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'actor_id',
        'type',
        'title',
        'message',
        'post_id',
        'comment_id',
        'read',
    ];

    protected $casts = [
        'read' => 'boolean',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Relation: Utilisateur qui reçoit la notification
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Relation: Utilisateur qui a déclenché la notification
     */
    public function actor()
    {
        return $this->belongsTo(User::class, 'actor_id');
    }

    /**
     * Relation: Post associé
     */
    public function post()
    {
        return $this->belongsTo(Post::class);
    }

    /**
     * Relation: Commentaire associé
     */
    public function comment()
    {
        return $this->belongsTo(Comment::class);
    }
}
