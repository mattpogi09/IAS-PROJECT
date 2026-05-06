<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Temporary debug route — remove after diagnosing
Route::get('/debug-info', function () {
    return response()->json([
        'php'              => PHP_VERSION,
        'app_env'          => config('app.env'),
        'app_debug'        => config('app.debug'),
        'app_key_set'      => !empty(config('app.key')),
        'app_url'          => config('app.url'),
        'db_driver'        => config('database.default'),
        'vite_manifest'    => file_exists(public_path('build/manifest.json')) ? 'FOUND' : 'MISSING',
        'sessions_writable'=> is_writable(storage_path('framework/sessions')) ? 'YES' : 'NO',
        'storage_path'     => storage_path('framework/sessions'),
    ]);
});

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});


Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('/blog/sql-intro', function () {
        return Inertia::render('Blog/SqlIntroPage');
    })->name('blog.sql-intro');

    Route::get('/blog/sql-advanced', function () {
        return Inertia::render('Blog/SqlAdvancedPage');
    })->name('blog.sql-advanced');
});

require __DIR__.'/auth.php';
