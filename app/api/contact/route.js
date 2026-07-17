import { Resend } from "resend";

const cleanText = (value, maxLength) => {
  return String(value || "")
    .trim()
    .slice(0, maxLength);
};

const cleanHeader = (value, maxLength) => {
  return cleanText(value, maxLength).replace(/[\r\n]/g, " ");
};

export async function POST(request) {
  try {
    const body = await request.json();

    const firstName = cleanText(body.firstName, 60);
    const lastName = cleanText(body.lastName, 60);
    const email = cleanHeader(body.email, 120);
    const subject = cleanHeader(body.subject, 100);
    const message = cleanText(body.message, 3000);

    const emailIsValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    if (
      !firstName ||
      !lastName ||
      !email ||
      !emailIsValid ||
      !subject ||
      !message
    ) {
      return Response.json(
        {
          success: false,
          message: "Veuillez remplir correctement tous les champs.",
        },
        {
          status: 400,
        }
      );
    }

    const apiKey = process.env.RESEND_API_KEY;
    const receiverEmail = process.env.CONTACT_RECEIVER_EMAIL;
    const fromEmail =
      process.env.CONTACT_FROM_EMAIL ||
      "Maison Élyra <onboarding@resend.dev>";

    if (!apiKey || !receiverEmail) {
      console.error("Variables Resend manquantes.");

      return Response.json(
        {
          success: false,
          message: "Le service de contact n’est pas encore configuré.",
        },
        {
          status: 500,
        }
      );
    }

    const resend = new Resend(apiKey);

    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: [receiverEmail],
      subject: `Nouveau message Maison Élyra — ${subject}`,

      headers: {
        "Reply-To": email,
      },

      text: `
Nouveau message reçu depuis le site Maison Élyra

Prénom : ${firstName}
Nom : ${lastName}
E-mail : ${email}
Type de demande : ${subject}

Message :
${message}
      `.trim(),
    });

    if (error) {
      console.error("Erreur Resend :", error);

      return Response.json(
        {
          success: false,
          message: "Impossible d’envoyer le message pour le moment.",
        },
        {
          status: 500,
        }
      );
    }

    return Response.json({
      success: true,
      emailId: data?.id,
    });
  } catch (error) {
    console.error("Erreur API contact :", error);

    return Response.json(
      {
        success: false,
        message: "Une erreur est survenue pendant l’envoi.",
      },
      {
        status: 500,
      }
    );
  }
}