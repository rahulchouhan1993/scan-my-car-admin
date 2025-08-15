<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;
use App\Models\ContactUs;
use App\Models\User;
use App\Models\InspectionRequest;
use Illuminate\Support\Facades\Auth;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return array_merge(parent::share($request), [
            'auth' => [
                'user' => $request->user(),
            ],
            'notifications' => function () {
                if (Auth::check()) {
                    return ContactUs::where('seen_status', 0)->count();
                }
                return [];
            },
            'dashboardData' => function () {
                if (Auth::check()) {
                    if(Auth::user()->role=='admin') {
                        return [
                            'totalUsers' => User::where('role','!=', 'admin')->count(),
                            'totalServiceRequests' => InspectionRequest::where('status', 0)->count(),
                        ];
                    }else{
                        return [
                            'totalServiceRequests' => InspectionRequest::where('inspector_id', Auth::user()->id)->count(),
                        ];
                    }
                }
                return [];
            },
            'flash' => [
                'error' => fn () => $request->session()->get('error'),
                'success' => fn () => $request->session()->get('success'),
            ],
        ]);
    }

    public function rootView(Request $request): string
    {
        if ($request->is('admin*')) {
            return 'admin'; 
        } elseif ($request->is('inspector*')) {
            return 'admin';
        } elseif ($request->is('dealer*')) {
            return 'admin';
        }

        return 'app';
    }
}
