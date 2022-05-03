<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class SilderSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('silders')->insert([
            // 'slider_image_1' => '',
            // 'slider_image_1' => '',
            // 'slider_image_1' => '',
            // 'slider_link_5' => '',
        ]);
    }
}
