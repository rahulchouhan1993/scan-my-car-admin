<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Your Login Details</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            color: #333;
            background: #f9f9f9;
            padding: 30px;
        }
        .email-container {
            background: #fff;
            padding: 20px 30px;
            border-radius: 6px;
            max-width: 600px;
            margin: auto;
            box-shadow: 0 0 10px rgba(0,0,0,0.05);
        }
        .button {
            display: inline-block;
            padding: 10px 16px;
            margin-top: 20px;
            background-color: #007bff;
            color: #fff;
            text-decoration: none;
            border-radius: 4px;
        }
        .footer {
            margin-top: 30px;
            font-size: 12px;
            color: #777;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <h2>Hello {{ $user->name }},</h2>
        <p>Your account has been created successfully. Below are your login details:</p>

        <p><strong>Email:</strong> {{ $user->email }}</p>
        <p><strong>Password:</strong> {{ $plainPassword }}</p>

        <p>You can log in using the button below:</p>
        @php
            if($user->role=='admin'){
                $link = env('APP_URL').'/admin';
            }elseif($user->role=='inspector'){
                $link = env('APP_URL').'/inspector';
            }elseif($user->role=='customer'){
                $link = env('APP_URL').'/login';
            }
        @endphp
        <a href="{{ $link }}" class="button">Login Now</a>

        <p>Please make sure to change your password after your first login.</p>

        <div class="footer">
            &copy; {{ now()->year }} {{ env('APP_NAME') }}. All rights reserved.
        </div>
    </div>
</body>
</html>
