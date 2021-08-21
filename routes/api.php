<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

/*Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});*/


Route::post('/signup', [\App\Http\Controllers\AutenticarController::class, 'registro']);
Route::post('/login', [\App\Http\Controllers\AutenticarController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [\App\Http\Controllers\AutenticarController::class, 'logout']);
});

Route::apiResource('/categorias', \App\Http\Controllers\Categorias\CategoriaController::class)->except('update');
// Route::get('categoria/{categoria}', [\App\Http\Controllers\Categorias\CategoriaController::class, 'show']);
