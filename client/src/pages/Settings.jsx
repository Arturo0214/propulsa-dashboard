import { Database, Globe, Bell, Shield, Palette } from 'lucide-react';

export default function Settings() {
  return (
    <div>
      <div className="page-header">
        <h2>Configuración</h2>
        <p>Configura tu agencia y preferencias generales</p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 640 }}>
        <SettingCard
          icon={<Globe />}
          title="Información de la Agencia"
          description="Nombre, logo y datos de contacto de tu agencia"
          color="#6366f1"
        />
        <SettingCard
          icon={<Database />}
          title="Base de Datos"
          description="Configuración de Supabase y conexiones a servicios externos"
          color="#10b981"
        />
        <SettingCard
          icon={<Bell />}
          title="Notificaciones"
          description="Alertas de ingresos, nuevos clientes y actividad de agentes"
          color="#f59e0b"
        />
        <SettingCard
          icon={<Shield />}
          title="Seguridad"
          description="Autenticación, roles de usuario y permisos"
          color="#f43f5e"
        />
        <SettingCard
          icon={<Palette />}
          title="Apariencia"
          description="Tema, colores y personalización del dashboard"
          color="#06b6d4"
        />
      </div>
    </div>
  );
}

function SettingCard({ icon, title, description, color }) {
  return (
    <div className="agent-card animate-in" style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 16 }}>
      <div style={{
        width: 44, height: 44, borderRadius: 10, background: `${color}18`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color, flexShrink: 0
      }}>
        {icon}
      </div>
      <div>
        <h4 style={{ fontSize: 14, fontWeight: 600, marginBottom: 2 }}>{title}</h4>
        <p style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{description}</p>
      </div>
    </div>
  );
}
