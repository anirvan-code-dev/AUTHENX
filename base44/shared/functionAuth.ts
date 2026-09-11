// AUTHENX backend-function authorization.
//
// Secures every AUTHENX backend function that performs privileged (service-role)
// database work. The frontend supplies an auth_token that must match the Base44
// BASE44_APP_ID environment variable (pre-populated server-side and mirrored as
// VITE_BASE44_APP_ID in the frontend build). This verifies the caller originates
// from the legitimate AUTHENX app and rejects direct/unauthorized calls.
//
// The comparison is constant-time to avoid timing-based token discovery.
// The expected value is never returned, logged, or persisted.
import { secrets } from 'base44:runtime';

function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) {
    diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return diff === 0;
}

// Returns null when the request is authorized, or a 401 Response when not.
export function authorizeRequest(supplied: string | null | undefined): Response | null {
  const expected = secrets.get('BASE44_APP_ID');
  if (!expected) {
    return Response.json({ error: 'Screening service unavailable.' }, { status: 503 });
  }
  const suppliedStr = supplied ? String(supplied) : '';
  if (!suppliedStr || !timingSafeEqual(suppliedStr, expected)) {
    return Response.json({ error: 'Unauthorized.' }, { status: 401 });
  }
  return null;
}