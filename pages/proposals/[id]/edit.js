// pages/proposals/[id]/edit.js

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '../../../lib/supabase';

export default function EditProposalPage() {
  const router = useRouter();
  const { id } = router.query;

  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [proposal, setProposal] = useState(null);
  const [formData, setFormData] = useState({
    client_name: '',
    salutation: '',
    sender_name: '',
    title: '',
    content: ''
  });

  useEffect(() => {
    if (!id) return;
    const fetchProposal = async () => {
      const { data, error } = await supabase
        .from('proposals')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        console.error('Failed to load proposal:', error);
      } else {
        setProposal(data);
        setFormData({
          client_name: data.client_name || '',
          salutation: data.salutation || '',
          sender_name: data.sender_name || '',
          title: data.title || '',
          content: data.content || '',
        });
      }

      setLoading(false);
    };

    fetchProposal();
  }, [id]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdating(true);

    const { error } = await supabase
      .from('proposals')
      .update(formData)
      .eq('id', id);

    setUpdating(false);

    if (error) {
      alert('Failed to update proposal.');
      console.error(error);
    } else {
      router.push(`/proposals/${id}`);
    }
  };

  if (loading) return <p className="p-6">Loading proposal...</p>;
  if (!proposal) return <p className="p-6">Proposal not found.</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 text-gray-900 dark:text-gray-100">
      <h1 className="text-2xl font-bold mb-6">Edit Proposal</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        {['client_name', 'salutation', 'sender_name', 'title', 'content'].map((field) => (
          <div key={field}>
            <label className="block font-medium capitalize">
              {field.replace('_', ' ')}
            </label>
            {field === 'content' ? (
              <textarea
                name={field}
                value={formData[field]}
                onChange={handleChange}
                rows={6}
                className="w-full p-2 rounded bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700"
              />
            ) : (
              <input
                type="text"
                name={field}
                value={formData[field]}
                onChange={handleChange}
                className="w-full p-2 rounded bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700"
              />
            )}
          </div>
        ))}
        <button
          type="submit"
          disabled={updating}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded disabled:opacity-50"
        >
          {updating ? 'Updating...' : 'Save Changes'}
        </button>
      </form>
    </div>
  );
}