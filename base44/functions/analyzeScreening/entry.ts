import { createClientFromRequest } from 'npm:@base44/sdk@0.8.44';
import { generateDemoScreening } from '../../shared/screeningDemo.ts';
import { authorizeRequest } from '../../shared/functionAuth.ts';

// AUTHENX screening analysis endpoint.
//
// Currently runs in clearly-labeled Demo Mode using simulated data so the full
// UI is demonstrable without any backend configuration.
//
// --- PYTHON / OPENCV INTEGRATION (ready to wire) -----------------------
// When a Python/OpenCV document-intelligence service is available, add an
// optional secret for its base URL (see dashboard settings -> environment
// variables), read it with the runtime secrets API, and forward the uploaded
// image URLs to its POST /analyze endpoint. The Python pipeline should return
// the same JSON shape this function returns (extracted_fields, field_validation,
// tampering_indicators, face_comparison, risk_score, risk_categories,
// overall_status, explanations). Set demoMode=false when using live results.
// A full code sample is in the project README.
// -----------------------------------------------------------------------

export default async function(req: Request): Promise<Response> {
  try {
    const base44 = createClientFromRequest(req);
    const body = await req.json().catch(() => ({}));
    // Verify the caller before any privileged (service-role) work.
    const authError = authorizeRequest(body.auth_token);
    if (authError) return authError;

    const documentUrl = body.document_url;
    const referencePhotoUrl = body.reference_photo_url;

    if (!documentUrl) return Response.json({ error: 'A mock document image is required.' }, { status: 400 });
    if (!referencePhotoUrl) return Response.json({ error: 'A reference photo is required.' }, { status: 400 });

    // Demo Mode — simulated results (hackathon demonstration only).
    const result = generateDemoScreening(documentUrl, referencePhotoUrl);
    const demoMode = true;

    // Persist the screening and its child records (service role — public demo app).
    const screening = await base44.asServiceRole.entities.Screening.create({
      document_type: result.document_type,
      risk_score: result.risk_score,
      overall_status: result.overall_status,
      document_url: documentUrl,
      reference_photo_url: referencePhotoUrl,
      analysis_result: result,
      demo_mode: demoMode,
    });

    if (result.extracted_fields && result.extracted_fields.length) {
      await base44.asServiceRole.entities.ExtractedField.bulkCreate(
        result.extracted_fields.map((f) => ({
          screening_id: screening.id,
          field_name: f.field_name,
          value: f.value,
          confidence: f.confidence,
          validation_status: f.validation_status,
        }))
      );
    }

    if (result.tampering_indicators && result.tampering_indicators.length) {
      await base44.asServiceRole.entities.Finding.bulkCreate(
        result.tampering_indicators.map((f) => ({
          screening_id: screening.id,
          finding_type: f.finding,
          severity: f.severity,
          confidence: f.confidence,
          explanation: f.explanation,
        }))
      );
    }

    return Response.json({ screening_id: screening.id, ...result });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}