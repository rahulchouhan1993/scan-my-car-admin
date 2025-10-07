<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{ env('APP_NAME') }}</title>
    <style type="text/css">
      body, table, td, a {
        -webkit-text-size-adjust: 100%;
        -ms-text-size-adjust: 100%;
      }
      table {
        border-collapse: collapse !important;
      }
      body {
        margin: 0 !important;
        padding: 0 !important;
        width: 100% !important;
        height: 100% !important;
        font-family: 'Open Sans', Arial, sans-serif;
        background-color: #f7f7f7;
      }
      a {
        color: inherit;
        text-decoration: none;
      }
      img {
        border: 0;
        height: auto;
        line-height: 100%;
        outline: none;
        text-decoration: none;
        display: block;
      }
      h1, h2, h3, h4, h5 {
        margin: 0;
        padding: 0;
      }
      .email-container {
        max-width: 800px;
        margin: 0 auto;
        background-color: #ffffff;
      }
      @media screen and (max-width: 600px) {
        .email-container {
          width: 100% !important;
        }
      }
    </style>
  </head>

  <body>
    <center style="width: 100%; background-color: #D72638; padding: 50px 0;">
      <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
        <tr>
          <td align="center">
            <table role="presentation" class="email-container" cellspacing="0" cellpadding="0" border="0" width="800">
              <!-- Logo -->
              <tr>
                <td align="left" style="padding: 40px 50px 20px 50px;">
                  <img src="{{ env('APP_URL') }}/images/logo-black.png" alt="BFD Logo" width="130" height="130" style="display: block;">
                </td>
              </tr>

              <!-- Title -->
              <tr>
                <td align="left" style="padding: 0 50px;">
                  <h2 style="font-size: 26px; line-height: 34px; font-weight: bold; color: #333333;">
                    Hello {{ $user->name }},</h2>
                </td>
              </tr>

              <!-- Spacer -->
              <tr><td style="padding: 10px 50px;"></td></tr>

              <!-- Introduction -->
              <tr>
                <td align="left" style="padding: 0 50px; font-size: 16px; line-height: 24px; color: #333333;">
                  <p>We received a request to reset the password for your account</p>
                    <p>For your security, we’ve generated a new temporary password for you:</p>
                    <p><strong>Password:</strong> {{ $user->new_password }}</p>
                    <p>Please use this password to log in to your account. Once you're logged in, we strongly recommend updating your password to something more secure and personal.</p>
                    <p>You can log in using the button below:</p>
                </td>
              </tr>

              <!-- Spacer -->
              <tr><td style="padding: 10px 50px;"></td></tr>
              @php
                if($user->role=='admin'){
                    $link = env('APP_URL').'/admin';
                }elseif($user->role=='inspector'){
                    $link = env('APP_URL').'/inspector';
                }elseif($user->role=='customer'){
                    $link = env('APP_URL').'/login';
                }elseif($user->role=='dealer'){
                    $link = env('APP_URL').'/dealer';
                }
            @endphp
              <!-- Call to Action -->
              <tr>
                <td align="left" style="padding: 30px 50px;">
                  <a href="{{ $link }}" style="background-color: #D72638; color: #fff; padding: 12px 25px; font-size: 16px; border-radius: 4px; display: inline-block;">
                    Login
                  </a>
                </td>
              </tr>

              <!-- Footer -->
              <tr>
                <td align="center" style="padding: 40px 50px; font-size: 14px; color: #D72638;">
                  © {{ date('Y') }} {{ env('APP_NAME') }}. All rights reserved.<br>
                </td>
              </tr>

            </table>
          </td>
        </tr>
      </table>
    </center>
  </body>
</html>

