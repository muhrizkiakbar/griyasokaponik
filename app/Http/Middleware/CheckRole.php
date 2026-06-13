<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CheckRole
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @param  string  ...$roles
     * @return mixed
     */
    public function handle(Request $request, Closure $next, ...$roles)
    {
        if (!Auth::check()) {
            return redirect()->route('login');
        }

        $userRole = Auth::user()->role;

        // Jika user memiliki role yang diizinkan (array roles)
        if (in_array($userRole, $roles)) {
            return $next($request);
        }

        // Jika tidak memiliki akses, redirect ke dashboard atau halaman error 403
        abort(403, 'Anda tidak memiliki akses ke halaman ini.');
    }
}
