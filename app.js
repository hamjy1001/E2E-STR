(function(){
  const KEY = 'e2eSTR.fullPortal.v4';
  const TEAM_PASS = 'team';
  const CLIENT_PASS = 'client';
  const STAGES = ['Acquisition Readiness','Pre-Closing Setup','Post-Closing Security','Operations Launch'];
  const STATUS = ['Not Started','In Progress','Complete','Blocked','Waiting on Client','Waiting on Vendor'];
  const CATEGORIES = ['Acquisition','Improvements','Furnishing','Compliance','Utility','Security','Operations','Marketing','Cleaning','Financials'];
  const OWNERS = ['E2E Team','Client','Realtor','Lender','Inspector','Improvements','Furnishing','Compliance','Utility','Security','Operations','Cleaner','Photographer','Property Manager','CPA / Bookkeeper'];
  const PROJECT_TABS = ['overview','timeline','budget','furnishing','vendors','checklists','metrics','data'];

  const $ = (s,r=document)=>r.querySelector(s);
  const $$ = (s,r=document)=>Array.from(r.querySelectorAll(s));
  const esc = v => String(v ?? '').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const iso = d => d.toISOString().slice(0,10);
  const addDays = n => { const d = new Date(); d.setHours(0,0,0,0); d.setDate(d.getDate()+n); return iso(d); };
  const dateVal = v => new Date((v || addDays(0))+'T00:00:00').getTime();
  const daysBetween = (a,b)=>Math.round((dateVal(b)-dateVal(a))/86400000);
  const fmtDate = v => v ? new Date(v+'T00:00:00').toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric'}) : 'TBD';
  const fmtShortDate = v => v ? new Date(v+'T00:00:00').toLocaleDateString('en-US',{month:'short',day:'numeric'}) : 'TBD';
  const money = v => '$' + (Number(v)||0).toLocaleString('en-US',{maximumFractionDigits:0});
  const pct = v => Math.round(Number(v)||0) + '%';
  const num = v => Number(v)||0;

  function newId(prefix){ return prefix + '-' + Date.now().toString(36) + '-' + Math.random().toString(36).slice(2,7); }
  function task(id,title,stage,category,owner,startOffset,endOffset,status,notes,clientVisible=true){return {id,title,stage,category,owner,startDate:addDays(startOffset),endDate:addDays(endOffset),status,notes,clientVisible};}
  function row(id, data){ return {id:newId(id), ...data}; }

  function defaultState(){
    return {
      project:{
        name:'Arizona E2E STR Concierge Project - Sample',
        market:'Scottsdale / Phoenix Metro, AZ',
        propertyAddress:'Add property address',
        propertyType:'4BR / 3BA single-family STR',
        bedrooms:4,
        bathrooms:3,
        sleeps:10,
        closingDate:addDays(-2),
        targetLaunchDate:addDays(28),
        approvedBudget:31000,
        status:'Pre-Closing Setup',
        currentFocus:'Utility activation, permit readiness, and long-lead furniture orders',
        clientNextAction:'Approve final furniture budget and confirm utility account access',
        propertyManager:'TBD',
        cleaner:'TBD',
        clientName:'Founding Client',
        clientEmail:'client@example.com'
      },
      tasks:[
        task('A1','Market Fit & Investment Criteria','Acquisition Readiness','Acquisition','E2E Team',-48,-40,'Complete','Define market thesis, STR demand, regulation risk, target guest profile, buy box, and cash-flow assumptions.'),
        task('A2','Local Realtor Network Outreach','Acquisition Readiness','Acquisition','Realtor',-42,-35,'Complete','Contact STR-aware local realtors, share buy box, clarify referral workflow, and collect active opportunities.'),
        task('A3','Offer Acceptance & Closing Calendar','Acquisition Readiness','Acquisition','Client',-34,-30,'Complete','Track accepted offer, earnest money, inspection window, contingency deadlines, and closing calendar.'),
        task('A4','Mortgage & Closing Process Checklist','Acquisition Readiness','Acquisition','Lender',-30,-5,'In Progress','Loan docs, appraisal, underwriting, insurance, closing disclosure, funding, and final closing tasks.'),
        task('S1','Inspection & Repair Scope','Pre-Closing Setup','Improvements','Improvements',-25,-14,'In Progress','Inspection report review, repair negotiation, urgent improvement list, contractor estimate, and closing-day punch list.'),
        task('S2','Furnishing Strategy & Room-by-Room Plan','Pre-Closing Setup','Furnishing','Furnishing',-24,-17,'Complete','Guest profile, sleep count, furniture budget, durable item standards, and room-by-room shopping plan.'),
        task('S3','Long-Lead Furniture Ordering','Pre-Closing Setup','Furnishing','Furnishing',-18,-6,'In Progress','Beds, mattresses, sofa, dining set, patio pieces, and items that can ship near or immediately after closing.'),
        task('S4','Permit & Compliance Readiness','Pre-Closing Setup','Compliance','Compliance',-16,4,'In Progress','STR permit, HOA review, local registration, business license/tax checklist, insurance questions, and compliance owner.'),
        task('S5','Utility Activation Plan','Pre-Closing Setup','Utility','Utility',-12,3,'In Progress','Electric, gas, water, trash, internet, account transfers, activation dates, and provider contacts.'),
        task('Q1','Exterior Security Camera Setup','Post-Closing Security','Security','Security',1,8,'Not Started','Exterior camera plan, privacy/compliance review, installation, app access, and owner testing.'),
        task('Q2','Smart Lock & Backup Entry Setup','Post-Closing Security','Security','Security',1,7,'Not Started','Smart lock, backup lockbox, guest code workflow, owner access, and remote testing.'),
        task('Q3','Fire / CO Alarm Safety System','Post-Closing Security','Security','Security',2,9,'Not Started','Smoke alarms, CO detectors, fire extinguishers, batteries, safety placement, and test log.'),
        task('Q4','Theft Alarm & Monitoring Setup','Post-Closing Security','Security','Security',3,12,'Not Started','Alarm system, monitoring decision, owner access, emergency contacts, and activation test.'),
        task('O1','Furniture Assembly & Installation','Operations Launch','Operations','Operations',7,18,'Not Started','Furniture assembly, TV mounting, curtains, decor, owner closet, and setup punch-list fixes.'),
        task('O2','Guest-Ready Staging','Operations Launch','Furnishing','Furnishing',14,21,'Not Started','Room styling, kitchen setup, towels/linens, consumables, supplies, and photo-ready presentation.'),
        task('O3','Professional Photoshoot','Operations Launch','Marketing','Photographer',21,23,'Not Started','Professional STR photos, amenity images, hero shots, and listing-ready visual assets.'),
        task('O4','Listing & Channel Management Setup','Operations Launch','Marketing','Property Manager',21,27,'Not Started','Airbnb/VRBO listing setup, amenities, house rules, guidebook, pricing, and launch review.'),
        task('O5','Cleaning Crew Onboarding','Operations Launch','Cleaning','Cleaner',17,25,'Not Started','Cleaner selection, turnover checklist, supply system, first deep clean, backup cleaner, and quality control.'),
        task('O6','Time Tracking & Financial Workflow Setup','Operations Launch','Financials','E2E Team',18,28,'Not Started','Owner tracking, vendor invoices, setup budget, time tracking, financial folders, and monthly reporting workflow.')
      ],
      budget:[
        row('budget',{category:'Acquisition',item:'Market/data review and acquisition coordination',budget:1500,actual:800,status:'In Progress',notes:'AirDNA/API-ready workflow and agent referral support.'}),
        row('budget',{category:'Improvements',item:'Inspection repairs and handyman punch list',budget:4500,actual:0,status:'Quoted',notes:'Update after inspection scope is finalized.'}),
        row('budget',{category:'Furnishing',item:'Furniture, decor, kitchen, bedding, outdoor setup',budget:16000,actual:5200,status:'In Progress',notes:'Long-lead items ordered first.'}),
        row('budget',{category:'Compliance',item:'Permit, registration, HOA, insurance readiness',budget:900,actual:150,status:'In Progress',notes:'Professional/licensed review as needed.'}),
        row('budget',{category:'Utility',item:'Internet, account setup, deposits, activation',budget:700,actual:0,status:'Not Started',notes:'Schedule as early as possible.'}),
        row('budget',{category:'Security',item:'Cameras, locks, alarms, safety equipment',budget:2200,actual:0,status:'Not Started',notes:'After closing installation.'}),
        row('budget',{category:'Operations',item:'Assembly, staging, photos, cleaner/PM setup',budget:5200,actual:0,status:'Not Started',notes:'Operations launch sprint.'})
      ],
      furniture:[
        row('furn',{room:'Primary Bedroom',item:'King mattress + frame',vendor:'TBD',qty:1,cost:1200,status:'Planning',delivery:'Not scheduled',installed:false,notes:'Sleep quality priority.'}),
        row('furn',{room:'Bedroom 2',item:'Queen mattress + frame',vendor:'TBD',qty:1,cost:900,status:'Planning',delivery:'Not scheduled',installed:false,notes:'Durable frame.'}),
        row('furn',{room:'Living Room',item:'Sleeper sofa',vendor:'TBD',qty:1,cost:1600,status:'Planning',delivery:'Not scheduled',installed:false,notes:'Stain-resistant fabric.'}),
        row('furn',{room:'Dining',item:'Dining table for 8-10',vendor:'TBD',qty:1,cost:1100,status:'Planning',delivery:'Not scheduled',installed:false,notes:'Match sleep count.'}),
        row('furn',{room:'Outdoor',item:'Patio seating set',vendor:'TBD',qty:1,cost:900,status:'Planning',delivery:'Not scheduled',installed:false,notes:'Weather-resistant.'})
      ],
      purchases:[
        row('pur',{category:'Smart Home',item:'Smart lock',vendor:'TBD',qty:1,price:250,status:'Need to Order',eta:'',notes:'Remote code management.'}),
        row('pur',{category:'Kitchen',item:'Coffee maker',vendor:'TBD',qty:1,price:120,status:'Need to Order',eta:'',notes:'Simple durable model.'}),
        row('pur',{category:'Bathroom',item:'Bath towel set',vendor:'TBD',qty:20,price:18,status:'Need to Order',eta:'',notes:'White/easy replacement.'}),
        row('pur',{category:'Bedroom',item:'Blackout curtains',vendor:'TBD',qty:4,price:65,status:'Need to Order',eta:'',notes:'All bedrooms.'})
      ],
      vendors:[
        row('ven',{category:'Realtor',name:'Add local STR-aware realtor',market:'Scottsdale / Phoenix',contact:'',phone:'',email:'',score:0,status:'Candidate',notes:'Licensed local agent referral network.'}),
        row('ven',{category:'Improvements',name:'Add handyman / contractor',market:'Scottsdale',contact:'',phone:'',email:'',score:0,status:'Candidate',notes:'Inspection repairs, assembly, installs.'}),
        row('ven',{category:'Cleaner',name:'Add STR cleaner',market:'Scottsdale',contact:'',phone:'',email:'',score:0,status:'Candidate',notes:'Turnover process and backup cleaner.'}),
        row('ven',{category:'Photographer',name:'Add STR photographer',market:'Phoenix Metro',contact:'',phone:'',email:'',score:0,status:'Candidate',notes:'Listing photos.'}),
        row('ven',{category:'Property Manager',name:'Add PM candidate',market:'Phoenix Metro',contact:'',phone:'',email:'',score:0,status:'Candidate',notes:'Listing/channel management.'})
      ],
      utilities:[
        row('util',{service:'Electric',provider:'',account:'',setupDate:'',activationDate:'',status:'Not Started',notes:''}),
        row('util',{service:'Water / Sewer',provider:'',account:'',setupDate:'',activationDate:'',status:'Not Started',notes:''}),
        row('util',{service:'Gas',provider:'',account:'',setupDate:'',activationDate:'',status:'Not Started',notes:''}),
        row('util',{service:'Internet',provider:'',account:'',setupDate:'',activationDate:'',status:'Not Started',notes:'High-speed plan.'}),
        row('util',{service:'Trash',provider:'',account:'',setupDate:'',activationDate:'',status:'Not Started',notes:'Confirm pickup day.'})
      ],
      security:[
        row('sec',{item:'Exterior security cameras',model:'',owner:'Security',installed:false,tested:false,status:'Not Started',notes:'Privacy/compliance review before install.'}),
        row('sec',{item:'Smart locks',model:'',owner:'Security',installed:false,tested:false,status:'Not Started',notes:'Backup access required.'}),
        row('sec',{item:'Fire / CO alarms',model:'',owner:'Security',installed:false,tested:false,status:'Not Started',notes:'Placement and battery log.'}),
        row('sec',{item:'Theft alarm / monitoring',model:'',owner:'Security',installed:false,tested:false,status:'Not Started',notes:'Emergency contacts.'})
      ],
      operations:[
        row('ops',{area:'Assembly',item:'Furniture assembly and TV mounting',owner:'Operations',status:'Not Started',dueDate:addDays(18),notes:'Coordinate with delivery schedule.'}),
        row('ops',{area:'Staging',item:'Guest-ready staging',owner:'Furnishing',status:'Not Started',dueDate:addDays(21),notes:'Photo-ready setup.'}),
        row('ops',{area:'Photoshoot',item:'Professional photoshoot',owner:'Photographer',status:'Not Started',dueDate:addDays(23),notes:'Shoot after staging.'}),
        row('ops',{area:'Listing',item:'Listing/channel setup',owner:'Property Manager',status:'Not Started',dueDate:addDays(27),notes:'Airbnb/VRBO/guidebook.'}),
        row('ops',{area:'Cleaning',item:'Cleaning crew onboarding',owner:'Cleaner',status:'Not Started',dueDate:addDays(25),notes:'Turnover checklist.'}),
        row('ops',{area:'Financials',item:'Time tracking and financial workflow',owner:'E2E Team',status:'Not Started',dueDate:addDays(28),notes:'Invoices, time log, monthly reporting.'})
      ],
      inventory:[
        row('inv',{category:'Kitchen',item:'Dinner plates',target:12,current:0,complete:false,notes:''}),
        row('inv',{category:'Kitchen',item:'Cookware set',target:1,current:0,complete:false,notes:''}),
        row('inv',{category:'Bathroom',item:'Bath towels',target:20,current:0,complete:false,notes:''}),
        row('inv',{category:'Bedroom',item:'Pillows',target:20,current:0,complete:false,notes:''}),
        row('inv',{category:'Safety',item:'Fire extinguishers',target:2,current:0,complete:false,notes:''})
      ],
      inspection:[
        row('insp',{area:'Exterior',item:'Address visible and exterior lighting works',complete:false,owner:'E2E Team',notes:''}),
        row('insp',{area:'Entry',item:'Smart lock and backup entry tested',complete:false,owner:'Security',notes:''}),
        row('insp',{area:'Kitchen',item:'Kitchen inventory complete and appliances tested',complete:false,owner:'Operations',notes:''}),
        row('insp',{area:'Bedrooms',item:'Beds made, blackout curtains installed, extra linens ready',complete:false,owner:'Furnishing',notes:''}),
        row('insp',{area:'Safety',item:'Smoke/CO detectors and fire extinguishers ready',complete:false,owner:'Security',notes:''}),
        row('insp',{area:'Operations',item:'Cleaner checklist, guidebook, PM handoff complete',complete:false,owner:'Property Manager',notes:''})
      ],
      metrics:{launchDate:'',daysToLaunch:'',firstBookingDate:'',month1Revenue:'',month1Occupancy:'',actualLaunchCost:'',notes:''},
      caseStudy:{title:'',market:'',propertyType:'',launchBudget:'',launchDays:'',challenge:'',solution:'',results:'',testimonial:''},
      messages:[{from:'E2E Team',date:addDays(0),text:'Portal rebuilt with full tabs plus the new acquisition/setup/security/operations Gantt workflow.'}],
      clientSubmissions:[]
    };
  }

  function normalize(state){
    const d = defaultState();
    state = state || d;
    state.project = {...d.project, ...(state.project||{})};
    for(const key of ['tasks','budget','furniture','purchases','vendors','utilities','security','operations','inventory','inspection','messages','clientSubmissions']) state[key] = Array.isArray(state[key]) ? state[key] : d[key];
    state.metrics = {...d.metrics, ...(state.metrics||{})};
    state.caseStudy = {...d.caseStudy, ...(state.caseStudy||{})};
    return state;
  }
  function load(){try{return normalize(JSON.parse(localStorage.getItem(KEY)))}catch(e){return defaultState()}}
  function save(){localStorage.setItem(KEY,JSON.stringify(state));}
  let state = load();

  function init(){
    const page = document.body.dataset.page;
    $('#resetDemo')?.addEventListener('click',()=>{if(confirm('Reset demo portal data?')){localStorage.removeItem(KEY); state=defaultState(); save(); render(page);}});
    if(!page) return;
    const sessionKey = page === 'team' ? 'e2eTeam' : 'e2eClient';
    const pass = page === 'team' ? TEAM_PASS : CLIENT_PASS;
    if(sessionStorage.getItem(sessionKey)==='yes') showApp(page);
    $('#loginForm')?.addEventListener('submit',e=>{e.preventDefault(); if($('#password').value.trim()===pass){sessionStorage.setItem(sessionKey,'yes'); showApp(page);} else alert('Wrong password. Try '+pass+'.');});
    $('#lockPortal')?.addEventListener('click',()=>{sessionStorage.removeItem(sessionKey); location.reload();});
  }

  function showApp(page){ $('#login')?.classList.add('hidden'); $('#app')?.classList.remove('hidden'); render(page); }
  function render(page=document.body.dataset.page){
    state = load();
    $('#projectName') && ($('#projectName').textContent = state.project.name);
    $('#projectSubtitle') && ($('#projectSubtitle').textContent = `${state.project.market} | Closing: ${fmtShortDate(state.project.closingDate)} | Target Launch: ${fmtShortDate(state.project.targetLaunchDate)}`);
    renderKpis(page);
    if(page==='team') renderTeam();
    if(page==='client') renderClient();
  }

  function visibleTasks(page){ return page==='client' ? state.tasks.filter(t=>t.clientVisible) : state.tasks; }
  function completedPct(items, completeFn){ return items.length ? Math.round(items.filter(completeFn).length/items.length*100) : 0; }
  function taskPct(tasks=state.tasks){ return completedPct(tasks,t=>t.status==='Complete'); }
  function budgetTotals(){ const budget=state.budget.reduce((s,b)=>s+num(b.budget),0); const actual=state.budget.reduce((s,b)=>s+num(b.actual),0); return {budget,actual,remaining:budget-actual,approved:num(state.project.approvedBudget)}; }
  function purchaseTotals(){ const total=state.purchases.reduce((s,p)=>s+num(p.price)*Math.max(1,num(p.qty)),0); const delivered=state.purchases.filter(p=>p.status==='Delivered').length; return {total,delivered,count:state.purchases.length}; }
  function renderKpis(page){
    const tasks=visibleTasks(page); const budget=budgetTotals(); const days=daysBetween(addDays(0),state.project.targetLaunchDate); const blocked=tasks.filter(t=>t.status==='Blocked').length;
    $('#kpis').innerHTML = [
      kpi('Launch Progress', pct(taskPct(tasks)), 'Tasks complete'),
      kpi('Today', new Date().toLocaleDateString('en-US',{month:'short',day:'numeric'}), 'Currently here today'),
      kpi('Open / Blocked', `${tasks.filter(t=>t.status!=='Complete').length} / ${blocked}`, 'Remaining milestones'),
      kpi('Budget Used', money(budget.actual), `${money(budget.remaining)} remaining`),
      kpi('Target Launch', days>=0?`${days} days`:`${Math.abs(days)} late`, 'To operations-ready')
    ].join('');
  }
  function kpi(label,value,note){ return `<article class="kpi"><small>${esc(label)}</small><strong>${esc(value)}</strong><span>${esc(note)}</span></article>`; }

  function renderTeam(){
    wireTabs();
    renderOverviewTab();
    renderTimelineTab();
    renderBudgetTab();
    renderFurnishingTab();
    renderVendorsTab();
    renderChecklistsTab();
    renderMetricsTab();
    renderDataTab();
    wireTeamEvents();
  }
  function wireTabs(){
    $$('.tab-button').forEach(btn=>btn.addEventListener('click',()=>{
      $$('.tab-button').forEach(b=>b.classList.remove('active')); $$('.tab-section').forEach(s=>s.classList.remove('active'));
      btn.classList.add('active'); $('#tab-'+btn.dataset.tab)?.classList.add('active');
    }));
  }

  function renderOverviewTab(){
    const budget=budgetTotals(); const securityPct=completedPct(state.security,s=>s.installed&&s.tested); const opsPct=completedPct(state.operations,o=>o.status==='Complete');
    $('#tab-overview').innerHTML = `
      <section class="panel"><div class="panel-header"><div><h2>Project Overview</h2><p>All original portal sections are preserved. The timeline tab now uses the acquisition/setup/security/operations order and includes a current-day marker.</p></div></div>
        <div class="form-grid two">
          ${field('Project Name','project.name',state.project.name)}
          ${field('Market','project.market',state.project.market)}
          ${field('Property Address','project.propertyAddress',state.project.propertyAddress)}
          ${field('Property Type','project.propertyType',state.project.propertyType)}
          ${field('Bedrooms','project.bedrooms',state.project.bedrooms,'number')}
          ${field('Bathrooms','project.bathrooms',state.project.bathrooms,'number')}
          ${field('Sleeps','project.sleeps',state.project.sleeps,'number')}
          ${field('Closing Date','project.closingDate',state.project.closingDate,'date')}
          ${field('Target Launch Date','project.targetLaunchDate',state.project.targetLaunchDate,'date')}
          ${field('Approved Budget','project.approvedBudget',state.project.approvedBudget,'number')}
          ${field('Current Focus','project.currentFocus',state.project.currentFocus,'textarea','wide')}
          ${field('Client Next Action','project.clientNextAction',state.project.clientNextAction,'textarea','wide')}
        </div>
      </section>
      <section class="cards four portal-stat-row">
        ${statCard('Task Progress',pct(taskPct(state.tasks)),'Gantt + master timeline')}
        ${statCard('Budget Used',money(budget.actual),`${money(budget.budget)} planned`)}
        ${statCard('Security Setup',pct(securityPct),'Installed and tested')}
        ${statCard('Operations Setup',pct(opsPct),'Launch workflow')}
      </section>
      <section class="panel"><div class="panel-header"><h2>Client Submissions</h2><p>Files and notes sent from the client portal.</p></div>${teamClientSubmissionsHtml()}</section>
      <section class="panel"><div class="panel-header"><h2>Phase Summary</h2></div><div class="phase-grid">${STAGES.map(stage=>phaseCard(stage)).join('')}</div></section>
      <section class="panel"><div class="panel-header"><h2>Recent Client / Team Messages</h2></div><div class="message-list">${state.messages.map(m=>`<article><strong>${esc(m.from)} - ${fmtShortDate(m.date)}</strong><p>${esc(m.text)}</p></article>`).join('')}</div></section>
    `;
  }
  function phaseCard(stage){ const tasks=state.tasks.filter(t=>t.stage===stage); return `<article class="phase-card"><strong>${esc(stage)}</strong><span>${pct(taskPct(tasks))} complete</span><p>${tasks.length} tasks | ${tasks.filter(t=>t.status!=='Complete').length} open</p></article>`; }
  function statCard(label,value,note){return `<article><h3>${esc(value)}</h3><p><strong>${esc(label)}</strong><br>${esc(note)}</p></article>`;}

  function renderTimelineTab(){
    $('#tab-timeline').innerHTML = `
      <section class="panel"><div class="panel-header"><div><h2>Timeline + Gantt</h2><p>Order of operations: Acquisition Strategy, Pre-Closing Setup, Post-Closing Security, Operations Launch. The blue vertical line shows <strong>Currently here today</strong>.</p></div><div class="button-row"><button id="addTask" class="button secondary">Add Task</button><button id="resetTimeline" class="button secondary">Restore Default Timeline</button></div></div><div id="gantt"></div></section>
      <section class="panel"><div class="panel-header"><h2>Master Timeline Task Table</h2><p>Edit dates, owners, status, and client visibility here.</p></div><div class="table-wrap"><table id="taskTable"></table></div></section>
    `;
    renderGantt('team'); renderTaskTable();
  }

  function renderGantt(page){
    const tasks = visibleTasks(page).slice().sort((a,b)=>STAGES.indexOf(a.stage)-STAGES.indexOf(b.stage)||dateVal(a.startDate)-dateVal(b.startDate));
    if(!tasks.length){ $('#gantt').innerHTML='<div class="small-note">No tasks yet.</div>'; return; }
    const starts=tasks.map(t=>dateVal(t.startDate)); const ends=tasks.map(t=>dateVal(t.endDate));
    const min=Math.min(...starts,dateVal(addDays(-50))); const max=Math.max(...ends,dateVal(addDays(35))); const span=Math.max(max-min,1);
    const todayLeft=Math.max(0,Math.min(100,(dateVal(addDays(0))-min)/span*100));
    const ticks=Array.from({length:12},(_,i)=>{const d=new Date(min+span*(i/11)); return `<div>${d.toLocaleDateString('en-US',{month:'short',day:'numeric'})}</div>`;}).join('');
    let html=`<div class="gantt-wrap"><div class="gantt-grid"><div class="today-marker" style="left:calc(220px + (100% - 220px) * ${todayLeft/100})"></div><div class="gantt-dates"><div>Stage / Task</div>${ticks}</div>`;
    let current='';
    for(const t of tasks){
      if(t.stage!==current){ current=t.stage; html+=`<div class="stage-row">${esc(current)}</div>`; }
      const left=Math.max(0,Math.min(100,(dateVal(t.startDate)-min)/span*100));
      const width=Math.max(2,Math.min(100-left,(dateVal(t.endDate)-dateVal(t.startDate))/span*100));
      html+=`<div class="gantt-row"><div class="gantt-label"><strong>${esc(t.title)}</strong><span>${esc(t.owner)} | ${fmtShortDate(t.startDate)} - ${fmtShortDate(t.endDate)} | <b>${esc(t.status)}</b></span></div><div class="gantt-track"><span class="gantt-bar ${esc(t.category.toLowerCase())}" style="left:${left}%;width:${width}%"></span></div></div>`;
    }
    html+=`</div></div>`; $('#gantt').innerHTML=html;
  }
  function renderTaskTable(){
    const headers=['Order','Stage','Task Name','Category','Team / Owner','Start','End','Status','Client View','Notes','Delete'];
    $('#taskTable').innerHTML = `<thead><tr>${headers.map(h=>`<th>${h}</th>`).join('')}</tr></thead><tbody>${state.tasks.map((t,i)=>taskRow(t,i)).join('')}</tbody>`;
  }
  function taskRow(t,i){return `<tr><td>${i+1}</td><td>${selectCell('tasks',i,'stage',STAGES,t.stage)}</td><td>${inputCell('tasks',i,'title',t.title)}</td><td>${selectCell('tasks',i,'category',CATEGORIES,t.category)}</td><td>${selectCell('tasks',i,'owner',OWNERS,t.owner)}</td><td>${inputCell('tasks',i,'startDate',t.startDate,'date')}</td><td>${inputCell('tasks',i,'endDate',t.endDate,'date')}</td><td>${selectCell('tasks',i,'status',STATUS,t.status)}</td><td>${selectCell('tasks',i,'clientVisible',['true','false'],String(t.clientVisible))}</td><td>${inputCell('tasks',i,'notes',t.notes)}</td><td><button class="small-button" data-delete-row="tasks" data-index="${i}">Delete</button></td></tr>`;}

  function renderBudgetTab(){
    const totals=budgetTotals();
    $('#tab-budget').innerHTML=`
      <section class="panel"><div class="panel-header"><div><h2>Budget Tracker</h2><p>Budget follows the new operation stages: acquisition, improvements, furnishing, compliance, utility, security, operations.</p></div><button class="button secondary" data-add-row="budget">Add Budget Line</button></div>
        <div class="cards four no-margin">${statCard('Approved Budget',money(state.project.approvedBudget),'Client approved')}${statCard('Planned Budget',money(totals.budget),'Line-item planned')}${statCard('Actual Spend',money(totals.actual),'Recorded so far')}${statCard('Remaining',money(totals.remaining),'Planned minus actual')}</div>
        <div class="table-wrap"><table>${tableHead(['Category','Item','Budget','Actual','Variance','Status','Notes','Delete'])}<tbody>${state.budget.map((b,i)=>`<tr><td>${selectCell('budget',i,'category',CATEGORIES,b.category)}</td><td>${inputCell('budget',i,'item',b.item)}</td><td>${inputCell('budget',i,'budget',b.budget,'number')}</td><td>${inputCell('budget',i,'actual',b.actual,'number')}</td><td><strong>${money(num(b.budget)-num(b.actual))}</strong></td><td>${selectCell('budget',i,'status',['Not Started','Quoted','In Progress','Ordered','Paid','Complete'],b.status)}</td><td>${inputCell('budget',i,'notes',b.notes)}</td><td><button class="small-button" data-delete-row="budget" data-index="${i}">Delete</button></td></tr>`).join('')}</tbody></table></div>
      </section>`;
  }

  function renderFurnishingTab(){
    const purchases=purchaseTotals(); const installed=state.furniture.filter(f=>f.installed).length;
    $('#tab-furnishing').innerHTML=`
      <section class="panel"><div class="panel-header"><div><h2>Furnishing + Purchase Tracker</h2><p>Manage the room-by-room furnishing plan, order tracking, delivery status, and install readiness.</p></div></div><div class="cards four no-margin">${statCard('Furniture Items',state.furniture.length,'Room-by-room')}${statCard('Installed',`${installed}/${state.furniture.length}`,'Setup progress')}${statCard('Purchase Value',money(purchases.total),'Purchase tracker')}${statCard('Delivered',`${purchases.delivered}/${purchases.count}`,'Order status')}</div></section>
      <section class="panel"><div class="panel-header"><h2>Furnishing Plan</h2><button class="button secondary" data-add-row="furniture">Add Furniture</button></div><div class="table-wrap"><table>${tableHead(['Room','Item','Vendor','Qty','Cost','Status','Delivery','Installed','Notes','Delete'])}<tbody>${state.furniture.map((f,i)=>`<tr><td>${inputCell('furniture',i,'room',f.room)}</td><td>${inputCell('furniture',i,'item',f.item)}</td><td>${inputCell('furniture',i,'vendor',f.vendor)}</td><td>${inputCell('furniture',i,'qty',f.qty,'number')}</td><td>${inputCell('furniture',i,'cost',f.cost,'number')}</td><td>${selectCell('furniture',i,'status',['Planning','Ordered','Delivered','Installed','Returned'],f.status)}</td><td>${inputCell('furniture',i,'delivery',f.delivery)}</td><td>${checkCell('furniture',i,'installed',f.installed)}</td><td>${inputCell('furniture',i,'notes',f.notes)}</td><td><button class="small-button" data-delete-row="furniture" data-index="${i}">Delete</button></td></tr>`).join('')}</tbody></table></div></section>
      <section class="panel"><div class="panel-header"><h2>Purchase List</h2><button class="button secondary" data-add-row="purchases">Add Purchase</button></div><div class="table-wrap"><table>${tableHead(['Category','Item','Vendor','Qty','Price','Status','ETA','Notes','Delete'])}<tbody>${state.purchases.map((p,i)=>`<tr><td>${inputCell('purchases',i,'category',p.category)}</td><td>${inputCell('purchases',i,'item',p.item)}</td><td>${inputCell('purchases',i,'vendor',p.vendor)}</td><td>${inputCell('purchases',i,'qty',p.qty,'number')}</td><td>${inputCell('purchases',i,'price',p.price,'number')}</td><td>${selectCell('purchases',i,'status',['Need to Order','Ordered','Delivered','Installed','Returned'],p.status)}</td><td>${inputCell('purchases',i,'eta',p.eta,'date')}</td><td>${inputCell('purchases',i,'notes',p.notes)}</td><td><button class="small-button" data-delete-row="purchases" data-index="${i}">Delete</button></td></tr>`).join('')}</tbody></table></div></section>`;
  }

  function renderVendorsTab(){
    $('#tab-vendors').innerHTML=`<section class="panel"><div class="panel-header"><div><h2>Vendor Directory + Scorecard</h2><p>Track realtors, inspectors, improvement crews, furnishing helpers, compliance, utilities, security, cleaners, photographers, and PM partners.</p></div><button class="button secondary" data-add-row="vendors">Add Vendor</button></div><div class="table-wrap"><table>${tableHead(['Category','Name','Market','Contact','Phone','Email','Score','Status','Notes','Delete'])}<tbody>${state.vendors.map((v,i)=>`<tr><td>${selectCell('vendors',i,'category',['Realtor','Inspector','Improvements','Furnishing','Compliance','Utility','Security','Cleaner','Photographer','Property Manager','CPA / Bookkeeper','Other'],v.category)}</td><td>${inputCell('vendors',i,'name',v.name)}</td><td>${inputCell('vendors',i,'market',v.market)}</td><td>${inputCell('vendors',i,'contact',v.contact)}</td><td>${inputCell('vendors',i,'phone',v.phone)}</td><td>${inputCell('vendors',i,'email',v.email,'email')}</td><td>${inputCell('vendors',i,'score',v.score,'number')}</td><td>${selectCell('vendors',i,'status',['Candidate','Testing','Preferred','Backup','Do Not Use'],v.status)}</td><td>${inputCell('vendors',i,'notes',v.notes)}</td><td><button class="small-button" data-delete-row="vendors" data-index="${i}">Delete</button></td></tr>`).join('')}</tbody></table></div></section>`;
  }

  function renderChecklistsTab(){
    const utilActive=state.utilities.filter(u=>u.status==='Active').length; const secDone=completedPct(state.security,s=>s.installed&&s.tested); const invDone=completedPct(state.inventory,i=>i.complete); const inspDone=completedPct(state.inspection,i=>i.complete);
    $('#tab-checklists').innerHTML=`
      <section class="panel"><div class="panel-header"><div><h2>Compliance, Utility, Security + Guest-Ready Checklists</h2><p>One-time setup items before and after closing plus the final guest-ready gate.</p></div></div><div class="cards four no-margin">${statCard('Utilities Active',`${utilActive}/${state.utilities.length}`,'Account setup')}${statCard('Security Ready',pct(secDone),'Installed + tested')}${statCard('Inventory Ready',pct(invDone),'Supplies')}${statCard('Inspection Ready',pct(inspDone),'Guest-ready gate')}</div></section>
      <section class="panel"><div class="panel-header"><h2>Utilities</h2><button class="button secondary" data-add-row="utilities">Add Utility</button></div><div class="table-wrap"><table>${tableHead(['Service','Provider','Account','Setup Date','Activation Date','Status','Notes','Delete'])}<tbody>${state.utilities.map((u,i)=>`<tr><td>${inputCell('utilities',i,'service',u.service)}</td><td>${inputCell('utilities',i,'provider',u.provider)}</td><td>${inputCell('utilities',i,'account',u.account)}</td><td>${inputCell('utilities',i,'setupDate',u.setupDate,'date')}</td><td>${inputCell('utilities',i,'activationDate',u.activationDate,'date')}</td><td>${selectCell('utilities',i,'status',['Not Started','Scheduled','Active','Issue'],u.status)}</td><td>${inputCell('utilities',i,'notes',u.notes)}</td><td><button class="small-button" data-delete-row="utilities" data-index="${i}">Delete</button></td></tr>`).join('')}</tbody></table></div></section>
      <section class="panel"><div class="panel-header"><h2>Security Systems</h2><button class="button secondary" data-add-row="security">Add Security Item</button></div><div class="table-wrap"><table>${tableHead(['Item','Model','Owner','Installed','Tested','Status','Notes','Delete'])}<tbody>${state.security.map((s,i)=>`<tr><td>${inputCell('security',i,'item',s.item)}</td><td>${inputCell('security',i,'model',s.model)}</td><td>${selectCell('security',i,'owner',OWNERS,s.owner)}</td><td>${checkCell('security',i,'installed',s.installed)}</td><td>${checkCell('security',i,'tested',s.tested)}</td><td>${selectCell('security',i,'status',STATUS,s.status)}</td><td>${inputCell('security',i,'notes',s.notes)}</td><td><button class="small-button" data-delete-row="security" data-index="${i}">Delete</button></td></tr>`).join('')}</tbody></table></div></section>
      <section class="panel"><div class="panel-header"><div><h2>Operations Setup</h2><p>Furniture assembly, staging, photoshoot, listing management, cleaning crew setup, and time/financial tracking.</p></div><button class="button secondary" data-add-row="operations">Add Operation</button></div><div class="table-wrap"><table>${tableHead(['Area','Item','Owner','Status','Due Date','Notes'])}<tbody>${state.operations.map((o,i)=>`<tr><td>${inputCell('operations',i,'area',o.area)}</td><td>${inputCell('operations',i,'item',o.item)}</td><td>${selectCell('operations',i,'owner',OWNERS,o.owner)}</td><td>${selectCell('operations',i,'status',STATUS,o.status)}</td><td>${inputCell('operations',i,'dueDate',o.dueDate,'date')}</td><td>${inputCell('operations',i,'notes',o.notes)}</td></tr>`).join('')}</tbody></table></div></section>
      <section class="panel"><div class="panel-header"><h2>Inventory Checklist</h2><button class="button secondary" data-add-row="inventory">Add Inventory</button></div><div class="table-wrap"><table>${tableHead(['Category','Item','Target','Current','Complete','Notes','Delete'])}<tbody>${state.inventory.map((it,i)=>`<tr><td>${inputCell('inventory',i,'category',it.category)}</td><td>${inputCell('inventory',i,'item',it.item)}</td><td>${inputCell('inventory',i,'target',it.target,'number')}</td><td>${inputCell('inventory',i,'current',it.current,'number')}</td><td>${checkCell('inventory',i,'complete',it.complete)}</td><td>${inputCell('inventory',i,'notes',it.notes)}</td><td><button class="small-button" data-delete-row="inventory" data-index="${i}">Delete</button></td></tr>`).join('')}</tbody></table></div></section>
      <section class="panel"><div class="panel-header"><h2>Guest-Ready Inspection</h2><button class="button secondary" data-add-row="inspection">Add Inspection Item</button></div><div class="table-wrap"><table>${tableHead(['Area','Inspection Item','Complete','Owner','Notes','Delete'])}<tbody>${state.inspection.map((it,i)=>`<tr><td>${inputCell('inspection',i,'area',it.area)}</td><td>${inputCell('inspection',i,'item',it.item)}</td><td>${checkCell('inspection',i,'complete',it.complete)}</td><td>${selectCell('inspection',i,'owner',OWNERS,it.owner)}</td><td>${inputCell('inspection',i,'notes',it.notes)}</td><td><button class="small-button" data-delete-row="inspection" data-index="${i}">Delete</button></td></tr>`).join('')}</tbody></table></div></section>`;
  }

  function renderMetricsTab(){
    $('#tab-metrics').innerHTML=`
      <section class="panel"><div class="panel-header"><h2>Launch Metrics</h2></div><div class="form-grid two">${field('Launch Date','metrics.launchDate',state.metrics.launchDate,'date')}${field('Days to Launch','metrics.daysToLaunch',state.metrics.daysToLaunch,'number')}${field('First Booking Date','metrics.firstBookingDate',state.metrics.firstBookingDate,'date')}${field('Month 1 Revenue','metrics.month1Revenue',state.metrics.month1Revenue,'number')}${field('Month 1 Occupancy','metrics.month1Occupancy',state.metrics.month1Occupancy)}${field('Actual Launch Cost','metrics.actualLaunchCost',state.metrics.actualLaunchCost,'number')}${field('Notes','metrics.notes',state.metrics.notes,'textarea','wide')}</div></section>
      <section class="panel"><div class="panel-header"><h2>Case Study Builder</h2></div><div class="form-grid two">${field('Case Study Title','caseStudy.title',state.caseStudy.title)}${field('Market','caseStudy.market',state.caseStudy.market)}${field('Property Type','caseStudy.propertyType',state.caseStudy.propertyType)}${field('Launch Budget','caseStudy.launchBudget',state.caseStudy.launchBudget)}${field('Launch Days','caseStudy.launchDays',state.caseStudy.launchDays)}${field('Challenge','caseStudy.challenge',state.caseStudy.challenge,'textarea','wide')}${field('Solution','caseStudy.solution',state.caseStudy.solution,'textarea','wide')}${field('Results','caseStudy.results',state.caseStudy.results,'textarea','wide')}${field('Testimonial','caseStudy.testimonial',state.caseStudy.testimonial,'textarea','wide')}</div></section>
      <section class="panel"><div class="panel-header"><h2>Case Study Preview</h2></div><div class="case-preview"><h3>${esc(state.caseStudy.title||state.project.name)}</h3><p><strong>${esc(state.caseStudy.market||state.project.market)}</strong> | ${esc(state.caseStudy.propertyType||state.project.propertyType)} | Launch Budget: ${esc(state.caseStudy.launchBudget||money(state.project.approvedBudget))} | Launch Days: ${esc(state.caseStudy.launchDays||'TBD')}</p><p>${esc(state.caseStudy.results||'Add the outcome/results after launch.')}</p></div></section>`;
  }

  function renderDataTab(){
    $('#tab-data').innerHTML=`<section class="panel"><div class="panel-header"><div><h2>Data / Export</h2><p>Export the full portal state or selected workflow tables. This static MVP stores data in this browser.</p></div></div><div class="button-row"><button id="exportJson" class="button primary">Export Full JSON</button><button id="exportTasks" class="button secondary">Export Tasks CSV</button><button id="exportBudget" class="button secondary">Export Budget CSV</button><button id="exportVendors" class="button secondary">Export Vendors CSV</button></div><pre class="code-box">${esc(JSON.stringify(state,null,2))}</pre></section>`;
  }

  function renderClient(){
    const tasks = visibleTasks('client').slice().sort((a,b)=>STAGES.indexOf(a.stage)-STAGES.indexOf(b.stage)||dateVal(a.startDate)-dateVal(b.startDate));
    const budget = budgetTotals();
    const needs = clientNeedItems(tasks);
    const urgent = needs.filter(t=>t.status!=='Complete');

    $('#clientStageStepper') && ($('#clientStageStepper').innerHTML = renderClientStepper(tasks));

    const primaryEl = $('#clientPrimaryCard');
    if(primaryEl) primaryEl.innerHTML = urgent.length ? renderClientActionCard(urgent[0], urgent.length) : renderClientClearCard();

    $('#clientStageSummary') && ($('#clientStageSummary').innerHTML = STAGES.map(stage=>renderClientStageCard(stage,tasks)).join(''));
    $('#clientStageAccordions') && ($('#clientStageAccordions').innerHTML = STAGES.map((stage,i)=>renderClientAccordion(stage,tasks,i)).join(''));
    $('#clientBudgetContent') && ($('#clientBudgetContent').innerHTML = renderClientBudget(budget));
    $('#clientDetailsContent') && ($('#clientDetailsContent').innerHTML = renderClientDetails());

    wireClientTabs();
    wireClientSubmit(urgent);
  }

  function renderClientStepper(tasks){
    const firstOpenIdx = STAGES.findIndex(s=>tasks.filter(t=>t.stage===s).some(t=>t.status!=='Complete'));
    const activeIdx = firstOpenIdx === -1 ? STAGES.length : firstOpenIdx;
    return '<div class="cp-stage-stepper">' + STAGES.map((stage,i)=>{
      const cls = i<activeIdx ? 'done' : i===activeIdx ? 'active' : '';
      const dot = i<activeIdx ? '✓' : (i+1);
      const p = pct(taskPct(tasks.filter(t=>t.stage===stage)));
      const lineAfter = i<STAGES.length-1 ? `<div class="cp-step-line${i<activeIdx?' done':''}"></div>` : '';
      return `<div class="cp-step ${cls}"><div class="cp-step-dot">${dot}</div><div class="cp-step-label">${esc(stage)}</div>${i===activeIdx?`<div class="cp-step-pct">${p}</div>`:''}</div>${lineAfter}`;
    }).join('') + '</div>';
  }

  function renderClientActionCard(need, count){
    const subs = (state.clientSubmissions||[]).slice(0,5);
    const subsHtml = subs.length ? `<div class="cp-submissions"><h4>Sent to team</h4>${subs.map(s=>`<div class="cp-sub-item"><div><div class="cp-sub-title">${esc(s.needTitle||'General')}</div>${s.note?`<div class="cp-sub-note">${esc(s.note.slice(0,90))}${s.note.length>90?'…':''}</div>`:''}</div><div style="display:flex;align-items:center;gap:8px"><div class="cp-sub-date">${fmtShortDate(s.date)}</div><button class="cp-sub-delete" data-delete-submission="${esc(s.id)}">remove</button></div></div>`).join('')}</div>` : '';
    return `<div class="cp-primary-card cp-action-card">
      <div class="cp-card-eyebrow"><span class="cp-eyebrow-dot"></span>Your input is needed</div>
      <h2 class="cp-card-title">${esc(need.title)}</h2>
      <p class="cp-card-body">${esc(clientNeedShortText(need))}</p>
      <div class="cp-due-row"><span class="cp-due-badge">Due ${fmtShortDate(need.endDate)}</span>${count>1?`<span class="cp-extra-count">+${count-1} more item${count>2?'s':''} awaiting your attention</span>`:''}</div>
      <div class="cp-form">
        <textarea id="clientManualInput" placeholder="Type your response, approval, or note here..."></textarea>
        <div class="cp-form-row">
          <label><span class="cp-file-btn">Attach files</span><input class="cp-file-input" id="clientFileInput" type="file" multiple /></label>
          <button class="cp-send-btn" id="cpSubmitBtn">Send to E2E Team</button>
        </div>
        <input type="hidden" id="clientNeedSelect" value="${esc(need.id)}" />
      </div>
      ${subsHtml}
    </div>`;
  }

  function renderClientClearCard(){
    const focus = state.project.currentFocus || 'Moving your project forward on schedule.';
    const next = state.project.clientNextAction || '';
    const subs = (state.clientSubmissions||[]).slice(0,5);
    const subsHtml = subs.length ? `<hr class="cp-divider"><div class="cp-submissions"><h4>Previously sent</h4>${subs.map(s=>`<div class="cp-sub-item"><div><div class="cp-sub-title">${esc(s.needTitle||'General')}</div>${s.note?`<div class="cp-sub-note">${esc(s.note.slice(0,90))}${s.note.length>90?'…':''}</div>`:''}</div><div style="display:flex;align-items:center;gap:8px"><div class="cp-sub-date">${fmtShortDate(s.date)}</div><button class="cp-sub-delete" data-delete-submission="${esc(s.id)}">remove</button></div></div>`).join('')}</div>` : '';
    return `<div class="cp-primary-card cp-clear-card">
      <div class="cp-card-eyebrow"><span class="cp-eyebrow-dot" style="background:#16a34a"></span>You're all set for now</div>
      <h2 class="cp-card-title">No action needed from you right now.</h2>
      <p class="cp-card-body">Here's what we're currently working on:</p>
      <p class="cp-focus-text">"${esc(focus)}"</p>
      ${next ? `<div style="margin-top:20px"><div class="cp-next-label">When we'll next need you</div><p class="cp-next-text">${esc(next)}</p></div>` : ''}
      ${subsHtml}
    </div>`;
  }

  function renderClientStageCard(stage, tasks){
    const items = tasks.filter(t=>t.stage===stage);
    const progress = taskPct(items);
    const open = items.filter(t=>t.status!=='Complete').length;
    const firstOpenIdx = STAGES.findIndex(s=>tasks.filter(t=>t.stage===s).some(t=>t.status!=='Complete'));
    const isActive = STAGES.indexOf(stage) === firstOpenIdx;
    const next = items.filter(t=>t.status!=='Complete').sort((a,b)=>dateVal(a.endDate)-dateVal(b.endDate))[0];
    return `<div class="cp-stage-card${isActive?' is-active':''}">
      <div class="cp-stage-card-label">${esc(stage)}</div>
      <div class="cp-stage-card-pct">${pct(progress)}</div>
      <div class="cp-stage-bar"><div class="cp-stage-bar-fill" style="width:${Math.max(0,Math.min(100,progress))}%"></div></div>
      <div class="cp-stage-card-note">${items.length} steps · ${open} open</div>
      ${next ? `<div class="cp-stage-card-next">Next: ${esc(next.title)}</div>` : `<div class="cp-stage-card-next" style="color:#16a34a">✓ Complete</div>`}
    </div>`;
  }

  function renderClientAccordion(stage, tasks, index){
    const items = tasks.filter(t=>t.stage===stage);
    const progress = taskPct(items);
    const open = items.filter(t=>t.status!=='Complete').length;
    const isActive = items.some(isTodayInTask);
    return `<details class="cp-accordion"${isActive||index===0?' open':''}>
      <summary>
        <div><div class="cp-accordion-title">${esc(stage)}</div><div class="cp-accordion-meta">${items.length} steps · ${open} open</div></div>
        <div class="cp-accordion-right"><span class="cp-pct-pill">${pct(progress)}</span>${isActive?'<span class="cp-active-pill">Active now</span>':''}</div>
      </summary>
      <div class="cp-step-list">${items.map((t,i)=>{
        const active = isTodayInTask(t);
        return `<div class="cp-step-item${active?' is-active':''}">
          <div class="cp-step-num">${i+1}</div>
          <div>
            <div class="cp-step-name">${esc(t.title)}</div>
            <div class="cp-step-detail">
              <span>${esc(t.owner)}</span>
              <span>${fmtShortDate(t.startDate)} – ${fmtShortDate(t.endDate)}</span>
              <span class="cp-step-badge badge ${statusClass(t.status)}">${esc(t.status)}</span>
            </div>
          </div>
        </div>`;
      }).join('')}</div>
    </details>`;
  }

  function renderClientBudget(budget){
    const rows = state.budget.map(b=>`<tr><td>${esc(b.category)}</td><td>${esc(b.item)}</td><td>${money(b.budget)}</td><td>${money(b.actual)}</td><td><span class="badge ${statusClass(b.status)}">${esc(b.status)}</span></td></tr>`).join('');
    return `<div class="cp-budget-grid">
      <div class="cp-budget-stat"><div class="cp-budget-stat-label">Approved Budget</div><div class="cp-budget-stat-value">${money(state.project.approvedBudget)}</div></div>
      <div class="cp-budget-stat"><div class="cp-budget-stat-label">Actual Spend</div><div class="cp-budget-stat-value">${money(budget.actual)}</div></div>
      <div class="cp-budget-stat"><div class="cp-budget-stat-label">Planned Total</div><div class="cp-budget-stat-value">${money(budget.budget)}</div></div>
      <div class="cp-budget-stat"><div class="cp-budget-stat-label">Remaining</div><div class="cp-budget-stat-value">${money(budget.remaining)}</div></div>
    </div>
    <table class="cp-budget-table"><thead><tr><th>Category</th><th>Item</th><th>Planned</th><th>Actual</th><th>Status</th></tr></thead><tbody>${rows}</tbody></table>`;
  }

  function renderClientDetails(){
    const details = [
      ['Market',state.project.market],['Property Address',state.project.propertyAddress],['Property Type',state.project.propertyType],
      ['Bedrooms',state.project.bedrooms],['Bathrooms',state.project.bathrooms],['Sleeps',state.project.sleeps],
      ['Closing Date',fmtDate(state.project.closingDate)],['Target Launch',fmtDate(state.project.targetLaunchDate)],
      ['Property Manager',state.project.propertyManager],['Cleaner',state.project.cleaner],['Client',state.project.clientName]
    ];
    return `<div class="cp-details-grid">${details.map(([l,v])=>`<div class="cp-detail-item"><div class="cp-detail-label">${esc(l)}</div><div class="cp-detail-value">${esc(v||'TBD')}</div></div>`).join('')}</div>`;
  }

  function wireClientTabs(){
    $$('.cp-tab-btn').forEach(btn=>{
      btn.onclick=()=>{
        $$('.cp-tab-btn').forEach(b=>b.classList.remove('active'));
        $$('.cp-tab-panel').forEach(p=>p.classList.remove('active'));
        btn.classList.add('active');
        $('#cp-panel-'+btn.dataset.cpTab)?.classList.add('active');
      };
    });
  }

  function clientNeedItems(tasks){
    const clientOwned = tasks.filter(t=>t.status!=='Complete' && (t.owner==='Client' || t.status==='Waiting on Client' || /client|owner|approve|approval|confirm|access|account|document|payment|budget/i.test(t.title+' '+t.notes)));
    const nextByDue = tasks.filter(t=>t.status!=='Complete').sort((a,b)=>dateVal(a.endDate)-dateVal(b.endDate)).slice(0,3);
    const seen = new Set();
    return [...clientOwned, ...nextByDue].filter(t=>{ if(seen.has(t.id)) return false; seen.add(t.id); return true; }).sort((a,b)=>dateVal(a.endDate)-dateVal(b.endDate));
  }

  function clientNeedShortText(t){
    const text = `${t.title} ${t.notes}`.toLowerCase();
    if(text.includes('approve') || text.includes('approval') || text.includes('budget')) return 'Please review and approve, or leave a comment below.';
    if(text.includes('utility') || text.includes('account') || text.includes('access')) return 'Please provide account access or login details.';
    if(text.includes('document') || text.includes('mortgage') || text.includes('closing')) return 'Please upload the relevant document or send an update.';
    if(text.includes('confirm')) return 'Please confirm so we can move forward.';
    return 'Please send whatever you have — a note is fine.';
  }

  function wireClientSubmit(urgent){
    const btn = $('#cpSubmitBtn');
    if(!btn) return;
    btn.onclick = () => {
      const needId = $('#clientNeedSelect')?.value || 'general';
      const task = urgent.find(t=>t.id===needId) || urgent[0];
      const note = ($('#clientManualInput')?.value||'').trim();
      const files = Array.from($('#clientFileInput')?.files||[]);
      if(!note && !files.length){ alert('Add a note or attach a file first.'); return; }
      const submission = {id:newId('sub'), date:addDays(0), needId, needTitle:task?task.title:'General update', note, files:[]};
      Promise.all(files.map(readClientFile)).then(fileList=>{
        state = load();
        state.clientSubmissions = Array.isArray(state.clientSubmissions)?state.clientSubmissions:[];
        submission.files = fileList;
        state.clientSubmissions.unshift(submission);
        save();
        render('client');
      });
    };
    $$('[data-delete-submission]').forEach(b=>b.onclick=()=>{
      state = load();
      state.clientSubmissions = (state.clientSubmissions||[]).filter(i=>i.id!==b.dataset.deleteSubmission);
      save(); render('client');
    });
  }

  function clientSubmissionCard(item){
    const files = (item.files || []).map(f=>{
      const size = f.size ? ` (${Math.round(f.size/1024)} KB)` : '';
      const link = f.dataUrl ? ` <a href="${esc(f.dataUrl)}" download="${esc(f.name)}">download</a>` : '';
      return `<li>${esc(f.name || 'file')}${esc(size)}${link}${f.large?' - file too large for local demo storage':''}</li>`;
    }).join('');
    return `<article class="client-submission-card"><div><strong>${esc(item.needTitle || 'General update')}</strong><span>${fmtShortDate(item.date)}</span></div>${item.note?`<p>${esc(item.note)}</p>`:''}${files?`<ul>${files}</ul>`:''}<button class="small-button" type="button" data-delete-submission="${esc(item.id)}">Remove</button></article>`;
  }

  function readClientFile(file){
    return new Promise(resolve=>{
      const base = {name:file.name, size:file.size, type:file.type};
      if(file.size > 1400000) return resolve({...base, large:true});
      const reader = new FileReader();
      reader.onload = () => resolve({...base, dataUrl:reader.result});
      reader.onerror = () => resolve(base);
      reader.readAsDataURL(file);
    });
  }

  function teamClientSubmissionsHtml(){
    const items = (state.clientSubmissions || []);
    if(!items.length) return '<div class="small-note">No client submissions yet.</div>';
    return `<div class="client-submission-list team-submission-list">${items.map(clientSubmissionCard).join('')}</div>`;
  }

  function stageDateRange(items){
    if(!items.length) return 'No dates yet';
    const min = items.reduce((m,t)=>dateVal(t.startDate)<dateVal(m.startDate)?t:m,items[0]);
    const max = items.reduce((m,t)=>dateVal(t.endDate)>dateVal(m.endDate)?t:m,items[0]);
    return `${fmtShortDate(min.startDate)} - ${fmtShortDate(max.endDate)}`;
  }

  function isTodayInTask(t){
    const today = dateVal(addDays(0));
    return today>=dateVal(t.startDate) && today<=dateVal(t.endDate) && t.status!=='Complete';
  }

  function statusClass(status){
    const s=String(status||'').toLowerCase();
    if(s.includes('complete') || s.includes('active') || s.includes('paid') || s.includes('delivered') || s.includes('installed')) return 'complete';
    if(s.includes('blocked')) return 'blocked';
    if(s.includes('waiting')) return 'waiting';
    if(s.includes('progress') || s.includes('ordered') || s.includes('quoted')) return 'progress';
    return 'neutral';
  }

  function field(label,path,value,type='text',cls=''){ return `<label class="field ${cls}"><span>${esc(label)}</span>${type==='textarea'?`<textarea data-path="${esc(path)}">${esc(value)}</textarea>`:`<input data-path="${esc(path)}" type="${esc(type)}" value="${esc(value)}">`}</label>`; }
  function inputCell(list,i,key,value,type='text'){return `<input data-list="${esc(list)}" data-index="${i}" data-key="${esc(key)}" type="${esc(type)}" value="${esc(value)}">`;}
  function checkCell(list,i,key,value){return `<input data-list="${esc(list)}" data-index="${i}" data-key="${esc(key)}" type="checkbox" ${value?'checked':''}>`;}
  function selectCell(list,i,key,options,value){return `<select data-list="${esc(list)}" data-index="${i}" data-key="${esc(key)}">${options.map(v=>`<option value="${esc(v)}" ${String(v)===String(value)?'selected':''}>${esc(v)}</option>`).join('')}</select>`;}
  function tableHead(headers){return `<thead><tr>${headers.map(h=>`<th>${esc(h)}</th>`).join('')}</tr></thead>`;}

  function wireTeamEvents(){
    $$('[data-path]').forEach(el=>{ el.onchange=updatePath; el.oninput=updatePathDebounced; });
    $$('[data-list]').forEach(el=>{ el.onchange=updateListValue; });
    $$('[data-add-row]').forEach(btn=>{ btn.onclick=()=>{ addRow(btn.dataset.addRow); save(); render('team'); }; });
    $$('[data-delete-row]').forEach(btn=>{ btn.onclick=()=>{ const list=btn.dataset.deleteRow; state[list].splice(Number(btn.dataset.index),1); save(); render('team'); }; });
    $('#addTask') && ($('#addTask').onclick=()=>{state.tasks.push(task('N'+Date.now(),'New Task','Operations Launch','Operations','E2E Team',0,7,'Not Started','')); save(); render('team');});
    $('#resetTimeline') && ($('#resetTimeline').onclick=()=>{ if(confirm('Restore the default acquisition/setup/security/operations timeline?')){ state.tasks=defaultState().tasks; save(); render('team'); } });
    $('#exportJson') && ($('#exportJson').onclick=()=>download(JSON.stringify(state,null,2),'e2e-str-full-portal.json','application/json'));
    $('#exportTasks') && ($('#exportTasks').onclick=()=>download(toCsv(state.tasks),'e2e-str-tasks.csv','text/csv'));
    $('#exportBudget') && ($('#exportBudget').onclick=()=>download(toCsv(state.budget),'e2e-str-budget.csv','text/csv'));
    $('#exportVendors') && ($('#exportVendors').onclick=()=>download(toCsv(state.vendors),'e2e-str-vendors.csv','text/csv'));
  }
  let tmr; function updatePathDebounced(e){ clearTimeout(tmr); tmr=setTimeout(()=>updatePath(e,false),250); }
  function updatePath(e,rerender=true){ const [group,key]=e.target.dataset.path.split('.'); state[group][key]=e.target.type==='number'?num(e.target.value):e.target.value; save(); if(rerender) render('team'); }
  function updateListValue(e){ const list=e.target.dataset.list; const i=Number(e.target.dataset.index); const key=e.target.dataset.key; if(!state[list] || !state[list][i]) return; state[list][i][key]=key==='clientVisible'?e.target.value==='true':(e.target.type==='checkbox'?e.target.checked:(e.target.type==='number'?num(e.target.value):e.target.value)); save(); render('team'); }
  function addRow(list){
    const templates={
      budget:{category:'Operations',item:'New budget item',budget:0,actual:0,status:'Not Started',notes:''},
      furniture:{room:'Room',item:'New furniture item',vendor:'',qty:1,cost:0,status:'Planning',delivery:'',installed:false,notes:''},
      purchases:{category:'Other',item:'New purchase',vendor:'',qty:1,price:0,status:'Need to Order',eta:'',notes:''},
      vendors:{category:'Other',name:'New vendor',market:'',contact:'',phone:'',email:'',score:0,status:'Candidate',notes:''},
      utilities:{service:'New utility',provider:'',account:'',setupDate:'',activationDate:'',status:'Not Started',notes:''},
      security:{item:'New security item',model:'',owner:'Security',installed:false,tested:false,status:'Not Started',notes:''},
      inventory:{category:'Other',item:'New inventory item',target:1,current:0,complete:false,notes:''},
      inspection:{area:'Other',item:'New inspection item',complete:false,owner:'E2E Team',notes:''},
      operations:{area:'Operations',item:'New operation item',owner:'E2E Team',status:'Not Started',dueDate:addDays(7),notes:''}
    };
    state[list].push(row(list,templates[list]||{}));
  }
  function toCsv(rows){ if(!rows.length) return ''; const keys=Array.from(new Set(rows.flatMap(r=>Object.keys(r)))); return [keys.join(','),...rows.map(r=>keys.map(k=>`"${String(r[k]??'').replace(/"/g,'""')}"`).join(','))].join('\n'); }
  function download(content,name,type){ const b=new Blob([content],{type}); const u=URL.createObjectURL(b); const a=document.createElement('a'); a.href=u; a.download=name; document.body.appendChild(a); a.click(); a.remove(); URL.revokeObjectURL(u); }
  document.addEventListener('DOMContentLoaded',init);
})();
