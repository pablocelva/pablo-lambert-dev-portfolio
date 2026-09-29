import type { APIRoute } from 'astro';
import { ContactService } from '../../lib/services/contact.service';
import { ZodError } from 'zod';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const result = await ContactService.submitMessage(body);

    return new Response(
      JSON.stringify({
        success: true,
        message: result.message,
        id: result.id
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  } catch (err) {
    if (err instanceof ZodError) {
      const fieldErrors = err.issues.map((i) => ({
        field: i.path.join('.'),
        message: i.message
      }));

      return new Response(
        JSON.stringify({
          success: false,
          error: 'Error de validación en el formulario.',
          details: fieldErrors
        }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    console.error('[API /api/contact] Internal Error:', err);
    return new Response(
      JSON.stringify({
        success: false,
        error: 'Ocurrió un error inesperado al procesar el mensaje.'
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
};
