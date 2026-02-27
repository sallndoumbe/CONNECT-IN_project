<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Chat extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
    ];

    /**
     * Relation : Utilisateurs dans ce chat
     */
    public function users()
    {
        return $this->belongsToMany(User::class, 'chat_user')->withTimestamps();
    }
}
