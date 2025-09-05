<?php

namespace App\Http\Controllers;

use App\Models\InspectionRequest;
use App\Models\InspectionLog;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Carbon\Carbon;
use Illuminate\Support\Facades\Mail;
use App\Mail\InspectionRequestSubmitted;
use App\Mail\InspectionRequestConfirmation;
use Mpdf\Mpdf;

class InspectionsController extends Controller
{

    public function requestInspection(Request $request){
        if($request->isMethod('post')){
            $validator = Validator::make($request->all(), [
                'inspector_id'         => 'nullable|integer|exists:users,id',
                'full_name'            => 'required|string|max:50',
                'contact_no'           => 'required|string|max:15',
                'email'                => 'required|string|max:50',
                // 'pin_code'             => 'required',
                'city'                 => 'required',
                'address_line_1'       => 'required|string|max:100',
                'address_line_2'       => 'required|string|max:100',
                'car_parked'           => 'required|string|max:20',
                'vehicle_make'         => 'required|string|max:30',
                'vehicle_model'        => 'required|string|max:30',
                'vehicle_year'         => 'nullable|integer|min:1900|max:' . now()->year,
                'fuel_type'            => 'required|string|in:Petrol,Diesel,Hybrid,Electric',
                'transmission'         => 'required|string|in:Manual,Automatic',
                'mileage'              => 'required',
                'preferred_date'       => 'required|date|after_or_equal:today',
                'preferred_time_slot'  => 'required|string',
                'additional_notes'     => 'nullable|string|max:1000',
                'status'               => 'nullable|integer|in:0,1,2', // define status codes if needed
                'assign_date'          => 'nullable|date',
            ]);
           
            if ($validator->fails()) {
                return redirect()->back()->withErrors($validator)->withInput($request->all());
            }
            
            // Process the valid data
            $preferredDate = $request->preferred_date ? Carbon::parse($request->preferred_date)->format('Y-m-d') : null;
            $assignDate = $request->assign_date ? Carbon::parse($request->assign_date)->format('Y-m-d') : null;
            $inspectionRequest = InspectionRequest::create([
                'package_id'          => $request->package_name,
                'inspector_id'        => NULL,
                'full_name'           => $request->full_name,
                'contact_no'          => $request->contact_no,
                'email'               => $request->email,
                'address_line_1'      => $request->address_line_1,
                'address_line_2'      => $request->address_line_2,
                'car_parked'          => $request->car_parked,
                'vehicle_make'        => $request->vehicle_make,
                'other_vehicle_make'  => $request->other_vehicle_make,
                'vehicle_model'       => $request->vehicle_model,
                'vehicle_year'        => $request->vehicle_year,
                'fuel_type'           => $request->fuel_type,
                'transmission'        => $request->transmission,
                'mileage'             => $request->mileage,
                'preferred_date'      => $preferredDate,
                'preferred_time_slot' => $request->preferred_time_slot,
                'additional_notes'    => $request->additional_notes ?? NULL,
                'status'              => $request->status ?? 0,
                'assign_date'         => $assignDate,
                'pin_code'            => $request->pin_code ?? NULL,
                'city'                => $request->city,
                'request_no'          => rand()
            ]);

            InspectionLog::create([
                'inspection_request_id' => $inspectionRequest->id,
                'inspector_id'          => $request->inspector_id,
                'log_details'           => 'New Service Request Created',
            ]);

            //Send Email to user and admin
            Mail::to($inspectionRequest->email)->send(new InspectionRequestConfirmation($inspectionRequest));

            // Notify Admin
            $adminDetails = User::find(1);
            if ($adminDetails) {
                Mail::to($adminDetails->email)->send(new InspectionRequestSubmitted($inspectionRequest));
            }
            return redirect()->route('thank-you')->with('success', 'Inspection request created successfully.');
            //return redirect()->back()->with('success', 'Inspection request created successfully.');
        }

        $pageTitle = 'Book An Inspection | CertifyCars';
        return inertia('Customers/BookInspection', compact('pageTitle'));
        
    }

