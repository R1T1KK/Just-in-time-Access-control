-- Add JIT access timestamp columns to visitors table (required by VisitorService)
ALTER TABLE visitors
    ADD COLUMN IF NOT EXISTS access_granted_at TIMESTAMP,
    ADD COLUMN IF NOT EXISTS access_expires_at TIMESTAMP;
