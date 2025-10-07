<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailables\Attachment;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;
use Illuminate\Mail\Mailables\Address;
class SendInspectionReport extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * Create a new message instance.
     */
    public function __construct(public $inspectionsDetail)
    {
        $this->inspectionsDetail = $inspectionsDetail;
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Your Car Inspection Report is Ready',
            from: new Address(env('MAIL_USERNAME'), env('APP_NAME')),
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            markdown: 'emails.inspection.sendreport',
        );
    }

    /**
     * Get the attachments for the message.
     *
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
    public function attachments(): array
    {
        $filePath = storage_path('app/reports/inspection_report_' . $this->inspectionsDetail->id . '.pdf');

        if (file_exists($filePath)) {
            return [
                Attachment::fromPath($filePath)
                    ->as('inspection-report-' . $this->inspectionsDetail->id . '.pdf')
                    ->withMime('application/pdf'),
            ];
        }

        return []; // no attachment if file not found
    }
}
