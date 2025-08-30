// pages/auth/signin.js

import { getProviders, signIn } from 'next-auth/react';

export async function getServerSideProps() {
  const providers = await getProviders();
  return {
    props: { providers },
  };
}

export default function SignIn({ providers }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gray-50 dark:bg-gray-900">
      <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100">Sign In</h1>
      {Object.values(providers).map((provider) => (
        <div key={provider.name} className="mb-4">
          <button
            onClick={() => signIn(provider.id)}
            className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Sign in with {provider.name}
          </button>
        </div>
      ))}
    </div>
  );
}
