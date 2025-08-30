// pages/index.js

import Head from 'next/head';
import ProposalForm from '../components/ProposalForm';

export default function Home() {
  return (
    <>
      <Head>
        <title>Pitchly - Generate Proposals</title>
      </Head>
      <main className="min-h-screen bg-white dark:bg-gray-900">
        <h1 className="text-3xl font-bold text-center py-10 text-gray-800 dark:text-gray-100">
          Pitchly Proposal Generator
        </h1>
        <ProposalForm />
      </main>
    </>
  );
}
