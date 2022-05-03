<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id()->autoIncrement();
            $table->string('email',100)->unique();
            $table->string('user_name',100)->unique();
            $table->string('avatar')->default('');
            $table->date('birthdate');
            $table->string('phone',15)->unique();
            $table->string('full_name',100);
            $table->string('address');
            $table->char('password');
            $table->tinyInteger('gender')->default(0);
            $table->tinyInteger('status')->default(0);
            $table->string('auth_facebook_iD')->nullable();
            $table->string('auth_type')->default('local');
            $table->string('user_type')->default('user');
            $table->unsignedBigInteger('role_id');
            $table->foreign('role_id')->references('id')->on('roles');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('users');
    }
};
