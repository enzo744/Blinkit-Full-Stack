import { Resend } from "resend";
import dotenv from "dotenv";
dotenv.config();

if (!process.env.RESEND_API_VNA) {
  console.log("Please add your RESEND_API_VNA in .env");
}

// Configurata per la verifica email di vnalbone0@gmail.com
const resend = new Resend(process.env.RESEND_API_VNA);

const sendEmailVna = async ({ sendTo, subject, html }) => {
  try {
    const { data, error } = await resend.emails.send({
      from: "blinkit <onboarding@resend.dev>",
      to: sendTo,
      subject: subject,
      html: html,
    });
    if (error) {
      return console.log({ error });
    }
    return data;
  } catch (error) {
    console.log(error);
  }
};

export default sendEmailVna;
