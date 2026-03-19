import { Router } from 'express';
import supabase from '../config/supabase.js';
import { agencyStats } from '../models/mockData.js';

const router = Router();

// GET dashboard overview stats
router.get('/stats', async (req, res) => {
  try {
    if (supabase) {
      const { data, error } = await supabase.from('dashboard_stats').select('*').single();
      if (error) throw error;
      return res.json(data);
    }
    res.json(agencyStats);
  } catch (err) {
    console.error('Error fetching stats:', err);
    res.status(500).json({ error: 'Error fetching dashboard stats' });
  }
});

export default router;
