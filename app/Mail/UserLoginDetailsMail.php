<?php

namespace App\Mail;

use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Mail\Mailables\Address;

class UserLoginDetailsMail extends Mailable
{
    public function __construct(
        public $user,
        public $plainPassword,
    ) {}

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Your Account Has Been Created',
            from: new Address(env('MAIL_USERNAME'), env('APP_NAME')),
        );
    }

    public function content(): Content
    {
        return new Content(
            markdown: 'emails.user_login_details',
        );
    }

    public function attachments(): array
    {
        return [];
    }
}

