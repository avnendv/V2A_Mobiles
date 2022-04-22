<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class RolesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('roles')->insert([
            'name' => 'Quản lý điện thoại',
        ]);
        DB::table('roles')->insert([
            'name' => 'Quản lý thương hiệu',
        ]);
        DB::table('roles')->insert([
            'name' => 'Quản lý tài khoản',
        ]);
        DB::table('roles')->insert([
            'name' => 'Quản lý đơn hàng',
        ]);
        DB::table('roles')->insert([
            'name' => 'Quản lý blog',
        ]);
        DB::table('roles')->insert([
            'name' => 'Quản lý slide',
        ]);
    }
}
