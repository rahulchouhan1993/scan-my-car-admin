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
                public_path('fonts'),
            ]),
            'fontdata' => $fontData + [
                'rightgroteskwidemedium' => [
                    'R' => 'RightGroteskWideMedium.ttf',
                    'B' => 'RightGroteskWideMedium.ttf',
                ],
                'creatodisplaymedium' => [
                    'R' => 'CreatoDisplayMedium.ttf',
                    'B' => 'CreatoDisplayBold.ttf',
                ],
            ],
            'default_font' => 'rightgroteskwidemedium',
            'margin_top'    => 20,
            'margin_bottom' => 15,
            'margin_left'   => 10,
            'margin_right'  => 10,
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

        // ✅ Watermark
        $mpdf->SetWatermarkText('Verified by certifycars.ae', 0.05);
        $mpdf->showWatermarkText = true;

        // ✅ Headers: only first page has header
        $header = '
        <htmlpageheader name="firstpage">
            <div style="width:100%; height:80px;
                background: linear-gradient(90deg, #0D1B2A, #1B263B);
                color:white; padding:15px 20px;
                display:flex; align-items:center; justify-content:space-between; border-radius:0 0 10px 10px;">
                <div><img src="' . public_path('images/logo-white.png') . '" width="150" /></div>
                <div style="font-size:20pt; font-weight:bold;">Vehicle Inspection Report</div>
                <div style="text-align:right; font-size:10pt; line-height:14pt;">
                    CertifyCars LLC<br>
                    +971 50 123 4567<br>
                    Dubai, UAE
                </div>
            </div>
        </htmlpageheader>

        <htmlpageheader name="otherpages"></htmlpageheader>

        <sethtmlpageheader name="firstpage" value="on" show-this-page="1" />
        <sethtmlpageheader name="otherpages" value="on" />';
        $mpdf->WriteHTML($header);

        // ✅ Footer (all pages)
        $footer = '
        <table width="100%" style="font-size:9pt; color:#555; border-top:1px solid #ccc; padding-top:5px;">
            <tr>
                <td width="33%" align="left">support@certifycars.ae | +971 50 123 4567</td>
                <td width="33%" align="center">Page {PAGENO} of {nbpg}</td>
                <td width="33%" align="right">Generated on: ' . Carbon::now()->format('d-m-Y H:i') . '</td>
            </tr>
        </table>';
        $mpdf->SetHTMLFooter($footer);

        // --- COVER PAGE ---
        $vehicle = $inspectionsDetail->vehicleDetail;
        $cover = '
            <div style="text-align:center; padding-top:140px;">
                <h1 style="font-size:30pt; color:#0D1B2A; margin-bottom:10px;">Vehicle Inspection Report</h1>
                <p style="font-size:12pt; color:#555;">Prepared by CertifyCars LLC</p>
            </div>

            <table width="100%" style="border-collapse:collapse; margin-top:40px; font-size:11pt; border-radius:10px; overflow:hidden; box-shadow:0 2px 6px rgba(0,0,0,0.1);">
                <tbody>
                    <tr style="background:#f9fafb;"><td style="padding:12px; font-weight:bold;">Vehicle Make</td><td style="padding:12px;">' . ($vehicle->make ?? '-') . '</td></tr>
                    <tr><td style="padding:12px; font-weight:bold;">Model</td><td style="padding:12px;">' . ($vehicle->model ?? '-') . '</td></tr>
                    <tr style="background:#f9fafb;"><td style="padding:12px; font-weight:bold;">Year</td><td style="padding:12px;">' . ($vehicle->year ?? '-') . '</td></tr>
                    <tr><td style="padding:12px; font-weight:bold;">VIN</td><td style="padding:12px;">' . ($vehicle->vin ?? '-') . '</td></tr>
                    <tr style="background:#f9fafb;"><td style="padding:12px; font-weight:bold;">Registration No.</td><td style="padding:12px;">' . ($vehicle->registration_no ?? '-') . '</td></tr>
                    <tr><td style="padding:12px; font-weight:bold;">Inspection Date</td><td style="padding:12px;">' . Carbon::parse($inspectionsDetail->created_at)->format('d-m-Y') . '</td></tr>
                    <tr style="background:#f9fafb;"><td style="padding:12px; font-weight:bold;">Inspector</td><td style="padding:12px;">' . ($inspectionsDetail->inspector_name ?? 'N/A') . '</td></tr>
                </tbody>
            </table>

            <div style="margin-top:40px; font-size:9pt; color:#666; line-height:1.5;">
                <b>Disclaimer:</b> This inspection report reflects the condition of the vehicle at the time of inspection.
                It does not guarantee future performance. CertifyCars LLC is not liable for any hidden defects not visible during inspection.
            </div>
        ';

        $mpdf->WriteHTML($cover);
        $mpdf->AddPage();

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
            // ... other sections ...
        ];

        $html = '';
        foreach ($accordionData as $section) {
            if (empty($section['items'])) continue;

            $html .= '
            <h3 style="margin:40px 0 15px; font-size:14pt; color:#0D1B2A; background:#E9ECEF; padding:10px; border-radius:8px; text-align:center;">' . $section['title'] . '</h3>
            <table width="100%" style="border-collapse:collapse; font-size:10pt; margin-bottom:20px; border-radius:8px; overflow:hidden; box-shadow:0 1px 4px rgba(0,0,0,0.1);">
                <thead>
                    <tr style="background:#0D1B2A; color:white;">
                        <th width="70%" align="left" style="padding:10px;">Inspection Point</th>
                        <th width="30%" align="center" style="padding:10px;">Result</th>
                    </tr>
                </thead>
                <tbody>';

            $rowIndex = 0;
            foreach ($section['items'] as $item) {
                $color = '#000';
                if (stripos($item['value'], 'OK') !== false) $color = 'green';
                if (stripos($item['value'], 'Repair') !== false) $color = 'red';
                if (stripos($item['value'], 'Not Working') !== false) $color = 'orange';

                $bg = $rowIndex % 2 === 0 ? '#ffffff' : '#f9fafb';
                $html .= '
                    <tr style="background:' . $bg . ';">
                        <td style="padding:10px; border-bottom:1px solid #eee;">' . $item['label'] . '</td>
                        <td align="center" style="padding:10px; border-bottom:1px solid #eee; color:' . $color . ';">' . $item['value'] . '</td>
                    </tr>';
                $rowIndex++;
            }

            $html .= '</tbody></table>';
        }

        $mpdf->WriteHTML($html);

        return response($mpdf->Output('inspection_report.pdf', 'I'))
            ->header('Content-Type', 'application/pdf');
    }
}

