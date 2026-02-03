import nodemailer from 'nodemailer';

// Create reusable transporter object using SMTP transport
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: process.env.SMTP_PORT === '465', // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

export async function sendContactEmail(data: {
  name: string;
  email: string;
  phone: string;
  service: string;
  details?: string;
}) {
  const { name, email, phone, service, details } = data;

  try {
    console.log('🔧 Email Service: Checking SMTP configuration...');
    if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASSWORD) {
      throw new Error('Missing SMTP configuration. Check .env.local file.');
    }
    console.log(`🔧 Email Service: Connecting to ${process.env.SMTP_HOST}...`);
    // Email to your company
    await transporter.sendMail({
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: process.env.SMTP_USER, // Your company email
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            h2 { color: #2563eb; border-bottom: 2px solid #2563eb; padding-bottom: 10px; }
            .info-row { margin: 15px 0; padding: 10px; background-color: #f3f4f6; border-radius: 5px; }
            .label { font-weight: bold; color: #1f2937; }
            .value { color: #4b5563; margin-top: 5px; }
          </style>
        </head>
        <body>
          <div class="container">
            <h2>🔔 New Contact Form Submission</h2>
            
            <div class="info-row">
              <div class="label">Name:</div>
              <div class="value">${name}</div>
            </div>
            
            <div class="info-row">
              <div class="label">Email:</div>
              <div class="value"><a href="mailto:${email}">${email}</a></div>
            </div>
            
            <div class="info-row">
              <div class="label">Phone:</div>
              <div class="value"><a href="tel:${phone}">${phone}</a></div>
            </div>
            
            <div class="info-row">
              <div class="label">Service Interested In:</div>
              <div class="value">${service}</div>
            </div>
            
            ${details ? `
            <div class="info-row">
              <div class="label">Additional Details:</div>
              <div class="value">${details}</div>
            </div>
            ` : ''}
            
            <p style="margin-top: 20px; color: #6b7280; font-size: 14px;">
              This email was sent from your website contact form.
            </p>
          </div>
        </body>
        </html>
      `,
      text: `
        New Contact Form Submission
        
        Name: ${name}
        Email: ${email}
        Phone: ${phone}
        Service: ${service}
        ${details ? `Details: ${details}` : ''}
      `,
    });

    // Confirmation email to user
    await transporter.sendMail({
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: email,
      subject: 'Thank you for contacting ITF-PRO',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            h2 { color: #2563eb; }
            .message { background-color: #f0f9ff; padding: 20px; border-radius: 10px; margin: 20px 0; }
            .footer { margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #6b7280; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="container">
            <h2>Thank you for contacting us, ${name}!</h2>
            
            <div class="message">
              <p>We have received your inquiry regarding <strong>${service}</strong>.</p>
              <p>Our team will review your request and get back to you as soon as possible, typically within 24-48 hours.</p>
            </div>
            
            <p>In the meantime, feel free to explore our services or reach out to us directly if you have any urgent questions.</p>
            
            <div class="footer">
              <p><strong>ITF-PRO</strong></p>
              <p>Professional fire-resistant and thermal flocking services</p>
            </div>
          </div>
        </body>
        </html>
      `,
      text: `
        Thank you for contacting ITF-PRO, ${name}!
        
        We have received your inquiry regarding ${service}.
        Our team will review your request and get back to you as soon as possible, typically within 24-48 hours.
        
        Best regards,
        ITF-PRO Team
      `,
    });

    console.log('\u2705 Email Service: Both emails sent successfully!');
    return { success: true };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('\u274c Email Service Error:', {
      message: errorMessage,
      error: error,
      smtpHost: process.env.SMTP_HOST,
      smtpPort: process.env.SMTP_PORT,
    });
    throw new Error(`Email sending failed: ${errorMessage}`);
  }
}
