<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('notifications', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id')->comment('Utilisateur qui reçoit la notification');
            $table->unsignedBigInteger('actor_id')->nullable()->comment('Utilisateur qui a déclenché la notification');
            $table->enum('type', ['like', 'comment', 'follow', 'post'])->comment('Type de notification');
            $table->string('title')->comment('Titre de la notification');
            $table->text('message')->comment('Message de la notification');
            $table->unsignedBigInteger('post_id')->nullable()->comment('Post associé');
            $table->unsignedBigInteger('comment_id')->nullable()->comment('Commentaire associé');
            $table->boolean('read')->default(false)->comment('Notification lue ?');
            $table->timestamps();

            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('actor_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('post_id')->references('id')->on('posts')->onDelete('cascade');
            $table->foreign('comment_id')->references('id')->on('comments')->onDelete('cascade');

            $table->index('user_id');
            $table->index('read');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('notifications');
    }
};
