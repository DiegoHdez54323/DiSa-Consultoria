import type { APIRoute } from "astro";
import { Resend } from "resend";
import { z } from "zod";

const resend = new Resend(import.meta.env.RESEND_API_KEY);

// Validación Estricta
const contactFormSchema = z.object({
  name: z.string().min(2, "Nombre muy corto"),
  email: z.string().email("Email inválido"),
  company: z.string().optional(),
  message: z.string().min(10, "Mensaje muy corto"),
  _gotcha: z.string().optional(), // Honeypot
});

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();

    // 1. Anti-Spam Silencioso
    if (body._gotcha) {
      return new Response(JSON.stringify({ message: "Enviado" }), { status: 200 });
    }

    // 2. Validación
    const result = contactFormSchema.safeParse(body);
    if (!result.success) {
      return new Response(
        JSON.stringify({ errors: result.error.flatten().fieldErrors }), 
        { status: 400 }
      );
    }

    const { name, email, company, message } = result.data;

    // 3. Enviar Email Seguro (Privado y Gratis)
    const { error } = await resend.emails.send({
      from: "Web Contact <onboarding@resend.dev>", // Usa tu dominio verificado si tienes uno
      to: [import.meta.env.MY_EMAIL], // Te llega a ti
      replyTo: email, // Para que al dar "Responder" le escribas al cliente
      subject: `Nuevo Proyecto: ${name}`,
      html: `
        <div style="font-family: sans-serif; padding: 20px;">
          <h2>👋 Tienes un nuevo mensaje de contacto</h2>
          <p><strong>Cliente:</strong> ${name} (${email})</p>
          <p><strong>Empresa:</strong> ${company || "No especificada"}</p>
          <hr />
          <p style="font-size: 16px;">${message}</p>
        </div>
      `,
    });

    if (error) {
      console.error("Resend Error:", error);
      throw new Error("No se pudo enviar el correo");
    }

    return new Response(
      JSON.stringify({ message: "Correo enviado con éxito" }), 
      { status: 200 }
    );

  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ message: "Error interno del servidor" }), 
      { status: 500 }
    );
  }
};