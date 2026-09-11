// AUTHENX service / API layer.
// All document-processing calls go through here so the UI never hard-codes
// screening results. The backend function (analyzeScreening) either forwards to
// a Python/OpenCV service or returns clearly-labeled demo data.
//
// SECURITY: Screening, ExtractedField and Finding records are protected by
// Creator-Only + admin RLS, so the frontend cannot read them directly. All
// reads go through the secured getScreening / listScreenings backend functions,
// which verify the caller via an auth_token (the app's BASE44_APP_ID).

import { base44 } from '@/api/base44Client';

// Authorization value sourced from the Base44 frontend env var (auto-injected,
// never hard-coded in source). Sent to every secured backend function.
const AUTH_TOKEN = import.meta.env.VITE_BASE44_APP_ID || '';

export async function uploadDocument(file) {
  const { file_url } = await base44.integrations.Core.UploadPublicFile({ file });
  return file_url;
}

export async function uploadReferencePhoto(file) {
  const { file_url } = await base44.integrations.Core.UploadPublicFile({ file });
  return file_url;
}

// Runs the full analysis pipeline and persists a screening record.
// Returns { screening_id, ...analysisResult }.
export async function analyzeScreening(documentUrl, referencePhotoUrl) {
  const res = await base44.functions.invoke('analyzeScreening', {
    document_url: documentUrl,
    reference_photo_url: referencePhotoUrl,
    auth_token: AUTH_TOKEN,
  });
  return res.data;
}

// Loads a single screening report through the secured backend channel.
export async function getScreening(id) {
  const res = await base44.functions.invoke('getScreening', {
    screening_id: id,
    auth_token: AUTH_TOKEN,
  });
  return res.data;
}

// Lists recent screenings through the secured backend channel.
export async function listScreenings(limit = 100) {
  const res = await base44.functions.invoke('listScreenings', {
    limit,
    auth_token: AUTH_TOKEN,
  });
  return res.data?.screenings || [];
}