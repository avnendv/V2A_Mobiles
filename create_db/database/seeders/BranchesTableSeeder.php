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
        ]);
        DB::table('branches')->insert([
            'name' => 'Xiaomi',
        ]);
        DB::table('branches')->insert([
            'name' => 'Samsung',
        ]);
        DB::table('branches')->insert([
            'name' => 'Realme',
        ]);
        DB::table('branches')->insert([
            'name' => 'OnePlus',
        ]);
        DB::table('branches')->insert([
            'name' => 'Rog Phone',
        ]);
        DB::table('branches')->insert([
            'name' => 'Vivo',
        ]);
        DB::table('branches')->insert([
            'name' => 'Nubia',
        ]);
        DB::table('branches')->insert([
            'name' => 'Oppo',
        ]);
    }
}
