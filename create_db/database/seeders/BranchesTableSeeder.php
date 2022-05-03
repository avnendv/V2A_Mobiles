<?php

namespace Database\Seeders;

use Carbon\Carbon;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class BranchesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('branches')->insert([
            'name' => 'iPhone',
            'slug' => 'iphone',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
        ]);
        DB::table('branches')->insert([
            'name' => 'Xiaomi',
            'slug' => 'xiaomi',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
        ]);
        DB::table('branches')->insert([
            'name' => 'Samsung',
            'slug' => 'samsung',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
        ]);
        DB::table('branches')->insert([
            'name' => 'Realme',
            'slug' => 'realme',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
        ]);
        DB::table('branches')->insert([
            'name' => 'OnePlus',
            'slug' => 'oneplus',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
        ]);
        DB::table('branches')->insert([
            'name' => 'Rog Phone',
            'slug' => 'rog-phone',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
        ]);
        DB::table('branches')->insert([
            'name' => 'Vivo',
            'slug' => 'vivo',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
        ]);
        DB::table('branches')->insert([
            'name' => 'Nubia',
            'slug' => 'nubia',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
        ]);
        DB::table('branches')->insert([
            'name' => 'Oppo',
            'slug' => 'oppo',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
        ]);
    }
}
