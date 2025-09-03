import React, { useEffect, useRef, useState } from "react";

/**
 * CarInspectionImage
 *
 * Props:
 *  - inspectionId (required) : id to save mapping for (used in save endpoint)
 *  - initialMapping (optional): mapping previously saved { partId: { label, color } }
 *  - onSaveSuccess (optional): callback after successful save
 *
 * Notes:
 *  - Add this component into a page where you pass inspectionId.
 *  - Ensure your server route for saving exists (example: POST /api/inspections/:id/svg).
 */

const COLOR_OPTIONS = [
  { label: "Original Paint", color: "#FFFFFF" },   // white
  { label: "Portion Repaint", color: "#FF0000" },  // yellow
  // { label: "Total Repainted", color: "#FF0000" },  // red
  // { label: "Multi Dents", color: "#C0C0C0" },      // silver
  { label: "Multi Scratches", color: "#00FF00" },  // green
  { label: "Panel Replaced", color: "#0000FF" },   // blue
  // { label: "Damaged", color: "#FFA500" },          // orange
  { label: "Faded", color: "#00FFFF" },            // cyan
  { label: "Not Available", color: "#ADD8E6" },    // light blue
  // { label: "Repainted", color: "#800000" },        // maroon
  { label: "Foiled", color: "#000000" },           // black
];



