# E2E STR Full Portal - Client Timeline Fix

This package restores the full Team Portal and rebuilds the Client Portal with a proper step-by-step timeline view.

## Demo passwords

- Team Portal: `team`
- Client Portal: `client`

## Client Portal updates

The client portal now includes:

1. **What we need from you** at the very top
   - Client/owner actions appear before the timeline.
   - Pulls client-owned tasks, waiting-on-client tasks, approvals, access, documents, budget confirmations, and upcoming open milestones.

2. **Summary progress by stage**
   - Acquisition Readiness
   - Pre-Closing Setup
   - Post-Closing Security
   - Operations Launch

3. **Collapsible stage dropdowns**
   - Each stage has its own dropdown.
   - Each summary shows progress percentage, open task count, date range, and current/next task.
   - Expanded view shows each step in order with dates, owner, status, and notes.

4. **Client Gantt chart**
   - The blue vertical marker shows `Currently here today`.
   - Only client-visible milestones appear.

5. **Client tabs restored**
   - Timeline
   - Budget
   - Furnishing
   - Security & Utilities
   - Guest-Ready
   - Project Details

## Team Portal preserved

The Team Portal still includes the full internal tabs:

- Overview
- Timeline + Gantt
- Budget
- Furnishing
- Vendors
- Checklists
- Metrics / Case Study
- Data / Export

## Important note

This is still a static MVP. Data is stored in browser localStorage. For real client/team collaboration across devices, connect this front-end to a backend such as Supabase, Firebase, Airtable, or a custom database.


## Latest client portal update

The client portal now has shorter client-facing language and a simplified top section called **What we need from you**. Clients can choose a related request, type a note, and attach files. In this static MVP, attachments are stored only in the browser/local demo state. For production, connect this to Supabase/Firebase/Airtable storage so uploaded files sync across devices and team members.
