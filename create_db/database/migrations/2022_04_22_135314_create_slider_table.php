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
        Schema::create('slider', function (Blueprint $table) {
            $table->id();
            $table->text('slider_image_1');
            $table->text('slider_image_2');
            $table->text('slider_image_3');
            $table->text('slider_image_4');
            $table->text('slider_image_5');
            $table->text('slider_link_1');
            $table->text('slider_link_2');
            $table->text('slider_link_3');
            $table->text('slider_link_4');
            $table->text('slider_link_5');
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
        Schema::dropIfExists('slider');
    }
};
