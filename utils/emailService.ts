// Email service utility for sending contact form messages

export interface EmailData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export const sendContactEmail = async (data: EmailData): Promise<boolean> => {
  try {
    // Option 1: Using Formspree (free service)
    // You need to create an account at https://formspree.io and get a form endpoint
    const formspreeEndpoint = 'https://formspree.io/f/YOUR_FORM_ID'; // Replace with actual form ID
    
    const response = await fetch(formspreeEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: data.name,
        email: data.email,
        subject: data.subject || 'Contact Form Submission',
        message: data.message,
        _replyto: data.email,
        _subject: `Chaloman Tours and Travels Contact: ${data.subject || 'New Message'}`,
      }),
    });

    return response.ok;
  } catch (error) {
    console.error('Email sending failed:', error);
    return false;
  }
};

// Alternative: Simple webhook-based email sending
export const sendEmailViaWebhook = async (data: EmailData): Promise<boolean> => {
  try {
    // This would connect to your own backend API endpoint
    const response = await fetch('/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        to: 'abhirup.karmakar00@gmail.com',
        from: data.email,
        subject: data.subject || 'Contact Form Submission from Chaloman Tours and Travels',
        html: `
          <h3>New Contact Form Submission</h3>
          <p><strong>Name:</strong> ${data.name}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          <p><strong>Subject:</strong> ${data.subject}</p>
          <p><strong>Message:</strong></p>
          <p>${data.message.replace(/\n/g, '<br>')}</p>
        `,
      }),
    });

    return response.ok;
  } catch (error) {
    console.error('Webhook email sending failed:', error);
    return false;
  }
};
