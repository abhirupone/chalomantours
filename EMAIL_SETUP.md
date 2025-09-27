# EmailJS Setup Guide for Contact Form

## 🚀 How to Set Up Email Sending for Your Contact Form

Your contact form is now configured to send emails using EmailJS! 

### 🎯 **Quick Test - Try It Now!**
The form currently works in **demo mode**. Fill out the contact form and click "Send Message" - you'll see a success message after 2 seconds. This lets you test the UI/UX immediately!

### Step 1: Create EmailJS Account

### Step 1: Create EmailJS Account
1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Click "Sign Up" and create a free account
3. Verify your email address

### Step 2: Create Email Service
1. In your EmailJS dashboard, go to "Email Services"
2. Click "Add New Service"
3. Choose your email provider (Gmail, Outlook, Yahoo, etc.)
4. Connect your email account and give it a name (e.g., "Chaloman Contact")
5. **Important**: Use the same email that should receive the messages (chaloman@yahoo.com)

### Step 3: Create Email Template
1. Go to "Email Templates" in your dashboard
2. Click "Create New Template"
3. Set up your template like this:

**Subject:**
```
New Contact Form Message from {{from_name}}
```

**HTML Body:**
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Contact Message - Chaloman Tours</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            margin: 0;
            padding: 0;
            background-color: #f8f9fa;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .header {
            background: linear-gradient(135deg, #FF6B6B 0%, #4ECDC4 100%);
            color: white;
            padding: 40px 30px;
            text-align: center;
        }
        .header h1 {
            margin: 0;
            font-size: 28px;
            font-weight: 700;
            text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }
        .header p {
            margin: 10px 0 0 0;
            font-size: 16px;
            opacity: 0.9;
        }
        .content {
            padding: 40px 30px;
        }
        .contact-card {
            background: #f8f9fa;
            border: 1px solid #e9ecef;
            border-radius: 8px;
            padding: 25px;
            margin-bottom: 30px;
        }
        .contact-card h2 {
            margin: 0 0 20px 0;
            color: #FF6B6B;
            font-size: 20px;
            font-weight: 600;
        }
        .contact-info {
            display: table;
            width: 100%;
            margin-bottom: 15px;
        }
        .contact-label {
            display: table-cell;
            width: 120px;
            font-weight: 600;
            color: #495057;
            vertical-align: top;
            padding-right: 15px;
        }
        .contact-value {
            display: table-cell;
            color: #212529;
        }
        .message-section {
            background: #ffffff;
            border: 2px solid #e9ecef;
            border-radius: 8px;
            padding: 25px;
            margin-top: 25px;
        }
        .message-section h3 {
            margin: 0 0 15px 0;
            color: #FF6B6B;
            font-size: 18px;
            font-weight: 600;
        }
        .message-content {
            background: #f8f9fa;
            border-left: 4px solid #FF6B6B;
            padding: 20px;
            border-radius: 4px;
            font-style: italic;
            color: #495057;
            white-space: pre-wrap;
            line-height: 1.7;
        }
        .footer {
            background: #343a40;
            color: #adb5bd;
            padding: 30px;
            text-align: center;
            font-size: 14px;
        }
        .footer p {
            margin: 5px 0;
        }
        .reply-button {
            display: inline-block;
            background: #FF6B6B;
            color: white;
            text-decoration: none;
            padding: 12px 24px;
            border-radius: 6px;
            font-weight: 600;
            margin-top: 20px;
            transition: background-color 0.3s ease;
        }
        .reply-button:hover {
            background: #e55a5a;
        }
        .logo {
            font-size: 24px;
            font-weight: bold;
            color: white;
            margin-bottom: 10px;
        }
        @media (max-width: 600px) {
            .container {
                margin: 10px;
                border-radius: 8px;
            }
            .header, .content, .footer {
                padding: 20px;
            }
            .contact-label {
                display: block;
                width: auto;
                margin-bottom: 5px;
                padding-right: 0;
            }
            .contact-value {
                display: block;
                margin-bottom: 15px;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div class="logo">🌍 Chaloman Tours</div>
            <h1>📧 New Contact Message</h1>
            <p>You've received a new inquiry from your website!</p>
        </div>

        <div class="content">
            <div class="contact-card">
                <h2>👤 Customer Details</h2>
                <div class="contact-info">
                    <div class="contact-label">Name:</div>
                    <div class="contact-value">{{from_name}}</div>
                </div>
                <div class="contact-info">
                    <div class="contact-label">Email:</div>
                    <div class="contact-value">{{from_email}}</div>
                </div>
                <div class="contact-info">
                    <div class="contact-label">Subject:</div>
                    <div class="contact-value">{{subject}}</div>
                </div>
            </div>

            <div class="message-section">
                <h3>💬 Message</h3>
                <div class="message-content">{{message}}</div>
            </div>

            <div style="text-align: center; margin-top: 30px;">
                <a href="mailto:{{from_email}}?subject=Re: {{subject}}" class="reply-button">
                    ✉️ Reply to Customer
                </a>
            </div>
        </div>

        <div class="footer">
            <p><strong>Chaloman Tours & Travels</strong></p>
            <p>This message was sent from your website contact form</p>
            <p>📞 +91 9831706709 | +91 9748572187</p>
            <p>📧 chaloman@yahoo.com</p>
        </div>
    </div>
</body>
</html>
```

**Plain Text Body:**
```
New Contact Form Submission

From: {{from_name}} ({{from_email}})
Subject: {{subject}}

Message:
{{message}}

---
This message was sent from your website contact form.
```

### Step 4: Get Your Credentials
1. From "Email Services", copy your **Service ID**
2. From "Email Templates", copy your **Template ID**
3. From "Account" → "General", copy your **Public Key**

### Step 5: Update Your Code
In `pages/Contact.tsx`, replace these placeholder values:

```javascript
const serviceId = 'your_service_id';     // ← Replace with your Service ID
const templateId = 'your_template_id';   // ← Replace with your Template ID
const publicKey = 'your_public_key';     // ← Replace with your Public Key
```

### Step 6: Test It!
1. Fill out your contact form
2. Click "Send Message"
3. Check your email (chaloman@yahoo.com) for the message!

## 📧 How It Works

- User fills out the form with their details
- EmailJS sends the message directly to your email
- No backend server required!
- Completely free for basic usage
- Secure and reliable

## 🔧 Troubleshooting

**If emails aren't being sent:**
1. Check your browser console for errors
2. Verify your EmailJS credentials are correct
3. Make sure your email service is properly connected
4. Check your spam folder

**If you see "Invalid service ID":**
- Double-check that you copied the Service ID correctly
- Make sure you're using the correct email service

## 💡 Pro Tips

- You can customize the email template design
- Add more fields to your form if needed
- Set up multiple email templates for different purposes
- Monitor your email sending stats in the EmailJS dashboard

---

**Need help?** Check the [EmailJS Documentation](https://www.emailjs.com/docs/) or their [YouTube Tutorials](https://www.youtube.com/@emailjs).

## 🎯 Custom Tour Email Template

For your custom tour requests, use this beautiful HTML email template. It organizes all the tour preferences in a visually appealing way.

### Step 1: Create Custom Tour Template

1. Go to your [EmailJS Dashboard](https://dashboard.emailjs.com/)
2. Click "Email Templates" → "Create New Template"
3. Name it: `Custom Tour Requests`
4. Set the Template ID to: `template_custom_tour` (this matches the code)

### Step 2: Configure Template Settings

**Subject:**
```
🌍 Custom Tour Request from {{from_name}} - {{destination}}
```

**HTML Body:**
Copy and paste the HTML template provided above.

### Step 3: Template Variables

Make sure these variables are available in your EmailJS template:
- `{{from_name}}` - Customer's full name
- `{{from_email}}` - Customer's email
- `{{phone}}` - Phone number (optional)
- `{{destination}}` - Preferred destination
- `{{startDate}}` - Trip start date
- `{{endDate}}` - Trip end date
- `{{groupSize}}` - Number of people
- `{{budget}}` - Budget range
- `{{accommodation}}` - Accommodation preference
- `{{activities}}` - Selected activities (comma-separated)
- `{{transportation}}` - Transportation preference
- `{{dietaryRequirements}}` - Dietary needs
- `{{specialRequests}}` - Special requests/notes

### Step 4: Test the Template

1. Fill out the custom tour form on your website
2. Submit the form
3. Check your email for the beautifully formatted custom tour request

### Features of the Custom Tour Template:

- 🎨 **Beautiful Design** - Gradient header with travel-themed styling
- 📱 **Responsive** - Looks great on mobile and desktop
- 🏷️ **Organized Sections** - Personal info, trip details, and preferences clearly separated
- 🎭 **Activity Tags** - Selected activities displayed as colorful tags
- ⚡ **Call-to-Action** - Reply and call buttons for quick customer contact
- 🎯 **Professional Layout** - Matches your brand colors and style

**HTML Body:**
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Custom Tour Request - Chaloman Tours</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            margin: 0;
            padding: 0;
            background-color: #f8f9fa;
        }
        .container {
            max-width: 700px;
            margin: 0 auto;
            background-color: #ffffff;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .header {
            background: linear-gradient(135deg, #FF6B6B 0%, #4ECDC4 50%, #45B7D1 100%);
            color: white;
            padding: 40px 30px;
            text-align: center;
            position: relative;
        }
        .header::before {
            content: '🌍';
            font-size: 48px;
            display: block;
            margin-bottom: 10px;
        }
        .header h1 {
            margin: 0;
            font-size: 28px;
            font-weight: 700;
            text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }
        .header p {
            margin: 10px 0 0 0;
            font-size: 16px;
            opacity: 0.9;
        }
        .content {
            padding: 40px 30px;
        }
        .section {
            background: #f8f9fa;
            border: 1px solid #e9ecef;
            border-radius: 8px;
            padding: 25px;
            margin-bottom: 25px;
        }
        .section h2 {
            margin: 0 0 20px 0;
            color: #FF6B6B;
            font-size: 20px;
            font-weight: 600;
            display: flex;
            align-items: center;
            gap: 8px;
        }
        .info-grid {
            display: table;
            width: 100%;
            margin-bottom: 15px;
        }
        .info-label {
            display: table-cell;
            width: 140px;
            font-weight: 600;
            color: #495057;
            vertical-align: top;
            padding-right: 15px;
            padding-bottom: 8px;
        }
        .info-value {
            display: table-cell;
            color: #212529;
            background: #ffffff;
            padding: 8px 12px;
            border-radius: 4px;
            border: 1px solid #e9ecef;
        }
        .trip-highlights {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 20px;
            border-radius: 8px;
            margin: 20px 0;
            text-align: center;
        }
        .trip-highlights h3 {
            margin: 0 0 10px 0;
            font-size: 18px;
            font-weight: 600;
        }
        .preferences-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 15px;
            margin-top: 15px;
        }
        .preference-item {
            background: #ffffff;
            padding: 15px;
            border-radius: 6px;
            border-left: 4px solid #FF6B6B;
        }
        .preference-label {
            font-weight: 600;
            color: #495057;
            font-size: 14px;
            margin-bottom: 5px;
        }
        .preference-value {
            color: #212529;
            font-size: 14px;
        }
        .activities-section {
            background: #e8f5e8;
            border: 1px solid #c8e6c9;
            border-radius: 8px;
            padding: 20px;
            margin: 20px 0;
        }
        .activities-title {
            font-weight: 600;
            color: #2e7d32;
            margin-bottom: 10px;
            display: flex;
            align-items: center;
            gap: 8px;
        }
        .activities-list {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
        }
        .activity-tag {
            background: #4caf50;
            color: white;
            padding: 4px 12px;
            border-radius: 20px;
            font-size: 12px;
            font-weight: 500;
        }
        .special-requests {
            background: #fff3cd;
            border: 1px solid #ffeaa7;
            border-radius: 8px;
            padding: 20px;
            margin: 20px 0;
        }
        .special-requests h3 {
            margin: 0 0 10px 0;
            color: #856404;
            font-size: 16px;
            font-weight: 600;
        }
        .special-requests p {
            margin: 0;
            color: #212529;
            line-height: 1.6;
        }
        .action-buttons {
            text-align: center;
            margin-top: 30px;
            display: flex;
            gap: 15px;
            justify-content: center;
            flex-wrap: wrap;
        }
        .action-button {
            display: inline-block;
            padding: 12px 24px;
            border-radius: 6px;
            font-weight: 600;
            text-decoration: none;
            transition: all 0.3s ease;
            text-align: center;
            min-width: 140px;
        }
        .primary-button {
            background: #FF6B6B;
            color: white;
        }
        .primary-button:hover {
            background: #e55a5a;
            transform: translateY(-1px);
        }
        .secondary-button {
            background: #6c757d;
            color: white;
        }
        .secondary-button:hover {
            background: #5a6268;
            transform: translateY(-1px);
        }
        .footer {
            background: #343a40;
            color: #adb5bd;
            padding: 30px;
            text-align: center;
            font-size: 14px;
        }
        .footer p {
            margin: 5px 0;
        }
        .logo {
            font-size: 24px;
            font-weight: bold;
            color: white;
            margin-bottom: 10px;
        }
        .urgency-badge {
            background: #dc3545;
            color: white;
            padding: 4px 12px;
            border-radius: 20px;
            font-size: 12px;
            font-weight: 600;
            display: inline-block;
            margin-left: 10px;
        }
        @media (max-width: 600px) {
            .container {
                margin: 10px;
                border-radius: 8px;
            }
            .header, .content, .footer {
                padding: 20px;
            }
            .info-label {
                display: block;
                width: auto;
                margin-bottom: 5px;
                padding-right: 0;
            }
            .info-value {
                display: block;
                margin-bottom: 15px;
            }
            .preferences-grid {
                grid-template-columns: 1fr;
            }
            .action-buttons {
                flex-direction: column;
                align-items: center;
            }
            .action-button {
                width: 100%;
                max-width: 280px;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🎯 Custom Tour Request</h1>
            <p>A customer is ready to plan their dream trip!</p>
        </div>

        <div class="content">
            <!-- Personal Information -->
            <div class="section">
                <h2>👤 Personal Information</h2>
                <div class="info-grid">
                    <div class="info-label">Full Name:</div>
                    <div class="info-value">{{from_name}}</div>
                </div>
                <div class="info-grid">
                    <div class="info-label">Email:</div>
                    <div class="info-value">{{from_email}}</div>
                </div>
                {{#if phone}}
                <div class="info-grid">
                    <div class="info-label">Phone:</div>
                    <div class="info-value">{{phone}}</div>
                </div>
                {{/if}}
            </div>

            <!-- Trip Details -->
            <div class="section">
                <h2>📅 Trip Details</h2>
                {{#if destination}}
                <div class="info-grid">
                    <div class="info-label">Destination:</div>
                    <div class="info-value">{{destination}}</div>
                </div>
                {{/if}}
                {{#if startDate}}
                <div class="info-grid">
                    <div class="info-label">Start Date:</div>
                    <div class="info-value">{{startDate}}</div>
                </div>
                {{/if}}
                {{#if endDate}}
                <div class="info-grid">
                    <div class="info-label">End Date:</div>
                    <div class="info-value">{{endDate}}</div>
                </div>
                {{/if}}
                {{#if groupSize}}
                <div class="info-grid">
                    <div class="info-label">Group Size:</div>
                    <div class="info-value">{{groupSize}} people</div>
                </div>
                {{/if}}
                {{#if budget}}
                <div class="info-grid">
                    <div class="info-label">Budget:</div>
                    <div class="info-value">{{budget}}</div>
                </div>
                {{/if}}
            </div>

            <!-- Trip Highlights -->
            <div class="trip-highlights">
                <h3>✨ Ready to Create an Amazing Experience!</h3>
                <p>This customer has specific preferences and is looking for a personalized tour package.</p>
            </div>

            <!-- Preferences -->
            {{#if accommodation}}
            <div class="section">
                <h2>🏨 Preferences</h2>
                <div class="preferences-grid">
                    {{#if accommodation}}
                    <div class="preference-item">
                        <div class="preference-label">Accommodation:</div>
                        <div class="preference-value">{{accommodation}}</div>
                    </div>
                    {{/if}}
                    {{#if transportation}}
                    <div class="preference-item">
                        <div class="preference-label">Transportation:</div>
                        <div class="preference-value">{{transportation}}</div>
                    </div>
                    {{/if}}
                    {{#if dietaryRequirements}}
                    <div class="preference-item">
                        <div class="preference-label">Dietary Needs:</div>
                        <div class="preference-value">{{dietaryRequirements}}</div>
                    </div>
                    {{/if}}
                </div>
            </div>
            {{/if}}

            <!-- Activities -->
            {{#if activities}}
            <div class="activities-section">
                <div class="activities-title">🎭 Preferred Activities</div>
                <div class="activities-list">
                    {{#each activities}}
                    <span class="activity-tag">{{this}}</span>
                    {{/each}}
                </div>
            </div>
            {{/if}}

            <!-- Special Requests -->
            {{#if specialRequests}}
            <div class="special-requests">
                <h3>💝 Special Requests & Notes</h3>
                <p>{{specialRequests}}</p>
            </div>
            {{/if}}

            <!-- Action Buttons -->
            <div class="action-buttons">
                <a href="mailto:{{from_email}}?subject=Re: Custom Tour Request - {{destination}}" class="action-button primary-button">
                    ✉️ Reply to Customer
                </a>
                <a href="tel:{{phone}}" class="action-button secondary-button">
                    📞 Call Customer
                </a>
            </div>
        </div>

        <div class="footer">
            <div class="logo">🌍 Chaloman Tours</div>
            <p><strong>Custom Tour Request Received</strong></p>
            <p>Please respond within 24 hours to secure this booking opportunity</p>
            <p>📞 +91 9831706709 | +91 9748572187</p>
            <p>📧 chaloman@yahoo.com</p>
        </div>
    </div>
</body>
</html>
```

**Plain Text Body:**
```
CUSTOM TOUR REQUEST - {{from_name}}

PERSONAL INFORMATION:
• Name: {{from_name}}
• Email: {{from_email}}
{{#if phone}}• Phone: {{phone}}{{/if}}

TRIP DETAILS:
{{#if destination}}• Destination: {{destination}}{{/if}}
{{#if startDate}}• Start Date: {{startDate}}{{/if}}
{{#if endDate}}• End Date: {{endDate}}{{/if}}
{{#if groupSize}}• Group Size: {{groupSize}} people{{/if}}
{{#if budget}}• Budget: {{budget}}{{/if}}

PREFERENCES:
{{#if accommodation}}• Accommodation: {{accommodation}}{{/if}}
{{#if activities}}• Activities: {{activities}}{{/if}}
{{#if transportation}}• Transportation: {{transportation}}{{/if}}
{{#if dietaryRequirements}}• Dietary Requirements: {{dietaryRequirements}}{{/if}}

{{#if specialRequests}}
SPECIAL REQUESTS:
{{specialRequests}}
{{/if}}

---
Please contact the customer promptly to discuss their custom tour requirements.
Chaloman Tours & Travels
📞 +91 9831706709 | +91 9748572187
📧 chaloman@yahoo.com
```
<parameter name="filePath">c:\Users\abhir\Downloads\chaloman-tours-and-travels\EMAIL_SETUP.md