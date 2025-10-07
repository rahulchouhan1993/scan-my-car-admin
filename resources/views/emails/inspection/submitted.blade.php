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
                    A new inspection has been requested.</h2>
                </td>
              </tr>

              <!-- Spacer -->
              <tr><td style="padding: 10px 50px;"></td></tr>

              <!-- Introduction -->
              <tr>
                <td align="left" style="padding: 0 50px; font-size: 16px; line-height: 24px; color: #333333;">
                  Below are the details of the new inspection request:
                </td>
              </tr>

              <!-- Spacer -->
              <tr><td style="padding: 10px 50px;"></td></tr>

              <!-- Message Body -->
              <tr>
                <td align="left" style="padding: 0 50px; font-size: 16px; line-height: 24px; color: #333333;">
                    <strong>Inspection ID:</strong> {{ $inspectionRequest->id }}<br>
                    <strong>Vehicle:</strong> {{ $inspectionRequest->vehicle_make }} - {{ $inspectionRequest->vehicle_model }} - {{ $inspectionRequest->vehicle_year }}<br>
                    <strong>Date & Time:</strong> {{ $inspectionRequest->preferred_date }} {{ $inspectionRequest->preferred_time_slot }}<br>
                    <strong>Status:</strong> 
                    @php 
                        echo $inspectionRequest->status == 0 ? 'Open' : ($inspectionRequest->status == 1 ? 'Assigned' : ($inspectionRequest->status == 2 ? 'Completed' : 'Hold')); 
                    @endphp
                    <br>
                    <strong>Requested By:</strong> {{ $inspectionRequest->full_name }} ({{ $inspectionRequest->email }})<br>
                </td>
              </tr>

              <tr><td style="padding: 10px 50px;"></td></tr>

              <tr>
                <td align="left" style="padding: 0 50px; font-size: 16px; line-height: 24px; color: #333333;">
                  You can view the details and manage the inspection request by logging into your dashboard.
                </td>
              </tr>

              <!-- Call to Action -->
              <tr>
                <td align="left" style="padding: 30px 50px;">
                  <a href="{{ env('APP_URL') }}/admin/" style="background-color: #D72638; color: #fff; padding: 12px 25px; font-size: 16px; border-radius: 4px; display: inline-block;">
                    Validate Inspection Request
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
