// Custom email sender that bypasses NextAuth's email provider
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { email, url } = req.body;
    
    if (!email || !url) {
      return res.status(400).json({ error: 'Email and URL are required' });
    }

    // Use dynamic import to avoid build-time issues
    const nodemailer = await import('nodemailer');
    
    const transporter = nodemailer.default.createTransporter({
      host: process.env.EMAIL_SERVER_HOST,
      port: process.env.EMAIL_SERVER_PORT,
      auth: {
        user: process.env.EMAIL_SERVER_USER,
        pass: process.env.EMAIL_SERVER_PASSWORD
      }
    });

    // Create a custom redirect URL that handles same-tab better
    const redirectUrl = `${process.env.NEXTAUTH_URL}/api/auth/email-redirect?url=${encodeURIComponent(url)}`;

    await transporter.sendMail({
      to: email,
      from: process.env.EMAIL_FROM,
      subject: 'Sign in to PITCHLY',
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <title>Sign in to PITCHLY</title>
          </head>
          <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333;">
            <div style="max-width: 600px; margin: 0 auto; padding: 40px 20px; background: linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%);">
              <div style="background: white; border-radius: 16px; padding: 40px; box-shadow: 0 10px 25px rgba(0,0,0,0.1);">
                
                <!-- PITCHLY Logo -->
                <div style="text-align: center; margin-bottom: 30px;">
                  <div style="display: inline-flex; align-items: center; space-x: 2px;">
                    <div style="width: 40px; height: 40px; background: linear-gradient(135deg, #3B82F6, #1D4ED8); border-radius: 10px; display: inline-flex; align-items: center; justify-content: center; margin-right: 12px;">
                      <span style="color: white; font-weight: bold; font-size: 24px;">P</span>
                    </div>
                    <span style="font-size: 28px; font-weight: bold; color: #1D4ED8;">PITCHLY</span>
                  </div>
                </div>

                <h1 style="color: #1D4ED8; text-align: center; margin-bottom: 30px; font-size: 24px; font-weight: 600;">
                  Sign in to your account
                </h1>
                
                <p style="color: #666; text-align: center; margin-bottom: 30px; font-size: 16px;">
                  Click the button below to securely sign in to PITCHLY. This link will expire in 24 hours.
                </p>
                
                <div style="text-align: center; margin: 40px 0;">
                  <!--[if mso]>
                  <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="${url}" style="height:50px;v-text-anchor:middle;width:200px;" arcsize="16%" stroke="f" fillcolor="#3B82F6">
                    <w:anchorlock/>
                    <center style="color:#ffffff;font-family:sans-serif;font-size:16px;font-weight:bold;">Sign in to PITCHLY</center>
                  </v:roundrect>
                  <![endif]-->
                  <!--[if !mso]><!-->
                  <table cellpadding="0" cellspacing="0" role="presentation" style="margin: 0 auto;">
                    <tr>
                      <td style="background: linear-gradient(135deg, #3B82F6, #1D4ED8); border-radius: 8px; padding: 0;">
                        <a href="${url}" 
                           target="_parent"
                           style="display: block; color: white; text-decoration: none; padding: 16px 32px; font-weight: 600; font-size: 16px; border-radius: 8px;">
                          ✨ Sign in to PITCHLY
                        </a>
                      </td>
                    </tr>
                  </table>
                  <!--<![endif]-->
                </div>
                
                <p style="color: #666; font-size: 14px; text-align: center; margin-top: 30px; line-height: 1.5;">
                  If you didn't request this email, you can safely ignore it.<br>
                  This link is valid for 24 hours and can only be used once.
                </p>
                
                <p style="color: #666; font-size: 12px; text-align: center; margin-top: 20px;">
                  Alternative link: <a href="${url}" target="_parent" style="color: #3B82F6;">${url}</a>
                </p>
                
                <div style="border-top: 1px solid #eee; margin-top: 30px; padding-top: 20px; text-align: center;">
                  <p style="color: #999; font-size: 12px; margin: 0;">
                    © 2025 PITCHLY. All rights reserved.<br>
                    <a href="${process.env.NEXTAUTH_URL}" style="color: #3B82F6; text-decoration: none;">usepitchly.com</a>
                  </p>
                </div>
              </div>
            </div>
          </body>
        </html>
      `,
      text: `Sign in to PITCHLY\n\nClick this link to sign in: ${url}\n\nIf you didn't request this email, you can safely ignore it.\nThis link expires in 24 hours.`
    });

    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Email send error:', error);
    res.status(500).json({ error: 'Failed to send email' });
  }
}