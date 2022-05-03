<?php

namespace Database\Seeders;

use Carbon\Carbon;
use Faker\Factory;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class PhonesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker  = Factory::create();
        for ($i=0; $i < 50; $i++) { 
            $name = $faker->unique()->name;
            DB::table('phones')->insert([
                'name' => $name,
                'branch_id' => $faker->randomElement($array = array (1,2,3,4,5,6,7,8,9)),
                'quantity' => $faker->numberBetween(1, 1000),
                'price' => 4000000,
                'color' => $faker->randomElement($array = array ('black','blue', 'red', 'yellow')),
                'image' => 'https://img.hungmobile.vn/hungmobile-vn/2021/11/w200/thuml.jpg',
                'spec_his_camera' => $faker->randomElement($array = array ('5','8', '16', '32')),
                'spec_font_camera' => $faker->randomElement($array = array ('5','8', '16', '32')),
                'spec_chip' => $faker->randomElement($array = array ('5','8', '16', '32')),
                'spec_ram' => $faker->randomElement($array = array ('5','8', '16', '32')),
                'spec_rom' => $faker->randomElement($array = array ('5','8', '16', '32')),
                'spec_sim' => $faker->randomElement($array = array ('5','8', '16', '32')),
                'spec_security' => $faker->randomElement($array = array ('5','8', '16', '32')),
                'spec_pin' => $faker->randomElement($array = array ('5','8', '16', '32')),
                'spec_screen_size' => $faker->randomElement($array = array ('5','8', '16', '32')),
                'slug' => Str::slug($name),
                'detail' => 'chi tiết',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ]);
        }
    }
}
