//Implements email class

import nodemailer from "nodemailer";

import { IUser } from "../models/userModel";

type mailOptions = {
  from: string;
  to: string;
  subject: string;
  text: string;
};

class Email {
  private to: string;
  private name: string;
  private url: string;
  private from: string;

  constructor(user: IUser, url: string) {
    this.to = user.email;
    this.name = `${user.firstName} ${user.lastName}`;
    this.url = url;
    this.from = `fourseveneight <${process.env.EMAIL_FROM}>`;
  }
  private newTransport(): nodemailer.Transporter {
    const transportOptions: nodemailer.TransportOptions = {
      host: process.env.EMAIL_HOST,
      post: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    } as nodemailer.TransportOptions;
    return nodemailer.createTransport(transportOptions);
  }

  private async send(subject: string, text: string): Promise<void> {
    const options: mailOptions = {
      from: this.from,
      to: this.to,
      subject: subject,
      text: text,
    };
    await this.newTransport().sendMail(options);
  }
  public async sendAccountConfirmationEmail(
    confirmationToken: string
  ): Promise<void> {
    const message: string = `Hello ${this.name}! Welcome to fourseveneight.com. Please follow the following link to confirm your email.\n
                             ${this.url}${confirmationToken}`;
    await this.send("Account confirmation", message);
  }
  public async sendPasswordResetEmail(
    passwordResetToken: string
  ): Promise<void> {
    const message: string = `Hello ${this.name}. It appears that you requested a password reset. If this was you, you can follow the link 
                             below, which is valid for the next 10 minutes. Otherwise, you may safely ignore this message.\n
                             ${this.url}${passwordResetToken}`;
    await this.send("Password reset", message);
  }
}

export default Email;
