# Business Requirements Document

# 3i Medical Technologies Private Limited  
## Sales Pipeline & Opportunity Management System

| | |
|---|---|
| **Document type** | Business Requirements Document (BRD) |
| **Version** | 0.1 — Discussion draft |
| **Date** | 28 August 2026 |
| **Prepared for** | Sales Team and Management, 3i Medical Technologies Pvt. Ltd. |
| **Prepared from** | Existing Excel sales trackers + interactive frontend mockup |
| **Intended platform** | Kissflow (to be developed after requirement freeze) |
| **Status** | For internal review and workshop — not a signed-off specification |

**Prototype reference:** `3i MEDICAL — Sales Pipeline & Opportunity Management` (HTML mockup in this folder)

This document is a discussion version. It captures how the current Excel process should become a structured digital system. Numbers, lists and field names should be confirmed with the sales team before Kissflow build starts.

---

## 1. Document control

| Version | Date | Author | Change |
|---|---|---|---|
| 0.1 | 28 Aug 2026 | Requirements from Excel + mockup | First draft for sales workshop |

### 1.1 Related source files

| File | Use in this BRD |
|---|---|
| `Sales-Tracker-PremT.xlsx` | North / Prem Territory pipeline, stages, remarks, Lost Business sheet |
| `Sales Tracker - West 13.02.2026.xlsx` | West prospects, booked orders, PO/advance, lost and cancelled rows |
| Interactive mockup (`index.html`) | Proposed screens, funnel, forms, forecast and reports |

---

## 2. Executive summary

3i Medical currently tracks sales opportunities in regional Excel workbooks. Each sales manager maintains customer name, location, product, value, site readiness, funding status, expected closure, stage, status and free-text remarks.

This process works as a personal tracker. It does not work as a company sales system.

Management cannot reliably see:

- total pipeline value
- expected (weighted) business
- what should close this month
- which deals are overdue
- booked vs lost vs cancelled
- product and region performance
- conversion from enquiry to order

The proposed system will replace spreadsheet tracking with a single **Sales Pipeline & Opportunity Management** application, to be built on **Kissflow** after this BRD is agreed.

A frontend mockup has already been built so the sales team can see the intended process before development.

**Recommended decision from this workshop**

1. Confirm the sales funnel stages and probability bands.  
2. Confirm which fields are mandatory.  
3. Confirm how opportunity value will be entered (one unit: ₹ Lakhs, displayed as ₹ Cr).  
4. Confirm owner, region and outcome rules.  
5. Freeze Phase 1 scope for Kissflow.

---

## 3. Business background

### 3.1 Organisation

**3i Medical Technologies Private Limited** sells medical imaging and related products, including:

- ANAMAYA
- 1.5T MRI
- 3T MRI
- ACHIEVA 3T
- FPD (Flat Panel Detector / digital radiography)
- Gamma Camera

Customers include hospitals, diagnostic centres, medical colleges, dealers, multispeciality hospitals and neurology centres.

### 3.2 Current sales coverage (as in Excel)

| Source workbook | Region / team | Default owner |
|---|---|---|
| Sales-Tracker-PremT.xlsx | Prem Territory (North and adjoining markets: Bihar, Jharkhand, UP, West Bengal, Odisha, etc.) | Prem Kumar Thakur, Sales Manager |
| Sales Tracker - West 13.02.2026.xlsx | West (Maharashtra, Gujarat, MP and related cities) | West Sales Team (individual owners not consistently named) |

South and East are not in the current workbooks. The system should allow those regions later without redesign.

### 3.3 Current process (as-is)

1. Sales manager visits or receives an enquiry (field visit, IRIA, dealer, reference).  
2. Row is added to the regional Excel sheet.  
3. Columns are updated over time: site, funding, closure date, status, stage, remarks.  
4. Probability is implied by Stage I–IV, not stored as a separate controlled field.  
5. Lost deals are sometimes a remark, sometimes a status, sometimes a separate “Lost Business” sheet, and sometimes a value in the Billing column.  
6. Booked deals (PO and advance) are marked in the West sheet as `Booked` or `PO ADV Collected`.  
7. There is no shared dashboard. Review happens by opening the spreadsheet.

