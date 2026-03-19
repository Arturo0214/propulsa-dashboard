import { Router } from 'express';
import supabase from '../config/supabase.js';
import { businesses } from '../models/mockData.js';

const router = Router();

// GET all agents across businesses
router.get('/', async (req, res) => {
  try {
    if (supabase) {
      const { data, error } = await supabase.from('agents').select('*');
      if (error) throw error;
      return res.json(data);
    }
    const agents = businesses.map(b => ({
      ...b.agent,
      businessId: b.id,
      businessName: b.name,
      businessIcon: b.icon,
      businessColor: b.color
    }));
    res.json(agents);
  } catch (err) {
    console.error('Error fetching agents:', err);
    res.status(500).json({ error: 'Error fetching agents' });
  }
});

// GET agent by id
router.get('/:id', async (req, res) => {
  try {
    if (supabase) {
      const { data, error } = await supabase.from('agents').select('*').eq('id', req.params.id).single();
      if (error) throw error;
      return res.json(data);
    }
    const business = businesses.find(b => b.agent.id === req.params.id);
    if (!business) return res.status(404).json({ error: 'Agent not found' });
    res.json({ ...business.agent, businessId: business.id, businessName: business.name });
  } catch (err) {
    console.error('Error fetching agent:', err);
    res.status(500).json({ error: 'Error fetching agent' });
  }
});

export default router;
