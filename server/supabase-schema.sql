-- ============================================
-- AGENCY DASHBOARD - Supabase Schema
-- ============================================

-- Businesses table
CREATE TABLE IF NOT EXISTS businesses (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  type TEXT NOT NULL CHECK (type IN ('education', 'finance', 'food', 'retail', 'services', 'other')),
  status TEXT NOT NULL DEFAULT 'development' CHECK (status IN ('active', 'development', 'paused', 'inactive')),
  url TEXT,
  icon TEXT DEFAULT '🏢',
  color TEXT DEFAULT '#6366f1',
  revenue JSONB DEFAULT '{"total": 0, "monthly": 0, "growth": 0}',
  metrics JSONB DEFAULT '{"clients": 0, "activeProjects": 0, "completedProjects": 0, "avgRating": 0}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Agents table
CREATE TABLE IF NOT EXISTS agents (
  id TEXT PRIMARY KEY,
  business_id TEXT REFERENCES businesses(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('customer-service', 'lead-generation', 'orders-inventory', 'scheduling', 'general')),
  status TEXT NOT NULL DEFAULT 'planning' CHECK (status IN ('active', 'development', 'planning', 'paused', 'inactive')),
  platform TEXT,
  workflow_url TEXT,
  conversations INTEGER DEFAULT 0,
  avg_response_time TEXT DEFAULT '--',
  satisfaction INTEGER DEFAULT 0,
  last_active TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Revenue history
CREATE TABLE IF NOT EXISTS revenue_history (
  id SERIAL PRIMARY KEY,
  business_id TEXT REFERENCES businesses(id) ON DELETE CASCADE,
  month TEXT NOT NULL,
  year INTEGER NOT NULL,
  revenue DECIMAL(12,2) DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Activity log
CREATE TABLE IF NOT EXISTS activity_log (
  id SERIAL PRIMARY KEY,
  business_id TEXT REFERENCES businesses(id) ON DELETE CASCADE,
  action TEXT NOT NULL,
  type TEXT DEFAULT 'info' CHECK (type IN ('success', 'info', 'warning', 'error')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE businesses ENABLE ROW LEVEL SECURITY;
ALTER TABLE agents ENABLE ROW LEVEL SECURITY;
ALTER TABLE revenue_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE activity_log ENABLE ROW LEVEL SECURITY;

-- Policies (allow all for service role)
CREATE POLICY "Allow all for service role" ON businesses FOR ALL USING (true);
CREATE POLICY "Allow all for service role" ON agents FOR ALL USING (true);
CREATE POLICY "Allow all for service role" ON revenue_history FOR ALL USING (true);
CREATE POLICY "Allow all for service role" ON activity_log FOR ALL USING (true);