### 3.4 Excel column meaning (important)

In both trackers the column labelled **Modality** actually stores **customer type** (Hospital, Diagnostic Centre, Dealer, etc.). The column labelled **Product** stores the equipment.

Kissflow must not copy this labelling mistake. The system should store:

- **Customer type** (who the buyer is)
- **Modality** (MRI / Digital Radiography / Nuclear Medicine)
- **Product** (ANAMAYA, 1.5T MRI, FPD, etc.)

---

## 4. Problem statement

The Excel process creates operational and management risk.

### 4.1 Issues observed in the actual trackers

| Issue | Example from Excel | Business impact |
|---|---|---|
| Inconsistent product names | `1.5 T`, `1.5T`, `1.5 t`, `MRI`, `Anamaya`, `1.5 T Anamaya` | Cannot total pipeline by product |
| Inconsistent customer type | `Diagnostic`, `Diagnostic centre`, `Diagnostic Centre`, `Multispeciality Hosp` | Weak segmentation |
| Inconsistent funding status | `Not Aproched bank`, `Not yet approached Bank`, `Aproached Bank` | Cannot report funding risk |
| Mixed stage and status | Stage I with “Quotation Submitted”; PO/advance on Stage III | Funnel and probability become unreliable |
| Free-text closure dates | `Before June`, `Next financial year`, `depends on negotiation` | Cannot forecast by month |
| Missing opportunity values | Many North rows have product but no value | Pipeline totals understate or distort |
| Value unit inconsistency | West ANAMAYA ~₹5 Cr (500 Lacs); some North ANAMAYA rows as ₹5.5 L | Management totals can be wrong by orders of magnitude |
| Product placed in Value column | `Anamaya`, `New` in value cells | Data cannot be summed |
| Lost stored in the wrong column | West: `Lost` in Billing; remark in Stage | Lost analysis is incomplete |
| Duplicate / incomplete rows | Same customer repeated with different completeness | Double counting risk |
| Typos in controlled words | `Porject Cancelled`, `memmorial`, `Collage`, `Iaging` | Filters fail |
| No unique opportunity ID | Rows identified only by customer name | Cannot audit history |
| Owner missing on West | Team name only | Manager performance is not individual |
| Remarks as the system of record | Long free text holds the real status | Nobody except the owner understands the deal |

### 4.2 What this means for Kissflow

The application must **force structure** where Excel allowed free text, without making field entry so heavy that sales managers stop updating.

---

## 5. Business objectives

| ID | Objective | Success measure |
|---|---|---|
| BO-1 | One company-wide pipeline | All active opportunities live in one system, by region and owner |
| BO-2 | Reliable expected business | Weighted forecast = value × probability, using agreed stage probabilities |
| BO-3 | Clear sales funnel | Every open deal sits in one process stage from enquiry to booked |
| BO-4 | Visible follow-up | Overdue expected closures are listed for the owner and manager |
| BO-5 | Clean outcomes | Booked, Lost and Cancelled are separate from open pipeline |
| BO-6 | Product and region insight | Pipeline, forecast, booked and lost can be cut by product, region and manager |
| BO-7 | Better data for management | Mandatory fields on create/update; controlled dropdowns |
| BO-8 | Replace Excel as the operating tool | Sales team updates the system after visits instead of the workbook |

---

## 6. Stakeholders and users

| Role | Typical user | Needs |
|---|---|---|
| Sales Executive / Sales Manager (field) | Prem Kumar Thakur; future West named owners | My pipeline, follow-ups, update stage, add remarks, see likely closures |
| Regional / Team lead | West Sales Team lead | Team funnel, overdue deals, forecast, lost reasons |
| Sales leadership / Management | 3i leadership | Total pipeline, expected business, booked, lost, conversion, product and region |
| Application owner (Kissflow) | Internal process owner | Workflow, permissions, master data, reports |
| Finance / Order booking (later) | Not in Phase 1 as a user, but consumes booked outcomes | Booked value and PO/advance status |

