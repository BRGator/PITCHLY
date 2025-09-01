import Head from 'next/head';
import Link from 'next/link';
import Navbar from '../components/Navbar';

export default function Privacy() {
  return (
    <>
      <Head>
        <title>Privacy Policy - PITCHLY</title>
        <meta name="description" content="PITCHLY's privacy policy - how we collect, use, and protect your personal information" />
      </Head>

      <Navbar />

      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-16">
        <div className="max-w-4xl mx-auto px-6 py-12">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">Privacy Policy</h1>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              Effective Date: September 1, 2025 | Last Updated: September 1, 2025
            </p>

            <div className="prose prose-lg dark:prose-invert max-w-none">
              <h2>Introduction</h2>
              <p>
                At PITCHLY ("we," "our," or "us"), we respect your privacy and are committed to protecting 
                your personal information. This Privacy Policy explains how we collect, use, disclose, and 
                safeguard your information when you use our website and services.
              </p>

              <h2>Information We Collect</h2>
              
              <h3>Information You Provide Directly</h3>
              <ul>
                <li><strong>Account Information:</strong> Name, email address, company name, business type</li>
                <li><strong>Proposal Content:</strong> Client information, project descriptions, and proposal text</li>
                <li><strong>Profile Information:</strong> Avatar/logo uploads, business goals, and preferences</li>
                <li><strong>Communication:</strong> Messages sent through our contact forms or support channels</li>
              </ul>

              <h3>Information Collected Automatically</h3>
              <ul>
                <li><strong>Usage Data:</strong> How you interact with our service, features used, time spent</li>
                <li><strong>Device Information:</strong> Browser type, operating system, IP address</li>
                <li><strong>Cookies:</strong> Authentication tokens, preferences, and analytics data</li>
              </ul>

              <h2>How We Use Your Information</h2>
              <p>We use the information we collect to:</p>
              <ul>
                <li>Provide, maintain, and improve our services</li>
                <li>Generate AI-powered proposals based on your input</li>
                <li>Authenticate your account and ensure security</li>
                <li>Communicate with you about your account or our services</li>
                <li>Analyze usage patterns to enhance user experience</li>
                <li>Comply with legal obligations and enforce our terms</li>
              </ul>

              <h2>AI and Data Processing</h2>
              <p>
                PITCHLY uses artificial intelligence (OpenAI's GPT models) to generate proposals. 
                When you create a proposal, we send your project information to OpenAI's API to 
                generate content. This data is processed according to OpenAI's privacy policy 
                and is not used to train their models.
              </p>

              <h2>Information Sharing and Disclosure</h2>
              <p>We do not sell, trade, or otherwise transfer your personal information to third parties except:</p>
              
              <h3>Service Providers</h3>
              <ul>
                <li><strong>OpenAI:</strong> For AI-powered proposal generation</li>
                <li><strong>Supabase:</strong> For database and authentication services</li>
                <li><strong>Vercel:</strong> For hosting and deployment</li>
              </ul>

              <h3>Legal Requirements</h3>
              <p>
                We may disclose your information if required by law, court order, or to protect 
                our rights, property, or safety, or that of our users or others.
              </p>

              <h2>Data Security</h2>
              <p>
                We implement appropriate technical and organizational measures to protect your 
                personal information against unauthorized access, alteration, disclosure, or destruction:
              </p>
              <ul>
                <li>Encrypted data transmission (HTTPS/SSL)</li>
                <li>Secure authentication systems</li>
                <li>Regular security assessments</li>
                <li>Access controls and monitoring</li>
              </ul>

              <h2>Data Retention</h2>
              <p>
                We retain your personal information for as long as necessary to provide our services 
                and comply with legal obligations. You may request deletion of your account and 
                associated data at any time.
              </p>

              <h2>Your Rights and Choices</h2>
              <p>Depending on your location, you may have the right to:</p>
              <ul>
                <li>Access the personal information we hold about you</li>
                <li>Correct inaccurate or incomplete information</li>
                <li>Delete your personal information</li>
                <li>Restrict or object to certain processing</li>
                <li>Data portability (receive your data in a portable format)</li>
              </ul>

              <p>
                To exercise these rights, please contact us at{' '}
                <a href="mailto:hello@usepitchly.com" className="text-primary-600 dark:text-primary-400">
                  hello@usepitchly.com
                </a>
              </p>

              <h2>Cookies and Tracking</h2>
              <p>
                We use cookies and similar technologies to enhance your experience, authenticate 
                your sessions, and analyze site usage. You can control cookies through your 
                browser settings, though disabling cookies may affect site functionality.
              </p>

              <h2>Third-Party Links</h2>
              <p>
                Our service may contain links to third-party websites. We are not responsible 
                for the privacy practices or content of these external sites.
              </p>

              <h2>Children's Privacy</h2>
              <p>
                Our service is not intended for children under 13 years of age. We do not 
                knowingly collect personal information from children under 13.
              </p>

              <h2>International Data Transfers</h2>
              <p>
                Your information may be transferred to and processed in countries other than 
                your country of residence. We ensure appropriate safeguards are in place 
                for such transfers.
              </p>

              <h2>Changes to This Policy</h2>
              <p>
                We may update this Privacy Policy periodically. We will notify you of any 
                material changes by posting the new policy on our website and updating the 
                "Last Updated" date.
              </p>

              <h2>Contact Information</h2>
              <p>
                If you have questions about this Privacy Policy or our data practices, 
                please contact us:
              </p>
              <ul>
                <li>Email: <a href="mailto:hello@usepitchly.com" className="text-primary-600 dark:text-primary-400">hello@usepitchly.com</a></li>
                <li>Website: <Link href="/contact" className="text-primary-600 dark:text-primary-400">Contact Form</Link></li>
              </ul>

              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 mt-8">
                <h3 className="text-lg font-semibold mb-2">Summary</h3>
                <p className="text-sm">
                  We collect information you provide and usage data to deliver our AI-powered 
                  proposal service. We use trusted third-party providers and implement strong 
                  security measures. You have control over your data and can request changes 
                  or deletion at any time.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}