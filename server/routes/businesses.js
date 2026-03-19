import { Router } from 'express';
import supabase from '../config/supabase.js';
import { businesses } from '../models/mockData.js';

const router = Router();

// GET all businesses
router.get('/', async (req, res) => {
  try {
    if (supabase) {
      const { data, error } = await supabase.from('businesses').select('*');
      if (error) throw error;
      return res.json(data);
    }
    res.json(businesses);
  } catch (err) {
    console.error('Error fetching businesses:', err);
    res.status(500).json({ error: 'Error fetching businesses' });
  }
});

// GET single business
router.get('/:id', async (req, res) => {
  try {
    if (supabase) {
      const { data, error } = await supabase.from('businesses').select('*').eq('id', req.params.id).single();
      if (error) throw error;
      return res.json(data);
    }
    const business = businesses.find(b => b.id === req.params.id);
    if (!business) return res.status(404).json({ error: 'Business not found' });
    res.json(business);
  } catch (err) {
    console.error('Error fetching business:', err);
    res.status(500).json({ error: 'Error fetching business' });
  }
});

// POST new business
router.post('/', async (req, res) => {
  try {
    const newBusiness = {
      ...req.body,
      id: req.body.name.toLowerCase().replace(/\s+/g, '-'),
      createdAt: new Date().toISOString(),
      status: 'development',
      revenue: { total: 0, monthly: 0, growth: 0 },
      metrics: { clients: 0, activeProjects: 0, completedProjects: 0, avgRating: 0 }
    };
    if (supabase) {
      const { data, error } = await supabase.from('businesses').insert(newBusiness).select().single();
      if (error) throw error;
      return res.status(201).json(data);
    }
    businesses.push(newBusiness);
    res.status(201).json(newBusiness);
  } catch (err) {
    console.error('Error creating business:', err);
    res.status(500).json({ error: 'Error creating business' });
  }
});

// PATCH update business
router.patch('/:id', async (req, res) => {
  try {
    if (supabase) {
      const { data, error } = await supabase.from('businesses').update(req.body).eq('id', req.params.id).select().single();
      if (error) throw error;
      return res.json(data);
    }
    const idx = businesses.findIndex(b => b.id === req.params.id);
    if (idx === -1) return res.status(404).json({ error: 'Business not found' });
    businesses[idx] = { ...businesses[idx], ...req.body };
    res.json(businesses[idx]);
  } catch (err) {
    console.error('Error updating business:', err);
    res.status(500).json({ error: 'Error updating business' });
  }
});

export default router;