No login design is specified in the mockup. Kissflow will use organisation SSO / Kissflow users. Region and owner will control what each person sees.

---

## 7. Scope

### 7.1 In scope — Phase 1 (Kissflow)

- Opportunity create, view, edit, stage update
- Sales funnel (process stages + Stage I–IV probability)
- Personal pipeline (list / board)
- Dashboard KPIs
- Forecast (weighted pipeline)
- Lost and cancelled register
- Standard reports listed in this BRD
- Master data: product, customer type, region, funding, site, lost reason
- Activity / remarks history on the opportunity
- Filters by region, owner, product, stage, status, funding, site, closure period
- Export of opportunity list

### 7.2 Out of scope — Phase 1

- Full CRM (contacts, campaigns, email integration)
- Quotation / BOM / configuration engineering
- ERP / billing / inventory integration
- Commission calculation
- Customer portal
- Mobile-native app (responsive Kissflow is sufficient)
- Automatic Excel import as a permanent interface (one-time migration only)
- South / East region operations until those teams are onboarded
- Authentication design beyond Kissflow standard users and roles

### 7.3 Future (Phase 2+)

- Named owners for every West (and other) record
- Dealer vs end-customer opportunity linking
- Multi-product opportunity (e.g. MRI + FPD) as related child lines
- Document store for quotations, PO, LC/DO
- SLA / next follow-up date as a mandatory field
- Integration with order processing

---

## 8. Proposed sales process (to-be)

### 8.1 Opportunity lifecycle

```
New Enquiry
    → Need Analysis
    → Technical Discussion
    → Proposal / Quotation
    → Commercial Negotiation
    → Finalisation
    → Order & Advance
    → Booked / Won

At any open stage the deal may also move to:
    → Lost
    → Cancelled
```

### 8.2 Mapping from current Excel Stage I–IV

The Excel legend (Prem tracker) is:

| Excel stage | Probability in Excel | Excel description |
|---|---|---|
| Stage I | 0–30% | Enquiry to Need Analysis |
| Stage II | 30–60% | Demo to Proposal |
| Stage III | 60–90% (legend also shows 70–80%) | Decision to Closure |
| Stage IV | >90% | Order & Advance |

**Kissflow shall use both layers:**

| Process stage (what the salesperson does) | Pipeline stage (how management forecasts) | Default probability |
|---|---|---|
| New Enquiry | Stage I (0–30%) | 15% |
| Need Analysis | Stage I (0–30%) | 22% |
| Technical Discussion | Stage I (0–30%) | 28% |
| Proposal / Quotation Submitted | Stage II (30–60%) | 45% |
| Commercial Negotiation | Stage III (60–90%) | 70% |
| Finalisation | Stage III (60–90%) | 82% |
| Order & Advance / PO ADV Collected | Stage IV (>90%) | 95% |
| Booked / Won | Stage IV / Closed Won | 100% |
| Lost | Closed Lost | 0% |
| Cancelled | Closed Cancelled | 0% |

**Business rule:** Changing the process stage automatically updates pipeline stage and probability. Users must not type probability as free text in Phase 1.

These percentages are **proposal values from the mockup**. The sales team must confirm them in the workshop.

### 8.3 Outcomes (mandatory, mutually exclusive)

Every opportunity has exactly one outcome:

| Outcome | Meaning | In pipeline? |
|---|---|---|
| Open | Still being worked | Yes |
| Booked | PO and advance received (or company definition of “won”) | No — counted as booked business |
| Lost | Customer bought elsewhere or commercially lost | No — lost register |
| Cancelled | Customer project stopped / PPP dropped / hold that is closed | No — lost/cancelled register |

**Open question for workshop:** Is `PO ADV Collected` still Open (advance pending) or already Booked? West Excel uses both `Booked` and `PO ADV Collected`. Recommendation: **PO ADV Collected = Open, Stage IV**; **Booked = Closed Won** only when advance is in hand per finance rule.

---

## 9. User journeys the system must support

### 9.1 Sales executive

