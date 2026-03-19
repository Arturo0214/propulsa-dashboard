import { useNavigate } from 'react-router-dom';
import {
  DollarSign, Users, Bot, TrendingUp,
  Plus, Download, ChevronRight
} from 'lucide-react';
import {
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer
} from 'recharts';
import { useBusinesses, useDashboardStats } from '../hooks/useApi';

const formatMoney = (n) => {
  if (n >= 1000) return `$${(n / 1000).toFixed(n % 1000 === 0 ? 0 : 1)}k`;
  return `$${n}`;
};

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div style={{
      background: '#18181b', border: '1px solid rgba(255,255,255,0.08)',
      borderRadius: 8, padding: '10px 14px', fontSize: 12, boxShadow: '0 8px 24px rgba(0,0,0,0.6)'
    }}>
      <p style={{ color: '#a1a1aa', marginBottom: 3, fontSize: 11 }}>{label}</p>
      <p style={{ fontWeight: 700, color: '#818cf8', fontSize: 14 }}>
        ${payload[0].value.toLocaleString()}
      </p>
    </div>
  );
}

export default function Dashboard() {
  const navigate = useNavigate();
  const { businesses, loading: bLoading } = useBusinesses();
  const { stats, loading: sLoading } = useDashboardStats();

  if (bLoading || sLoading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '60vh' }}>
        <div style={{ color: 'var(--text-secondary)', fontSize: 14 }}>Cargando dashboard...</div>
      </div>
    );
  }

  const statCards = [
    { label: 'Ingreso mensual', value: formatMoney(stats.monthlyRevenue), badge: '+18.2%', positive: true, icon: <DollarSign size={18} />, color: '#6366f1' },
    { label: 'Ingreso total acumulado', value: formatMoney(stats.totalRevenue), badge: `${stats.totalBusinesses} negocios`, positive: false, icon: <TrendingUp size={18} />, color: '#10b981' },
    { label: 'Clientes totales', value: stats.totalClients.toString(), badge: '+12 este mes', positive: true, icon: <Users size={18} />, color: '#06b6d4' },
    { label: 'Agentes activos', value: `${stats.activeAgents}`, valueSuffix: ` / ${stats.totalAgents}`, icon: <Bot size={18} />, color: '#f59e0b' }
  ];

  return (
    <div>
      {/* Header */}
      <div className="page-header">
        <div>
          <h2>Dashboard</h2>
          <p>Resumen general de Propulsa y todos tus negocios</p>
        </div>
        <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
          <button className="btn btn-ghost">
            <Download size={14} /> Exportar
          </button>
          <button className="btn btn-primary">
            <Plus size={14} /> Nuevo Negocio
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="stats-grid">
        {statCards.map((card, i) => (
          <div key={i} className="stat-card animate-in">
            <div className="stat-card-header">
              <div className="stat-card-icon" style={{ background: `${card.color}15` }}>
                <span style={{ color: card.color }}>{card.icon}</span>
              </div>
              {card.badge && (
                <span className={`stat-card-badge ${card.positive ? 'positive' : 'neutral'}`}>
                  {card.badge}
                </span>
              )}
            </div>
            <h3>
              {card.value}
              {card.valueSuffix && (
                <span style={{ fontSize: 16, color: 'var(--text-muted)', fontWeight: 500 }}>
                  {card.valueSuffix}
                </span>
              )}
            </h3>
            <p>{card.label}</p>
          </div>
        ))}
      </div>

      {/* Businesses */}
      <div className="section-header">
        <h3>Mis Negocios</h3>
        <span className="section-header-link">
          Ver todos <ChevronRight size={14} />
        </span>
      </div>

      <div className="business-grid">
        {businesses.map(biz => (
          <div
            key={biz.id}
            className="business-card animate-in"
            onClick={() => navigate(`/business/${biz.id}`)}
          >
            <div className="business-card-accent" style={{ background: `linear-gradient(90deg, ${biz.color}, ${biz.color}88)` }} />
            <div className="business-card-body">
              <div className="business-card-header">
                <div className="business-card-icon">{biz.icon}</div>
                <div className={`business-status ${biz.status}`}>
                  <span className="business-status-dot" />
                  {biz.status === 'active' ? 'Activo' : biz.status === 'development' ? 'En desarrollo' : 'Pausado'}
                </div>
              </div>
              <h3>{biz.name}</h3>
              <p className="description">{biz.description}</p>
              <div className="business-card-metrics">
                <div className="business-metric">
                  <div className="value" style={{ color: biz.color }}>
                    {biz.revenue.monthly > 0 ? formatMoney(biz.revenue.monthly) : '—'}
                  </div>
                  <div className="label">Mensual</div>
                </div>
                <div className="business-metric">
                  <div className="value">{biz.metrics.clients || '—'}</div>
                  <div className="label">Clientes</div>
                </div>
                <div className="business-metric">
                  <div className="value">
                    {biz.agent.status === 'active' ? (
                      <span style={{ color: '#10b981', fontSize: 12 }}>● Activo</span>
                    ) : biz.agent.status === 'development' ? (
                      <span style={{ color: '#f59e0b', fontSize: 12 }}>◐ Dev</span>
                    ) : (
                      <span style={{ color: '#52525b', fontSize: 12 }}>○ Plan</span>
                    )}
                  </div>
                  <div className="label">Agente</div>
                </div>
              </div>
            </div>
          </div>
        ))}

        <div className="add-business-card animate-in">
          <Plus size={20} />
          <p>Agregar negocio</p>
          <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>
            Restaurantes, tiendas, servicios...
          </span>
        </div>
      </div>

      {/* Revenue Chart + Activity */}
      <div className="grid-3">
        <div className="chart-container animate-in">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
            <h4 style={{ fontSize: 14, fontWeight: 700 }}>Ingresos Mensuales</h4>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 11, color: 'var(--text-muted)' }}>
                <span style={{ width: 8, height: 8, borderRadius: 2, background: '#6366f1', display: 'inline-block' }} />
                Tesipedia
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 11, color: 'var(--text-muted)' }}>
                <span style={{ width: 8, height: 8, borderRadius: 2, background: '#10b981', display: 'inline-block' }} />
                Finance
              </span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={stats.revenueHistory}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis
                dataKey="month"
                tick={{ fill: '#52525b', fontSize: 11 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fill: '#52525b', fontSize: 11 }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v) => `$${v / 1000}k`}
                width={40}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="#6366f1"
                strokeWidth={2}
                fill="url(#colorRevenue)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="animate-in">
          <div className="activity-feed" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '18px 20px 14px' }}>
              <h4 style={{ fontSize: 14, fontWeight: 700 }}>Actividad Reciente</h4>
              <span className="section-header-link" style={{ fontSize: 11 }}>Ver todo</span>
            </div>
            <div style={{ flex: 1 }}>
              {stats.recentActivity.map(item => (
                <div key={item.id} className="activity-item">
                  <div className={`activity-dot ${item.type}`} />
                  <div className="activity-content">
                    <strong>{item.business}</strong>
                    <p>{item.action}</p>
                  </div>
                  <span className="activity-time">{item.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
