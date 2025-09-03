// Email utility with reliable nodemailer usage
const sendCustomVerificationEmail = async ({ identifier: email, url, provider }) => {
  // Use require instead of import for better Node.js compatibility
  const nodemailer = require('nodemailer');
  
  try {
    const transport = nodemailer.createTransporter(provider.server);
    
    await transport.sendMail({
      to: email,
      from: provider.from,
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
                  <a href="${url}" 
                     id="signin-link"
                     target="_self"
                     style="display: inline-block; background: linear-gradient(135deg, #3B82F6, #1D4ED8); color: white; text-decoration: none; padding: 16px 32px; border-radius: 8px; font-weight: 600; font-size: 16px; box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3); transition: all 0.2s;">
                    ✨ Sign in to PITCHLY
                  </a>
                </div>
                
                <p style="color: #666; font-size: 14px; text-align: center; margin-top: 30px; line-height: 1.5;">
                  If you didn't request this email, you can safely ignore it.<br>
                  This link is valid for 24 hours and can only be used once.
                </p>
                
                <div style="border-top: 1px solid #eee; margin-top: 30px; padding-top: 20px; text-align: center;">
                  <p style="color: #999; font-size: 12px; margin: 0;">
                    © 2025 PITCHLY. All rights reserved.<br>
                    <a href="${process.env.NEXTAUTH_URL || 'https://usepitchly.com'}" style="color: #3B82F6; text-decoration: none;">usepitchly.com</a>
                  </p>
                </div>
              </div>
            </div>
            
            <!-- Enhanced same-tab JavaScript -->
            <script>
              // Multiple approaches for same-tab behavior
              (function() {
                function forceCurrentTab() {
                  const links = document.querySelectorAll('a[href*="/api/auth/callback/email"]');
                  links.forEach(function(link) {
                    link.target = '_self';
                    
                    link.addEventListener('click', function(e) {
                      e.preventDefault();
                      e.stopPropagation();
                      
                      const href = this.href;
                      
                      // Try multiple methods
                      if (window.top && window.top !== window) {
                        // In iframe/webview
                        try {
                          window.top.location.href = href;
                        } catch (error) {
                          window.location.href = href;
                        }
                      } else {
                        // Regular window
                        window.location.href = href;
                      }
                    });
                  });
                }
                
                // Run immediately and after DOM ready
                forceCurrentTab();
                
                if (document.readyState === 'loading') {
                  document.addEventListener('DOMContentLoaded', forceCurrentTab);
                } else {
                  setTimeout(forceCurrentTab, 100);
                }
              })();
            </script>
          </body>
        </html>
      `,
      text: `Sign in to PITCHLY\\n\\nClick this link to sign in: ${url}\\n\\nIf you didn't request this email, you can safely ignore it.\\nThis link expires in 24 hours.`
    });
    
  } catch (error) {
    console.error('Email send error:', error);
    throw error;
  }
};

module.exports = { sendCustomVerificationEmail };