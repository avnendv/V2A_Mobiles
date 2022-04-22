<?php

namespace Database\Seeders;

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
        ]);
        DB::table('branches')->insert([
            'name' => 'Xiaomi',
            'slug' => 'xiaomi',
        ]);
        DB::table('branches')->insert([
            'name' => 'Samsung',
            'slug' => 'samsung',
        ]);
        DB::table('branches')->insert([
            'name' => 'Realme',
            'slug' => 'realme',
        ]);
        DB::table('branches')->insert([
            'name' => 'OnePlus',
            'slug' => 'oneplus',
        ]);
        DB::table('branches')->insert([
            'name' => 'Rog Phone',
            'slug' => 'rog-phone',
        ]);
        DB::table('branches')->insert([
            'name' => 'Vivo',
            'slug' => 'vivo',
        ]);
        DB::table('branches')->insert([
            'name' => 'Nubia',
            'slug' => 'nubia',
        ]);
        DB::table('branches')->insert([
            'name' => 'Oppo',
            'slug' => 'oppo',
        ]);
    }
}