- What opportunities am I working on?
- Which deals need follow-up / are overdue?
- Which deals are likely to close?
- What is my pipeline value?

### 9.2 Sales manager

- What is the team / region pipeline?
- Which stages hold the most value?
- Which opportunities are at risk (site not ready, funding not approached, overdue)?
- What is expected to close this month / quarter?
- Which products generate the most opportunity?

### 9.3 Management

- Total pipeline
- Expected (weighted) business
- Booked business
- Lost business
- Conversion
- Product performance
- Region performance
- Forecast

The mockup Dashboard, My Pipeline, Forecast, Lost Business and Reports screens are the visual expression of these journeys.

---

## 10. Functional requirements

Requirements are numbered for workshop sign-off. Priority: **M** = must have in Phase 1, **S** = should have, **C** = could have.

### 10.1 Opportunity record

| ID | Requirement | Priority |
|---|---|---|
| FR-01 | System shall create a unique Opportunity ID in the format `3I-FY26-0001` (financial year prefix configurable). | M |
| FR-02 | User shall capture customer name, location, region, customer type, product, value, expected closure date, site status, funding status, process stage, owner and remarks. | M |
| FR-03 | Modality shall be derived from product (MRI, Digital Radiography, Nuclear Medicine) and remain editable only if product mapping is missing. | S |
| FR-04 | Opportunity value shall be stored in **₹ Lakhs**. UI may accept ₹ Crore and convert (× 100). Display shall show ₹ L or ₹ Cr by magnitude. | M |
| FR-05 | Value, product, region, owner, stage and outcome shall be mandatory on create (not draft). | M |
| FR-06 | Draft save is allowed with customer name + region only. Drafts do not enter pipeline KPIs. | S |
| FR-07 | User shall add dated remarks / activity notes. History is append-only. | M |
| FR-08 | User shall update process stage from the record, list, or board. Probability and pipeline stage update automatically. | M |
| FR-09 | Expected closure shall be a **date**, not free text. A label such as “Next FY” is not accepted. | M |
| FR-10 | Duplicate warning when customer + location + product already exists as Open. | S |

### 10.2 Add / edit opportunity (form)

The mockup uses a 5-step form. Kissflow should keep the same grouping even if the UI is one page with sections.

| Step | Section | Fields |
|---|---|---|
| 1 | Customer information | Customer name, location, region, customer type |
| 2 | Opportunity details | Product (and derived modality), opportunity value, expected closure date |
| 3 | Readiness | Site status, funding status |
| 4 | Sales qualification | Process stage, owner (probability displayed, not typed) |
| 5 | Remarks | Notes / next step |

A live summary (customer, product, value, stage, probability, closure) shall remain visible while filling the form.

### 10.3 Opportunity list

| ID | Requirement | Priority |
|---|---|---|
| FR-11 | Search by customer, ID, location, product, owner. | M |
| FR-12 | Filter by region, sales manager, product, stage, status/outcome, funding, site, closure period (overdue / this month / next month / this quarter / future). | M |
| FR-13 | Columns: ID, customer, location, region, modality, product, value, pipeline stage, probability, expected closure, funding, site, status, owner, last updated, actions. | M |
| FR-14 | Actions: View, Edit, Update Stage. | M |
| FR-15 | Export filtered list to Excel/CSV. | M |

### 10.4 Opportunity detail

Shall show:

- Header: customer, ID, status badge, value, expected closure  
- Overview  
- Visual sales progress (current stage highlighted)  
- Probability / Stage I–IV  
- Site and funding  
- Activity timeline  
- Remarks with add-update  

### 10.5 Sales funnel

| ID | Requirement | Priority |
|---|---|---|
| FR-16 | Visual funnel of the 8 process stages plus Booked, Lost and Cancelled. | M |
| FR-17 | Each stage shows count and total opportunity value. | M |
| FR-18 | Clicking a stage opens the list of opportunities in that stage (respecting filters). | M |
| FR-19 | Funnel can be filtered by region, owner, product, stage, funding, site, closure period. | M |

### 10.6 My Pipeline

