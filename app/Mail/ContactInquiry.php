<?php

namespace App\Mail;

use App\Models\ContactUs;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class ContactInquiry extends Mailable
{
    use Queueable, SerializesModels;
    public $userData;
    public function __construct(ContactUs $userData)
    {
        $this->userData = $userData;
    }

    public function build()
    {
        return $this->subject('📥 Thank you for contacting us – we’ve received your inquiry')
                    ->view('emails.contact-inquiry')
                    ->with([
                        'userData' => $this->userData,
                    ]);
    }
}
