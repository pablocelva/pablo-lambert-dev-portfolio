import type { APIRoute } from 'astro';
import { PortfolioService } from '../../../lib/services/portfolio.service';
import { ProjectSchema } from '../../../lib/schemas/project.schema';
import { ZodError } from 'zod';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const validated = ProjectSchema.parse(body);
    const saved = await PortfolioService.saveProject(validated);

    return new Response(
      JSON.stringify({
        success: true,
        project: saved
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  } catch (err) {
    if (err instanceof ZodError) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Error de validación del proyecto',
          details: err.issues
        }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    return new Response(
      JSON.stringify({
        success: false,
        error: 'Error interno del servidor'
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
};

export const DELETE: APIRoute = async ({ url }) => {
  try {
    const id = url.searchParams.get('id');
    if (!id) {
      return new Response(
        JSON.stringify({ success: false, error: 'ID es obligatorio' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    await PortfolioService.deleteProject(id);

    return new Response(
      JSON.stringify({ success: true }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ success: false, error: 'Error al eliminar el proyecto' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
