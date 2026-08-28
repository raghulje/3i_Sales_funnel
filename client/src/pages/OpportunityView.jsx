import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { api, formatINR } from "../api.js";
import { Box, Field } from "../components/ui.jsx";
import StageTracker from "../components/StageTracker.jsx";
import { STAGE_LABELS, statusTone, trackerSteps } from "../lib/stages.js";
import { useToast } from "../components/Toast.jsx";

export default function OpportunityView() {
  const { id } = useParams();
  const toast = useToast();
  const [item, setItem] = useState(null);
  const [remark, setRemark] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");

  useEffect(() => {
    setErr("");
    api.opportunity(id).then(setItem).catch((e) => setErr(e.message || "Not found"));
  }, [id]);

  async function moveStage(processStage) {
    setBusy(true);
    try {
      const updated = await api.stage(id, processStage);
      setItem(updated);
      toast.success(`Moved to ${STAGE_LABELS[processStage] || processStage}`);
    } catch (e) {
      toast.error(e.message);
    } finally {
      setBusy(false);
    }
  }

  async function addRemark() {
    if (!remark.trim()) return;
    setBusy(true);
    try {
      const updated = await api.remark(id, remark.trim());
      setRemark("");
      setItem(updated);
      toast.success("Remark added");
    } catch (e) {
      toast.error(e.message);
    } finally {
      setBusy(false);
    }
  }

  if (err) return <p className="text-danger">{err}</p>;
  if (!item) return <p className="text-muted">Loading opportunity…</p>;

  const fields = [
    ["ID", item.id],
    ["Customer", item.customer],
    ["Location", item.location],
    ["Region", item.region],
    ["Product", item.product],
    ["Value", formatINR(item.value)],
    ["Owner", item.owner],
    ["Customer type", item.customerType || "—"],
    ["Site", item.siteStatus || "—"],
    ["Funding", item.fundingStatus || "—"],
    ["Stage", `Stage ${item.stage} · ${item.probability}%`],
    ["Expected closure", item.expectedClosureLabel || item.expectedClosure || "—"],
  ];

  return (
    <div className="detail-layout">
      <div className="detail-summary">
        <div className="detail-summary-top">
          <div>
            <h2 className="detail-summary-title">{item.customer}</h2>
            <div className="detail-summary-meta">
              <span className={`detail-chip ${statusTone(item.salesStatus)}`}>
                <span className={`label ${statusTone(item.salesStatus)}`}>{item.salesStatus}</span>
              </span>
              <span><strong>ID</strong>{item.id}</span>
              <span><strong>Owner</strong>{item.owner}</span>
              <span><strong>Value</strong>{formatINR(item.value)}</span>
            </div>
          </div>
          <div className="detail-actions">
            <Link to="/opportunities" className="btn btn-default btn-sm">
              <i className="fas fa-arrow-left" /> Back
            </Link>
            <Link to={`/opportunities/${encodeURIComponent(item.id)}/edit`} className="btn btn-theme btn-sm">
              <i className="fas fa-pencil-alt" /> Edit
            </Link>
          </div>
        </div>
      </div>

      <StageTracker steps={trackerSteps(item)} onSelect={moveStage} busy={busy} />

      <div className="detail-panel">
        <h3 className="detail-panel-title">Opportunity details</h3>
        <div className="detail-fields">
          {fields.map(([label, value]) => (
            <div key={label}>
              <span className="detail-field-label">{label}</span>
              <div className="detail-field-value">{value}</div>
            </div>
          ))}
        </div>
      </div>

      <Box title="Remarks">
        {(item.remarks || []).length === 0 ? <p className="text-muted">No remarks yet.</p> : null}
        <ul className="sf-remarks">
          {(item.remarks || []).map((r, i) => <li key={i}>{r}</li>)}
        </ul>
        <Field label="Field update">
          <textarea className="form-control" rows={3} value={remark} onChange={(e) => setRemark(e.target.value)} placeholder="Add a field update…" />
        </Field>
        <button type="button" className="btn btn-theme btn-sm" disabled={busy} onClick={addRemark} style={{ marginTop: 8 }}>
          <i className="fas fa-plus" /> Add remark
        </button>
      </Box>
    </div>
  );
}
