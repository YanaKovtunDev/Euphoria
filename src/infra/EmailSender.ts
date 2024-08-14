import nodemailer from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";

const { EMAIL_ADDRESS, EMAIL_PASSWORD } = process.env;

export class EmailSender {
  private static instance: EmailSender;

  private static transporter: nodemailer.Transporter<SMTPTransport.SentMessageInfo>;

  constructor() {
    if (!EmailSender.instance) EmailSender.instance = this;

    return EmailSender.instance;
  }

  init() {
    EmailSender.transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: EMAIL_ADDRESS,
        pass: EMAIL_PASSWORD,
      },
    });
  }

  static async sendCode(email: string, code: number) {
    await EmailSender.transporter.sendMail({
      from: "Euphoria",
      to: email,
      subject: "Reset code",
      text: "This message with attachments.",
      html: `This <i>Code to reset password</i> <h1><strong>${code}</strong></h1>.`,
    });
  }
}
