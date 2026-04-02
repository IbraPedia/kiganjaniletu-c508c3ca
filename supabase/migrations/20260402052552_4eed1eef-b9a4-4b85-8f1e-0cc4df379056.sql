ALTER TABLE public.posts ADD COLUMN IF NOT EXISTS type text NOT NULL DEFAULT 'thread';

-- Update the insert policy for system to also allow type
-- No RLS changes needed since type is just a column