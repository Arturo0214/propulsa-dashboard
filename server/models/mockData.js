// Mock data for development - will be replaced by Supabase queries
export const businesses = [
  {
    id: 'tesipedia',
    name: 'Tesipedia',
    description: 'Plataforma de servicios académicos con escritores profesionales',
    type: 'education',
    status: 'active',
    url: 'https://primary-production-73558.up.railway.app',
    icon: '📚',
    color: '#6366f1',
    revenue: { total: 45200, monthly: 8200, growth: 12.5 },
    metrics: {
      clients: 156,
      activeProjects: 23,
      completedProjects: 342,
      avgRating: 4.8
    },
    agent: {
      id: 'sofia-ai',
      name: 'Sofia AI',
      type: 'customer-service',
      status: 'active',
      platform: 'Railway',
      workflowUrl: 'https://primary-production-73558.up.railway.app/home/workflows',
      conversations: 1247,
      avgResponseTime: '2.3s',
      satisfaction: 94,
      lastActive: '2026-03-19T10:30:00Z'
    },
    createdAt: '2024-06-15T00:00:00Z'
  },
  {
    id: 'finance-scool',
    name: 'Finance SCool',
    description: 'Escuela de finanzas personales y asesoría financiera',
    type: 'finance',
    status: 'active',
    url: null,
    icon: '💰',
    color: '#10b981',
    revenue: { total: 18500, monthly: 4250, growth: 28.3 },
    metrics: {
      clients: 89,
      activeProjects: 12,
      completedProjects: 67,
      avgRating: 4.6
    },
    agent: {
      id: 'finance-agent',
      name: 'Finance Agent',
      type: 'lead-generation',
      status: 'development',
      platform: 'Supabase',
      workflowUrl: null,
      conversations: 0,
      avgResponseTime: '--',
      satisfaction: 0,
      lastActive: null
    },
    createdAt: '2025-09-01T00:00:00Z'
  },
  {
    id: 'taqueria-agent',
    name: 'Taquería AI',
    description: 'Agente inteligente para taquería - pedidos, inventario y atención al cliente',
    type: 'food',
    status: 'development',
    url: null,
    icon: '🌮',
    color: '#f59e0b',
    revenue: { total: 0, monthly: 0, growth: 0 },
    metrics: {
      clients: 0,
      activeProjects: 0,
      completedProjects: 0,
      avgRating: 0
    },
    agent: {
      id: 'taqueria-bot',
      name: 'TacoBot',
      type: 'orders-inventory',
      status: 'planning',
      platform: 'TBD',
      workflowUrl: null,
      conversations: 0,
      avgResponseTime: '--',
      satisfaction: 0,
      lastActive: null
    },
    createdAt: '2026-03-15T00:00:00Z'
  }
];

export const agencyStats = {
  totalRevenue: 63700,
  monthlyRevenue: 12450,
  totalClients: 245,
  activeBusinesses: 2,
  totalBusinesses: 3,
  activeAgents: 1,
  totalAgents: 3,
  revenueHistory: [
    { month: 'Oct', revenue: 6200 },
    { month: 'Nov', revenue: 7800 },
    { month: 'Dec', revenue: 9100 },
    { month: 'Ene', revenue: 10200 },
    { month: 'Feb', revenue: 11300 },
    { month: 'Mar', revenue: 12450 }
  ],
  recentActivity: [
    { id: 1, business: 'Tesipedia', action: 'Nuevo proyecto completado', time: 'Hace 2 horas', type: 'success' },
    { id: 2, business: 'Tesipedia', action: 'Sofia AI respondió 15 conversaciones', time: 'Hace 3 horas', type: 'info' },
    { id: 3, business: 'Finance SCool', action: 'Nuevo lead capturado', time: 'Hace 5 horas', type: 'success' },
    { id: 4, business: 'Taquería AI', action: 'Diseño de agente iniciado', time: 'Hace 1 día', type: 'warning' },
    { id: 5, business: 'Finance SCool', action: 'Sesión de asesoría programada', time: 'Hace 1 día', type: 'info' },
    { id: 6, business: 'Tesipedia', action: 'Pago de $3,500 recibido', time: 'Hace 2 días', type: 'success' }
  ]
};
