// Custom magic link system that bypasses NextAuth email provider entirely
import { createClient } from '@supabase/supabase-js';
import crypto from 'crypto';

const supabase = createClient(
  process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { email } = req.body;
    
    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    // Generate a secure token
    const token = crypto.randomBytes(32).toString('hex');
    const expires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

    // Store the token in our database
    await supabase
      .from('verification_tokens')
      .upsert({
        identifier: email,
        token: token,
        expires: expires.toISOString()
      });

    // Create the magic link URL that goes directly to our handler
    const magicLinkUrl = `${process.env.NEXTAUTH_URL}/api/auth/verify-magic?token=${token}&email=${encodeURIComponent(email)}`;

    // Send email using external email service (much more reliable)
    await sendMagicLinkEmail(email, magicLinkUrl);

    res.status(200).json({ success: true, message: 'Magic link sent!' });
  } catch (error) {
    console.error('Custom signin error:', error);
    res.status(500).json({ error: 'Failed to send magic link' });
  }
}

async function sendMagicLinkEmail(email, magicLinkUrl) {
  // Use a reliable external email service instead of nodemailer
  // For now, I'll show both approaches
  
  try {
    // Option 1: Using Resend (recommended - no server dependencies)
    if (process.env.RESEND_API_KEY) {
      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          from: 'PITCHLY <noreply@usepitchly.com>',
          to: [email],
          subject: 'Sign in to PITCHLY',
          html: createMagicLinkEmailHTML(magicLinkUrl)
        })
      });
      
      if (!response.ok) {
        throw new Error('Resend email failed');
      }
      
      return;
    }

    // Option 2: Using SendGrid (alternative)
    if (process.env.SENDGRID_API_KEY) {
      const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.SENDGRID_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          personalizations: [{
            to: [{ email }]
          }],
          from: { 
            email: 'noreply@usepitchly.com', 
            name: 'PITCHLY' 
          },
          subject: 'Sign in to PITCHLY',
          content: [{
            type: 'text/html',
            value: createMagicLinkEmailHTML(magicLinkUrl)
          }]
        })
      });
      
      if (!response.ok) {
        throw new Error('SendGrid email failed');
      }
      
      return;
    }

    // Option 3: Fallback to nodemailer with better error handling
    const nodemailer = require('nodemailer');
    
    const transporter = nodemailer.createTransporter({
      host: process.env.EMAIL_SERVER_HOST,
      port: process.env.EMAIL_SERVER_PORT,
      auth: {
        user: process.env.EMAIL_SERVER_USER,
        pass: process.env.EMAIL_SERVER_PASSWORD
      }
    });

    await transporter.sendMail({
      to: email,
      from: process.env.EMAIL_FROM || 'PITCHLY <noreply@usepitchly.com>',
      subject: 'Sign in to PITCHLY',
      html: createMagicLinkEmailHTML(magicLinkUrl)
    });

  } catch (error) {
    console.error('Email send error:', error);
    throw error;
  }
}

function createMagicLinkEmailHTML(magicLinkUrl) {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Sign in to PITCHLY</title>
        <meta name="x-apple-disable-message-reformatting">
      </head>
      <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; background: #f8fafc;">
        
        <!-- Main container -->
        <table width="100%" cellpadding="0" cellspacing="0" style="background: #f8fafc; min-height: 100vh;">
          <tr>
            <td align="center" style="padding: 40px 20px;">
              
              <!-- Email content -->
              <table width="600" cellpadding="0" cellspacing="0" style="background: linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%); border-radius: 16px; margin: 0 auto;">
                <tr>
                  <td style="padding: 40px;">
                    
                    <!-- Inner white container -->
                    <table width="100%" cellpadding="0" cellspacing="0" style="background: white; border-radius: 12px; box-shadow: 0 10px 25px rgba(0,0,0,0.1);">
                      <tr>
                        <td style="padding: 40px; text-align: center;">
                          
                          <!-- PITCHLY Logo -->
                          <table cellpadding="0" cellspacing="0" style="margin: 0 auto 30px;">
                            <tr>
                              <td style="background: linear-gradient(135deg, #3B82F6, #1D4ED8); width: 50px; height: 50px; border-radius: 12px; text-align: center; vertical-align: middle;">
                                <span style="color: white; font-weight: bold; font-size: 28px; line-height: 50px;">P</span>
                              </td>
                              <td style="padding-left: 15px;">
                                <span style="font-size: 32px; font-weight: bold; color: #1D4ED8;">PITCHLY</span>
                              </td>
                            </tr>
                          </table>

                          <h1 style="color: #1D4ED8; margin: 0 0 30px 0; font-size: 28px; font-weight: 600;">
                            Sign in to your account
                          </h1>
                          
                          <p style="color: #666; margin: 0 0 40px 0; font-size: 18px; line-height: 1.5;">
                            Click the button below to securely sign in to PITCHLY.<br>
                            This link will expire in 24 hours.
                          </p>
                          
                          <!-- Magic Link Button -->
                          <table cellpadding="0" cellspacing="0" style="margin: 0 auto;">
                            <tr>
                              <td style="background: linear-gradient(135deg, #3B82F6, #1D4ED8); border-radius: 8px; padding: 0;">
                                <a href="${magicLinkUrl}" 
                                   style="display: block; color: white; text-decoration: none; padding: 18px 36px; font-weight: 600; font-size: 18px; border-radius: 8px; text-align: center;"
                                   target="_self">
                                  ✨ Sign in to PITCHLY
                                </a>
                              </td>
                            </tr>
                          </table>
                          
                          <!-- Alternative text link -->
                          <p style="color: #999; font-size: 14px; margin: 30px 0 0 0; line-height: 1.4;">
                            Button not working? Copy and paste this link:<br>
                            <a href="${magicLinkUrl}" style="color: #3B82F6; word-break: break-all;" target="_self">${magicLinkUrl}</a>
                          </p>
                          
                        </td>
                      </tr>
                    </table>
                    
                    <!-- Footer -->
                    <div style="text-align: center; margin-top: 30px;">
                      <p style="color: rgba(255,255,255,0.8); font-size: 14px; margin: 0;">
                        If you didn't request this email, you can safely ignore it.<br>
                        © 2025 PITCHLY. All rights reserved.
                      </p>
                    </div>
                    
                  </td>
                </tr>
              </table>
              
            </td>
          </tr>
        </table>
        
        <!-- Same-tab JavaScript for email clients that support it -->
        <script>
          document.addEventListener('DOMContentLoaded', function() {
            var links = document.querySelectorAll('a[href*="/api/auth/verify-magic"]');
            for (var i = 0; i < links.length; i++) {
              links[i].addEventListener('click', function(e) {
                // Force current window
                if (window.top !== window) {
                  e.preventDefault();
                  window.top.location.href = this.href;
                }
              });
            }
          });
        </script>
        
      </body>
    </html>
  `;
}