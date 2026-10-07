# FMS Field Mobile Application — UI/UX Prototype

## 1. Project Description
A high-fidelity mobile UI/UX design prototype for the **Forest Management System (FMS) Field Mobile Application** used by the **Redhakhol Forest Division, Odisha Forest Department**. Implementation partner: Ceorra Technologies Pvt. Ltd.

The app is a **field-first, offline-first, map-aware and GPS-aware** Android application used inside forests by two field roles only:

1. **Forest Guard**
2. **Forester**

Design principles: field first, offline first, large touch targets, minimum clutter, simple language, fast data entry, clear success / error states. Clean Government field-application look (no glassmorphism, no decorative gradients, no dashboard clutter).

**Out of scope for this app:** Range Officer, ACF, DFO, FMS Administrator, Control Room and FMS Editor (these are Web-only roles and must not get Mobile access).

## 2. Presentation
Full mobile-width app that fills the browser (mobile-first layout, comfortable max width on desktop). Bottom navigation: **HOME · MAP · TASKS · MORE**. A demo role switcher lets the reviewer preview Forest Guard and Forester screens without re-logging in.

**Visual direction (confirmed with client):** glassmorphic — frosted translucent panels over a soft forest-gradient canvas, with dark, high-contrast text retained so screens stay readable outdoors. A shared glass component kit (panels, bars, inputs, sheets) keeps every module visually identical.

## 3. Page Structure
- `/` — Login (User ID / Password, Forgot Password)
- `/forgot-password` — Forgot / Reset Password (3-step)
- `/home` — Home (role-aware: Forest Guard Home / Forester Home)
- `/map` — Map core experience (layers, GPS position, offline base map)
- `/tasks` — Task list (My Open / Due Today / Overdue / Completed)
- `/more` — Module list, equipment, offline maps, sync, profile, switch role

## 4. Core Features
- [x] Login with role routing + wrong-channel (Web-only account) message
- [x] Forgot / Reset password (approved shared identity pattern)
- [x] Common mobile app shell with Home / Map / Tasks / More navigation
- [x] Forest Guard Home
- [x] Forester Home
- [x] Demo role switcher
- [x] Map core experience (layers, base-map switch, GPS position card, offline packages preview)
- [ ] GPS position detail (accuracy, admin context, Inside / Outside assigned area)
- [ ] Offline Maps (download / update / remove packages)
- [x] Foot Patrolling (Start Foot Patrol, Active Patrol + live timer, Add Observation, End Patrol review, Patrol History, Patrol Detail)
- [ ] Joint Patrolling (team & location, electrical hazard observations, follow-up)
- [ ] Incidents (Human-Wildlife, Forest Fire, incident detail / history)
- [ ] Task management (list, board/calendar/map views, detail, completion, reassignment)
- [ ] Assets (list, map, detail, create, inspection, history, QR)
- [ ] Equipment (My Equipment, condition update)
- [ ] Drone operations (permission controlled)
- [ ] AI Assistant (advisory only)
- [ ] Common screens: Notifications, Sync Status, Offline Maps & Storage, Profile
- [x] Shared component kit (fields, searchable lookups, GPS block, media capture, step header, empty / success / offline states)

## 5. Data Model Design
This phase is a **design prototype** and runs on curated mock data under `src/mocks/`. No database is connected at this stage. If the Department later wants live persistence (patrol records, asset records, incidents, tasks), a database can be connected and the mock layer swapped for real records.

## 6. Backend / Third-party Integration Plan
- Database: **not connected now** — temporary demo data for the prototype
- Shopify / payments: **not applicable**
- Location / maps: Google Maps embed for map preview; device GPS in the real native build
- Photos / media: device camera in the real native build

## 7. Development Phase Plan

### Phase 1 — Auth, Shell & Home (current)
- Goal: The reviewer can log in, reset a password, land on the correct role Home, and move through the app shell.
- Deliverable: Login, Forgot/Reset Password, app shell + bottom navigation, Forest Guard Home, Forester Home, demo role switcher, navigable Map / Tasks / More.

### Phase 2 — Map, GPS & Offline Maps
- Goal: The core map experience with layers, current GPS position, accuracy, admin context and offline map packages.
- Deliverable: Map screen, GPS position detail, offline map list with download / update / remove.

### Phase 3 — Assets
- Goal: Full asset workflow.
- Deliverable: Asset list (list/map/search/filter), asset detail, guided create asset flow, asset inspection, append-only asset history, QR scan.

### Phase 4 — Foot Patrolling (done)
- Goal: The key Field Patrolling register workflow.
- Deliverable: Start Foot Patrol, patrol tracking screen, patrol observation, end patrol review, patrol history, patrol detail.

### Phase 5 — Joint Patrolling
- Goal: TPWODL joint-patrolling format (separate flow, not a generic patrol form).
- Deliverable: Joint patrol team & location, electrical hazard observations, follow-up / coordination (records only — no power disconnect or restore actions).

### Phase 6 — Incidents
- Goal: Department incident formats.
- Deliverable: Human-Wildlife incident form (sectioned, sensitive-data aware), configurable Forest Fire form, incident detail / history.

### Phase 7 — Tasks
- Goal: Hierarchy-aware task management.
- Deliverable: Task list (filters, List/Board/Calendar/Map), task detail, task completion with evidence, Forester → Forest Guard assignment.

### Phase 8 — More Modules
- Goal: Supporting field utilities.
- Deliverable: My Equipment, Sync / Last Sync, Profile, and conditional Drone Operation / AI Assistant entries.