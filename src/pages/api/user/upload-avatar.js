import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';
import { createClient } from '@supabase/supabase-js';
import formidable from 'formidable';
import fs from 'fs';
import path from 'path';

// Create Supabase client with service role for file uploads
const supabase = createClient(
  process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY
);

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const session = await getServerSession(req, res, authOptions);
  
  if (!session) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const form = formidable({
      maxFileSize: 5 * 1024 * 1024, // 5MB limit
      filter: ({ mimetype }) => {
        // Only allow image files
        return mimetype && mimetype.includes('image');
      }
    });

    const [fields, files] = await form.parse(req);
    const file = files.avatar?.[0];

    if (!file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (!allowedTypes.includes(file.mimetype)) {
      return res.status(400).json({ message: 'Invalid file type. Only JPEG, PNG, GIF, and WebP are allowed.' });
    }

    // Read file
    const fileBuffer = fs.readFileSync(file.filepath);
    const fileExtension = path.extname(file.originalFilename || '').toLowerCase() || '.jpg';
    const fileName = `${session.user.id}-${Date.now()}${fileExtension}`;

    // Upload to Supabase Storage
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('avatars')
      .upload(fileName, fileBuffer, {
        contentType: file.mimetype,
        upsert: true
      });

    if (uploadError) {
      console.error('Upload error:', uploadError);
      return res.status(500).json({ message: 'Failed to upload file' });
    }

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from('avatars')
      .getPublicUrl(fileName);

    // Update user's image in database
    const { error: updateError } = await supabase
      .from('users')
      .update({ image: publicUrl })
      .eq('id', session.user.id);

    if (updateError) {
      console.error('Database update error:', updateError);
      return res.status(500).json({ message: 'Failed to update user profile' });
    }

    // Clean up temp file
    fs.unlinkSync(file.filepath);

    res.status(200).json({
      success: true,
      imageUrl: publicUrl,
      message: 'Avatar uploaded successfully'
    });

  } catch (error) {
    console.error('Avatar upload error:', error);
    res.status(500).json({ 
      message: 'Failed to upload avatar. Please try again.',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}