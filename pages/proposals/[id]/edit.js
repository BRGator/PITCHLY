// pages/proposals/[id]/edit.js

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '../../../lib/supabase';

export default function EditProposalPage() {
  const router = useRouter();
  const { id } = router.query;

  const [formData, setFormData] = useState({
    client_name: '',
    salutation: '',
    sender_name: '',
    title: '',
    content: '',
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!id) return;

    async function fetchProposal() {
      const { data, error } = await supabase
        .from('proposals')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        setError('Failed to fetch proposal.');
        console.error('Fetch error:', error);
      } else {
        setFormData(data);
      }
      setLoading(false);
    }

    fetchProposal();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');

    const { error } = await supabase
      .from('proposals')
      .update(formData)
      .eq('id', id);

    setSaving(false);

    if (error) {
      setError('Failed to save proposal.');
      console.error('Save error:', error);
    } else {
      router.push(`/proposals/${id}`);
    }
  };

  if (loading) return <p className="p-4">Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 text-gray-900 dark:text-gray-100">
      <h1 className="text-2xl font-bold mb-6">Edit Proposal</h1>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <form onSubmit={handleSave} className="space-y-6">
        <div>
          <label className="block font-medium">To (Client Name)</label>
          <input
            name="client_name"
            type="text"
            value={formData.client_name}
            onChange={handleChange}
            required
            className="w-full p-2 rounded bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700"
          />
        </div>

        <div>
          <label className="block font-medium">Salutation</label>
          <input
            name="salutation"
            type="text"
            value={formData.salutation}
            onChange={handleChange}
            required
            className="w-full p-2 rounded bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700"
          />
        </div>

        <div>
          <label className="block font-medium">From (Your Name)</label>
          <input
            name="sender_name"
            type="text"
            value={formData.sender_name}
            onChange={handleChange}
            required
            className="w-full p-2 rounded bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700"
          />
        </div>

        <div>
          <label className="block font-medium">Proposal Title</label>
          <input
            name="title"
            type="text"
            value={formData.title}
            onChange={handleChange}
            className="w-full p-2 rounded bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700"
          />
        </div>

        <div>
          <label className="block font-medium">Proposal Content</label>
          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            rows={8}
            className="w-full p-2 rounded bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700"
            required
          />
        </div>

        <button
          type="submit"
          disabled={saving}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded disabled:opacity-50"
        >
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </form>
    </div>
  );
}
