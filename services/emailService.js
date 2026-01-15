const sendpost = require('sendpost-js-sdk');

const emailApi = new sendpost.EmailApi();

class EmailService {
  constructor() {
    this.apiKey = process.env.SENDPOST_API_KEY;
    this.fromEmail = process.env.SENDPOST_FROM_EMAIL || 'hello@playwithsendpost.io';
    this.fromName = process.env.SENDPOST_FROM_NAME || 'SendPost';
  }

  async sendEmail({
    to,
    subject,
    htmlBody,
    textBody,
    from,
    groups,
    trackOpens = true,
    trackClicks = true,
    customFields,
  }) {
    try {
      const emailMessage = new sendpost.EmailMessage();
      
      emailMessage.from = from || {
        email: this.fromEmail,
        name: this.fromName,
      };

      if (typeof to === 'string') {
        emailMessage.to = [{ email: to }];
      } else {
        emailMessage.to = to.map(recipient => {
          if (typeof recipient === 'string') {
            return { email: recipient };
          }
          return recipient;
        });
      }

      emailMessage.subject = subject;
      emailMessage.htmlBody = htmlBody;
      emailMessage.textBody = textBody || htmlBody.replace(/<[^>]*>/g, '');
      emailMessage.trackOpens = trackOpens;
      emailMessage.trackClicks = trackClicks;

      if (groups) {
        emailMessage.groups = Array.isArray(groups) ? groups : [groups];
      }

      const opts = { emailMessage };
      const response = await emailApi.sendEmail(this.apiKey, opts);

      return {
        success: true,
        messageId: response.messageId,
        data: response,
      };
    } catch (error) {
      console.error('SendPost error:', error);
      return {
        success: false,
        error: error.message || 'Failed to send email',
        details: error,
      };
    }
  }
}

module.exports = new EmailService();
