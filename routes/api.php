<?php

use App\Http\Controllers\API\UsersController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::get('get/users', [UsersController::class, 'get']);
Route::post('post/users', [UsersController::class, 'post']);
Route::patch('patch/users/{id}', [UsersController::class, 'patch']);
Route::delete('delete/users/{id}', [UsersController::class, 'delete']);