| ID | Requirement | Priority |
|---|---|---|
| FR-20 | Personal workspace for the logged-in owner (or selected owner for a manager). | M |
| FR-21 | KPIs: my pipeline value, my opportunities, high-probability deals, overdue follow-ups, expected closures, weighted forecast. | M |
| FR-22 | Board columns: Stage I, Stage II, Stage III, Stage IV, Booked. Moving a card updates stage and probability. | S |
| FR-23 | Card shows customer, product, value, probability, expected closure, funding indicator, site indicator. | M |

### 10.7 Dashboard

| ID | Requirement | Priority |
|---|---|---|
| FR-24 | Greeting + pipeline performance summary for the selected region / all regions. | S |
| FR-25 | KPI cards: Total Pipeline, Total Opportunities, Expected Revenue (weighted), High Probability Deals, Booked Business, Lost Business. | M |
| FR-26 | Pipeline funnel by Stage I–IV with booked and lost outcomes. | M |
| FR-27 | Pipeline by product (count and value). | M |
| FR-28 | Pipeline by region (opportunities, pipeline, forecast, booked). | M |
| FR-29 | Expected closures grouped: This Month, Next Month, This Quarter, Future. | M |
| FR-30 | High-priority table: open deals with material value and mid/high probability. | M |
| FR-31 | Alert for overdue expected closures. | M |

### 10.8 Forecast

| ID | Requirement | Priority |
|---|---|---|
| FR-32 | Weighted Pipeline = Opportunity Value × Probability. | M |
| FR-33 | Show pipeline value, weighted pipeline, booked revenue, lost revenue, coverage (weighted / pipeline). | M |
| FR-34 | Forecast by month, quarter, product, region, sales manager. | M |
| FR-35 | Charts: monthly expected revenue, pipeline vs forecast, product-wise forecast, stage-wise value. | S |

Only **Open** opportunities contribute to pipeline and weighted forecast. Booked and Lost are reported separately.

### 10.9 Lost business

| ID | Requirement | Priority |
|---|---|---|
| FR-36 | Lost and Cancelled opportunities appear here, not in open pipeline. | M |
| FR-37 | Lost reason is mandatory when outcome = Lost or Cancelled. | M |
| FR-38 | Lost reasons: Price, Competitor, Funding, Project Cancelled, Customer Delay, Technical Requirement, Other. | M |
| FR-39 | Competitor name required when reason = Competitor (and recommended for Price). | S |
| FR-40 | Analytics: top reasons, lost value, competitor counts, products lost most often. | M |

Known competitors already appearing in Excel: United Imaging, Phantom, Sunrays, Mediser.

### 10.10 Reports

Phase 1 standard reports:

1. Sales Pipeline Report  
2. Expected Closure Report  
3. Sales Manager Performance  
4. Product Performance  
5. Region Performance  
6. Lost Business Report  
7. Conversion Analysis (Booked / all opportunities, and Booked vs Lost)

| ID | Requirement | Priority |
|---|---|---|
| FR-41 | User can open each report from a reports catalogue. | M |
| FR-42 | Reports honour region / date / product filters. | M |
| FR-43 | Reports can be exported. | S |

### 10.11 Notifications (Phase 1 light)

| ID | Requirement | Priority |
|---|---|---|
| FR-44 | User sees overdue expected closures. | M |
| FR-45 | Optional reminder: no activity on an open deal for N days (default 14). | C |

### 10.12 Administration

| ID | Requirement | Priority |
|---|---|---|
| FR-46 | Admin maintains dropdowns: region, product, customer type, site status, funding status, lost reason, competitor list. | M |
| FR-47 | Admin maintains stage-to-probability mapping. | M |
| FR-48 | Role-based access: own records vs region vs all company. | M |

---

## 11. Master data (controlled lists)

These lists replace free text. The workshop should confirm additions (e.g. CT, more products).

### 11.1 Region

- Prem Territory  
- West  
- *(Future)* South  
- *(Future)* East  
- *(Future)* Other / National accounts  

### 11.2 Customer type

