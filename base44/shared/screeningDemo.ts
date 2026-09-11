// AUTHENX — SIMULATED demo data generator.
// Hackathon demonstration only. These results are NOT actual AI findings.
// This module is intentionally separated from production/API logic so a real
// Python/OpenCV backend can replace it without touching the frontend.

const MOCK_PROFILES = [
  { full: "Aarav Sharma", gender: "Male", dob: "1996-04-12", address: "42 MG Road, Bengaluru, KA 560001" },
  { full: "Priya Nair", gender: "Female", dob: "1998-11-23", address: "18 Marine Drive, Kochi, KL 682001" },
  { full: "Rohan Mehta", gender: "Male", dob: "1994-07-30", address: "7 Civil Lines, New Delhi 110054" },
  { full: "Ananya Iyer", gender: "Female", dob: "2000-02-15", address: "23 Park Street, Kolkata 700016" },
  { full: "Vikram Rao", gender: "Male", dob: "1992-09-08", address: "91 Jubilee Hills, Hyderabad 500033" },
  { full: "Sneha Kulkarni", gender: "Female", dob: "1997-12-03", address: "12 Law College Rd, Pune 411004" },
  { full: "Kabir Anand", gender: "Male", dob: "1995-08-19", address: "5 Carter Rd, Mumbai 400050" },
];

const DOC_TYPES = ["Mock National ID", "Mock Driver License", "Mock Student ID", "Mock Passport Copy"];

const VALIDATION_CHECKS = [
  "Required fields present",
  "Date format valid",
  "Document number format",
  "Internal field consistency",
  "Expiry status",
  "Name consistency",
  "Image quality",
  "Document structure consistency",
];

const TAMPERING_LIBRARY = [
  { finding: "Possible edited region", explanation: "A localized region shows subtle tonal variation consistent with digital retouching." },
  { finding: "Text/image inconsistency", explanation: "Shadow direction under the photo differs from the document lighting." },
  { finding: "Compression anomaly", explanation: "Detected double-compression artifacts suggesting a region was re-saved." },
  { finding: "Font/layout inconsistency", explanation: "Character spacing in the document number deviates from the expected template." },
  { finding: "Unusual image region", explanation: "A small high-frequency region may indicate pasted content." },
  { finding: "Metadata anomaly", explanation: "Embedded metadata timestamps do not align with the stated issue date." },
];

function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
function randInt(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }
function randFloat(min, max, dp) { const v = Math.random() * (max - min) + min; const p = Math.pow(10, dp); return Math.round(v * p) / p; }
function chance(p) { return Math.random() < p; }

export function generateDemoScreening(documentUrl, referencePhotoUrl) {
  const docType = "Mock Passport";
  const issueDate = "2024-01-01";
  const expiryDate = "2033-12-31";

  const fields = [
    { field_name: "Full Name", value: "Aarav Kulkarni", confidence: randFloat(0.86, 0.99, 2), validation_status: "valid" },
    { field_name: "Date of Birth", value: "2004-08-14", confidence: randFloat(0.8, 0.97, 2), validation_status: chance(0.15) ? "review" : "valid" },
    { field_name: "Document Number", value: "T5123456", confidence: randFloat(0.78, 0.96, 2), validation_status: chance(0.2) ? "review" : "valid" },
    { field_name: "Place of Birth", value: "Pune, Maharashtra", confidence: randFloat(0.7, 0.93, 2), validation_status: chance(0.25) ? "review" : "valid" },
    { field_name: "Gender", value: "Male", confidence: randFloat(0.9, 0.99, 2), validation_status: "valid" },
    { field_name: "Document Type", value: docType, confidence: randFloat(0.92, 0.99, 2), validation_status: "valid" },
    { field_name: "Issue Date", value: issueDate, confidence: randFloat(0.83, 0.97, 2), validation_status: "valid" },
    { field_name: "Expiry Date", value: expiryDate, confidence: randFloat(0.8, 0.95, 2), validation_status: "valid" },
  ];

  const validation = VALIDATION_CHECKS.map((check) => ({
    check,
    status: "passed",
    detail: "Check completed successfully.",
  }));

  const numFindings = randInt(0, 3);
  const shuffled = [...TAMPERING_LIBRARY].sort(() => Math.random() - 0.5);
  const findings = shuffled.slice(0, numFindings).map((f) => ({
    finding: f.finding,
    severity: pick(["low", "medium", "high"]),
    confidence: randFloat(0.55, 0.92, 2),
    explanation: f.explanation,
  }));

  const faceScore = randInt(58, 96);
  const faceStatus = faceScore >= 85 ? "Strong Match" : faceScore >= 70 ? "Possible Match" : "Requires Review";

  const docValScore = Math.round((validation.filter((v) => v.status === "passed").length / validation.length) * 100);
  const ocrScore = Math.round((fields.reduce((s, f) => s + f.confidence, 0) / fields.length) * 100);
  const imgConsistency = randInt(55, 92);
  const photoSim = faceScore;
  const fieldConsistency = randInt(60, 95);

  const riskFromFindings = findings.reduce((s, f) => s + (f.severity === "high" ? 18 : f.severity === "medium" ? 11 : 6), 0);
  const riskFromValidation = validation.filter((v) => v.status === "inconsistency").length * 8 + validation.filter((v) => v.status === "review").length * 4;
  const riskFromFace = Math.max(0, 100 - faceScore) * 0.15;
  let riskScore = Math.round(riskFromFindings + riskFromValidation + riskFromFace);
  riskScore = Math.min(95, Math.max(8, riskScore));

  let overallStatus;
  if (riskScore < 25) overallStatus = "Low Concern";
  else if (riskScore < 50) overallStatus = "Requires Review";
  else if (riskScore < 70) overallStatus = "Potential Inconsistency";
  else overallStatus = "Suspicious";

  const explanations = [
    "AI-assisted screening completed. Results summarize detected indicators and require human review.",
    findings.length
      ? findings.length + " potential inconsistency indicator" + (findings.length > 1 ? "s" : "") + " flagged for review."
      : "No significant tampering indicators detected.",
    "Face comparison returned a " + faceStatus.toLowerCase() + " (" + faceScore + "%).",
  ];

  return {
    demo_mode: true,
    document_type: docType,
    extracted_fields: fields,
    field_validation: validation,
    tampering_indicators: findings,
    face_comparison: {
      score: faceScore,
      status: faceStatus,
      document_photo_url: documentUrl,
      reference_photo_url: referencePhotoUrl,
    },
    risk_score: riskScore,
    risk_categories: [
      { name: "Document Validation", score: docValScore },
      { name: "OCR Confidence", score: ocrScore },
      { name: "Image Consistency", score: imgConsistency },
      { name: "Photo Similarity", score: photoSim },
      { name: "Field Consistency", score: fieldConsistency },
    ],
    overall_status: overallStatus,
    explanations,
  };
}