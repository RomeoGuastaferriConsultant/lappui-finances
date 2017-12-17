<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\URL;

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

/* redirect domain-level requests to default view */
Route::get('/', 'HomeController@index');

Route::get('register', function() {return view('auth.register');})
->name('register')
->middleware('can:create,App\User');