- Hospital  
- Diagnostic Centre  
- Medical College  
- Dealer  
- Multispeciality Hospital  
- Neurology Centre  
- Polyclinic  

### 11.3 Product and modality

| Product | Modality |
|---|---|
| ANAMAYA | MRI |
| 1.5T MRI | MRI |
| 3T MRI | MRI |
| ACHIEVA 3T | MRI |
| FPD | Digital Radiography |
| Gamma Camera | Nuclear Medicine |

### 11.4 Site status

- To Be Identified  
- Under Preparation  
- Ready  

### 11.5 Funding status

- Not Yet Approached Bank  
- Approached Bank  
- Under Negotiation  
- Ready  
- DO/LC Received  
- Self Funding  

### 11.6 Process / sales status

New Enquiry · Need Analysis · Technical Discussion · Quotation Submitted · Commercial Negotiation · Finalisation · Order & Advance · PO ADV Collected · Booked · Lost · Cancelled  

---

## 12. Data requirements

### 12.1 Opportunity entity (logical)

| Field | Type | Mandatory | Notes |
|---|---|---|---|
| Opportunity ID | Text | System | `3I-FYxx-nnnn` |
| Customer name | Text | Yes | |
| Location | Text | Yes | City / town |
| Region | List | Yes | |
| Customer type | List | Yes | |
| Modality | List | Yes | Derived from product |
| Product | List | Yes | |
| Opportunity value (₹ Lakh) | Number | Yes (on submit) | Single unit of record |
| Site status | List | Yes | |
| Funding status | List | Yes | |
| Expected closure | Date | Yes | |
| Process stage | List | Yes | |
| Pipeline stage | List | System | I / II / III / IV |
| Probability % | Number | System | From stage map |
| Sales status / outcome | List | Yes | Open path or Booked/Lost/Cancelled |
| Owner | User | Yes | |
| Remarks | Long text (history) | No | Each entry dated |
| Lost reason | List | If Lost/Cancelled | |
| Competitor | Text/List | If Competitor loss | |
| Date lost / cancelled | Date | If Lost/Cancelled | |
| Created on | Date | System | |
| Last updated | Date | System | |
| Source | Text | Migration | `Prem Excel` / `West Excel` / `Manual` |

### 12.2 Activity entity

| Field | Type |
|---|---|
| Opportunity ID | Link |
| Date | Date |
| Title / type | Text |
| Note | Long text |
| User | User |

### 12.3 Validation rules

1. Value > 0 on submit (not on draft).  
2. Expected closure may be in the past only if user confirms “already overdue” (to allow migration of missed dates).  
3. Booked opportunities cannot be edited back to Open without manager permission.  
4. Probability is read-only.  
5. One outcome at a time.

### 12.4 Migration from Excel

A one-time load is required.

| Rule | Approach |
|---|---|
| Normalise product names | Mapping table (see §4.1) |
| Normalise funding / site / customer type | Mapping table |
| Parse closure dates where possible | `October` → last day of October in working FY; unparseable → blank + flag |
| Value units | West “Value (Lacs)” treated as lakhs. North mixed L / Cr — **manual review required** especially ANAMAYA vs MRI crore values |
| Duplicates | Review Sudama Diag, SLC Medical College, Indu Healthcare, Virat Ramayan, Mediequip before load |
| Lost sheet | Radiology Solution → United; Jeevan Dhan → United; merge with in-sheet lost remarks |
| Owner | Prem rows → Prem Kumar Thakur; West rows → West Sales Team until named owners exist |
| Incomplete name-only rows | Load as Draft or exclude; do not inflate pipeline |

**Do not go live on Kissflow using unreviewed North values as if they were already in one unit.**

---

## 13. KPI and calculation rules

Let **V** = opportunity value in ₹ Lakhs.  
Let **P** = probability as a percentage.

