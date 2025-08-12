<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="Googlebot-News" content="noindex, nnofollow">
		<meta name="googlebot" content="noindex, nofollow">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title inertia></title>
        <link rel="icon" type="image/x-icon" href="{{ asset('favicon.png') }}">
        @viteReactRefresh
        @vite('resources/js/app.jsx')
        @inertiaHead
        @routes
    </head>
    <body class="">
    @inertia
    </body>
</html>
