import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { api, formatINR, qs } from "../api.js";
import { Box, SmallBox } from "../components/ui.jsx";
import FunnelBars, { FUNNEL_COLORS } from "../components/FunnelBars.jsx";
import { useAuth } from "../api/AuthContext.jsx";

export default function Dashboard({ region }) {
  const nav = useNavigate();
  const { user, displayName } = useAuth();
  const [data, setData] = useState(null);
  useEffect(() => {
    api.dashboard(qs({ region })).then(setData).catch(console.error);
  }, [region]);
  if (!data) return <p className="text-muted">Loading dashboard…</p>;
  const k = data.kpis;
  const total = data.stages.reduce((s, x) => s + x.value, 0) || 1;
  const hour = new Date().getHours();
  const greet = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";
  const who = user?.first_name || displayName;
  const mixMax = Math.max(...data.stages.map((s) => s.value), 1);

  return (
    <div className="rm-page">
      <div className="rm-page-head">
        <div>
          <p style={{ margin: 0, fontSize: 15, fontWeight: 650, color: "#0f172a" }}>{greet}, {who}</p>
          <p>Here is how the sales pipeline is performing.</p>
        </div>
      </div>

      <div className="row">
        <SmallBox to="/opportunities" count={formatINR(k.pipeline)} label="Total pipeline" color="bg-teal" icon="fas fa-rupee-sign" footer="Open value" />
        <SmallBox to="/opportunities" count={k.opportunities} label="Opportunities" color="bg-aqua" icon="fas fa-briefcase" footer={`${k.open} open`} />
        <SmallBox to="/forecast" count={formatINR(k.expected)} label="Expected revenue" color="bg-olive" icon="fas fa-chart-line" footer="Weighted pipeline" />
        <SmallBox to="/pipeline" count={k.highCount} label="High probability" color="bg-orange" icon="fas fa-bolt" footer={formatINR(k.highValue)} />
        <SmallBox to="/opportunities" count={formatINR(k.booked)} label="Booked business" color="bg-green" icon="fas fa-check-circle" footer={`${k.bookedCount} won`} />
        <SmallBox to="/lost" count={formatINR(k.lost)} label="Lost business" color="bg-red" icon="fas fa-times-circle" footer={`${k.lostCount} lost`} />
      </div>

      <div className="row">
        <div className="col-md-7">
          <Box title="Sales funnel" type="primary" tools={<span className="text-muted">Click a stage</span>}>
            <FunnelBars
              onSelect={(item) => nav(item.nav || "/funnel")}
              items={[
                ...data.stages.map((s, i) => ({
                  id: s.id,
                  title: `${s.label} · ${s.range}`,
                  subtitle: `${s.count} opportunities · ${Math.round((s.value / total) * 100)}% of pipeline`,
                  value: formatINR(s.value),
                  color: [FUNNEL_COLORS.s1, FUNNEL_COLORS.s2, FUNNEL_COLORS.s3, FUNNEL_COLORS.s4][i],
                  nav: "/funnel",
                })),
                { id: "won", title: "Booked / Won", subtitle: `${k.bookedCount} orders`, value: formatINR(k.booked), color: FUNNEL_COLORS.won, nav: "/opportunities" },
                { id: "lost", title: "Lost / Cancelled", subtitle: `${k.lostCount} opportunities`, value: formatINR(k.lost), color: FUNNEL_COLORS.lost, nav: "/lost" },
              ]}
            />
          </Box>
        </div>
        <div className="col-md-5">
          <Box title="Stage mix">
            <div className="dash-status-bars">
              {data.stages.map((s, i) => (
                <div key={s.id} className="dash-status-row">
                  <div className="dash-status-meta">
                    <span>{s.label}</span>
                    <strong>{s.count} · {formatINR(s.value)}</strong>
                  </div>
                  <div className="dash-status-track">
                    <div
                      className={`dash-status-fill ${i < 2 ? "tone-slate" : i === 2 ? "tone-teal" : "tone-amber"}`}
                      style={{ width: `${Math.min(100, Math.round((s.value / mixMax) * 100))}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Box>
          <Box title="Pipeline by product">
            <div className="rm-chart-box" style={{ height: 220, minHeight: 200 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data.products} layout="vertical" margin={{ left: 8, right: 12, top: 8, bottom: 8 }}>
                  <XAxis type="number" hide />
                  <YAxis type="category" dataKey="name" width={110} tick={{ fontSize: 12, fill: "#475569" }} axisLine={false} tickLine={false} />
                  <Tooltip formatter={(v) => formatINR(v)} cursor={{ fill: "rgba(32,121,183,0.06)" }} />
                  <Bar dataKey="value" fill="#2079B7" radius={[0, 8, 8, 0]} barSize={16} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Box>
        </div>
      </div>
    </div>
  );
}
