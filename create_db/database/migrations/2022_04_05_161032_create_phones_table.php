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
        Schema::create('phones', function (Blueprint $table) {
            $table->id()->autoIncrement();
            $table->string('name', 100)->unique();
            $table->unsignedBigInteger('parent_id');
            $table->unsignedBigInteger('branch_id');
            $table->integer('price')->default(0);
            $table->integer('view')->default(0);
            $table->string('spec_his_camera');
            $table->string('spec_font_camera');
            $table->string('spec_chip');
            $table->string('spec_ram');
            $table->string('spec_rom');
            $table->string('spec_sim');
            $table->string('spec_security');
            $table->string('spec_pin');
            $table->string('spec_screen_size');
            $table->string('spec_screen_ratio')->nullable();
            $table->string('spec_screen_tech')->nullable();
            $table->string('spec_screen_resolution')->nullable();
            $table->string('spec_screen_protector')->nullable();
            $table->string('spec_his_screen_lens_num')->nullable();
            $table->string('spec_his_screen_record')->nullable();
            $table->string('spec_his_screen_feature')->nullable();
            $table->string('spec_font_screen_lens_num')->nullable();
            $table->string('spec_font_screen_record')->nullable();
            $table->string('spec_font_screen_feature')->nullable();
            $table->string('spec_os')->nullable();
            $table->string('spec_proccess_speed')->nullable();
            $table->string('spec_gpu')->nullable();
            $table->string('spec_external_memory')->nullable();
            $table->string('spec_charge_port')->nullable();
            $table->string('spec_headphone_connection')->nullable();
            $table->string('spec_network_mobile')->nullable();
            $table->string('spec_wifi')->nullable();
            $table->string('spec_bluetooth')->nullable();
            $table->string('spec_gps')->nullable();
            $table->string('spec_fast_charge')->nullable();
            $table->string('spec_design_meterial')->nullable();
            $table->string('spec_size')->nullable();
            $table->string('spec_weight')->nullable();
            $table->string('spec_water_resistance')->nullable();
            $table->string('spec_other_feature')->nullable();
            $table->string('images')->nullable();
            $table->string('slug');
            $table->text('detail');
            $table->foreign('branch_id')->references('id')->on('branches');
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
        Schema::dropIfExists('phones');
    }
};
