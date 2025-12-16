export const prerender = false;

import { jsonPath } from "@sanity/client/csm";
import type { APIRoute } from "astro";
import { Resend } from "resend";
import { z } from "zod";

const resend = new Resend(import.meta.env.RESEND_API_KEY);

// Esquema de validacion
const contactSchema = z.object({
  name: z.string().min(2, "El nombre es muy corto"),
  email: z.string().email("Email inválido"),
  company: z.string().optional(),
  message: z.string().min(10, "El mensaje debe tener al menos 10 caracteres"),
  _gotcha: z.string().optional(),
});

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();

    //Validacion de origen
    const origin = request.headers.get("origin")

    const allowedOrigins = import.meta.env.ALLOWED_ORIGINS 
      ? import.meta.env.ALLOWED_ORIGINS.split(",").map((url: string) => url.trim())
      : ["http://localhost:4321"];

    if (origin && !allowedOrigins.includes(origin)) {
        return new Response(JSON.stringify({ error: "Forbidden" }), {status: 403});
    }
    
    // Validar datos con Zod
    const result = contactSchema.safeParse(body);

    if (body._gotcha) {
        console.warn("Bot bloqueado")
        return new Response(JSON.stringify({ message: "Mensaje enviado" }), { status: 200})
    }
    
    if (!result.success) {
      return new Response(JSON.stringify({ 
        error: "Datos inválidos", 
        details: result.error.format() 
      }), { status: 400 });
    }

    const { name, email, company, message } = result.data;

    // Enviar correo con Resend
    const data = await resend.emails.send({
      from: 'Contact Form <onboarding@resend.dev>', 
      to: ['diazalexda2@gmail.com'], 
      subject: `Nuevo mensaje de ${name} ${company ? `- ${company}` : ''}`,
      html: `
        <h1>Nuevo Contacto desde la Web</h1>
        <p><strong>Nombre:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Empresa:</strong> ${company || 'N/A'}</p>
        <p><strong>Mensaje:</strong></p>
        <p>${message}</p>
      `,
      replyTo: email,
    });

    if (data.error) {
      return new Response(JSON.stringify({ error: data.error }), { status: 500 });
    }

    return new Response(JSON.stringify({ message: "Nos pondremos en contacto en las proximas 24h." }), { status: 200 });

  } catch (error) {
    return new Response(JSON.stringify({ error: "Error interno del servidor" }), { status: 500 });
  }
};