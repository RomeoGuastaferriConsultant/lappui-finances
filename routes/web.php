<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Auth::routes();

Route::get('/home',    'HomeController@index');
Route::get('/accueil', 'HomeController@index')->name('accueil');

Route::get('register', function() {return view('auth.register');})
    ->name('register')
    // user authorized to see this user-creation view ?
    ->middleware('can:create,App\User');

