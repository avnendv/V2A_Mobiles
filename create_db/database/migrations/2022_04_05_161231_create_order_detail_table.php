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
        Schema::create('order_detail', function (Blueprint $table) {
            $table->id()->autoIncrement();
            $table->unsignedBigInteger('order_id');
            $table->unsignedBigInteger('phone_id');
            $table->unsignedBigInteger('color_id');
            $table->integer('quantity');
            $table->foreign('order_id')->references('id')->on('orders');
            $table->foreign('color_id')->references('id')->on('phone_color');
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
        Schema::dropIfExists('order_detail');
    }
};
