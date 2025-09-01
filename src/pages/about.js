import Head from 'next/head';
import Link from 'next/link';
import Navbar from '../components/Navbar';

export default function About() {
  return (
    <>
      <Head>
        <title>About Us - PITCHLY</title>
        <meta name="description" content="Learn about PITCHLY's mission to revolutionize business proposal creation with AI-powered tools" />
      </Head>

      <Navbar />

      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-16">
        <div className="max-w-4xl mx-auto px-6 py-12">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-3 mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-primary-600 to-blue-600 rounded-2xl flex items-center justify-center">
                <svg className="w-9 h-9 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </div>
              <h1 className="text-4xl font-black text-gray-900 dark:text-gray-100">PITCHLY</h1>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6">
              Revolutionizing Business Proposals with AI
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              We're on a mission to help businesses win more clients by creating compelling, 
              professional proposals that showcase their true value.
            </p>
          </div>

          {/* Story Section */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-12">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">Our Story</h3>
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                PITCHLY was born from a simple observation: too many talented professionals and 
                businesses were losing opportunities not because they lacked skills or expertise, 
                but because their proposals didn't effectively communicate their value.
              </p>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                We watched freelancers, agencies, and consultants spend hours crafting proposals, 
                only to receive generic rejections. Meanwhile, clients struggled to find partners 
                who could clearly articulate how they'd solve their problems.
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                That's when we realized the power of AI could bridge this gap. By combining 
                cutting-edge artificial intelligence with proven proposal best practices, 
                we created PITCHLY—a platform that transforms basic project details into 
                compelling, personalized proposals that win business.
              </p>
            </div>
          </div>

          {/* Mission & Values */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
              <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-primary-600 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">Our Mission</h3>
              <p className="text-gray-600 dark:text-gray-300">
                To democratize professional proposal creation, giving every business—regardless 
                of size or resources—the tools to present their services with confidence and 
                win the clients they deserve.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">Our Values</h3>
              <ul className="text-gray-600 dark:text-gray-300 space-y-2">
                <li>• <strong>Quality:</strong> Every proposal should reflect excellence</li>
                <li>• <strong>Simplicity:</strong> Powerful tools should be easy to use</li>
                <li>• <strong>Results:</strong> We measure success by your wins</li>
                <li>• <strong>Innovation:</strong> AI should enhance, not replace, human creativity</li>
              </ul>
            </div>
          </div>

          {/* Why Choose Us */}
          <div className="bg-gradient-to-r from-primary-50 to-blue-50 dark:from-gray-800 dark:to-gray-700 rounded-xl p-8 mb-12">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6 text-center">
              Why Professionals Choose PITCHLY
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-white">80%</span>
                </div>
                <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Higher Win Rate</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Our AI-powered proposals achieve significantly higher acceptance rates
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-white">90%</span>
                </div>
                <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Time Saved</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Generate professional proposals in minutes, not hours
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-white">24/7</span>
                </div>
                <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Always Available</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Create and revise proposals whenever inspiration strikes
                </p>
              </div>
            </div>
          </div>

          {/* Team Section */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-12">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">Our Commitment</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              We're a dedicated team of entrepreneurs, developers, and business professionals who 
              understand the challenges of winning new business. We've been where you are—crafting 
              proposals late into the night, wondering if we're highlighting the right points, 
              and anxiously waiting for client responses.
            </p>
            <p className="text-gray-600 dark:text-gray-300">
              That experience drives our commitment to making PITCHLY the most intuitive, 
              effective, and valuable tool in your business development arsenal. Every feature 
              we build is tested by real professionals facing real challenges.
            </p>
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Ready to Transform Your Proposals?
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              Join thousands of professionals who are winning more business with PITCHLY
            </p>
            <Link href="/auth/signin" className="btn-primary mr-4">
              Get Started Free
            </Link>
            <Link href="/contact" className="btn-secondary">
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}