function CarInspectionImage({
  inspectionId,
  initialMapping = {},
  onSaveSuccess = {},
  onSvgChange,
  svgImage = null
}) {
   
    const containerRef = useRef(null);
    const [mapping, setMapping] = useState(() => ({ ...initialMapping })); 
    const [selectedPart, setSelectedPart] = useState(null); // partId
    const [isSaving, setIsSaving] = useState(false);
    const listenersRef = useRef([]);
    const svgMarkup = svgImage || `<svg width="531" height="708" viewBox="0 0 531 708" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_439_417)">
<path d="M236.872 187.142L257.064 186.409L282.908 186.739L306.186 188.947L328.467 193.217L347.006 199.185L359.165 204.396L368.014 209.041L364.329 222.033L357.782 249.305L346.497 290.162L339.604 289.22L317.356 285.948L289.874 283.985L256.502 283.331L236.217 283.985L208.735 285.948L183.5 291.298L169.399 245.379L164.957 227.695L160.482 208.678L167.511 204.81L178.635 199.575L198.266 193.031L213.97 189.76L236.872 187.142Z" fill="#fff" stroke="black" stroke-width="1.30869" data-part="part_0" style="cursor: pointer; transition: fill 160ms;"></path>
<path d="M528.709 210.699H530.018V240.144L524.783 457.386L524.129 458.695L519.548 458.041L502.535 452.806V433.176L505.807 222.477L506.461 217.897L528.709 210.699ZM526.746 213.316L508.424 219.205L507.77 219.86L505.807 338.95L504.498 423.36V451.497L522.165 456.732H522.82L524.783 382.137L528.709 219.205V213.316H526.746Z" fill="black" data-part="part_1" style="cursor: pointer; transition: fill 160ms;"></path>
<path d="M0 210.699L7.19778 212.662L23.5564 217.897L24.2107 230.983L27.4824 441.682V452.806L8.50647 458.695H5.23475L1.96303 327.172L0 245.379V210.699ZM1.30869 213.316V224.44L6.54344 441.682L7.19778 456.732L24.8651 451.497L25.5194 450.843V431.867L22.2477 220.514L18.976 218.551L3.27172 213.316H1.30869Z" fill="black" data-part="part_2" style="cursor: pointer; transition: fill 160ms;"></path>
<path d="M176.044 632.211C176.044 636.524 356.576 637.555 356.576 631.614L366.032 657.244L370.613 658.553L371.921 678.183L367.341 695.196L364.724 702.394H168.42L161.223 679.492L160.568 661.171L167.112 657.244L176.044 632.211Z" fill="white" stroke="black" stroke-width="1.30869" data-part="part_3" style="cursor: pointer; transition: fill 160ms;"></path>
<path d="M483.559 467.201H491.411L500.572 469.165L511.042 474.399L517.585 480.288L522.166 486.832L525.437 494.03L527.4 503.845V510.388L525.437 520.203L520.857 529.364L514.968 535.908L509.733 540.488L501.881 544.414L495.337 546.377L484.868 547.031L474.398 545.068L465.238 540.488L458.694 534.599L454.114 529.364L449.533 520.203L447.57 510.388V503.845L449.533 494.03L454.114 484.869L459.349 478.325L465.892 473.091L474.398 469.165L483.559 467.201ZM486.831 469.165L478.324 470.473L471.127 473.091L463.929 477.671L457.385 484.214L452.805 492.067L450.188 501.227V512.351L452.151 520.203L456.731 528.71L463.275 535.908L470.472 540.488L478.979 543.76L482.251 544.414H492.72L500.572 542.451L509.079 537.871L515.622 531.982L519.548 526.747L522.82 520.203L524.783 513.66V500.573L522.166 492.067L518.894 486.177L514.313 480.288L507.77 475.054L499.263 471.128L494.029 469.819L486.831 469.165Z" fill="black" data-part="part_4" style="cursor: pointer; transition: fill 160ms;"></path>
<path d="M480.936 110.532H495.332L503.838 113.149L510.381 116.421L518.234 123.619L522.814 129.508L526.086 136.705L528.049 146.521V153.064L526.74 160.916L523.468 168.768L519.542 174.657L514.307 180.547L507.11 185.127L499.258 188.399L492.714 189.707H483.553L473.084 187.09L464.577 182.51L458.034 176.62L453.454 170.077L450.182 162.879L448.873 158.299L448.219 153.064V146.521L450.182 136.705L454.762 127.545L460.651 121.001L465.886 116.421L473.738 112.495L480.936 110.532ZM482.899 112.495L475.047 114.458L466.54 119.038L458.688 126.236L453.454 135.397L451.49 141.286L450.836 144.558V155.681L453.454 164.842L458.034 172.694L465.232 179.892L474.393 185.127L481.59 187.09L488.788 187.744L497.949 186.436L505.801 183.164L511.69 179.238L514.962 176.62L520.851 168.768L524.123 161.571L525.431 156.336V143.249L522.16 133.434L517.579 126.236L511.69 120.347L502.529 115.112L496.64 113.149L493.368 112.495H482.899Z" fill="black" data-part="part_5" style="cursor: pointer; transition: fill 160ms;"></path>
<path d="M37.2974 467.201H47.1126L55.619 469.165L64.7798 473.745L72.632 480.943L77.2124 487.486L80.4841 495.338L81.7928 501.227V513.006L79.8298 520.858L75.9037 528.71L70.6689 535.253L63.4712 541.142L54.9647 545.068L49.7299 546.377H34.68L26.1736 543.76L18.9758 539.834L11.1237 532.636L6.54325 525.438L3.27153 516.932L2.61719 513.66V500.573L4.58022 492.721L9.16063 484.214L15.0497 477.671L19.6301 473.745L28.7909 469.165L37.2974 467.201ZM41.2235 469.165L32.717 470.473L24.2105 473.745L17.0128 478.98L11.1237 485.523L6.54325 494.684L4.58022 502.536V511.043L6.54325 519.549L10.4693 527.401L16.3584 534.599L24.8649 540.488L33.3713 543.76L36.6431 544.414H47.1126L56.9277 541.797L64.7798 537.216L71.9776 530.018L75.9037 523.475L78.5211 516.932L79.8298 509.734V503.845L77.8667 494.684L73.9407 486.832L68.7059 480.288L62.1625 475.054L55.619 471.782L49.0756 469.819L41.2235 469.165Z" fill="black" data-part="part_6" style="cursor: pointer; transition: fill 160ms;"></path>
<path d="M34.0316 111.945H49.0815L57.588 114.563L65.4401 119.143L71.9835 125.032L77.8726 134.193L80.49 142.045L81.1443 145.317V157.095L78.527 166.91L74.6009 174.108L68.7118 180.651L62.1684 185.886L53.0076 189.812L46.4641 191.121H36.649L26.1795 188.503L18.9817 184.577L12.4383 178.688L7.85784 173.453L3.27744 163.638L1.96875 157.749V144.662L4.58613 135.502L8.51219 128.304L15.71 120.452L22.9077 115.871L28.7968 113.254L34.0316 111.945ZM35.9946 113.908L26.8338 116.526L18.9817 121.106L13.7469 125.686L7.85784 134.193L4.58613 143.354L3.93178 147.28V155.786L6.54916 165.601L10.4752 172.799L17.673 180.651L26.1795 185.886L34.6859 188.503L41.8837 189.158L51.0445 187.849L58.8967 184.577L66.0944 179.997L71.9835 173.453L75.9096 166.91L78.527 158.404L79.1813 154.478V148.588L77.2183 139.428L72.6379 130.267L66.7488 123.723L62.1684 119.797L54.3163 115.871L46.4641 113.908H35.9946Z" fill="black" data-part="part_7" style="cursor: pointer; transition: fill 160ms;"></path>
<path d="M106.669 596.636L125.751 596.51L128.047 598.326L128.298 616.114L102.454 616.743L103.262 605.593L104.625 598.703L106.669 596.636Z" fill="#fff" stroke="black" stroke-width="1.30869" data-part="part_8" style="cursor: pointer; transition: fill 160ms;"></path>
<path d="M80.2764 50.8314L84.4099 52.3475L96.8424 58.8909L100.114 61.5083L102.077 79.8299L102.249 86.4434L90.9533 79.8299L83.7555 77.2126L81.1381 54.3105L80.2764 50.8314Z" fill="#fff" stroke="black" stroke-width="1.30869" data-part="part_9" ></path>
<path d="M450.151 50.9603L448.954 51.9333L448.3 62.4028L446.991 75.4897L445.682 78.1071L437.176 80.7244L429.978 84.6505H427.454L427.94 77.8636L429.978 61.7485L440.447 55.205L450.151 50.9603Z" fill="#fff" stroke="black" stroke-width="1.30869" data-part="part_10" style="cursor: pointer; transition: fill 160ms;"></path>
<path d="M416.162 429.25L418.78 430.558L420.088 435.139V452.152L418.125 457.386L416.162 458.041L414.199 456.078L412.891 447.571V439.719L414.199 431.213L416.162 429.25ZM416.162 431.867L414.854 437.756V448.88L416.162 455.423L417.471 454.769L418.78 444.954L418.125 435.139L416.817 431.867H416.162Z" fill="black" data-part="part_11" style="cursor: pointer; transition: fill 160ms;"></path>
<path d="M326.292 71.0611C326.292 71.0611 309.749 69.6019 309.51 69.6019C309.27 69.6019 276.052 68.6361 276.052 68.6361L200.156 70.6979L207.719 57.6071L207.959 54.0102L206.999 51.1331L205.082 49.6948L177.029 49.2152L149.583 48.464L148.729 42.3315L149.221 38.6462L150.449 31.7671L152.66 20.4659L155.117 11.8672L157.352 6.80518L159.281 5.02406L161.21 4.43057H326.095L367.028 3.98169L370.896 8.23689L372.83 13.6522L374.377 20.6151L375.925 26.4178L377.472 32.994L378.191 42.2621L377.712 48.0164L374.835 48.7355H369.56H359.01L347.742 48.9757L338.39 49.2152L327.361 49.4547H320.408L318.011 51.3732L318.25 54.4898L326.109 71.4125" fill="white" data-part="part_12" style="cursor: pointer; transition: fill 160ms;"></path>
<path d="M326.292 71.0611C326.292 71.0611 309.749 69.6019 309.51 69.6019C309.27 69.6019 276.052 68.6361 276.052 68.6361L200.156 70.6979L207.719 57.6071L207.959 54.0102L206.999 51.1331L205.082 49.6948L177.029 49.2152L149.583 48.464L148.729 42.3315L149.221 38.6462L150.449 31.7671L152.66 20.4659L155.117 11.8672L157.352 6.80518L159.281 5.02406L161.21 4.43057H326.095L367.028 3.98169L370.896 8.23689L372.83 13.6522L374.377 20.6151L375.925 26.4178L377.472 32.994L378.191 42.2621L377.712 48.0164L374.835 48.7355H369.56H359.01L347.742 48.9757L338.39 49.2152L327.361 49.4547H320.408L318.011 51.3732L318.25 54.4898L326.109 71.4125" stroke="black" stroke-width="1.30869" data-part="part_13" style="cursor: pointer; transition: fill 160ms;"></path>
<path d="M211.835 71.2509L193.496 72.4948L185.491 75.7135L180.238 79.4648L175.987 83.4661L171.735 90.4689L168.484 100.223L166.733 109.726L162.982 136.236L160.481 161.997L158.98 184.505L160.606 207.514L175.737 199.261L189.242 194.509L205.248 190.257L219.253 187.756L234.259 186.006L239.511 185.744L245.013 185.255H251.515H258.267L265.27 185.256L277.775 185.505L286.528 185.756L293.531 186.506L303.284 187.506L313.038 188.757L329.294 192.258L344.55 197.26L360.056 203.513L368.172 207.99L368.309 190.508L367.558 167.749L365.558 144.99L361.556 114.728L357.305 93.4704L351.303 83.4661L346.551 79.4648L339.048 74.713L331.295 72.712L317.54 71.4615L301.284 70.4617L284.777 69.9611L261.019 69.7112L241.261 70.2111L223.505 70.7117L211.835 71.2509Z" fill="white" stroke="black" stroke-width="1.30869" data-part="part_14" style="cursor: pointer; transition: fill 160ms;"></path>
<path d="M300.074 486.586L310.696 484.656L323.188 482.446L335.95 480.199L344.083 478.501L342.718 474.152L340.88 467.163L339.437 461.25L338.54 453.999L337.788 444.601L337.194 431.313L336.756 413.999L336.829 401.251L336.921 385.149L337.325 361.802L338.913 341.951L340.461 329.48L342.061 315.661L345.309 301.433L346.772 291.375L329.874 289.023L308.47 286.27L284.425 285.004L259.253 284.108L233.319 284.711L208.883 286.449L189.322 289.72L183.795 290.633L186.228 305.11L188.411 317.523L189.824 330.838L191.023 344.582L192.003 359.388L192.612 386.396L191.504 415.737L189.947 441.789L189.423 451.177L187.469 464.313L183.157 477.24L186.216 478.158L192.821 479.892L206.892 483.107L218.148 484.809L232.602 486.808L247.034 488.106L262.927 488.78L278.221 488.353L288.683 487.957L300.074 486.586Z" fill="white" stroke="black" stroke-width="1.30869" data-part="part_15" ></path>
<path d="M499.113 348.106V378.811L498.927 414.914L498.183 444.875L497.811 448.597L495.577 450.086L493.345 450.645L485.714 451.016L474.921 452.506L468.222 453.808L461.708 455.669L455.009 458.46L449.985 461.252L444.96 464.415L439.749 467.951L433.981 471.859L429.701 474.464L426.164 475.581L420.396 475.767L412.394 475.953H408.113L401.972 475.022L396.762 473.906L391.551 472.79L384.852 471.114L378.897 469.068H378.71L368.476 465.159L360.845 461.81L352.843 458.274L347.633 456.413L346.888 443.386L346.702 431.662L346.144 413.797L345.958 400.026L345.586 369.879V357.411L350.803 356.766L356.371 355.854L363.559 354.64L370.544 353.425L377.732 352.21L386.134 350.59L396.866 348.768L404.762 347.553L413.367 346.642L421.668 345.731L425.01 345.63H435.436L448.901 345.731L459.227 345.933L465.301 346.237H469.148L475.526 346.642L480.285 347.047L485.65 347.452L488.586 347.756L494.356 347.958L499.113 348.106Z" fill="white" stroke="black" stroke-width="1.30869" data-part="part_16" style="cursor: pointer; transition: fill 160ms;"></path>
<path d="M415.512 430.706L418.286 432.015L419.673 436.595V453.608L417.592 458.843L415.512 459.497L413.43 457.534L412.043 449.028V441.176L413.43 432.669L415.512 430.706ZM415.512 433.324L414.124 439.213V450.336L415.512 456.88L416.899 456.226L418.286 446.41L417.592 436.595L416.205 433.324H415.512Z" fill="black" data-part="part_17" style="cursor: pointer; transition: fill 160ms;"></path>
<path d="M493.668 212.827L497.314 215.259L498.704 217.516L501.135 221.684V245.65L500.441 288.371L500.093 328.138L499.919 339.948L499.332 347.656L493.38 347.441L486.775 347.108L479.97 346.574L474.166 346.173L468.028 345.774L462.69 345.373L457.887 344.973L452.817 345.039H446.88H429L424.597 345.106L414.59 345.973L407.118 346.774L401.248 347.441L394.643 348.509L388.839 349.376L376.297 351.778L367.157 353.379L359.952 354.58L351.746 355.981L345.675 356.982L346.075 348.509L346.742 339.235L347.61 331.096L349.211 323.357L350.946 315.419L354.014 305.812L356.416 298.206L362.887 284.263L368.491 273.389L373.628 263.716L378.232 255.843L384.704 245.603L389.374 238.731L394.511 231.593L399.114 226.055L403.184 221.785L407.187 218.249L410.523 215.648L412.924 214.046L417.861 213.113L426.401 211.311L435.474 210.177L440.745 209.71L448.017 209.577L453.421 209.643L460.76 209.977L468.699 210.311L478.373 211.278L493.668 212.827Z" fill="#fff" stroke="black" stroke-width="1.30869" data-part="part_18" style="cursor: pointer; transition: fill 160ms;"></path>
<path d="M414.065 306.937L416.84 308.246L418.227 312.826V329.839L416.146 335.074L414.065 335.728L411.984 333.765L410.597 325.259V317.407L411.984 308.9L414.065 306.937ZM414.065 309.554L412.677 315.443V326.567L414.065 333.111L415.453 332.456L416.84 322.641L416.146 312.826L414.759 309.554H414.065Z" fill="black" data-part="part_19" style="cursor: pointer; transition: fill 160ms;"></path>
<path d="M403.151 226.98L406.301 223.723L403.613 338.817L368.383 345.065L350.461 349.132L353.02 325.066L363.385 293.86L379.115 264.181L403.151 226.98Z" fill="#fff" stroke="black" stroke-width="1.30869" data-part="part_20" style="cursor: pointer; transition: fill 160ms;"></path>
<path d="M361.983 497.319L348.626 465.605L348.38 461.918H355.182L363.785 466.261L384.025 474.62L393.777 477.16L400.824 478.717L409.592 479.7L420.326 479.946L426.964 479.372L435.241 477.078L444.5 470.276L448.27 467.572L452.531 464.622L458.431 461.754L466.015 458.531L470.63 456.945L476.255 455.935L481.014 456.224L485.197 457.377L488.081 458.387L489.668 459.973L488.37 460.405L480.005 462.281L472.361 463.723L463.707 466.896L456.64 471.078L452.891 474.54L446.978 481.462L443.372 487.953L441.209 493.721L439.478 503.384L440.055 515.066L442.074 522.422L444.093 528.046L447.41 532.806L453.035 539.728L458.948 544.488L469.332 549.392L479.139 551.843L484.187 551.555L493.273 551.265L489.668 616.166L486.639 621.502L482.745 623.954L477.841 625.252L473.803 626.117L466.448 626.262H456.496L453.035 625.973L449.286 624.964L445.824 623.233L443.661 620.781L441.785 618.185L440.776 616.743C440.776 616.743 439.767 616.31 439.622 616.166C439.478 616.022 437.748 616.455 437.748 616.455L433.132 616.743L429.382 616.599L427.796 616.022L426.066 604.484L425.056 597.994L423.614 596.696L422.027 596.119L413.229 595.83H404.144L402.124 596.551L401.259 599.003L400.971 609.388L400.682 613.858L400.538 616.454L396.788 614.435L394.192 610.685L393.183 607.946L392.173 564.966L361.983 497.319Z" fill="white" stroke="black" stroke-width="1.30869" data-part="part_21" style="cursor: pointer; transition: fill 160ms;"></path>
<path d="M440.522 616.574L444.375 529.039L443.218 526.141L439.634 616.754" fill="black" data-part="part_22" style="cursor: pointer; transition: fill 160ms;"></path>
<path d="M440.522 616.574L444.375 529.039L443.218 526.141L439.634 616.754" stroke="black" stroke-width="0.654344" data-part="part_23" style="cursor: pointer; transition: fill 160ms;"></path>
<path d="M399.591 355.87L404.203 355.675L401.841 467.161L372.101 458.121L353.89 452.218L353.684 432.017L352.968 399.862L354.512 363.423L399.591 355.87Z" fill="#fff" stroke="black" stroke-width="1.30869" data-part="part_24" style="cursor: pointer; transition: fill 160ms;"></path>
<path d="M375.591 478.082L398.829 492.104C400.215 491.823 393.517 522.7 384.125 527.434L374.179 509.361L367.248 494.105L354.114 466.131L375.591 478.082Z" fill="#fff" stroke="black" stroke-width="1.96303" data-part="part_25" style="cursor: pointer; transition: fill 160ms;"></path>
<path d="M429.655 206.139L446.075 206.38L453.682 206.139L461.771 206.38L470.706 207.104L481.693 207.708L489.42 208.191L500.167 209.157L502.34 205.414V199.619L500.77 197.083L494.371 197.325H481.814L477.83 196.6L464.79 192.253L456.217 187.424L449.335 181.145L443.419 172.573L440.159 163.759L438.469 154.341V144.923L439.797 139.249L441.97 131.763L446.8 123.311L452.716 117.273L458.511 112.444L467.325 107.856L475.053 105.199L482.418 104.355L489.663 103.992L500.046 104.355V58.4734L491.956 54.7305L481.814 51.2292L470.948 49.2969H464.428L455.614 49.5383L449.577 50.6245L446.679 77.912L439.072 80.2055L430.62 84.1904L426.878 86.9674L419.754 120.654L412.751 164.724L409.37 188.268L406.352 195.633L401.401 200.342L389.448 212.175L381.359 221.834L377.012 228.595L371.337 240.307L366.749 252.26L366.387 257.573L367.474 258.177L370.371 257.331L378.944 242.963L389.448 228.112L404.903 213.381L411.785 209.639L419.029 207.224L429.655 206.139Z" fill="white" stroke="black" stroke-width="1.30869" data-part="part_26" style="cursor: pointer; transition: fill 160ms;"></path>
<path d="M447.041 77.3389L448.6 120.707L447.615 122.029L446.051 77.5712" fill="black" data-part="part_27" style="cursor: pointer; transition: fill 160ms;"></path>
<path d="M447.041 77.3389L448.6 120.707L447.615 122.029L446.051 77.5712" stroke="black" stroke-width="0.654344" data-part="part_28" style="cursor: pointer; transition: fill 160ms;"></path>
<path d="M99.7057 206.117L83.2856 206.358L75.6788 206.117L67.5892 206.358L58.6541 207.083L47.667 207.687L39.9399 208.17L29.1936 209.135L27.0205 205.393V199.597L28.5903 197.062L34.9891 197.303H47.546L51.5303 196.579L64.5707 192.232L73.1432 187.402L80.025 181.124L85.9416 172.552L89.2015 163.737L90.8917 154.32V144.902L89.5634 139.227L87.3903 131.741L82.5606 123.29L76.6446 117.252L70.8491 112.423L62.0351 107.835L54.3073 105.178L46.9427 104.333L39.6978 103.971L29.3146 104.333V58.4519L37.4043 54.709L47.546 51.2076L58.4127 49.2754H64.9325L73.7466 49.5168L79.7835 50.603L82.6816 77.8905L90.2884 80.1839L98.7399 84.1689L102.483 86.9459L109.607 120.632L116.609 164.702L119.99 188.247L123.009 195.612L127.959 200.321L139.912 212.153L148.001 221.812L152.348 228.573L158.023 240.286L162.611 252.238L162.974 257.551L161.887 258.155L158.989 257.31L150.417 242.942L139.912 228.091L124.458 213.36L117.575 209.617L110.331 207.203L99.7057 206.117Z" fill="#fff" stroke="black" stroke-width="1.30869" data-part="part_29" ></path>
<path d="M82.7194 77.6556L76.9102 117.457L77.6581 117.991L83.8527 77.9343" fill="black" data-part="part_30" style="cursor: pointer; transition: fill 160ms;"></path>
<path d="M82.7194 77.6556L76.9102 117.457L77.6581 117.991L83.8527 77.9343" stroke="black" stroke-width="0.654344" data-part="part_31" style="cursor: pointer; transition: fill 160ms;"></path>
<path d="M133.914 236.257L129.836 231.75L125.973 227.243L122.754 225.741L122.539 229.389L123.183 239.691L123.827 251.925L126.832 253.857L130.48 255.788H133.7L137.133 254.93L139.494 251.925L140.996 247.847L133.914 236.257Z" fill="white" stroke="black" stroke-width="1.30869" data-part="part_32" style="cursor: pointer; transition: fill 160ms;"></path>
<path d="M28.291 222.72L30.1755 217.695L34.4144 213.927L43.992 211.886L76.4919 209.531L89.5232 209.688L114.173 213.299L121.082 216.439L130.345 225.703L135.997 232.611L140.864 239.205L151.855 256.79L164.258 278.928L172.893 297.14L179.016 315.353L182.157 330.269L183.569 344.557L184.041 357.117L175.876 355.547L163.944 353.349L149.029 350.836L127.205 347.069L109.149 345.184H89.6802L70.6827 345.027L30.7291 347.041L28.4481 282.696L28.291 222.72Z" fill="white" stroke="black" stroke-width="1.30869" data-part="part_33" ></path>
<path d="M120.678 222.272L126.043 336.023L175.62 347.826L175.406 338.168L174.333 330.871L172.402 318.423L169.826 307.692L164.675 293.098L158.88 279.791L153.944 269.06L146.647 255.753L136.559 240.086L129.263 229.355L125.829 225.062L120.678 222.272Z" fill="#fff" stroke="black" stroke-width="1.30869" data-part="part_34" ></path>
<path d="M110.93 303.012L113.547 303.667L114.856 306.284L115.51 310.21V324.606L113.547 331.149L110.93 331.803L108.967 327.877L108.312 323.297V311.519L109.621 304.975L110.93 303.012ZM111.584 305.63L110.276 310.864V323.951L111.584 329.186L112.893 327.877L113.547 325.26V309.556L112.239 305.63H111.584Z" fill="black" data-part="part_35" style="cursor: pointer; transition: fill 160ms;"></path>
<path d="M30.7695 348.912L39.8113 347.954L54.195 346.858L69.1272 345.899L107.622 345.762L133.102 348.776L155.295 352.749L179.68 356.996L183.516 358.092L183.79 404.121L182.283 441.246L182.009 453.849L180.776 457L158.583 465.356L141.185 471.795L122.691 475.631L104.061 475.493L99.9507 474.26L85.0186 464.808L71.3192 456.863L60.3596 453.026L46.1126 451.383L36.3864 450.561L32.9616 449.465L31.5914 443.026L31.1805 431.793L30.7695 348.912Z" fill="#fff" stroke="black" stroke-width="1.30869" data-part="part_36" ></path>
<path d="M126.29 360.31H132.833L177.983 364.236L178.638 370.125V396.953L177.329 429.016L176.02 449.955L169.477 452.572L132.179 465.005L126.29 466.968V360.31Z" fill="#fff" stroke="black" stroke-width="1.30869" data-part="part_37" style="cursor: pointer; transition: fill 160ms;"></path>
<path d="M112.552 433.766L115.169 434.42L116.478 437.038L117.132 440.964V455.359L115.169 461.903L112.552 462.557L110.589 458.631L109.935 454.05V442.272L111.243 435.729L112.552 433.766ZM113.206 436.383L111.898 441.618V454.705L113.206 459.94L114.515 458.631L115.169 456.013V440.309L113.861 436.383H113.206Z" fill="black" data-part="part_38" style="cursor: pointer; transition: fill 160ms;"></path>
<path d="M55.2233 462.969L65.8184 467.299L73.2282 471.289L77.7877 475.393L83.6015 482.346L87.8194 491.466L89.7576 497.85L90.3275 502.636V512.098L88.5038 520.99L85.4494 528.093L81.0352 535.115L77.3322 539.567L70.4924 545.04L62.7404 548.801L52.1393 551.651L36.9775 551.538L40.1066 615.367L42.5146 620.182L47.9313 624.395L55.7559 626.201L78.4269 626L85.0482 621.787L89.8629 616.771H102.102L104.71 598.113L106.579 595.821L126.199 595.991L128.246 597.527L128.758 615.953L131.658 615.441L135.923 611.175L138.142 564.088L182.158 462.917L181.296 461.941L175.823 461.827L167.046 465.817L161.232 469.009L149.149 473.455L133.417 478.015L121.562 479.839H106.287L96.939 478.128L92.6072 475.735L85.0836 469.807L76.7616 464.563L70.1502 460.915L64.3363 458.179L57.3826 456.241L51.341 455.785L38.9157 459.775L55.2233 462.969Z" fill="white" stroke="black" stroke-width="1.30869" data-part="part_39" style="cursor: pointer; transition: fill 160ms;"></path>
<path d="M89.8025 616.434L84.9728 528.44L83.916 529.496L88.8969 617.944" fill="black" data-part="part_40" style="cursor: pointer; transition: fill 160ms;"></path>
<path d="M89.8025 616.434L84.9728 528.44L83.916 529.496L88.8969 617.944" stroke="black" stroke-width="0.654344" data-part="part_41" style="cursor: pointer; transition: fill 160ms;"></path>
<path d="M175.598 464.903L176.906 465.557L171.672 475.372L165.783 488.459L153.35 512.67L146.152 525.102L142.881 527.72H137.646L134.374 525.102L133.72 523.139V491.731L140.263 487.151L155.967 477.335L172.326 466.866L175.598 464.903Z" fill="#fff" stroke="black" stroke-width="1.30869" data-part="part_42" style="cursor: pointer; transition: fill 160ms;"></path>
<path d="M363.295 534.13L334.858 542.717L311.212 546.537L287.566 548.5L264.436 548.706H252.767L239.963 547.777L227.985 546.848L209.089 543.853L195.045 541.581L183.584 538.897L169.445 533.924L165.823 551.288L159.317 586.706L160.97 594.761L163.965 605.294L166.236 613.348L169.231 620.783L172.741 628.011L176.252 632.245L179.35 633.793L211.361 635.859L247.192 637.407L278.996 637.409L298.305 636.892L313.071 636.169L334.755 635.033L347.25 634.208L354.581 633.174L359.848 627.186L367.076 612.006L369.761 604.263L374.82 586.812L374.924 585.367L363.295 534.13Z" fill="#fff" stroke="black" stroke-width="1.30869" data-part="part_43" style="cursor: pointer; transition: fill 160ms;"></path>
<path d="M373.834 589.891L359.258 592.779L340.4 596.371L322.621 599.245L299.454 602.298L276.286 603.376L254.735 603.196H233.184L211.633 601.04L194.392 598.526L183.976 596.012L172.302 593.318L159.91 589.547L160.09 590.804L171.943 594.216L183.796 597.09L194.212 599.604L211.812 602.477L232.825 604.273L254.735 604.273L276.107 604.633L299.274 603.375L322.621 600.502L340.401 597.628L359.976 594.036L373.834 590.887" fill="black" data-part="part_44" style="cursor: pointer; transition: fill 160ms;"></path>
<path d="M373.834 589.891L359.258 592.779L340.4 596.371L322.621 599.245L299.454 602.298L276.286 603.376L254.735 603.196H233.184L211.633 601.04L194.392 598.526L183.976 596.012L172.302 593.318L159.91 589.547L160.09 590.804L171.943 594.216L183.796 597.09L194.212 599.604L211.812 602.477L232.825 604.273L254.735 604.273L276.107 604.633L299.274 603.375L322.621 600.502L340.401 597.628L359.976 594.036L373.834 590.887" stroke="black" stroke-width="0.654344" data-part="part_45" style="cursor: pointer; transition: fill 160ms;"></path>
<path d="M266.893 610.123H270.819L274.091 612.086L275.399 614.049V619.938L272.782 623.21L271.473 623.864H265.584L262.313 620.593L261.658 619.284V614.704L264.93 610.778L266.893 610.123ZM268.202 611.432L264.276 613.395L262.967 616.012L263.621 619.938L266.893 622.556L271.473 621.901L274.091 618.63L273.436 614.049L270.819 612.086L268.202 611.432Z" fill="black" data-part="part_46" style="cursor: pointer; transition: fill 160ms;"></path>
<path d="M266.695 613.307H270.879V621.159H266.695V613.307ZM268.368 614.616V619.851H269.205V614.616H268.368Z" fill="black" data-part="part_47" style="cursor: pointer; transition: fill 160ms;"></path>
<path d="M344.926 478.365L320.398 483.971L300.686 487.407L281.399 489.379L266.029 489.786L252.389 489.541L241.714 488.81L231.729 488.078L215.975 485.72L204.267 483.931L194.713 481.817L183.799 478.203L169.725 533.678L184.82 538.327L201.43 541.418L229.106 545.912L252.209 547.496L270.959 547.804L289.926 547.336L311.201 545.178L328.669 542.638L344.07 539.084L352.921 536.686L363.073 533.904L344.926 478.365Z" fill="#fff" stroke="black" stroke-width="1.30869" data-part="part_48" style="cursor: pointer; transition: fill 160ms;"></path>
<path d="M404.088 595.745L424.164 596.503L426.239 598.098L429.473 616.668L401.751 616.846L401.675 605.585L401.712 598.033L404.088 595.745Z" fill="#fff" stroke="black" stroke-width="1.30869" data-part="part_49" style="cursor: pointer; transition: fill 160ms;"></path>
</g>
<defs>
<clipPath id="clip0_439_417">
<rect width="530.018" height="708" fill="white"></rect>
</clipPath>
</defs>
</svg>`;
    
  // Helper: apply mapping to an element (set fill)
  const applyMappingToElement = (el, m) => {
    if (!el || !m) return;
    if (m.color) {
      el.style.fill = m.color;
    }
  };

  // Setup: inject SVG and attach click listeners
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Render the svg markup into container (dangerous but controlled)
    container.innerHTML = svgMarkup;

    const svg = container.querySelector("svg");
    if (!svg) {
      console.error("SVG not found inside the provided markup.");
      return;
    }

    if (typeof onSvgChange === "function") {
      onSvgChange({ svg: svg.outerHTML, mapping })
    }

    // Query all paths (convert to array to avoid NodeList .forEach issues)
    const pathElements = Array.from(svg.querySelectorAll("path"));

    // Attach listeners and stable part ids
    pathElements.forEach((pathEl, idx) => {
      // stable id: prefer existing id attribute, otherwise set data-part=part_<index>
      let partId = pathEl.getAttribute("id");
      if (!partId) {
        partId = pathEl.getAttribute("data-part") || `part_${idx}`;
        pathEl.setAttribute("data-part", partId);
      } else {
        // Ensure also present as data-part for consistent querying
        pathEl.setAttribute("data-part", partId);
      }

      // Make clickable: cursor pointer & tiny transition for nicer UX
      pathEl.style.cursor = "pointer";
      pathEl.style.transition = "fill 160ms ease";

      // If mapping exists for this part, apply it
      if (mapping && mapping[partId]) {
        applyMappingToElement(pathEl, mapping[partId]);
      }

      // click handler
      const handler = (ev) => {
        ev.stopPropagation();
        // identify correct element (some paths might contain children)
        const actual = ev.currentTarget;
        const id = actual.getAttribute("data-part");
        setSelectedPart(id);
      };

      pathEl.addEventListener("click", handler);
      listenersRef.current.push({ el: pathEl, handler });
    });

    // Cleanup function: remove listeners on unmount or re-run
    return () => {
      listenersRef.current.forEach(({ el, handler }) => {
        try { el.removeEventListener("click", handler); } catch (e) {}
      });
      listenersRef.current = [];
    };
    // We DO NOT include mapping in deps, because that would re-run and re-attach many listeners.
    // If you re-render new SVG markup, unmount/remount the component.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // run once

  // If initialMapping prop changes after mount, update state and repaint
  useEffect(() => {
    const container = containerRef.current;
    const svg = container ? container.querySelector("svg") : null;
    if (!svg) return;
    Object.entries(initialMapping || {}).forEach(([partId, m]) => {
      const el = svg.querySelector(`[data-part="${partId}"]`) || svg.querySelector(`#${partId}`);
      if (el) applyMappingToElement(el, m);
    });
    // also update internal mapping
    setMapping((prev) => ({ ...prev, ...initialMapping }));

    if (typeof onSvgChange === "function") {
      onSvgChange({ svg: svg.outerHTML, mapping })
    }
  }, [initialMapping, onSvgChange]);

  const handleColorSelect = (option) => {
    if (!selectedPart) {
      return;
    }
    const container = containerRef.current;
    const svg = container ? container.querySelector("svg") : null;
    if (!svg) {
      console.error("SVG not found when applying color.");
      setSelectedPart(null);
      return;
    }
    const el = svg.querySelector(`[data-part="${selectedPart}"]`) || svg.querySelector(`#${selectedPart}`);
    if (!el) {
      console.warn("Selected element not found in SVG:", selectedPart);
      setSelectedPart(null);
      return;
    }

    // apply color inline so it stays when exporting outerHTML
    el.style.fill = option.color;

    // update mapping state
    setMapping((prev) => {
      const next = { ...prev, [selectedPart]: { label: option.label, color: option.color } };
      return next;
    });

    // Close modal
    setSelectedPart(null);
  };

  // Reset color for a part (restore original fill attribute by removing style.fill)
  const clearPartColor = (partId) => {
    const container = containerRef.current;
    const svg = container ? container.querySelector("svg") : null;
    if (!svg) return;
    const el = svg.querySelector(`[data-part="${partId}"]`) || svg.querySelector(`#${partId}`);
    if (!el) return;
    el.style.fill = ""; // removes inline fill
    setMapping((prev) => {
      const copy = { ...prev };
      delete copy[partId];
      return copy;
    });
  };

  // Save to backend: sends mapping and serialized SVG to server
  const handleSave = async () => {
    if (!inspectionId) {
      alert("Missing inspectionId - cannot save.");
      return;
    }
    const container = containerRef.current;
    const svg = container ? container.querySelector("svg") : null;
    if (!svg) {
      alert("SVG not found - cannot save.");
      return;
    }

    setIsSaving(true);
    try {
      // Prepare payload
      const payload = {
        mapping,
        svg: svg.outerHTML, // saves current SVG markup (including inline fill styles)
        updated_at: new Date().toISOString(),
      };

      // Example endpoint - replace with your real server route:
      const url = `/api/save-svg/${encodeURIComponent(inspectionId)}`;
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(`Save failed: ${res.status} ${text}`);
      }

      const json = await res.json();
      if (typeof onSaveSuccess === "function") onSaveSuccess(json);
      alert("Saved successfully.");
    } catch (err) {
      console.error("Error saving SVG mapping:", err);
      alert("Error saving: " + (err.message || "unknown"));
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div style={{ padding: 12 }}>
      {/* <h3 style={{ marginBottom: 8 }}>Car Inspection — click a part to assign condition</h3> */}

      <div
        ref={containerRef}
        style={{
          width: "100%",
          maxWidth: 600,
          margin: "auto",
          border: "1px solid #ddd",
          borderRadius: 8,
          padding: 8,
          background: "#fff",
        }}
      >
        {/* SVG is injected by useEffect (containerRef.innerHTML = svgMarkup) */}
      </div>

      <div style={{ marginTop: 12, display: "flex", gap: 8, flexWrap: "wrap" }}>
        {/* <button onClick={handleSave} disabled={isSaving} style={{ padding: "8px 14px" }}>
          {isSaving ? "Saving..." : "Save Image & Mapping"}
        </button> */}

        {/* <button onClick={handleExportMapping} style={{ padding: "8px 14px" }}>
          Export Mapping (console / clipboard)
        </button>

        <button
          onClick={() => {
            // Reset all mappings & SVG fills by removing inline style.fill for all mapped parts
            const container = containerRef.current;
            const svg = container ? container.querySelector("svg") : null;
            if (!svg) return;
            Object.keys(mapping).forEach((partId) => {
              const el = svg.querySelector(`[data-part="${partId}"]`) || svg.querySelector(`#${partId}`);
              if (el) el.style.fill = "";
            });
            setMapping({});
          }}
          style={{ padding: "8px 14px", background: "#eee" }}
        >
          Clear All
        </button> */}
      </div>

      {/* Modal: color picker */}
      {selectedPart && (
        <div
          role="dialog"
          aria-modal="true"
          style={{
            position: "fixed",
            left: 0,
            top: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0,0,0,0.35)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
          }}
          onClick={() => setSelectedPart(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "#fff",
              borderRadius: 8,
              padding: 16,
              minWidth: 320,
              maxWidth: 660,
              boxShadow: "0 8px 30px rgba(0,0,0,0.2)",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <strong>Assign condition to: </strong>
              <span style={{ fontFamily: "monospace" }}>{selectedPart}</span>
            </div>

            <div style={{ marginTop: 10, display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(160px,1fr))", gap: 8 }}>
              {COLOR_OPTIONS.map((opt) => (
                <button
                  key={opt.label}
                  onClick={() => handleColorSelect(opt)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    padding: "8px 10px",
                    borderRadius: 6,
                    border: "1px solid #ddd",
                    cursor: "pointer",
                    background: "#fff",
                  }}
                >
                  <span style={{ width: 28, height: 18, background: opt.color, border: "1px solid #999" }} />
                  <span style={{ flex: 1, textAlign: "left" }}>{opt.label}</span>
                </button>
              ))}

              <div style={{ gridColumn: "1 / -1", display: "flex", gap: 8, marginTop: 8 }}>
                {/* <button
                  onClick={() => {
                    // clear chosen part
                    clearPartColor(selectedPart);
                    setSelectedPart(null);
                  }}
                  style={{ padding: "8px 12px" }}
                >
                  Clear / Reset this part
                </button> */}

                <button class="btn btn-sm btn-primary" onClick={() => setSelectedPart(null)} style={{ padding: "8px 12px" }}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CarInspectionImage;
