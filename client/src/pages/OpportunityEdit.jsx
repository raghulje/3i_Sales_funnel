import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { api } from "../api.js";
import { Box, Field } from "../components/ui.jsx";
import { useToast } from "../components/Toast.jsx";

function editFrom(item) {
  return {
    customer: item.customer || "",
    location: item.location || "",
    product: item.product || "",
    valueCr: item.value != null && item.value !== "" ? String(Number(item.value) / 100) : "",
    expectedClosure: String(item.expectedClosure || "").slice(0, 10),
    siteStatus: item.siteStatus || "",
    fundingStatus: item.fundingStatus || "",
    owner: item.owner || "",
    customerType: item.customerType || "",
    processStage: item.processStage || "new-enquiry",
  };
}

export default function OpportunityEdit() {
  const { id } = useParams();
  const nav = useNavigate();
  const toast = useToast();
  const [meta, setMeta] = useState(null);
  const [form, setForm] = useState(null);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");

  useEffect(() => {
    setErr("");
    Promise.all([api.opportunity(id), api.meta()])
      .then(([item, m]) => {
        setForm(editFrom(item));
        setMeta(m);
      })
      .catch((e) => setErr(e.message || "Not found"));
  }, [id]);

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  async function save(e) {
    e.preventDefault();
    if (!form.customer.trim() || !form.location.trim()) {
      toast.error("Customer name and location are required.");
      return;
    }
    setBusy(true);
    try {
      await api.patch(id, {
        customer: form.customer.trim(),
        location: form.location.trim(),
        product: form.product,
        value: Number(form.valueCr || 0) * 100,
        expectedClosure: form.expectedClosure,
        siteStatus: form.siteStatus,
        fundingStatus: form.fundingStatus,
        owner: form.owner,
        customerType: form.customerType,
      });
      if (form.processStage) await api.stage(id, form.processStage);
      toast.success("Opportunity updated");
      nav(`/opportunities/${encodeURIComponent(id)}`);
    } catch (e2) {
      toast.error(e2.message);
    } finally {
      setBusy(false);
    }
  }

  if (err) return <p className="text-danger">{err}</p>;
  if (!form || !meta) return <p className="text-muted">Loading form…</p>;

  return (
    <form onSubmit={save}>
      <Box
        title="Edit opportunity"
        type="primary"
        footer={(
          <>
            <Link to={`/opportunities/${encodeURIComponent(id)}`} className="btn btn-default">Cancel</Link>
            <button type="submit" className="btn btn-theme" disabled={busy} style={{ marginLeft: "auto" }}>
              <i className="fas fa-check" /> Save changes
            </button>
          </>
        )}
      >
        <div className="rm-form-grid rm-form-grid--2">
          <Field label="Customer name" required>
            <input className="form-control" value={form.customer} onChange={(e) => set("customer", e.target.value)} />
          </Field>
          <Field label="Location" required>
            <input className="form-control" value={form.location} onChange={(e) => set("location", e.target.value)} />
          </Field>
          <Field label="Product">
            <select className="form-control" value={form.product} onChange={(e) => set("product", e.target.value)}>
              {meta.products.map((o) => <option key={o}>{o}</option>)}
            </select>
          </Field>
          <Field label="Value (₹ Crore)">
            <input className="form-control" type="number" step="0.01" value={form.valueCr} onChange={(e) => set("valueCr", e.target.value)} />
          </Field>
          <Field label="Expected closure">
            <input className="form-control" type="date" value={form.expectedClosure} onChange={(e) => set("expectedClosure", e.target.value)} />
          </Field>
          <Field label="Customer type">
            <select className="form-control" value={form.customerType} onChange={(e) => set("customerType", e.target.value)}>
              {meta.customerTypes.map((o) => <option key={o}>{o}</option>)}
            </select>
          </Field>
          <Field label="Site status">
            <select className="form-control" value={form.siteStatus} onChange={(e) => set("siteStatus", e.target.value)}>
              {meta.siteStatuses.map((o) => <option key={o}>{o}</option>)}
            </select>
          </Field>
          <Field label="Funding status">
            <select className="form-control" value={form.fundingStatus} onChange={(e) => set("fundingStatus", e.target.value)}>
              {meta.fundingStatuses.map((o) => <option key={o}>{o}</option>)}
            </select>
          </Field>
          <Field label="Current stage">
            <select className="form-control" value={form.processStage} onChange={(e) => set("processStage", e.target.value)}>
              {meta.processStages.map((s) => <option key={s.id} value={s.id}>{s.label}</option>)}
            </select>
          </Field>
          <Field label="Sales manager">
            <select className="form-control" value={form.owner} onChange={(e) => set("owner", e.target.value)}>
              {meta.owners.map((o) => <option key={o}>{o}</option>)}
            </select>
          </Field>
        </div>
      </Box>
    </form>
  );
}
