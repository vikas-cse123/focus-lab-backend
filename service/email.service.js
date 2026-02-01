import resend from "../config/resend.config.js";
const sendEmail = async ({ subject, html, to, from }) => {
  const data = await resend.emails.send({
    from,
    
    to,
    subject,
    html,
  });
  return data
};
export default sendEmail;

