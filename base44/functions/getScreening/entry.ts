import { createClientFromRequest } from 'npm:@base44/sdk@0.8.44';
import { authorizeRequest } from '../../shared/functionAuth.ts';

// Secured read of a single Screening record by id.
// Public/unauthenticated users cannot read Screening records directly (RLS);
// this authorized endpoint is the only channel to load a report by id.
export default async function(req: Request): Promise<Response> {
  try {
    const body = await req.json().catch(() => ({}));
    const authError = authorizeRequest(body.auth_token);
    if (authError) return authError;

    const screeningId = body.screening_id;
    if (!screeningId) return Response.json({ error: 'screening_id is required.' }, { status: 400 });

    const base44 = createClientFromRequest(req);
    const screening = await base44.asServiceRole.entities.Screening.get(screeningId);
    if (!screening) return Response.json({ error: 'Screening not found.' }, { status: 404 });
    return Response.json(screening);
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}