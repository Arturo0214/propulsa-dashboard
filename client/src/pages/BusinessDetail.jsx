import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft, ExternalLink, Bot, Users, Briefcase,
  Star, TrendingUp, MessageCircle, Clock, ThumbsUp,
  Zap
} from 'lucide-react';
import { useBusiness } from '../hooks/useApi';

const formatMoney = (n) => `$${n.toLocaleString()}`;

const typeLabels = {
  'customer-service': 'Atención al Cliente',
  'lead-generation': 'Generación de Leads',
  'orders-inventory': 'Pedidos e Inventario',
  'scheduling': 'Agendamiento',
  'general': 'General'
};

const statusLabels = {
  active: 'Activo',
  development: 'En Desarrollo',
  planning: 'En Planeación',
  paused: 'Pausado',
  inactive: 'Inactivo'
};

export default function BusinessDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { business, loading } = useBusiness(id);

  if (loading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '60vh' }}>
        <div style={{ color: 'var(--text-secondary)', fontSize: 15 }}>Cargando...</div>
      </div>
    );
  }

  if (!business) {
    return (
      <div className="empty-state">
        <h3>Negocio no encontrado</h3>
        <p>El negocio que buscas no existe.</p>
        <button className="btn btn-primary" style={{ marginTop: 16 }} onClick={() => navigate('/')}>
          Volver al Dashboard
        </button>
      </div>
    );
  }

  const agent = business.agent;

  return (
    <div>
      <div className="detail-back" onClick={() => navigate('/')}>
        <ArrowLeft size={16} /> Volver al dashboard
      </div>

      {/* Hero Section */}
      <div className="detail-hero animate-in" style={{ '--card-accent': business.color }}>
        <div className="detail-hero-header">
          <div className="detail-icon">{business.icon}</div>
          <div className="detail-title" style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <h2>{business.name}</h2>
              <div className={`business-status ${business.status}`}>
                <span className="business-status-dot" />
                {business.status === 'active' ? 'Activo' : business.status === 'development' ? 'En desarrollo' : 'Pausado'}
              </div>
            </div>
            <p>{business.description}</p>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            {business.url && (
              <a href={business.url} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
                <ExternalLink size={14} /> Ver sitio
              </a>
            )}
          </div>
        </div>

        <div className="detail-stats">
          <div className="detail-stat">
            <div className="value" style={{ color: business.color }}>
              {business.revenue.monthly > 0 ? formatMoney(business.revenue.monthly) : '--'}
            </div>
            <div className="label">Ingreso Mensual</div>
          </div>
          <div className="detail-stat">
            <div className="value">{business.revenue.total > 0 ? formatMoney(business.revenue.total) : '--'}</div>
            <div className="label">Ingreso Total</div>
          </div>
          <div className="detail-stat">
            <div className="value">{business.metrics.clients || '--'}</div>
            <div className="label">Clientes</div>
          </div>
          <div className="detail-stat">
            <div className="value">{business.metrics.activeProjects || '--'}</div>
            <div className="label">Proyectos Activos</div>
          </div>
          <div className="detail-stat">
            <div className="value">{business.metrics.completedProjects || '--'}</div>
            <div className="label">Completados</div>
          </div>
          <div className="detail-stat">
            <div className="value">
              {business.metrics.avgRating > 0 ? (
                <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4 }}>
                  {business.metrics.avgRating} <Star size={14} fill="#f59e0b" color="#f59e0b" />
                </span>
              ) : '--'}
            </div>
            <div className="label">Rating</div>
          </div>
        </div>
      </div>

      {/* Agent Section */}
      <div className="grid-2">
        <div className="agent-card animate-in">
          <div className="section-header" style={{ marginBottom: 16 }}>
            <h3 style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <Bot size={18} /> Agente AI
            </h3>
            <div className={`business-status ${agent.status}`}>
              <span className="business-status-dot" />
              {statusLabels[agent.status]}
            </div>
          </div>

          <div className="agent-header">
            <div className="agent-avatar" style={{ background: `${business.color}20` }}>
              <Zap size={22} style={{ color: business.color }} />
            </div>
            <div className="agent-info">
              <h4>{agent.name}</h4>
              <span>{typeLabels[agent.type]} • {agent.platform}</span>
            </div>
          </div>

          <div className="agent-stats">
            <div className="agent-stat">
              <div className="value" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                <MessageCircle size={16} style={{ color: 'var(--accent-cyan)' }} />
                {agent.conversations.toLocaleString()}
              </div>
              <div className="label">Conversaciones</div>
            </div>
            <div className="agent-stat">
              <div className="value" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                <Clock size={16} style={{ color: 'var(--accent-amber)' }} />
                {agent.avgResponseTime}
              </div>
              <div className="label">Resp. Promedio</div>
            </div>
            <div className="agent-stat">
              <div className="value" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                <ThumbsUp size={16} style={{ color: 'var(--accent-emerald)' }} />
                {agent.satisfaction > 0 ? `${agent.satisfaction}%` : '--'}
              </div>
              <div className="label">Satisfacción</div>
            </div>
            <div className="agent-stat">
              <div className="value" style={{ fontSize: 13, color: 'var(--text-secondary)' }}>
                {agent.lastActive
                  ? new Date(agent.lastActive).toLocaleDateString('es-MX', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })
                  : 'Sin actividad'}
              </div>
              <div className="label">Última Actividad</div>
            </div>
          </div>

          {agent.workflowUrl && (
            <a
              href={agent.workflowUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
              style={{ marginTop: 16, width: '100%', justifyContent: 'center' }}
            >
              <ExternalLink size={14} /> Ver Workflows del Agente
            </a>
          )}
        </div>

        {/* Quick Info */}
        <div className="animate-in" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div className="agent-card">
            <h4 style={{ fontSize: 14, fontWeight: 600, marginBottom: 14, color: 'var(--text-secondary)' }}>
              Información del Negocio
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <InfoRow label="Tipo" value={
                business.type === 'education' ? '🎓 Educación' :
                business.type === 'finance' ? '💼 Finanzas' :
                business.type === 'food' ? '🍽️ Alimentos' :
                '🏢 Servicios'
              } />
              <InfoRow label="Creado" value={
                new Date(business.createdAt).toLocaleDateString('es-MX', { year: 'numeric', month: 'long', day: 'numeric' })
              } />
              <InfoRow label="Crecimiento" value={
                business.revenue.growth > 0 ? (
                  <span style={{ color: 'var(--accent-emerald)', fontWeight: 600 }}>
                    <TrendingUp size={14} style={{ display: 'inline', verticalAlign: -2 }} /> +{business.revenue.growth}%
                  </span>
                ) : '--'
              } />
              <InfoRow label="Plataforma" value={agent.platform} />
            </div>
          </div>

          <div className="agent-card" style={{ flex: 1 }}>
            <h4 style={{ fontSize: 14, fontWeight: 600, marginBottom: 14, color: 'var(--text-secondary)' }}>
              Acciones Rápidas
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {business.url && (
                <a href={business.url} target="_blank" rel="noopener noreferrer" className="btn btn-ghost" style={{ width: '100%', justifyContent: 'center' }}>
                  <ExternalLink size={14} /> Abrir plataforma
                </a>
              )}
              {agent.workflowUrl && (
                <a href={agent.workflowUrl} target="_blank" rel="noopener noreferrer" className="btn btn-ghost" style={{ width: '100%', justifyContent: 'center' }}>
                  <Bot size={14} /> Workflows
                </a>
              )}
              <button className="btn btn-ghost" style={{ width: '100%', justifyContent: 'center' }}>
                <Users size={14} /> Ver clientes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoRow({ label, value }) {
  return (
    <div style={{
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      paddingBottom: 10, borderBottom: '1px solid var(--border)'
    }}>
      <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>{label}</span>
      <span style={{ fontSize: 13, fontWeight: 500 }}>{value}</span>
    </div>
  );
}
