import { createClientFromRequest } from 'npm:@base44/sdk@0.8.44';
import { authorizeRequest } from '../../shared/functionAuth.ts';

// Secured list of recent Screening records.
// Public/unauthenticated users cannot list Screening records directly (RLS);
// this authorized endpoint powers the dashboard recent-logs and history views.
export default async function(req: Request): Promise<Response> {
  try {
    const body = await req.json().catch(() => ({}));
    const authError = authorizeRequest(body.auth_token);
    if (authError) return authError;

    const limit = Math.min(Number(body.limit) || 100, 200);
    const base44 = createClientFromRequest(req);
    const screenings = await base44.asServiceRole.entities.Screening.list('-created_date', limit);
    return Response.json({ screenings });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}