| KPI | Formula | Population |
|---|---|---|
| Total Pipeline | Σ V | Outcome = Open |
| Total Opportunities | Count | Selected scope (all or open — dashboard should show both clearly) |
| Expected Revenue / Weighted Pipeline | Σ (V × P / 100) | Outcome = Open |
| High Probability Deals | Count and Σ V | Open and P ≥ 70% (Stage III–IV) |
| Booked Business | Σ V | Outcome = Booked |
| Lost Business | Σ V | Outcome = Lost or Cancelled |
| Coverage | Weighted / Pipeline | Open |
| Conversion | Booked count / all opportunities (define period) | Workshop to confirm period: FY vs rolling |

**Example (agreed in mockup):** ₹10 L at Stage II (45%) → weighted forecast ₹4.5 L.

**Display:** values ≥ 100 Lakh show as ₹ Cr; below that as ₹ L.

---

## 14. Non-functional requirements

| ID | Requirement |
|---|---|
| NFR-01 | Built on Kissflow; no custom standalone backend in Phase 1. |
| NFR-02 | Usable on desktop and laptop as primary; tablet usable. Mobile is best-effort. |
| NFR-03 | Response time for list/dashboard acceptable for ~500–2,000 opportunities. |
| NFR-04 | Role-based data visibility (own / region / all). |
| NFR-05 | Audit trail on stage, value, owner and outcome changes. |
| NFR-06 | Language: English. Currency: INR. |
| NFR-07 | Financial year configurable (India FY April–March). Opportunity IDs reset or continue by FY policy. |
| NFR-08 | UI should feel like a business application (clean, data-focused), consistent with the mockup direction (primary colour #2879B6). |

---

## 15. Roles and permissions (proposed)

| Role | Create | Edit own | Edit region | View all | Reports | Admin masters | Change booked/lost back |
|---|---|---|---|---|---|---|---|
| Sales Executive | Yes | Yes | No | No | Own | No | No |
| Sales Manager | Yes | Yes | Yes | No | Region | No | Region, with reason |
| Leadership | No (optional) | No | No | Yes | All | No | No |
| System Admin | Yes | Yes | Yes | Yes | All | Yes | Yes |

West currently has no named executives in Excel. Until names are loaded, West Manager sees all West records.

---

## 16. Assumptions

1. Excel remains the historical archive; Kissflow becomes the live system after cutover.  
2. One opportunity = one customer location + one primary product. Multi-system deals (Nagpur & Washim, MRI + FPD) are separate opportunities or a parent with children in Phase 2.  
3. “Booked” means commercially won per 3i policy (PO + advance), not installation complete.  
4. Dealers can be customers (opportunity owner still a 3i salesperson).  
5. Probability bands will be standardised company-wide, not per region.  
6. The mockup is a requirements aid, not the production application.

---

## 17. Constraints and dependencies

- Kissflow form, workflow and reporting limits will shape exact UI (stepper vs single form, kanban vs list).  
- Named West owners must be provided before individual performance reports are meaningful.  
- Value-unit cleanup is a business task, not an IT task.  
- Field team must agree that dropdowns replace free-text status.  
- Network access to Kissflow from the field is required for adoption.

---

## 18. Acceptance criteria (Phase 1)

The Kissflow application is accepted when:

1. A salesperson can create an opportunity with all mandatory fields and receive an ID.  
2. Stage change updates probability and moves the deal in the funnel.  
3. Dashboard pipeline, weighted forecast, booked and lost match the list for the same filters.  
4. Overdue closures appear for the owner.  
5. Lost reason is required to mark Lost.  
6. Excel-style free text cannot be entered for product, stage, funding, site, region or outcome.  
7. Region Prem vs West can be filtered independently and together.  
8. Leadership can see all-region totals without opening individual records.  
9. Migrated sample of Prem + West data is reviewed and signed by Sales.  
10. Sales workshop minutes against §20 are closed or parked as Phase 2.

---

## 19. Implementation approach

| Step | Activity | Owner |
|---|---|---|
| 1 | Review this BRD and the mockup in a sales workshop | Sales + process owner |
| 2 | Freeze stages, probabilities, mandatory fields, booked definition | Sales leadership |
| 3 | Clean Excel values (especially ₹ L vs ₹ Cr) and duplicates | Sales managers |
| 4 | Configure Kissflow: form, workflow, roles, reports | Kissflow implementer |
| 5 | Migrate cleaned data | Implementer + sales |
| 6 | UAT against this BRD | Prem Territory + West |
| 7 | Cutover; Excel becomes read-only archive | Leadership |

The mockup in this project folder should be used in Step 1 as the walkthrough, not as a technical design to copy pixel-for-pixel into Kissflow.

---

## 20. Open questions for the sales workshop

Please answer these before development. Suggested owners in brackets.

1. **Probability:** Confirm the Stage I–IV percentages (20 / 45 / 75 / 95) and the eight process-stage splits. [Sales leadership]  
2. **Booked vs PO ADV Collected:** When is revenue “booked” for the dashboard? [Sales + Finance]  
3. **Value unit:** Confirm store in Lakhs, enter in Crore, and how to correct North ANAMAYA ₹5.5 L vs West ₹5 Cr. [Sales managers]  
4. **Mandatory on first save:** Can site and funding be unknown at New Enquiry, or must they be “To Be Identified” / “Not Yet Approached Bank”? [Field team]  
5. **West owners:** List of named executives for Kissflow users. [West lead]  
6. **Multi-system deals:** One opportunity or two when a customer wants two ANAMAYA systems? [Sales]  
7. **Dealer opportunities:** Is the dealer the customer, or must the end hospital be created? [Sales]  
8. **Lost vs Cancelled:** Is “project on hold” Cancelled, Lost, or still Open with a hold flag? [Sales]  
9. **Next follow-up date:** Add as mandatory in Phase 1 or Phase 2? [Sales]  
10. **Products:** Add CT, refurbished, or other SKUs now? [Product / Sales]  
11. **FY ID:** Continue `3I-FY26-` through FY 2026–27 or switch to `3I-FY27-` from April 2026? [Admin] *(Today is 28 Aug 2026 — confirm current FY label.)*  
12. **Who may edit value after quotation?** [Sales leadership]  
13. **Conversion KPI:** Booked / created in FY, or booked / closed (booked+lost) in FY? [Management]  
14. **South / East:** Create empty regions in Phase 1 or hide until launch? [Leadership]

---

## 21. Mockup-to-Kissflow traceability

| Mockup screen | BRD section | Kissflow equivalent (indicative) |
|---|---|---|
| Dashboard | §10.7, §13 | Home page / report dashboard |
| Sales Funnel | §8, §10.5 | Report + filtered list |
| Opportunities | §10.3 | Item list |
| Opportunity details | §10.4 | Item detail + notes |
| Add Opportunity | §10.2 | Create form |
| My Pipeline | §10.6 | My items / board if available |
| Forecast | §10.8, §13 | Reports |
| Lost Business | §10.9 | Filtered list + report |
| Reports | §10.10 | Report catalogue |
| Settings / Data insights | §4, §11, §12.4 | Admin + data quality during migration |

---

## 22. Glossary

| Term | Meaning |
|---|---|
| Pipeline | Sum of open opportunity values |
| Weighted pipeline / expected revenue | Pipeline adjusted by win probability |
| Stage I–IV | Forecast bands used in the current Excel |
| Process stage | Operational step in the selling cycle |
| Booked | Won order per company policy |
| Site status | Physical / regulatory readiness of the install site |
| Funding status | How the customer will pay (bank, self, LC/DO) |
| ANAMAYA | 3i MRI product line as recorded in Excel |
| FPD | Flat panel detector / digital radiography line |
| Kissflow | Low-code platform selected for the live application |
| BRD | This business requirements document |

---

## 23. Approval

To be signed after the workshop. Signing means Phase 1 scope, stages, mandatory fields and booked definition are frozen.

| Role | Name | Date | Signature |
|---|---|---|---|
| Sales Manager — Prem Territory | Prem Kumar Thakur | | |
| West Sales Lead | | | |
| Sales / Management sponsor | | | |
| Kissflow process owner | | | |

---

*End of BRD v0.1 — discussion draft. Use with the interactive mockup. Do not treat mock KPI figures as audited company results; they are normalised from the Excel trackers for illustration.*
