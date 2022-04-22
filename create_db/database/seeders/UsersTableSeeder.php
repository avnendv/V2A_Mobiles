<?php

namespace Database\Seeders;

use Faker\Factory;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker  = Factory::create();
        $password = Hash::make('12345678');
        for ($i=0; $i < 50; $i++) { 
            DB::table('users')->insert([
                'user_name' =>$faker->name,
                'full_name'=> $faker->firstName,
                'email' =>  $faker->unique()->safeEmail,
                'phone' =>  $faker->unique()->phoneNumber,
                'birthdate'=>$faker->date($format = 'Y-m-d', $max = 'now'),
                'password' => $password, // password
                'avatar'=> $faker-> randomLetter() ,
                'address'=> $faker-> randomLetter() ,
                'role_id'=> $faker->randomElement($array = array ('1','2')) ,
                'user_type'=> $faker->randomElement($array = array ('user','admin', 'moderator')) ,
            ]);
        }
    }
}
