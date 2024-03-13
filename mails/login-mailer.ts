import { MailerSend, EmailParams, Sender, Recipient } from "mailersend";

const mailerSend = new MailerSend({
  apiKey: process.env.MAILER_TOEKN!,
});

export const LoginMailSender = async () => {
  const sentFrom = new Sender(
    "amranimohamad040@gmail.com",
    "Mohammed El Amrani"
  );

  const recipients = [
    new Recipient("elamranimohammed104@gmail.com", "Other Mohammed"),
  ];

  const emailParams = new EmailParams()
    .setFrom(sentFrom)

    .setTo(recipients)
    .setReplyTo(sentFrom)
    .setSubject("Welcome To The Pharmacy Page")
    .setHtml("<strong>Welcome Brother</strong>")
    .setText(
      "I hope your doing wonderfull on this beautifyl day when ramadan is near may Allah Grant you Janna Inchallah"
    );

  await mailerSend.email.send(emailParams);
  console.log("sent!");
};
