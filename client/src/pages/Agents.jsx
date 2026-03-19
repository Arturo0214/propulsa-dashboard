import { useNavigate } from 'react-router-dom';
import {
  Bot, Zap, MessageCircle, Clock, ThumbsUp,
  ExternalLink, ArrowRight
} from 'lucide-react';
import { useAgents } from '../hooks/useApi';

const typeLabels = {
  'customer-service': 'Atención al Cliente',
  'lead-generation': 'Generación de Leads',
  'orders-inventory': 'Pedidos e Inventario',
  'scheduling': 'Agendamiento',
  'general': 'General'
};

const statusConfig = {
  active: { label: 'Activo', class: 'active' },
  development: { label: 'En Desarrollo', class: 'development' },
  planning: { label: 'En Planeación', class: 'development' },
  paused: { label: 'Pausado', class: 'paused' },
  inactive: { label: 'Inactivo', class: 'paused' }
};

export default function Agents() {
  const navigate = useNavigate();
  const { agents, loading } = useAgents();

  if (loading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '60vh' }}>
        <div style={{ color: 'var(--text-secondary)', fontSize: 15 }}>Cargando agentes...</div>
      </div>
    );
  }

  return (
    <div>
      <div className="page-header">
        <h2>Agentes AI</h2>
        <p>Todos los agentes de inteligencia artificial de tu agencia</p>
      </div>

      <div className="agents-grid">
        {agents.map((agent, i) => {
          const sc = statusConfig[agent.status] || statusConfig.inactive;
          return (
            <div key={agent.id} className="agent-card animate-in" style={{ cursor: 'pointer' }}
              onClick={() => navigate(`/business/${agent.businessId}`)}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
                <div className="agent-header" style={{ margin: 0 }}>
                  <div className="agent-avatar" style={{ background: `${agent.businessColor}20` }}>
                    <Zap size={22} style={{ color: agent.businessColor }} />
                  </div>
                  <div className="agent-info">
                    <h4>{agent.name}</h4>
                    <span>{agent.businessIcon} {agent.businessName}</span>
                  </div>
                </div>
                <div className={`business-status ${sc.class}`}>
                  <span className="business-status-dot" />
                  {sc.label}
                </div>
              </div>

              <div style={{
                fontSize: 12, color: 'var(--text-muted)', marginBottom: 14,
                padding: '6px 10px', background: 'var(--bg-glass)', borderRadius: 6
              }}>
                {typeLabels[agent.type]} • {agent.platform || 'Sin plataforma'}
              </div>

              <div className="agent-stats" style={{ marginBottom: 14 }}>
                <div className="agent-stat">
                  <div className="value" style={{ fontSize: 18, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                    <MessageCircle size={14} style={{ color: 'var(--accent-cyan)' }} />
                    {agent.conversations.toLocaleString()}
                  </div>
                  <div className="label">Conversaciones</div>
                </div>
                <div className="agent-stat">
                  <div className="value" style={{ fontSize: 18, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                    <Clock size={14} style={{ color: 'var(--accent-amber)' }} />
                    {agent.avgResponseTime}
                  </div>
                  <div className="label">Tiempo Resp.</div>
                </div>
                <div className="agent-stat">
                  <div className="value" style={{ fontSize: 18, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                    <ThumbsUp size={14} style={{ color: 'var(--accent-emerald)' }} />
                    {agent.satisfaction > 0 ? `${agent.satisfaction}%` : '--'}
                  </div>
                  <div className="label">Satisfacción</div>
                </div>
                <div className="agent-stat">
                  <div className="value" style={{ fontSize: 12, color: 'var(--text-secondary)' }}>
                    {agent.lastActive
                      ? new Date(agent.lastActive).toLocaleDateString('es-MX', { day: 'numeric', month: 'short' })
                      : 'Sin actividad'}
                  </div>
                  <div className="label">Última Actividad</div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: 8 }}>
                {agent.workflowUrl && (
                  <a href={agent.workflowUrl} target="_blank" rel="noopener noreferrer"
                    className="btn btn-ghost" style={{ flex: 1, justifyContent: 'center', fontSize: 12 }}
                    onClick={e => e.stopPropagation()}>
                    <ExternalLink size={13} /> Workflows
                  </a>
                )}
                <button className="btn btn-ghost" style={{ flex: 1, justifyContent: 'center', fontSize: 12 }}>
                  Ver detalle <ArrowRight size={13} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
