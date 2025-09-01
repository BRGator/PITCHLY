import Head from 'next/head';
import Link from 'next/link';
import Navbar from '../components/Navbar';

export default function Terms() {
  return (
    <>
      <Head>
        <title>Terms of Service - PITCHLY</title>
        <meta name="description" content="PITCHLY's terms of service - rules and guidelines for using our platform" />
      </Head>

      <Navbar />

      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-16">
        <div className="max-w-4xl mx-auto px-6 py-12">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">Terms of Service</h1>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              Effective Date: September 1, 2025 | Last Updated: September 1, 2025
            </p>

            <div className="prose prose-lg dark:prose-invert max-w-none">
              <h2>Agreement to Terms</h2>
              <p>
                By accessing or using PITCHLY ("the Service"), you agree to be bound by these Terms of 
                Service ("Terms"). If you disagree with any part of these terms, you may not access 
                the Service.
              </p>

              <h2>Description of Service</h2>
              <p>
                PITCHLY is an AI-powered platform that helps users create professional business proposals. 
                Our service uses artificial intelligence to generate, edit, and improve proposal content 
                based on user input.
              </p>

              <h2>User Accounts</h2>
              <h3>Account Creation</h3>
              <ul>
                <li>You must provide accurate, current, and complete information</li>
                <li>You are responsible for maintaining the security of your account</li>
                <li>You must be at least 18 years old to use our service</li>
                <li>One person or entity may maintain only one account</li>
              </ul>

              <h3>Account Responsibilities</h3>
              <p>You are responsible for:</p>
              <ul>
                <li>All activities that occur under your account</li>
                <li>Maintaining the confidentiality of your login credentials</li>
                <li>Notifying us immediately of any unauthorized use</li>
              </ul>

              <h2>Acceptable Use Policy</h2>
              <h3>Permitted Uses</h3>
              <p>You may use PITCHLY to:</p>
              <ul>
                <li>Create business proposals for legitimate commercial purposes</li>
                <li>Generate and revise proposal content</li>
                <li>Export proposals in various formats</li>
                <li>Manage your proposal library</li>
              </ul>

              <h3>Prohibited Uses</h3>
              <p>You may not use PITCHLY to:</p>
              <ul>
                <li>Create content that is illegal, harmful, or violates others' rights</li>
                <li>Generate spam, deceptive, or fraudulent content</li>
                <li>Impersonate others or misrepresent your identity</li>
                <li>Attempt to reverse engineer or compromise our systems</li>
                <li>Use the service for any unlawful purpose</li>
                <li>Upload malicious code or attempt unauthorized access</li>
              </ul>

              <h2>Intellectual Property Rights</h2>
              <h3>Your Content</h3>
              <p>
                You retain ownership of the content you input into PITCHLY, including project 
                descriptions, client information, and other data. You grant us a license to 
                process this content to provide our services.
              </p>

              <h3>Generated Content</h3>
              <p>
                AI-generated proposal content belongs to you. However, similar content may be 
                generated for other users based on similar inputs, as AI models can produce 
                comparable outputs from similar prompts.
              </p>

              <h3>Our Intellectual Property</h3>
              <p>
                PITCHLY's software, algorithms, design, and branding remain our exclusive property. 
                You may not copy, modify, or distribute our intellectual property.
              </p>

              <h2>AI-Generated Content Disclaimer</h2>
              <p>
                PITCHLY uses artificial intelligence to generate proposal content. While we strive 
                for accuracy and quality:
              </p>
              <ul>
                <li>AI-generated content may contain errors or inaccuracies</li>
                <li>You should review and verify all generated content</li>
                <li>We are not responsible for the accuracy of AI-generated content</li>
                <li>You are responsible for ensuring compliance with applicable laws</li>
              </ul>

              <h2>Privacy and Data</h2>
              <p>
                Your privacy is important to us. Our collection and use of personal information 
                is governed by our{' '}
                <Link href="/privacy" className="text-primary-600 dark:text-primary-400">
                  Privacy Policy
                </Link>
                , which is incorporated into these Terms by reference.
              </p>

              <h2>Payment Terms</h2>
              <h3>Free Tier</h3>
              <p>
                We offer a limited free tier that includes basic proposal generation capabilities.
              </p>

              <h3>Paid Subscriptions</h3>
              <p>
                Premium features may require paid subscriptions. By subscribing, you agree to pay 
                the specified fees. Subscriptions will automatically renew unless cancelled.
              </p>

              <h3>Refunds</h3>
              <p>
                Refunds may be provided at our discretion and in accordance with our refund policy.
              </p>

              <h2>Service Availability</h2>
              <p>
                While we strive for high availability:
              </p>
              <ul>
                <li>We do not guarantee uninterrupted access to our service</li>
                <li>We may perform maintenance that temporarily affects availability</li>
                <li>We reserve the right to modify or discontinue features</li>
              </ul>

              <h2>Limitation of Liability</h2>
              <p>
                TO THE MAXIMUM EXTENT PERMITTED BY LAW:
              </p>
              <ul>
                <li>We provide the service "as is" without warranties of any kind</li>
                <li>We are not liable for indirect, incidental, or consequential damages</li>
                <li>Our total liability shall not exceed the amount you paid for the service</li>
                <li>We are not responsible for third-party content or services</li>
              </ul>

              <h2>Indemnification</h2>
              <p>
                You agree to indemnify and hold harmless PITCHLY from any claims, damages, or 
                expenses arising from your use of the service, violation of these terms, or 
                infringement of others' rights.
              </p>

              <h2>Termination</h2>
              <h3>Termination by You</h3>
              <p>
                You may terminate your account at any time by contacting us or using account 
                deletion features.
              </p>

              <h3>Termination by Us</h3>
              <p>
                We may suspend or terminate your account if you:
              </p>
              <ul>
                <li>Violate these Terms of Service</li>
                <li>Engage in fraudulent or illegal activities</li>
                <li>Fail to pay required fees</li>
                <li>Abuse or misuse our service</li>
              </ul>

              <h2>Dispute Resolution</h2>
              <p>
                Any disputes arising from these terms or the service will be resolved through 
                binding arbitration, except where prohibited by law. You waive the right to 
                participate in class action lawsuits.
              </p>

              <h2>Governing Law</h2>
              <p>
                These Terms are governed by the laws of the jurisdiction where PITCHLY operates, 
                without regard to conflict of law principles.
              </p>

              <h2>Changes to Terms</h2>
              <p>
                We reserve the right to modify these Terms at any time. We will notify users of 
                material changes by email or through the service. Continued use after notification 
                constitutes acceptance of the new terms.
              </p>

              <h2>Severability</h2>
              <p>
                If any provision of these Terms is found to be unenforceable, the remaining 
                provisions will remain in full force and effect.
              </p>

              <h2>Contact Information</h2>
              <p>
                Questions about these Terms? Contact us:
              </p>
              <ul>
                <li>Email: <a href="mailto:hello@usepitchly.com" className="text-primary-600 dark:text-primary-400">hello@usepitchly.com</a></li>
                <li>Website: <Link href="/contact" className="text-primary-600 dark:text-primary-400">Contact Form</Link></li>
              </ul>

              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 mt-8">
                <h3 className="text-lg font-semibold mb-2">Key Points Summary</h3>
                <ul className="text-sm space-y-1">
                  <li>• Use PITCHLY responsibly for legitimate business purposes</li>
                  <li>• You own your content; we process it to provide our service</li>
                  <li>• AI-generated content should be reviewed for accuracy</li>
                  <li>• We strive for high service quality but provide no guarantees</li>
                  <li>• Contact us with questions or concerns</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}