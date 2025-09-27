// Simple email sending API endpoint
// This would typically be deployed as a serverless function or backend API

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { to, from, name, subject, message } = req.body;

  try {
    // Here you would integrate with an email service like:
    // - Nodemailer with SMTP
    // - SendGrid API
    // - AWS SES
    // - Mailgun
    // - Resend
    
    // For demonstration, we'll use a mock implementation
    console.log('Email would be sent:', {
      to: 'abhirup.karmakar00@gmail.com',
      from,
      name,
      subject,
      message
    });

    // Simulate successful email sending
    return res.status(200).json({ 
      success: true, 
      message: 'Email sent successfully' 
    });
  } catch (error) {
    console.error('Error sending email:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Failed to send email' 
    });
  }
}
