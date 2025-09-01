import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default async function handler(req, res) {
  try {
    // Try to get schema info by selecting from proposals table
    const { data, error } = await supabase
      .from('proposals')
      .select('*')
      .limit(1);

    if (error) {
      return res.status(500).json({ error: error.message, code: error.code });
    }

    // Get table info from information_schema if possible
    const { data: schemaData, error: schemaError } = await supabase
      .from('information_schema.columns')
      .select('column_name, data_type')
      .eq('table_name', 'proposals');

    return res.status(200).json({
      sample_data: data,
      schema_info: schemaData,
      schema_error: schemaError
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}