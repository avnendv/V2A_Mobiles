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
        Schema::create('phone_color', function (Blueprint $table) {
            $table->id()->autoIncrement();
            $table->string('name', 20);
            $table->string('image');
            $table->integer('quantity');
            $table->unsignedBigInteger('phone_id');
            $table->foreign('phone_id')->references('id')->on('phones');
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
        Schema::dropIfExists('phone_color');
    }
};
