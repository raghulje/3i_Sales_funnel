import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api, formatINR, qs } from "../api.js";
import { useAuth } from "../api/AuthContext.jsx";

const COLS = [
  { id: "I", title: "New / Stage I", tint: "#94A3B8" },
  { id: "II", title: "Qualification / II", tint: "#3F8BA2" },
  { id: "III", title: "Negotiation / III", tint: "#2079B7" },
  { id: "IV", title: "Finalisation / IV", tint: "#0D4574" },
  { id: "booked", title: "Booked", tint: "#8CBC43" },
];
const STAGE_MAP = { I: "new-enquiry", II: "quotation", III: "negotiation", IV: "order", booked: "booked" };

export default function Pipeline({ region }) {
  const { user, isAdmin } = useAuth();
  const nav = useNavigate();
  const [rows, setRows] = useState([]);
  const [over, setOver] = useState("");
  const [dragging, setDragging] = useState("");
  useEffect(() => {
    api.opportunities(qs({ region })).then(setRows).catch(console.error);
  }, [region]);

  let mine = rows;
  if (region === "west") mine = rows.filter((o) => o.owner === "West Sales Team");
  else if (region === "north") mine = rows.filter((o) => o.owner === "Prem Kumar Thakur");
  else if (user?.region_key === "west") mine = rows.filter((o) => o.owner === "West Sales Team");
  else if (user?.region_key === "north") mine = rows.filter((o) => o.owner === "Prem Kumar Thakur");
  else if (!isAdmin) {
    const name = `${user?.first_name || ""} ${user?.last_name || ""}`.trim();
    mine = rows.filter((o) => o.owner === name);
  }

  const ownerLabel =
    region === "west" || user?.region_key === "west"
      ? "West Sales Team"
      : region === "north" || user?.region_key === "north"
        ? "Prem Kumar Thakur"
        : isAdmin
          ? "All owners"
          : `${user?.first_name || ""} ${user?.last_name || ""}`.trim();
  const openRows = mine.filter((o) => o.outcome === "open");

  async function onDrop(e, colId) {
    e.preventDefault();
    setOver("");
    setDragging("");
    const id = e.dataTransfer.getData("id");
    if (!id) return;
    const updated = await api.stage(id, STAGE_MAP[colId]);
    setRows((list) => list.map((r) => (r.id === updated.id ? updated : r)));
  }

  return (
    <div className="rm-page">
      <p className="text-muted" style={{ marginTop: 0 }}>{ownerLabel} · drag a card onto a column to update stage</p>
      <div className="sf-board">
        {COLS.map((c) => {
          const list = c.id === "booked" ? mine.filter((o) => o.outcome === "booked") : openRows.filter((o) => o.stage === c.id);
          const value = list.reduce((s, o) => s + (Number(o.value) || 0), 0);
          return (
            <div
              key={c.id}
              className={`sf-col${over === c.id ? " is-over" : ""}`}
              style={{ "--col-tint": c.tint }}
              onDragOver={(e) => { e.preventDefault(); setOver(c.id); }}
              onDragLeave={() => setOver("")}
              onDrop={(e) => onDrop(e, c.id)}
            >
              <div className="sf-col-head">
                <div>
                  <b>{c.title}</b>
                  <em>{formatINR(value)}</em>
                </div>
                <span>{list.length}</span>
              </div>
              <div className="sf-col-body">
                {list.length === 0 ? <div className="sf-col-empty">Drop cards here</div> : null}
                {list.map((o) => (
                  <div
                    key={o.id}
                    draggable
                    onDragStart={(e) => {
                      e.dataTransfer.setData("id", o.id);
                      setDragging(o.id);
                    }}
                    onDragEnd={() => setDragging("")}
                    className={`sf-card${dragging === o.id ? " is-dragging" : ""}`}
                    onClick={() => nav(`/opportunities/${encodeURIComponent(o.id)}`)}
                  >
                    <h4>{o.customer}</h4>
                    <p>{o.product} · {o.location}</p>
                    <div className="sf-card__meta">
                      <b>{formatINR(o.value)}</b>
                      <span className="sf-prob">{o.probability}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