    public function inspectionDetails($id){
        $inspectionsDetail = InspectionRequest::with([
            'bodyDetail',
            'vehicleDetail',
            'interiorDetails',
            'glassDetails',
            'engineDetails',
            'clusterDetails',
            'transmissionDetails',
            'suspensionDetails',
            'brakesDetails',
            'tyresDetails',
            'seatDetails',
            'hvacDetails',
            'coolingFuelDetails',
            'electricalLightingDetails',
            'performanceRoadTestDetails',
        ])->find($id);
       
        $pageTitle = 'Inspection Details | CertifyCars';
        return inertia('Customers/InspectionDetails', compact('pageTitle','inspectionsDetail'));

    }

    public function thankYou(){
        $pageTitle = 'Thank you!';
        return inertia('Customers/ThankYou', compact('pageTitle'));
    }

    public function markComplete(){
        InspectionRequest::where('status', 4)
        ->where('completed_date', '<=', Carbon::now()->subMinutes(30))
        ->update(['status' => 5]);
        die;
    }

    public function previewPdf()
    {
        $defaultConfig = (new \Mpdf\Config\ConfigVariables())->getDefaults();
        $fontDirs = $defaultConfig['fontDir'];

        $defaultFontConfig = (new \Mpdf\Config\FontVariables())->getDefaults();
        $fontData = $defaultFontConfig['fontdata'];

        $mpdf = new \Mpdf\Mpdf([
            'fontDir' => array_merge($fontDirs, [
                storage_path('fonts'),
            ]),
            'fontdata' => $fontData + [
                'rightgroteskwidemedium' => [
                    'R' => 'RightGroteskWideMedium.ttf', // regular style
                ],
            ],
            'default_font' => 'rightgroteskwidemedium'
        ]);
        $id = 2;
        $inspectionsDetail = InspectionRequest::with([
            'bodyDetail',
            'vehicleDetail',
            'interiorDetails',
            'glassDetails',
            'engineDetails',
            'clusterDetails',
            'transmissionDetails',
            'suspensionDetails',
            'brakesDetails',
            'tyresDetails',
            'seatDetails',
            'hvacDetails',
            'coolingFuelDetails',
            'electricalLightingDetails',
            'performanceRoadTestDetails',
        ])->findOrFail($id);

        $mpdf = new Mpdf([
            'margin_top'    => 40,
            'margin_bottom' => 30,
        ]);

        // Watermark
        $mpdf->SetWatermarkText('Verified by certifycars.ae', 0.05);
        $mpdf->showWatermarkText = true;

        // Header (applies to body pages)
        $header = '
            <table width="100%" style="font-family: rightgroteskwidemedium; border-bottom:1px solid #ccc; font-family:sans-serif; font-size:10pt;">
                <tr>
                    <td width="20%" align="left">
                        <img src="' . public_path('images/logo-black.png') . '" width="80" />
                    </td>
                    <td width="60%" align="center" style="font-family: rightgroteskwidemedium;font-size:14pt; font-weight:bold; color:#2e86de;">
                        Vehicle Inspection Report
                    </td>
                    <td width="20%" align="right" style="font-family: rightgroteskwidemedium;font-size:9pt; line-height:1.4;">
                        CertifyCars LLC<br/>
                        +971 50 123 4567<br/>
                        Dubai, UAE
                    </td>
                </tr>
            </table>';
        $mpdf->SetHTMLHeader($header);

        // Footer
        $footer = '
            <table width="100%" style="font-family: rightgroteskwidemedium;border-top:1px solid #ccc; font-family:sans-serif; font-size:9pt;">
                <tr>
                    <td width="33%" align="left">
                        support@certifycars.ae | +971 50 123 4567
                    </td>
                    <td width="33%" align="center">
                        Page {PAGENO} of {nbpg}
                    </td>
                    <td width="33%" align="right">
                        Generated on: ' . Carbon::now()->format('d-m-Y H:i') . '
                    </td>
                </tr>
            </table>';
        $mpdf->SetHTMLFooter($footer);

        // --- COVER PAGE ---
        $vehicle = $inspectionsDetail->vehicleDetail;
        $cover = '
            <div style="font-family: rightgroteskwidemedium;text-align:center; margin-top:100px;">
                <img src="' . public_path('images/logo-black.png') . '" width="120" />
                <h1 style="font-family: rightgroteskwidemedium;font-size:28pt; color:#2e86de; margin-top:30px;">Vehicle Inspection Report</h1>
                <p style="font-family: rightgroteskwidemedium;font-size:12pt; color:#555;">Prepared by CertifyCars LLC</p>
            </div>

            <div style="font-family: rightgroteskwidemedium;margin-top:50px; font-family:sans-serif; font-size:11pt;">
                <table width="100%" border="1" cellspacing="0" cellpadding="8" style="font-family: rightgroteskwidemedium;border-collapse:collapse;">
                    <tr><td width="40%"><b>Vehicle Make</b></td><td width="60%">' . ($vehicle->make ?? '-') . '</td></tr>
                    <tr><td><b>Model</b></td><td>' . ($vehicle->model ?? '-') . '</td></tr>
                    <tr><td><b>Year</b></td><td>' . ($vehicle->year ?? '-') . '</td></tr>
                    <tr><td><b>VIN</b></td><td>' . ($vehicle->vin ?? '-') . '</td></tr>
                    <tr><td><b>Registration No.</b></td><td>' . ($vehicle->registration_no ?? '-') . '</td></tr>
                    <tr><td><b>Inspection Date</b></td><td>' . Carbon::parse($inspectionsDetail->created_at)->format('d-m-Y') . '</td></tr>
                    <tr><td><b>Inspector</b></td><td>' . ($inspectionsDetail->inspector_name ?? 'N/A') . '</td></tr>
                </table>
            </div>

            <div style="font-family: rightgroteskwidemedium;margin-top:40px; font-size:9pt; color:#666; font-family:sans-serif;">
                <b>Disclaimer:</b> This inspection report reflects the condition of the vehicle at the time of inspection.
                It does not guarantee future performance. CertifyCars LLC is not liable for any hidden defects not visible during inspection.
            </div>
        ';

        $mpdf->WriteHTML($cover);
        $mpdf->AddPage(); // new page for report body

        // --- BODY CONTENT ---
        $accordionData = [
        [
            "title" => "Body Details",
            "items" => $inspectionsDetail->bodyDetail
                ? collect($inspectionsDetail->bodyDetail->toArray())->map(function ($item, $key) {
                    return ["label" => ucfirst(str_replace('_', ' ', $key)), "value" => $item];
                })->toArray()
                : [],
        ],
        [
            "title" => "Glass & Mirrors",
            "items" => $inspectionsDetail->glassDetails
                ? collect($inspectionsDetail->glassDetails->toArray())->map(function ($item, $key) {
                    return ["label" => ucfirst(str_replace('_', ' ', $key)), "value" => $item];
                })->toArray()
                : [],
        ],
        // ...repeat for other sections...
    ];

        $html = '';
        foreach ($accordionData as $section) {
            if (empty($section['items'])) continue; // skip empty sections

            $html .= '
                <h3 style="font-family: rightgroteskwidemedium;background-color:#2e86de; color:#fff; padding:6px; font-family:sans-serif;">' . $section['title'] . '</h3>
                <table width="100%" border="1" cellspacing="0" cellpadding="6" style="font-family: rightgroteskwidemedium;border-collapse:collapse; font-family:sans-serif; font-size:10pt; margin-bottom:15px;">
                    <thead>
                        <tr style="font-family: rightgroteskwidemedium;background-color:#f9f9f9;">
                            <th width="70%" align="left">Inspection Point</th>
                            <th width="30%" align="center">Result</th>
                        </tr>
                    </thead>
                    <tbody>';

            foreach ($section['items'] as $item) {
                $color = '#000';
                if (stripos($item['value'], 'OK') !== false) $color = 'green';
                if (stripos($item['value'], 'Repair') !== false) $color = 'red';
                if (stripos($item['value'], 'Not Working') !== false) $color = 'orange';

                $html .= '
                    <tr>
                        <td>' . $item['label'] . '</td>
                        <td align="center" style="font-family: rightgroteskwidemedium;color:' . $color . ';">' . $item['value'] . '</td>
                    </tr>';
            }

            $html .= '</tbody></table>';
        }

        $mpdf->WriteHTML($html);

        return response($mpdf->Output('inspection_report.pdf', 'I'))
            ->header('Content-Type', 'application/pdf');
    }

    public function downloadAttachments($id){
        $inspection = InspectionRequest::find($id);

        $files = [];

        // Collect document files
        if (!empty($inspection->documents)) {
            $docs = json_decode($inspection->documents, true) ?? [];
            $files = array_merge($files, $docs);
        }

        return response()->json($files);
    }
}
