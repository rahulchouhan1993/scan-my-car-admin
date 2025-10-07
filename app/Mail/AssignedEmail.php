<?php

namespace App\Mail;

use App\Models\User;
use App\Models\InspectionRequest;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class AssignedEmail extends Mailable
{
    use Queueable, SerializesModels;
    public $inspectionsDetail;
    public $userDetail;
    public function __construct(InspectionRequest $inspectionsDetail, User $userDetail)
    {
        $this->inspectionsDetail = $inspectionsDetail;
        $this->userDetail = $userDetail;
    }

    public function build()
    {
        return $this->subject('Inspector Assigned.')
                    ->view('emails.assign-inspector')
                    ->with([
                        'inspectionsDetail' => $this->inspectionsDetail,
                        'userDetail' => $this->userDetail,
                    ]);
    }
}
