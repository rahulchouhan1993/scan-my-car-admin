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
use Imagick;
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

    public function previewPdf($id)
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
            'margin_top'    => 25,  // thoda zyada header space
            'margin_bottom' => 25,  // footer ke liye space
            'margin_left'   => 5,
            'margin_right'  => 5,
        ]);
          $coverPath = public_path('images/homebanner.jpg');
          $sliderPath = public_path('images/slideimg01.jpg');
         $logoPath = public_path('images/favicon.png');

        // ✅ Footer ke liye auto page break enable karo
        $mpdf->SetAutoPageBreak(true, 30);

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
        $headerLogo = public_path('images/logo-white.png');
        $header = '
        <htmlpageheader name="firstpage">
        <div style="width:100%; 
        background: linear-gradient(90deg, #0D1B2A, #1B263B);
        color:white; padding:5px 2px; display:flex; align-items:center; justify-content:space-between; border-radius:10px 10px 10px 10px;">

        <table width="100%" cellspacing="0" cellpadding="0" border="0">
            <tr>
                <td style="width:25%; padding:10px 10px 10px 10px;"><img src="'.$headerLogo.'" width="150" /></td>
                <td style="width:50%; padding:10px 10px 10px 10px;font-size:14pt; font-weight:bold; color:#ffffff; text-align:center">Vehicle Inspection Report</td>
                <td style="width:25%; padding:10px 10px 10px 10px;text-align:right; font-size:10pt; line-height:14pt; color:#ffffff;">
                    CertifyCars<br>
                    +971 58 558 1172<br>
                    Dubai, UAE
                </td>
            </tr>
        </table>
        </div>
           
        </htmlpageheader>

        <htmlpageheader name="otherpages"></htmlpageheader>

        <sethtmlpageheader name="firstpage" value="on" show-this-page="1" />
        <sethtmlpageheader name="otherpages" value="on" />';
        $mpdf->WriteHTML($header);

        // ✅ Footer (all pages)
        $footer = '
        <div style="width:100%; marign-top:50px;
        background: linear-gradient(90deg, #0D1B2A, #1B263B);
        color:white; padding:10px 10px; display:flex; align-items:center; justify-content:space-between; border-radius:10px 10px 10px 10px;">
            <table width="100%" style="font-size:9pt; color:#ffffff;">
                <tr>
                    <td width="33%" valign="middle" align="left">support@certifycars.ae <br> +971 50 123 4567</td>
                    <td width="33%" valign="middle" align="center">Page {PAGENO} of {nbpg}</td>
                    <td width="33%" valign="middle" align="right">Generated on: ' . Carbon::now()->format('d-m-Y H:i') . '</td>
                </tr>
        </table></div>';
        $mpdf->SetHTMLFooter($footer);
        
        // --- COVER PAGE ---
        $cover = '
            <div style="text-align:center; padding-top:20px;">
                <h1 style="font-size:14pt; color:#0D1B2A; margin-bottom:10px;">Vehicle Details</h1>
                
            </div>

            <table width="100%" border="1" style="border-collapse:collapse; margin-top:10px; font-size:11pt; border-radius:10px; overflow:hidden; box-shadow:0 2px 6px rgba(0,0,0,0.1); page-break-inside:auto;">
                <tbody>
                    
                    <tr style="background:#f9fafb;"><td style="padding:11px;"><b>Vehicle Make</b></td><td style="padding:11px; font-weight:normal; color:#5d5d5dc2 ">' . ($inspectionsDetail->vehicle_make ?? '-') . '</td></tr>
                    <tr><td style="padding:11px;"><b>Vehicle Model</b></td><td style="padding:11px; font-weight:normal; color:#5d5d5dc2">' . ($inspectionsDetail->vehicle_model ?? '-') . '</td></tr>
                    <tr style="background:#f9fafb;"><td style="padding:11px;">Year</td><td style="padding:11px; font-weight:normal; color:#5d5d5dc2">' . ($inspectionsDetail->vehicle_year ?? '-') . '</td></tr>
                    <tr><td style="padding:11px;">Fuel Type</td><td style="padding:11px; font-weight:normal; color:#5d5d5dc2">' . ($inspectionsDetail->fuel_type ?? '-') . '</td></tr>
                    <tr style="background:#f9fafb;"><td style="padding:11px;">Transmission</td><td style="padding:11px; font-weight:normal; color:#5d5d5dc2">' . ($inspectionsDetail->transmission ?? '-') . '</td></tr>
                    <tr><td style="padding:11px;">Mileage</td><td style="padding:11px; font-weight:normal; color:#5d5d5dc2">' . ($inspectionsDetail->mileage ?? '-') . '</td></tr>
                    <tr style="background:#f9fafb;"><td style="padding:11px;">Engine Capacity(L)</td><td style="padding:11px; font-weight:normal; color:#5d5d5dc2">' . ($inspectionsDetail->vehicleDetail->engine_capacity ?? '-') . '</td></tr>
                    <tr ><td style="padding:11px;">Engine Cylinders</td><td style="padding:11px; font-weight:normal; color:#5d5d5dc2">' . ($inspectionsDetail->vehicleDetail->engine_cylinders ?? '-') . '</td></tr>
                    <tr style="background:#f9fafb;"><td style="padding:11px;">Drive Type</td><td style="padding:11px; font-weight:normal; color:#5d5d5dc2">' . ($inspectionsDetail->vehicleDetail->drive_type ?? '-') . '</td></tr>
                    <tr ><td style="padding:11px;">Body Type</td><td style="padding:11px; font-weight:normal; color:#5d5d5dc2">' . ($inspectionsDetail->vehicleDetail->body_type ?? '-') . '</td></tr>
                    <tr style="background:#f9fafb;"><td style="padding:11px;">Exterior Color</td><td style="padding:11px; font-weight:normal; color:#5d5d5dc2">' . ($inspectionsDetail->vehicleDetail->exterior_color ?? '-') . '</td></tr>
                    <tr ><td style="padding:11px;">Interior Colour/Trim</td><td style="padding:11px; font-weight:normal; color:#5d5d5dc2">' . ($inspectionsDetail->vehicleDetail->interior_color ?? '-') . '</td></tr>
                    <tr style="background:#f9fafb;"><td style="padding:11px;">Number of Keys</td><td style="padding:11px; font-weight:normal; color:#5d5d5dc2">' . ($inspectionsDetail->vehicleDetail->number_keys ?? '-') . '</td></tr>
                    <tr ><td style="padding:11px;">Last Service Date</td><td style="padding:11px; font-weight:normal; color:#5d5d5dc2">' . ($inspectionsDetail->vehicleDetail->last_service_date ?? '-') . '</td></tr>
                    <tr style="background:#f9fafb;"><td style="padding:11px;">Registration Emirate</td><td style="padding:11px; font-weight:normal; color:#5d5d5dc2">' . ($inspectionsDetail->vehicleDetail->registration_emirate ?? '-') . '</td></tr>
                    <tr ><td style="padding:11px;">Warranty Status</td><td style="padding:11px; font-weight:normal; color:#5d5d5dc2">' . ($inspectionsDetail->vehicleDetail->warranty_status ?? '-') . '</td></tr>
                    <tr style="background:#f9fafb;"><td style="padding:11px;">Plate Type</td><td style="padding:11px; font-weight:normal; color:#5d5d5dc2">' . ($inspectionsDetail->vehicleDetail->plate_type ?? '-') . '</td></tr>
                    <tr ><td style="padding:11px;">Registration Number</td><td style="padding:11px; font-weight:normal; color:#5d5d5dc2">' . ($inspectionsDetail->vehicleDetail->registration_number ?? '-') . '</td></tr>
                    <tr style="background:#f9fafb;"><td style="padding:11px;">Chasis Number</td><td style="padding:11px; font-weight:normal; color:#5d5d5dc2">' . ($inspectionsDetail->vehicleDetail->chasis_no ?? '-') . '</td></tr>
                    
                </tbody>
            </table>

            
        ';

        // $mpdf->WriteHTML($cover);
        // $mpdf->AddPage();

        $mpdf->WriteHTML($cover);
        // ✅ Next pages without header gap
        $mpdf->AddPage('', '', '', '', '', 5, 5, 4, 30, 10, 10);

        $termsContent = '<div style="margin:10px 0; font-size:11pt; color:#192735; line-height:1.6;">

            <h3 style="font-size:14pt; color:#0D1B2A; margin-bottom:5px; text-align:center;">
                Terms & Conditions
            </h3>

            <p>
                By booking or confirming a vehicle inspection (“Service”) with <b>Certify Cars – UAE</b> online, you agree to the following Terms & Conditions:
            </p>

            <h4 style="margin:0 0 5px 0; font-size:13pt; color:#0D1B2A;">1. Authorisation</h4>
            <p style="0 0 10px 0; color:#5d5d5dc2; font-size:11pt; font-weight:normal">
                You authorise <b>Certify Cars – UAE</b> to inspect and, if safe, test drive the vehicle (“Vehicle”) for the purpose of delivering the Service. If the Vehicle belongs to a third party, you confirm that you have their permission for this inspection.
            </p>

            <h4 style="margin:0 0 5px 0; font-size:13pt; color:#0D1B2A;">2. Scope of Inspection</h4>
            <ul style="margin:0 0 10px 25px; padding:0; color:#5d5d5dc2; font-size:11pt; font-weight:normal">
                <li>The Service involves a full check-up of the Vehicle, including major visible components, basic mechanical functions, and a limited test drive.</li>
                <li>Certain inspections may require RTA clearances or approvals.</li>
                <li>While we perform a thorough inspection, some issues may still be missed or intentionally hidden by the owner.</li>
                <li>Certify Cars – UAE does not accept responsibility for any issues not detected during the inspection.</li>
            </ul>

            <h4 style="margin:0 0 5px 0; font-size:13pt; color:#0D1B2A;">3. Inspection Report</h4>
            <ul style="margin:0 0 10px 25px; padding:0;color:#5d5d5dc2; font-size:11pt; font-weight:normal">
                <li>The inspection report (“Report”) reflects the inspector’s opinion at the time of inspection.</li>
                <li>The Report is informational only and does not constitute advice to buy, sell, or maintain the Vehicle.</li>
            </ul>

            <h4 style="margin: 0 0 5px 0; font-size:13pt; color:#0D1B2A;">4. Risk & Liability</h4>
            <ul style="margin:0 0 10px 25px; padding:0;color:#5d5d5dc2; font-size:11pt; font-weight:normal">
                <li>The Service is entirely at your own risk.</li>
                <li><b>Certify Cars – UAE</b>, its staff, or representatives accept no liability for:</li>
                <ul style="margin:5px 0 10px 25px; padding:0;">
                <li>Any mismatches in the Vehicle</li>
                <li>Any damages during or after inspection</li>
                <li>Any costs or charges arising from the inspection or the Report</li>
                </ul>
            </ul>

            <h4 style="margin:0 0 5px 0; font-size:13pt; color:#0D1B2A;">5. Fine</h4>
            <ul style="margin:0 0 10px 25px; padding:0;color:#5d5d5dc2; font-size:11pt; font-weight:normal">
                <li>If the customer fails to comply with these Terms & Conditions, including providing false information about the Vehicle, the customer agrees to pay a fine of AED 1,500.</li>
                <li>This fine represents the maximum payable amount under such circumstances.</li>
            </ul>

            <h4 style="margin:0 0 5px 0; font-size:13pt; color:#0D1B2A;">6. Governing Law</h4>
            <p style="margin:0 0 10px 0;color:#5d5d5dc2; font-size:11pt; font-weight:normal">
                These Terms are governed by the laws of the United Arab Emirates. Any disputes will be resolved under UAE jurisdiction.
            </p>

           <p style="margin: 0 0 10px 0; font-size:10pt; color:#555;">
                <b>Disclaimer:</b> This inspection report reflects the condition of the vehicle at the time of inspection. It does not guarantee future performance. CertifyCars LLC is not liable for any hidden defects not visible during inspection.
            </p>

            </div>';
        $mpdf->WriteHTML($termsContent);
        $mpdf->AddPage();

        // --- BODY CONTENT ---
        $accordionData = [
            [
                "title" => "Body Details",
                "items" => $inspectionsDetail->bodyDetail
                    ? collect($inspectionsDetail->bodyDetail->toArray())->map(function ($item, $key) {
                        if($key!='id' && $key!='inspection_request_id' && $key!='created_at' && $key!='updated_at' && $key!='request_id'){
                            if($item){
                                return ["label" => ucfirst(str_replace('_', ' ', $key)), "value" => ($item) ? 'Need Repair': 'Okay' , "color" => ($item) ? 'red': 'green'];
                            }
                        }
                        
                    })->toArray()
                    : [],
            ],
            [
                "title" => "Engine Bay",
                "items" => $inspectionsDetail->engineDetails
                    ? collect($inspectionsDetail->engineDetails->toArray())->map(function ($item, $key) {
                         if($key!='id' && $key!='inspection_request_id' && $key!='created_at' && $key!='updated_at' && $key!='request_id'){
                            if($item){
                                return ["label" => ucfirst(str_replace('_', ' ', $key)), "value" => $item];
                            }
                        }
                    })->toArray()
                    : [],
            ],
            [
                "title" => "Transmission & Drivetrain",
                "items" => $inspectionsDetail->transmissionDetails
                    ? collect($inspectionsDetail->transmissionDetails->toArray())->map(function ($item, $key) {
                        if($key!='id' && $key!='inspection_request_id' && $key!='created_at' && $key!='updated_at' && $key!='request_id'){
                            if($item){
                                return ["label" => ucfirst(str_replace('_', ' ', $key)), "value" => $item];
                            }
                        }
                    })->toArray()
                    : [],
            ],
            [
                "title" => "Glass & Mirrors",
                "items" => $inspectionsDetail->glassDetails
                    ? collect($inspectionsDetail->glassDetails->toArray())->map(function ($item, $key) {
                        if($key!='id' && $key!='inspection_request_id' && $key!='created_at' && $key!='updated_at' && $key!='request_id'){
                            if($item){
                                return ["label" => ucfirst(str_replace('_', ' ', $key)), "value" => $item];
                            }
                        }
                    })->toArray()
                    : [],
            ],
            [
                "title" => "Cluster & Lamps",
                "items" => $inspectionsDetail->clusterDetails
                    ? collect($inspectionsDetail->clusterDetails->toArray())->map(function ($item, $key) {
                        if($key!='id' && $key!='inspection_request_id' && $key!='created_at' && $key!='updated_at' && $key!='request_id'){
                            if($item){
                                return ["label" => ucfirst(str_replace('_', ' ', $key)), "value" => $item];
                            }
                        }
                    })->toArray()
                    : [],
            ],
            [
                "title" => "Suspension & Steering",
                "items" => $inspectionsDetail->suspensionDetails
                    ? collect($inspectionsDetail->suspensionDetails->toArray())->map(function ($item, $key) {
                        if($key!='id' && $key!='inspection_request_id' && $key!='created_at' && $key!='updated_at' && $key!='request_id'){
                            if($item){
                                return ["label" => ucfirst(str_replace('_', ' ', $key)), "value" => $item];
                            }
                        }
                    })->toArray()
                    : [],
            ],
            [
                "title" => "Brakes",
                "items" => $inspectionsDetail->brakesDetails                    
                    ? collect($inspectionsDetail->brakesDetails->toArray())->map(function ($item, $key) {
                        if($key!='id' && $key   !='inspection_request_id' && $key!='created_at' && $key!='updated_at' && $key!='request_id'){
                            if($item){
                                return ["label" => ucfirst(str_replace('_', ' ', $key)), "value" => $item];
                            }
                        }
                    })->toArray()
                    : [],
            ],
            [
                "title" => "Interior General",
                "items" => $inspectionsDetail->interiorDetails
                    ? collect($inspectionsDetail->interiorDetails->toArray())->map(function ($item, $key) {
                        if($key!='id' && $key   !='inspection_request_id' && $key!='created_at' && $key!='updated_at' && $key!='request_id'){
                            if($item){
                                return ["label" => ucfirst(str_replace('_', ' ', $key)), "value" => $item];
                            }
                        }
                    })->toArray()
                    : [],
            ],
            [
                "title" => "Seats & Restraints",
                "items" => $inspectionsDetail->seatDetails
                    ? collect($inspectionsDetail->seatDetails->toArray())->map(function ($item, $key) {
                        if($key!='id' && $key!='inspection_request_id' && $key!='created_at' && $key!='updated_at' && $key!='request_id'){
                            if($item){
                                return ["label" => ucfirst(str_replace('_', ' ', $key)), "value" => $item];
                            }
                        }
                    })->toArray()
                    : [],
            ],
            [
                "title" => "HVAC & Infotainment",
                "items" => $inspectionsDetail->hvacDetails
                    ? collect($inspectionsDetail->hvacDetails->toArray())->map(function ($item, $key) {
                        if($key!='id' && $key!='inspection_request_id' && $key!='created_at' && $key!='updated_at' && $key!='request_id'){
                            if($item){
                                return ["label" => ucfirst(str_replace('_', ' ', $key)), "value" => $item];
                            }
                        }
                    })->toArray()
                    : [],
            ],
            [
                "title" => "Cooling & Fuel System",
                "items" => $inspectionsDetail->coolingFuelDetails
                    ? collect($inspectionsDetail->coolingFuelDetails->toArray())->map(function ($item, $key) {
                        if($key!='id' && $key!='inspection_request_id' && $key!='created_at' && $key!='updated_at' && $key!='request_id'){
                            if($item){
                                return ["label" => ucfirst(str_replace('_', ' ', $key)), "value" => $item];
                            }
                        }
                    })->toArray()
                    : [],
            ],
            [
                "title" => "Electrical Systems & Lighting",
                "items" => $inspectionsDetail->coolingFuelDetails
                    ? collect($inspectionsDetail->coolingFuelDetails->toArray())->map(function ($item, $key) {
                        if($key!='id' && $key!='inspection_request_id' && $key!='created_at' && $key!='updated_at' && $key!='request_id'){
                            if($item){
                                return ["label" => ucfirst(str_replace('_', ' ', $key)), "value" => $item];
                            }
                        }
                    })->toArray()
                    : [],
            ],
            [
                "title" => "Tyres & Wheels",
                "items" => $inspectionsDetail->tyresDetails
                    ? collect($inspectionsDetail->tyresDetails->toArray())->map(function ($item, $key) {
                        if($key!='id' && $key!='inspection_request_id' && $key!='created_at' && $key!='updated_at' && $key!='request_id'){
                            if($item){
                                return ["label" => ucfirst(str_replace('_', ' ', $key)), "value" => $item];
                            }
                        }
                    })->toArray()
                    : [],
            ],
            [
                "title" => "Performance & Road Test",
                "items" => $inspectionsDetail->performanceRoadTestDetails
                    ? collect($inspectionsDetail->performanceRoadTestDetails->toArray())->map(function ($item, $key) {
                        if($key!='id' && $key!='inspection_request_id' && $key!='created_at' && $key!='updated_at' && $key!='request_id'){
                            if($item){
                                return ["label" => ucfirst(str_replace('_', ' ', $key)), "value" => $item];
                            }
                        }
                    })->toArray()
                    : [],
            ],
            
        ];

        $html = '';
        $svgImage = $inspectionsDetail->vehicleDetail->svg_image;
        $counter = 1;
        foreach ($accordionData as $section) {
            if (empty($section['items'])) continue;

            $html = '
            <h3 style="margin:40px 0 15px; font-size:14pt; color:#0D1B2A; background:#E9ECEF; padding:10px; border-radius:8px; text-align:center;">'.$counter.'. ' . $section['title'] . '</h3>
            <table border="1" width="100%" style="border-collapse:collapse; font-size:10pt; margin-bottom:20px; border-radius:8px; overflow:hidden; box-shadow:0 1px 4px rgba(0,0,0,0.1);">
                
                <tbody>';

            $rowIndex = 0;
            $innerCoutner = 1;
            foreach ($section['items'] as $item) {
                
                if(empty($item)) continue;
                $colorName = '#000';
                if(isset($item['color']) && $item['color']=='red'){
                    $colorName = 'red';
                } 
                 // Skip empty values in 'Body Details' section
                if($section['title']=='Body Details'){
                    if(!empty($item) && !$item['value']){
                        continue;
                    }
                    
                }
                if($item['value']=='Bad'){
                    $colorName = 'red';
                }
                $bg = $rowIndex % 2 === 0 ? '#ffffff' : '#f9fafb';
                $html .= '
                    <tr style="background:' . $bg . ';">
                        <td style="padding:10px; font-weight:bold;">
                        '.$counter.'.'.$innerCoutner.' &rarr; '.$item['label'] . '</td>
                        <td style="padding:10px; color:' . $colorName . ';">' . $item['value'] . '</td>
                    </tr>';
                $rowIndex++; $innerCoutner++;
                
            }

            $html .= '</tbody></table>';
            $mpdf->WriteHTML($html);
            $mpdf->AddPage();  
            $counter++;

            if($svgImage!=''){
                $img = new Imagick();
                $img->readImageBlob($svgImage);
                $img->setImageFormat("png24");
                file_put_contents("images/test.png", $img->getImageBlob());
                $bodyImage = public_path('images/test.png');
                //$bodyImage = public_path('');
                $mpdf->WriteHTML('<h3 style="margin:40px 0 15px; font-size:14pt; color:#0D1B2A; background:#E9ECEF; padding:10px; border-radius:8px; text-align:center;">Draft Paint</h3><div style="text-align:center; margin-top:20px;"><img src="'.$bodyImage.'" style="width:40%; height:auto;"/></div>
               
                <div style="margin-top:20px;">
                <table width="100%" cellpadding="6" cellspacing="0" style="font-size:11pt; color:#192735; margin:auto;">
                  <tr>
                    <td>
                      <table cellpadding="2" cellspacing="0" border="0" style="border-collapse:collapse;">
                        <tr>
                          <td width="15" height="15">
                          <img src="images/original.png" width="15" style="border:none" />
                          
                          </td>
                          <td style="padding:0 0 0 5px; color:#192735ba;">Original Paint</td>
                        </tr>
                      </table>
                      
                    </td>
                    <td>
                      <table cellpadding="2" cellspacing="0" border="0" style="border-collapse:collapse;">
                        <tr>
                          <td width="15" height="15">
                          <img src="images/portion.png" width="15" style="border:none" />
                          
                          </td>
                          <td  style="padding:0 0 0 5px; color:#192735ba;">Portion Repaint</td>
                        </tr>
                      </table>
                      
                    </td>
                    <td>
                      <table cellpadding="2" cellspacing="0" border="0" style="border-collapse:collapse;">
                        <tr>
                          <td width="15" height="15">
                            <img src="images/multi.png" width="15" style="border:none" />
                          </td>
                          <td style="padding:0 0 0 5px; color:#192735ba;"> Multi Scratches</td>
                        </tr>
                      </table>
                     
                    </td>
                    <td>
                      <table cellpadding="2" cellspacing="0" border="0" style="border-collapse:collapse;">
                        <tr>
                          <td  width="15" height="15">
                          <img src="images/panel.png" width="15" style="border:none" />
                          </td>
                          <td style="padding:0 0 0 5px; color:#192735ba;">Panel Replaced</td>
                        </tr>
                      </table>
                      
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <table cellpadding="2" cellspacing="0" border="0" style="border-collapse:collapse;">
                        <tr>
                          <td width="15" height="15">
                          <img src="images/faded.png" width="15" style="border:none" />
                          </td>
                          <td style="padding:0 0 0 5px; color:#192735ba;">Faded</td>
                        </tr>
                      </table>
                      
                    </td>
                    <td>
                      <table cellpadding="2" cellspacing="0" border="0" style="border-collapse:collapse;">
                        <tr>
                          <td width="15" height="15">
                          <img src="images/notavai.png" width="15" style="border:none" />
                          </td>
                          <td style="padding:0 0 0 5px; color:#192735ba;">Not Available</td>
                        </tr>
                      </table>
                      
                    </td>
                    <td>
                      <table cellpadding="2" cellspacing="0" border="0" style="border-collapse:collapse;">
                        <tr>
                          <td width="15" height="15">
                          <img src="images/foiled.png" width="15" style="border:none" />
                          </td>
                          <td style="padding:0 0 0 5px; color:#192735ba;">Foiled</td>
                        </tr>
                      </table>
                      
                    </td>
                    <td></td>
                  </tr>
                </table>
              </div>
              <hr>
                <table width="100%" style="border-collapse:collapse; font-size:10pt; margin-bottom:20px; border-radius:8px; overflow:hidden; box-shadow:0 1px 4px rgba(0,0,0,0.1);">
                
                <tbody>
               
                <tr style="background:#f9fafb;">
                    <td style="padding:10px; font-weight:bold;">Engine Comment</td>
                    <td style="padding:10px; color:#000;">'.$inspectionsDetail->engineDetails->comments_engine.'</td>
                </tr>
                <tr style="background:#ffffff;">
                    <td style="padding:10px; font-weight:bold;">Suspension & Steering Comment</td>
                    <td style="padding:10px; color:#000;">'.$inspectionsDetail->suspensionDetails->comments_suspension.'</td>
                </tr>
                <tr style="background:#ffffff;">
                    <td style="padding:10px; font-weight:bold;">Normal Condition</td>
                    <td style="padding:10px; color:#000;">'.$inspectionsDetail->over_comments.'</td>
                </tr>
                </tbody>
                </table>


                ');
                $mpdf->AddPage();
                $svgImage = '';
            } 
        }
         $vehicleImages = json_decode($inspectionsDetail->vehicleDetail->images);
         if(count($vehicleImages)>0){
            $htmlImages ="
            <h3 style='margin:40px 0 15px; font-size:14pt; color:#0D1B2A; background:#E9ECEF; padding:10px; border-radius:8px; text-align:center;'>Vehicle Images</h3>";
            foreach($vehicleImages as $k =>$v){
                $imgPath = public_path($v);
                $htmlImages .="<div style='margin-top:25px'>
                <div style='display:block; text-align:center; margin-bottom:20px; padding:10px 10px 10px 10px; border-radius:10px 10px 10px 10px; box-shadow:0 0 15px 5px rgba(0,0,0,0.2); height:300px'>
                    <img src='{$imgPath}' alt='cover' style='width:100%; height:300px; object-fit:cover; border-radius:8px 8px 8px 8px; display:block;' />
                </div>
                </div>";
            }
            $mpdf->WriteHTML($htmlImages);
         }
        
       
        // $html ="
        // <div style='position:relative; overflow:hidden;'>
        //     <div style='text-align:center; padding-bottom:20px'>
        //         <img src='$logoPath' alt='logo' style='position:absolute; max-width:20mm; height:auto; z-index:2; display:block;' />
        //     </div>
        //     <div style='display:block; text-align:center; padding:10px 10px 10px 10px; border-radius:10px 10px 10px 10px; box-shadow:0 0 15px 5px rgba(0,0,0,0.2); height:450px'>
        //         <img src='file://$coverPath' alt='cover' style='width:100%; height:450px; object-fit:cover; border-radius:8px 8px 8px 8px; display:block;' />
        //     </div>

        //     <div style='text-align:center; z-index:2; padding-top:30px '>
        //       <div style='font-size:30pt; font-weight:700; line-height:0.95; color:#D72638;'>Vehicle Inspection Report</div>
        //       <div style='margin-top:3mm; font-size:11pt; color:#444;'>https://certifycars.ae/</div>
        //     </div>
        //  </div>

        //  <div style='margin-top:50px'>
        //  <div style='display:block; text-align:center; margin-bottom:20px; padding:10px 10px 10px 10px; border-radius:10px 10px 10px 10px; box-shadow:0 0 15px 5px rgba(0,0,0,0.2); height:300px'>
        //      <img src='file://$sliderPath' alt='cover' style='width:100%; height:300px; object-fit:cover; border-radius:8px 8px 8px 8px; display:block;' />
        //      </div>


        //      <div style='display:block; text-align:center; margin-bottom:20px; padding:10px 10px 10px 10px; border-radius:10px 10px 10px 10px; box-shadow:0 0 15px 5px rgba(0,0,0,0.2); height:300px'>
        //      <img src='file://$sliderPath' alt='cover' style='width:100%; height:300px; object-fit:cover; border-radius:8px 8px 8px 8px;display:block;' />
        //      </div>
        //  </div>
        // ";
        // $mpdf->WriteHTML($html);

        return response($mpdf->Output('inspection_report.pdf', 'I'))
            ->header('Content-Type', 'application/pdf');
    }
}

