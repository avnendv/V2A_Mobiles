tạo bảng
php artisan make:migration create_[name table]_table
php artisan migrate
php artisan migrate:refresh
 
# Refresh the database and run all database seeds...
php artisan migrate:refresh --seed

php artisan migrate:fresh
 
php artisan migrate:fresh --seed

php artisan make:seeder UserSeeder

# seeder
php artisan db:seed
 
php artisan db:seed --class=UserSeeder