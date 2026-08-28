import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api.js";
import { Box, Field } from "../components/ui.jsx";
import { useToast } from "../components/Toast.jsx";

const empty = {
  customer: "",
  location: "",
  regionKey: "north",
  customerType: "Diagnostic Centre",
  product: "ANAMAYA",
  valueCr: "",
  expectedClosure: "",
  siteStatus: "To Be Identified",
  fundingStatus: "Not Yet Approached Bank",
  processStage: "new-enquiry",
  owner: "Prem Kumar Thakur",
  remark: "",
};

export default function AddOpportunity() {
  const nav = useNavigate();
  const toast = useToast();
  const [meta, setMeta] = useState(null);
  const [form, setForm] = useState(empty);
  const [step, setStep] = useState(1);
  const [busy, setBusy] = useState(false);
  useEffect(() => { api.meta().then(setMeta); }, []);
  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  async function submit() {
    if (!form.customer || !form.location) {
      setStep(1);
      toast.error("Customer name and location are required.");
      return;
    }
    setBusy(true);
    try {
      await api.create({ ...form, value: Number(form.valueCr || 0) * 100 });
      toast.success("Opportunity created");
      nav("/opportunities");
    } catch (e) {
      toast.error(e.message);
    } finally {
      setBusy(false);
    }
  }

  if (!meta) return <p className="text-muted">Loading form…</p>;

  return (
    <div className="row">
      <div className="col-md-8">
        <Box
          title="Opportunity details"
          type="primary"
          tools={<button type="button" className="btn btn-theme btn-sm" disabled={busy} onClick={submit}><i className="fas fa-check" /> Create</button>}
          footer={(
            <>
              {step > 1 ? <button type="button" className="btn btn-default" onClick={() => setStep(step - 1)}>Back</button> : <span />}
              {step < 5 ? <button type="button" className="btn btn-theme" onClick={() => setStep(step + 1)}>Continue</button> : null}
              <button type="button" className="btn btn-success" disabled={busy} onClick={submit} style={{ marginLeft: "auto" }}>
                <i className="fas fa-check" /> Create opportunity
              </button>
            </>
          )}
        >
          <div className="wizard-steps">
            {["Customer", "Product", "Readiness", "Stage", "Notes"].map((t, i) => (
              <button key={t} type="button" className={step === i + 1 ? "is-active" : ""} onClick={() => setStep(i + 1)}>
                Step {i + 1}<div>{t}</div>
              </button>
            ))}
          </div>
          {step === 1 && (
            <div className="rm-form-grid">
              <Field label="Customer name" required>
                <input className="form-control" value={form.customer} onChange={(e) => set("customer", e.target.value)} />
              </Field>
              <Field label="Location" required>
                <input className="form-control" value={form.location} onChange={(e) => set("location", e.target.value)} />
              </Field>
              <Field label="Region">
                <select className="form-control" value={form.regionKey} onChange={(e) => set("regionKey", e.target.value)}>
                  <option value="north">north</option>
                  <option value="west">west</option>
                </select>
              </Field>
              <Field label="Customer type">
                <select className="form-control" value={form.customerType} onChange={(e) => set("customerType", e.target.value)}>
                  {meta.customerTypes.map((o) => <option key={o}>{o}</option>)}
                </select>
              </Field>
            </div>
          )}
          {step === 2 && (
            <div className="rm-form-grid">
              <Field label="Product">
                <select className="form-control" value={form.product} onChange={(e) => set("product", e.target.value)}>
                  {meta.products.map((o) => <option key={o}>{o}</option>)}
                </select>
              </Field>
              <Field label="Opportunity value (₹ Crore)">
                <input className="form-control" type="number" step="0.01" value={form.valueCr} onChange={(e) => set("valueCr", e.target.value)} />
              </Field>
              <Field label="Expected closure">
                <input className="form-control" type="date" value={form.expectedClosure} onChange={(e) => set("expectedClosure", e.target.value)} />
              </Field>
            </div>
          )}
          {step === 3 && (
            <div className="rm-form-grid">
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
            </div>
          )}
          {step === 4 && (
            <div className="rm-form-grid">
              <Field label="Current stage">
                <select className="form-control" value={form.processStage} onChange={(e) => set("processStage", e.target.value)}>
                  {meta.processStages.filter((s) => s.id !== "booked").map((s) => <option key={s.id} value={s.id}>{s.label}</option>)}
                </select>
              </Field>
              <Field label="Sales manager">
                <select className="form-control" value={form.owner} onChange={(e) => set("owner", e.target.value)}>
                  {meta.owners.map((o) => <option key={o}>{o}</option>)}
                </select>
              </Field>
            </div>
          )}
          {step === 5 && (
            <Field label="Additional notes" full>
              <textarea className="form-control" rows={5} value={form.remark} onChange={(e) => set("remark", e.target.value)} />
            </Field>
          )}
        </Box>
      </div>
      <div className="col-md-4">
        <Box title="Summary">
          {[
            ["Customer", form.customer || "—"],
            ["Product", form.product],
            ["Value", form.valueCr ? `₹${form.valueCr} Cr` : "—"],
            ["Owner", form.owner],
            ["Stage", form.processStage],
          ].map(([k, v]) => (
            <div key={k} className="rm-summary-row"><span>{k}</span><b>{v}</b></div>
          ))}
        </Box>
      </div>
    </div>
  );
}
