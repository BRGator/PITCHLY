// Custom email redirect handler to improve same-tab behavior
export default function handler(req, res) {
  const { url } = req.query;
  
  if (!url || !url.includes('/api/auth/callback/email')) {
    return res.status(400).json({ error: 'Invalid redirect URL' });
  }

  // Return an HTML page that tries multiple methods for same-tab redirect
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Signing you in...</title>
        <style>
          body {
            margin: 0;
            padding: 40px;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            text-align: center;
          }
          .container {
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(10px);
            border-radius: 20px;
            padding: 40px;
            border: 1px solid rgba(255, 255, 255, 0.2);
          }
          .spinner {
            width: 40px;
            height: 40px;
            border: 4px solid rgba(255, 255, 255, 0.3);
            border-top: 4px solid white;
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin: 0 auto 20px;
          }
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="spinner"></div>
          <h2>Signing you in to PITCHLY...</h2>
          <p>Please wait while we redirect you securely.</p>
          <p><small>If you're not redirected automatically, <a href="${url}" style="color: white;">click here</a>.</small></p>
        </div>
        
        <script>
          (function() {
            const targetUrl = "${url}";
            
            function redirect() {
              try {
                // Method 1: Try to use the same window
                if (window.name === 'email_signin' || localStorage.getItem('pitchly_email_signin')) {
                  localStorage.removeItem('pitchly_email_signin');
                }
                
                // Method 2: Check if we're in an iframe or popup
                if (window.parent && window.parent !== window) {
                  try {
                    window.parent.location.href = targetUrl;
                    return;
                  } catch (e) {}
                }
                
                // Method 3: Check if we have an opener (popup)
                if (window.opener && !window.opener.closed) {
                  try {
                    window.opener.location.href = targetUrl;
                    window.close();
                    return;
                  } catch (e) {}
                }
                
                // Method 4: Standard redirect
                window.location.replace(targetUrl);
                
              } catch (error) {
                console.error('Redirect error:', error);
                window.location.href = targetUrl;
              }
            }
            
            // Wait a moment then redirect
            setTimeout(redirect, 1000);
          })();
        </script>
      </body>
    </html>
  `;

  res.setHeader('Content-Type', 'text/html');
  res.status(200).send(html);
}