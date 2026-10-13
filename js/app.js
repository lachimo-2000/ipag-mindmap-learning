(function(){
'use strict';
const C=window.LEARNING_CONTENT;
const G=window.GITMIND_CHAPTERS||[];
const KEY='ipa-mindmap-lab-v25';
const defaults=()=>({quiz:{},labs:{},chapters:{},game:{}});
let P;try{P=Object.assign(defaults(),JSON.parse(localStorage.getItem(KEY)||'{}'))}catch(e){P=defaults()}
for(const k of Object.keys(defaults())) if(!P[k]||typeof P[k]!=='object'||Array.isArray(P[k])) P[k]={};
let UI={page:'intro',quizIndex:0,caseId:C.module2Cases[0]?.id||'meeting',chapter:G[0]?.id||'',navOpen:{m1:true,m2:false,m3:false},guideGroups:{},stack:[],selectedCard:null,sidebarCollapsed:false};
const $=s=>document.querySelector(s);
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const save=()=>{try{localStorage.setItem(KEY,JSON.stringify(P))}catch(e){}}
const message=s=>{const t=$('#toast'); if(!t)return; t.textContent=s; t.classList.add('show'); clearTimeout(message.t); message.t=setTimeout(()=>t.classList.remove('show'),2500);};
const cnt=o=>Object.values(o||{}).filter(Boolean).length;
const completedCases=()=>C.module2Cases.filter(x=>P.labs[x.id]?.complete).length;
const m1Done=()=>window.IPA_QUIZ?.finished(P.quiz)===5;
const m2Done=()=>completedCases()===C.module2Cases.length;
const m3Done=()=>G.every(x=>!!P.chapters[x.id]);
const moduleDone=id=>id==='m1'?m1Done():id==='m2'?m2Done():m3Done();
const game=P.game;
function setupGame(){
  if(game.initialized)return;
  game.badges={m1:m1Done(),m2:m2Done(),m3:m3Done()};
  game.quizAwarded=Object.keys(P.quiz||{}).filter(k=>/^[0-4]$/.test(k)&&P.quiz[k]?.submitted);
  game.caseAwarded=C.module2Cases.filter(c=>P.labs[c.id]?.complete).map(c=>c.id);
  game.chapterAwarded=G.filter(x=>P.chapters[x.id]).map(x=>x.id);
  game.xp=game.quizAwarded.length*10+game.caseAwarded.length*25+game.chapterAwarded.length*4+Object.values(game.badges).filter(Boolean).length*50;
  game.activeSeconds=game.activeSeconds||0;game.correctTotal=0;game.answerTotal=0;
  C.module2Cases.forEach(c=>Object.entries(P.labs[c.id]?.steps||{}).forEach(([i,st])=>{if(!st.checked)return;const stage=stageList(c)[Number(i)];if(!stage)return;const items=stage.type==='multi'?stage.options.map(o=>({correct:o.correct?'Cần thu thập':'Không cần thu thập'})):stage.cards;game.correctTotal+=items.filter((x,j)=>st.placements?.[j]===x.correct).length;game.answerTotal+=items.length;}));
  game.initialized=true;save();
}
const addXP=(kind,id,amount)=>{const key=kind+'Awarded';game[key]||=[];if(game[key].includes(id))return false;game[key].push(id);game.xp=(game.xp||0)+amount;save();refreshJourneyHUD();return true;};
function rewardModule(id){if(game.badges?.[id]||!moduleDone(id))return;game.badges||={};game.badges[id]=true;game.xp=(game.xp||0)+50;save();refreshJourneyHUD();window.IPA_GAMIFY?.badge(id,document.querySelector('#journey-progress'));}
function refreshJourneyHUD(){const el=$('#journey-progress');if(!el)return;const n=['m1','m2','m3'].filter(moduleDone).length;el.innerHTML=`<span aria-hidden="true">✦</span><span>${n}/3 học phần</span><span class="journey-rail"><span style="width:${n/3*100}%"></span></span>`;el.setAttribute('aria-label',`${n}/3 học phần hoàn thành`);el.setAttribute('aria-valuenow',String(n));}
function getNext(){if(!m1Done())return {label:'Tiếp tục Module 1',page:'m1video'};const pending=C.module2Cases.find(c=>!P.labs[c.id]?.complete);if(pending)return {label:'Bài tiếp theo · '+pending.title,page:'case',id:pending.id};const chapter=G.find(x=>!P.chapters[x.id]);if(chapter)return {label:'Bài tiếp theo · '+chapter.title,page:'chapter',id:chapter.id};return {label:'Xem chúc mừng',page:'journey-complete'};}
setupGame();
const btn=(label,action,cls='primary',extra='')=>`<button class="${cls}" data-action="${action}" ${extra}>${label}</button>`;
const tag=(label,kind='')=>`<span class="pill ${kind}">${label}</span>`;
const progress=(n,max)=>`<div class="progress-row"><span>Tiến độ</span><span class="mono">${n}/${max}</span></div><div class="progress-track"><div class="progress-bar" style="width:${max?Math.max(0,Math.min(100,n/max*100)):0}%"></div></div>`;
const shell=(title,sub,kicker='LEARNING EXPERIENCE')=>`<div class="section-top"><span class="eyebrow">${kicker}</span><h2 style="margin:8px 0">${title}</h2><p class="subtitle">${sub}</p></div>`;
function snapshot(){return {page:UI.page,quizIndex:UI.quizIndex,caseId:UI.caseId,chapter:UI.chapter,selectedCard:UI.selectedCard};}
function restore(v){Object.assign(UI,v); UI.selectedCard=null; closeMap(); closeMedia(); setMenu(false); render(); window.scrollTo({top:0,behavior:'instant'});}
function navigate(page,opts={}){
  if(!opts.noPush){UI.stack.push(snapshot()); if(UI.stack.length>60) UI.stack.shift();}
  Object.assign(UI,opts.state||{}); UI.page=page; UI.selectedCard=null; closeMap(); closeMedia(); setMenu(false);
  if(['m1video','m1quiz'].includes(page)) UI.navOpen.m1=true;
  if(['m2','case','m2-complete'].includes(page)) UI.navOpen.m2=true;
  if(['m3','chapter','journey-complete'].includes(page)) UI.navOpen.m3=true;
  $('#sidebar').classList.remove('open'); render(); window.scrollTo({top:0,behavior:'instant'});
}
function back(){const last=UI.stack.pop(); if(last) restore(last); else navigate('home',{noPush:true});}
function crumbs(){
  const isHome=['home','intro','journey-complete'].includes(UI.page); document.body.dataset.page=UI.page; $('.back-link').hidden=isHome;
  let path=isHome?[]:[{t:'Trang chủ',act:'open-home'}];
  if(['m1video','m1quiz'].includes(UI.page)){path.push({t:'Module 1 · Vì sao & Khi nào',act:'open-m1video'}); if(UI.page==='m1quiz') path.push({t:'Bài kiểm tra tương tác',act:'noop'});}
  if(['m2','case','m2-complete'].includes(UI.page)){path.push({t:'Module 2 · Thực hành MindMap',act:'open-m2'}); if(UI.page==='case'){const c=getCase(UI.caseId); path.push({t:c?`${c.num} · ${c.title}`:'Case',act:'noop'});} if(UI.page==='m2-complete') path.push({t:'Tổng kết Module 2',act:'noop'});}
  if(['m3','chapter'].includes(UI.page)){path.push({t:'Module 3 · Học GitMind',act:'open-m3'}); if(UI.page==='chapter'){const i=G.findIndex(x=>x.id===UI.chapter); if(i>=0) path.push({t:`3.${i+1} · ${G[i].title}`,act:'noop'});} }
  $('#breadcrumb').innerHTML=path.map((x,i)=>`${i?'<span class="crumb-sep">›</span>':''}<button class="crumb ${i===path.length-1?'current':''}" data-global-action="${x.act}" ${i===path.length-1?'disabled aria-current="page"':''}>${esc(x.t)}</button>`).join('');
}
function navGroup(id,title,subtitle,entries){
  const active=(['m1video','m1quiz'].includes(UI.page)&&id==='m1')||(['m2','case','m2-complete'].includes(UI.page)&&id==='m2')||(['m3','chapter'].includes(UI.page)&&id==='m3');
  return `<div class="nav-group"><button class="nav-parent ${active?'selected':''}" data-global-action="toggle-nav" data-id="${id}" aria-expanded="${UI.navOpen[id]?'true':'false'}"><span class="nav-parent-icon">${id==='m1'?'01':id==='m2'?'02':'03'}</span><span class="nav-parent-copy"><strong>${title}</strong><small>${subtitle}</small></span><span class="nav-chevron">⌄</span></button>${UI.navOpen[id]?`<div class="nav-children">${entries.map(x=>`<button class="nav-child ${x.active?'active':''}" data-global-action="${x.act}" ${x.id?`data-id="${x.id}"`:''}><span class="nav-child-num">${x.num||''}</span><span>${esc(x.title)}</span>${x.done?'<span class="nav-done">✓</span>':''}</button>`).join('')}</div>`:''}</div>`;
}
function renderNav(){
  const m1=[{num:'1.1',title:'Video bài học',act:'open-m1video',active:UI.page==='m1video'},{num:'1.2',title:'5 câu hỏi tương tác',act:'open-m1quiz',active:UI.page==='m1quiz',done:window.IPA_QUIZ?.finished(P.quiz)===5}];
  const m2=[{num:'',title:'Tổng quan Module 2',act:'open-m2',active:UI.page==='m2'}].concat(C.module2Cases.map(c=>({num:c.num,title:c.title,act:'open-case',id:c.id,active:UI.page==='case'&&UI.caseId===c.id,done:!!P.labs[c.id]?.complete})));
  const sections=[['gA','01 · Bắt đầu & quản lý',0,4],['gB','02 · Tạo & chỉnh node',4,6],['gC','03 · Bố cục & định dạng',6,10],['gD','04 · Chèn & kết nối',10,15],['gE','05 · Trao đổi & trình bày',15,19],['gF','06 · Chia sẻ & xuất file',19,22]];
  const guideNav=sections.map(([id,title,from,to])=>{
    const isOpen=UI.guideGroups[id]!==false;
    return `<div class="nav-subgroup"><button class="nav-subgroup-toggle" data-global-action="toggle-guide-group" data-id="${id}" aria-expanded="${isOpen}">${esc(title)} <span>${isOpen?'−':'+'}</span></button>${isOpen?G.slice(from,to).map((v,j)=>`<button class="nav-child ${UI.page==='chapter'&&UI.chapter===v.id?'active':''}" data-global-action="open-chapter" data-id="${v.id}"><span class="nav-child-num">3.${from+j+1}</span><span>${esc(v.title)}</span>${P.chapters[v.id]?'<span class="nav-done">✓</span>':''}</button>`).join(''):''}</div>`;
  }).join('');
  const m3 = `<div class="nav-group"><button class="nav-parent ${['m3','chapter'].includes(UI.page)?'selected':''}" data-global-action="toggle-nav" data-id="m3" aria-expanded="${UI.navOpen.m3?'true':'false'}"><span class="nav-parent-icon">03</span><span class="nav-parent-copy"><strong>HỌC GITMIND</strong><small>${G.length} bài hướng dẫn thao tác</small></span><span class="nav-chevron">⌄</span></button>${UI.navOpen.m3?`<div class="nav-children"><button class="nav-child ${UI.page==='m3'?'active':''}" data-global-action="open-m3"><span>Tổng quan Module 3</span></button>${guideNav}</div>`:''}</div>`;
  const previousScroll=$('#sidebar').scrollTop;
  $('#side-nav').innerHTML = navGroup('m1','VÌ SAO & KHI NÀO','Video và câu hỏi',m1) + navGroup('m2','THỰC HÀNH MINDMAP','4 case tương tác',m2) + m3;
  $('#sidebar').scrollTop=previousScroll;
  document.querySelectorAll('.nav-parent').forEach((node,i)=>node.classList.toggle('earned-module',!!game.badges?.[['m1','m2','m3'][i]]));
}
function getCase(id){return C.module2Cases.find(x=>x.id===id);}
function labState(id){return (P.labs[id] ||= {step:0,steps:{},complete:false});}
function stageList(caseObj){return caseObj.type==='multi-stage' ? caseObj.stages : [{type:'sort',title:'Thực hành',zones:caseObj.zones,cards:caseObj.cards}];}
function stepState(caseObj,idx){
  const stages=stageList(caseObj); const stage=stages[idx]; const state=labState(caseObj.id); state.steps ||= {};
  if(!state.steps[idx]) state.steps[idx]={placements:{},selected:[],checked:false};
  return state.steps[idx];
}
function caseSolved(caseObj){
  const stages=stageList(caseObj); const state=labState(caseObj.id);
  return stages.every((stage,idx)=>stageSolved(stage, stepState(caseObj,idx)));
}
function stageSolved(stage,st){
  if(stage.type==='sort') return stage.cards.every((card,i)=>(st.placements||{})[i]===card.correct);
  if(stage.type==='multi') return stage.options.every((opt,i)=>(st.placements||{})[i]===(opt.correct?'Cần thu thập':'Không cần thu thập'));
  return false;
}
function getCurrentStage(caseObj){const all=stageList(caseObj); const ls=labState(caseObj.id); const idx=Math.max(0,Math.min(ls.step||0,all.length-1)); return {idx,stage:all[idx],state:stepState(caseObj,idx),count:all.length};}
function markCaseComplete(caseObj){const st=labState(caseObj.id);st.complete=true;addXP('case',caseObj.id,25);save();rewardModule('m2');}
function introView(){
 return `<section class="intro-screen" id="intro-screen" aria-label="Giới thiệu khóa học MindMap">
  <div class="intro-backdrop"></div><div class="intro-shade"></div>
  <button type="button" class="intro-skip" data-action="skip-intro" aria-label="Bỏ qua giới thiệu và vào trang chủ">Bỏ qua <span aria-hidden="true">↗</span></button>
  <div class="intro-content">
    <span class="intro-eyebrow">IPA GROUP · ĐÀO TẠO NỘI BỘ</span>
    <div class="intro-headline"><div class="intro-title"></div><div class="intro-title-secondary"></div></div>
    <div class="intro-sentences"><p class="intro-lead"></p><p class="intro-line"></p><p class="intro-line-two"></p></div>
    <button type="button" class="intro-ready" data-action="explore-intro">Khám phá nội dung tổng quan <span aria-hidden="true">→</span></button>
  </div>
  <div class="intro-morph-map" hidden aria-label="Tổng quan hành trình 3 module">
    <div class="intro-map-root-anchor" aria-hidden="true"></div>
    <div class="intro-map-branches">
      <svg class="intro-connection-desktop" viewBox="0 0 1000 700" preserveAspectRatio="none" aria-hidden="true"><path d="M 337,350 C 450,350 470,175 627,175"/><path d="M 337,350 C 460,350 485,350 627,350"/><path d="M 337,350 C 450,350 470,525 627,525"/></svg>
      <svg class="intro-connection-mobile" viewBox="0 0 400 800" preserveAspectRatio="none" aria-hidden="true"><path d="M 200,315 C 200,355 200,415 200,434"/><path d="M 200,315 C 200,400 200,510 200,544"/><path d="M 200,315 C 200,450 200,600 200,654"/></svg>
      <div class="intro-map-branch" style="--branch:0"><small>MODULE 1</small><strong>Vì sao & Khi nào</strong><p>Video bài học và 5 câu hỏi · Nắm tư duy MindMap</p></div>
      <div class="intro-map-branch" style="--branch:1"><small>MODULE 2</small><strong>Thực hành MindMap</strong><p>4 case công việc · Kéo thả node, kết nối và kiểm tra</p></div>
      <div class="intro-map-branch" style="--branch:2"><small>MODULE 3</small><strong>Học GitMind</strong><p>22 bài hướng dẫn GIF · Thực hành trực tiếp trên GitMind</p></div>
    </div>
    <button type="button" class="intro-start" data-action="enter-home">Bắt đầu ngay <span aria-hidden="true">→</span></button>
  </div>
  <div class="intro-bottom">MINDMAP AS A SKILL · IPA GROUP</div>
 </section>`;
}
function homeView(){
 return `<section class="journey-heading"><span class="eyebrow">IPA GROUP · HÀNH TRÌNH HỌC TẬP</span><h1>MindMap <span>Trong công việc.</span></h1><p>Khám phá ba học phần trên cùng một sơ đồ. Mở nhánh để xem giới thiệu, sau đó bấm vào module muốn học.</p></section><div id="home-game-dashboard"></div><div id="journey-map" aria-label="MindMap hành trình học tập"></div><div class="learning-strip journey-note"><div style="font-size:1.6rem;color:var(--ipa-deep)">✧</div><div><strong>Học để ứng dụng</strong><p>Ghi nhận → Sắp xếp → Kết nối. Mỗi sơ đồ giúp bạn tổ chức thông tin rõ ràng và có thể hành động.</p></div></div>`;
}
function m1VideoView(){return shell('Vì sao và khi nào nên dùng MindMap?','Xem video bài học, sau đó trả lời năm câu hỏi tương tác để củng cố kiến thức vừa học.','HỌC PHẦN 01 · 1.1 XEM VIDEO')+
 `<section class="card pad-lg video-lesson"><div class="workspace-title">VIDEO BÀI HỌC · MINDMAP AS A SKILL</div><div class="video-wrap"><video controls preload="metadata" playsinline src="assets/videos/module-1/module-01.mp4" aria-label="MindMap as a Skill - Module 1"></video></div><div class="btn-row end">${btn('Tiếp tục: Câu hỏi tương tác →','open-m1quiz')}</div></section>`;}
function m1QuizView(){ return window.IPA_QUIZ.view({C,P,UI,esc,btn,progress,tag,shell}); }
function m2View(){
  return shell('Module 2 — Thực hành MindMap trong công việc','Tổng quan 4 case được trình bày thành một MindMap. Mở từng nhánh để khám phá mục tiêu, sau đó chọn case và thực hành trực tiếp trên sơ đồ.','HỌC PHẦN 02 · TỔNG QUAN')+
    `<div class="m2-map-intro"><strong>Ghi nhận → Sắp xếp → Kết nối</strong><p>Chọn dấu + trên từng nhánh để xem nội dung. Bạn có thể zoom bằng con lăn, kéo nền để di chuyển và bấm ↗ để bắt đầu case.</p></div><div id="m2-overview" aria-label="Mindmap 4 case Module 2"></div><div class="m2-progress-note">${progress(completedCases(),C.module2Cases.length)}<p class="note">Đây là các tình huống giả định để luyện kỹ năng, không phản ánh chính sách IPA Group.</p></div>`;
}
function renderMap(root,branches,caption='MINDMAP'){
 return `<section class="canvas-panel"><div class="canvas-tools"><strong>${esc(caption)}</strong><div class="canvas-controls"><button class="outline small" data-action="map-zoom" data-delta="-0.15" aria-label="Thu nhỏ sơ đồ">−</button><button class="outline small" data-action="map-fit">100%</button><button class="outline small" data-action="map-zoom" data-delta="0.15" aria-label="Phóng to sơ đồ">+</button><button class="outline small" data-action="map-expand">⛶ Phóng toàn màn hình</button></div></div><div class="canvas-viewport" tabindex="0" aria-label="Sơ đồ; cuộn để xem các nhánh"><div class="zoom-content"><div class="map-surface"><div class="map-layout"><div class="map-root">${esc(root)}</div><div class="map-branches">${branches.map(b=>`<div class="map-branch ${b.children?.length?'':'no-leaves'}"><div class="branch-name">${esc(b.name)}</div>${b.children?.length?`<div class="map-leaves">${b.children.map(x=>`<span class="map-leaf ${x.style||''}">${esc(x.text)}</span>`).join('')}</div>`:''}</div>`).join('')}</div></div></div></div></div></section>`;
}
function buildCaseBranches(caseObj, stage, st){
  if(stage.type==='sort'){
    return stage.zones.map(z=>{
      const children=stage.cards.map((card,i)=>({card,i})).filter(({i})=>(st.placements||{})[i]===z.id).map(({card,i})=>({text:card.text,style:st.checked?(card.correct===z.id?'correct':'incorrect'):''}));
      return {name:z.label.replace(/^↳\s*/,''),children};
    });
  }
  if(caseObj.id==='problem'){
    const sortState=stepState(caseObj,0);
    return [
      {name:'Dữ kiện',children:caseObj.stages[0].cards.filter((c,i)=>(sortState.placements||{})[i]==='Dữ kiện').map(c=>({text:c.text}))},
      {name:'Giả thuyết',children:caseObj.stages[0].cards.filter((c,i)=>(sortState.placements||{})[i]==='Giả thuyết').map(c=>({text:c.text}))},
      {name:'Bằng chứng cần thu thập',children:stage.options.filter((o,i)=>(st.selected||[]).includes(i)).map(o=>({text:o.text,style:st.checked?(o.correct?'correct':'incorrect'):''}))}
    ];
  }
  return [];
}
function availableCardMarkup(caseObj, stage, st){
  return stage.cards.map((card,i)=>({card,i})).filter(({i})=>!(st.placements||{})[i]).map(({card,i})=>`<button type="button" draggable="true" class="m2-card ${UI.selectedCard===i?'picked':''}" data-action="pick-card" data-index="${i}" data-draggable-card="${i}" aria-pressed="${UI.selectedCard===i}"><span class="m2-card-index">${String(i+1).padStart(2,'0')}</span><span class="m2-card-text">${esc(card.text)}</span></button>`).join('') || `<div class="empty-state">Tất cả thẻ đã được đưa vào ô nhận. Bạn vẫn có thể kéo thẻ từ các ô sang vị trí khác hoặc trả về danh sách.</div>`;
}
function assignedCardMarkup(caseObj, stage, st, zoneId){
  const cards=stage.cards.map((card,i)=>({card,i})).filter(({i})=>(st.placements||{})[i]===zoneId);
  return cards.map(({card,i})=>{
    const result = st.checked ? (card.correct===zoneId?'correct':'wrong') : '';
    return `<button type="button" draggable="true" class="m2-card in-zone ${result}" data-action="pick-card" data-index="${i}" data-draggable-card="${i}" aria-pressed="${UI.selectedCard===i}"><span class="m2-card-text">${esc(card.text)}</span><span class="m2-card-tools"><span class="m2-card-move">↺</span><span class="m2-card-status">${st.checked?(card.correct===zoneId?'✓':'↻'):''}</span></span></button>`;
  }).join('') || `<div class="drop-zone-empty">Thả thẻ vào đây</div>`;
}
function sortStageView(caseObj, stage, st){
  const allPlaced=stage.cards.every((_,i)=>!!(st.placements||{})[i]);
  const solved=stageSolved(stage,st);
  return `<div class="case-layout"><section class="card pad-lg"><div class="case-stage-top"><div><span class="eyebrow">${esc(caseObj.label)} · ${esc(stage.title||'Thực hành')}</span><h3 style="margin:8px 0 10px">${esc(caseObj.title)}</h3><p class="subtitle" style="margin:0;max-width:none">${esc(caseObj.task)}</p></div>${tag(caseObj.num,'gold')}</div><div class="context"><strong>Bối cảnh</strong><p>${esc(caseObj.intro)}</p></div><div class="case-quote">${esc(caseObj.narrator)}</div><div class="m2-workspace"><div><div class="workspace-title">THẺ THÔNG TIN</div><p class="note" style="margin-top:0">Kéo thẻ vào ô nhận hoặc chọn một thẻ rồi bấm vào ô nhận phù hợp.</p><div class="m2-card-bank" data-drop-zone="__bank__">${availableCardMarkup(caseObj,stage,st)}</div></div><div><div class="workspace-title">Ô NHẬN</div><div class="m2-zones ${stage.zones.length>3?'five-up':''}">${stage.zones.map(z=>`<button type="button" class="m2-zone ${UI.selectedCard!==null?'ready':''} ${z.id==='Truyền thông'||z.id==='Chi tiết để tra cứu'?'subzone':''}" data-action="assign-zone" data-zone="${esc(z.id)}" data-drop-zone="${esc(z.id)}"><div class="m2-zone-head"><strong>${esc(z.label)}</strong><small>${esc(z.hint)}</small></div><div class="m2-zone-body">${assignedCardMarkup(caseObj,stage,st,z.id)}</div></button>`).join('')}</div></div></div><div class="btn-row between"><div>${btn('Đặt lại bước này','reset-stage','outline')}</div><div>${btn('Kiểm tra đáp án','check-stage','primary',allPlaced?'':'disabled')} ${stageSolved(stage,st)?btn(stageList(caseObj).length>1?'Tiếp tục bước tiếp theo →':'Hoàn thành case →',stageList(caseObj).length>1?'next-stage':'finish-case','primary'):''}</div></div>${sortFeedback(stage,st)}<div class="feedback positive" style="display:${solved&&st.checked?'block':'none'}"><strong>✓ Điểm chốt</strong><p>${esc(caseObj.summary)}</p></div></section><aside>${renderMap(caseObj.root,buildCaseBranches(caseObj,stage,st),'MINDMAP CẬP NHẬT THEO CÁCH BẠN SẮP XẾP')}</aside></div>`;
}
function sortFeedback(stage,st){
  if(!st.checked) return '';
  const correct=stage.cards.filter((card,i)=>(st.placements||{})[i]===card.correct).length;
  return `<section class="review-card"><div class="review-head"><div><strong>Phản hồi từng thẻ</strong><p>An và Bình đang giúp bạn đối chiếu cách đặt từng thẻ.</p></div><span class="review-score">${correct}/${stage.cards.length}</span></div><div class="review-items single-col">${stage.cards.map((card,i)=>`<article class="review-item ${(st.placements||{})[i]===card.correct?'right':'wrong'}"><span class="review-icon">${(st.placements||{})[i]===card.correct?'✓':'↻'}</span><div><strong>${esc(card.text)}</strong><small><b>Bạn đã đặt ở đâu:</b> ${esc((st.placements||{})[i]||'Chưa đặt')} · <b>Vị trí gợi ý:</b> ${esc(card.correct)}</small><p>${esc(card.why)}</p></div></article>`).join('')}</div></section>`;
}
function multiStageView(caseObj, stage, st){
  const selected=st.selected||[]; const solved=stageSolved(stage,st);
  return `<div class="case-layout"><section class="card pad-lg"><div class="case-stage-top"><div><span class="eyebrow">${esc(caseObj.label)} · ${esc(stage.title)}</span><h3 style="margin:8px 0 10px">${esc(caseObj.title)}</h3><p class="subtitle" style="margin:0;max-width:none">${esc(stage.question)}</p></div>${tag(caseObj.num,'gold')}</div><div class="context"><strong>Gợi ý từ Bình</strong><p>Chọn nhiều đáp án nếu cần. Chỉ đánh dấu những bằng chứng thật sự giúp kiểm chứng giả thuyết.</p></div><div class="multi-select-grid">${stage.options.map((opt,i)=>`<button type="button" class="select-card ${selected.includes(i)?'on':''}" data-action="toggle-multi" data-index="${i}" aria-pressed="${selected.includes(i)}">${esc(opt.text)}</button>`).join('')}</div><div class="btn-row between"><div>${btn('Quay lại bước trước','prev-stage','outline')}</div><div>${btn('Đặt lại bước này','reset-stage','outline')} ${btn('Kiểm tra đáp án','check-stage','primary',selected.length?'':'disabled')} ${solved?btn('Hoàn thành case →','finish-case','primary'):''}</div></div>${multiFeedback(stage,st)}<div class="feedback positive" style="display:${solved&&st.checked?'block':'none'}"><strong>✓ Điểm chốt</strong><p>${esc(caseObj.summary)}</p></div></section><aside>${renderMap(caseObj.root,buildCaseBranches(caseObj,stage,st),'MINDMAP HIỆN TẠI')}</aside></div>`;
}
function multiFeedback(stage,st){
  if(!st.checked) return '';
  const selected=st.selected||[]; const correct=stage.options.filter((opt,i)=> selected.includes(i)===!!opt.correct).length;
  return `<section class="review-card"><div class="review-head"><div><strong>Phản hồi từng lựa chọn</strong><p>Xem lại lý do cho từng bằng chứng.</p></div><span class="review-score">${correct}/${stage.options.length}</span></div><div class="review-items single-col">${stage.options.map((opt,i)=>`<article class="review-item ${selected.includes(i)===!!opt.correct?'right':'wrong'}"><span class="review-icon">${selected.includes(i)===!!opt.correct?'✓':'↻'}</span><div><strong>${esc(opt.text)}</strong><small><b>Bạn đã chọn:</b> ${selected.includes(i)?'Có':'Không'} · <b>Gợi ý:</b> ${opt.correct?'Nên chọn':'Không nên chọn'}</small><p>${esc(opt.why)}</p></div></article>`).join('')}</div></section>`;
}
function caseView(){
 const obj=getCase(UI.caseId);if(!obj)return m2View();
 const c=getCurrentStage(obj);
 return shell(`Case ${C.module2Cases.indexOf(obj)+1} — ${obj.title}`,obj.task,'MODULE 2 · THỰC HÀNH TRÊN MINDMAP')+
 `<div class="lm-case-context"><p><b>Bối cảnh:</b> ${esc(obj.intro)}</p><p><b>${obj.narrator.startsWith('Bình')?'Bình':'An'}:</b> ${esc(obj.narrator.split('“')[1]?.replace('”','')||obj.narrator)}</p></div><div id="case-mindmap"></div>`;
}
function m2CompleteView(){
  const branches=C.module2Cases.map(c=>({name:c.title,children:[{text:c.summary,style:'correct'}]}));
  return shell('Bạn đã hoàn thành Module 2','Bốn case đã tổng hợp thành một mindmap ôn tập. Hãy mang các nguyên tắc này sang Module 3 để thực hành trên GitMind.','HỌC PHẦN 02 · TỔNG KẾT')+
  `<div class="card pad-lg"><div class="context"><strong>Tổng kết cùng An và Bình</strong><p>Ghi chú cuộc họp — Tìm nguyên nhân — Bắt đầu dự án — Cùng ra quyết định. Mỗi case nhắc mình rằng sơ đồ chỉ thực sự có giá trị khi giúp công việc rõ ràng hơn.</p></div><div class="item-space">${renderMap('MindMap trong công việc',branches,'SƠ ĐỒ TỔNG KẾT MODULE 2')}</div><div class="btn-row end">${btn('Bài tiếp theo · Module 3 →','open-m3','primary journey-cta')}</div></div>`;
}
function m3View(){
  return shell('Module 3 — Học GitMind để thực hành trực tiếp','Khám phá nội dung bằng sơ đồ: mở nhánh để xem bài, cuộn chuột để phóng to/thu nhỏ và kéo vùng trống để di chuyển.','HỌC PHẦN 03 · HƯỚNG DẪN GITMIND')+
  `<section class="m3-hero card"><div class="m3-hero-bg" style="background-image:url('assets/images/gitmind-homepage.png')"></div><div class="m3-hero-overlay"></div><div class="m3-hero-content"><span class="eyebrow" style="color:var(--ipa-sand-light)">THỰC HÀNH TRỰC TIẾP</span><h2 style="margin:10px 0 12px;color:#fff">Mở GitMind và thực hành theo từng bài</h2><p style="color:#fff;max-width:700px">Truy cập GitMind, đăng nhập và thử thao tác trên giao diện thật. Bên dưới là mindmap 22 bài hướng dẫn tiếng Việt. Chọn một nhóm để khám phá từng bài.</p><div class="btn-row"><a class="primary external-link gitmind-attention" href="https://gitmind.com/" target="_blank" rel="noopener noreferrer">Truy cập GitMind ↗</a> ${btn('Bắt đầu bài 3.1 →','start-chapter','outline')}</div></div></section>
  <div class="m3-map-section item-space"><div id="gm-map"><p class="note">Đang khởi tạo sơ đồ nội dung…</p></div><p class="m3-map-help">Hỗ trợ chuột, cảm ứng và bàn phím: dùng các nút +/- hoặc con lăn để thu/phóng; kéo vùng trống để di chuyển; chọn nhánh để mở hoặc thu gọn; chọn bài để xem hướng dẫn.</p></div>`;
}
function chapterView(){
  const ch=G.find(x=>x.id===UI.chapter); if(!ch) return m3View();
  const index=G.findIndex(x=>x.id===ch.id); const img=`assets/gitmind-chapters/${ch.image}`;
  return shell(`3.${index+1} · ${ch.title}`,'Xem nhanh cách thao tác, sau đó mở GitMind để tự thực hành trực tiếp.','HỌC PHẦN 03 · HƯỚNG DẪN GITMIND')+
  `<div class="guide-watch-layout"><section class="card guide-watch"><div class="guide-media-head"><span>${esc(ch.english||'GitMind')}</span>${tag(`Bài ${index+1}`,'gold')}</div><button class="guide-media guide-media-button" type="button" data-action="open-media" data-src="${esc(img)}" data-alt="${esc(ch.title)}"><img src="${esc(img)}" alt="Minh họa thao tác ${esc(ch.title)}"><span class="media-hint">Bấm vào GIF để phóng to</span></button><p class="caption">Bạn cũng có thể dùng nút phóng to để xem thao tác rõ hơn.</p><div class="btn-row">${btn('Phóng to GIF','open-media','outline','data-src="'+esc(img)+'" data-alt="'+esc(ch.title)+'"')}${btn('Mở GitMind để thực hành ↗','open-gitmind','primary')}</div><div class="guide-feature item-space"><strong>Mục tiêu sau bài</strong><p>${esc(ch.objective||ch.topic||'Biết cách thực hiện thao tác trong GitMind.')}</p></div>${ch.caution?`<div class="guide-note"><strong>Lưu ý</strong><p>${esc(ch.caution)}</p></div>`:''}<div class="btn-row between guide-navigation"><div>${btn('← Bài trước','chapter-prev','outline',index===0?'disabled':'')}</div><div>${btn('Đánh dấu đã xem','mark-chapter','outline')} ${btn(index===G.length-1?'Hoàn thành hành trình →':'Bài tiếp theo →','chapter-next','primary journey-cta')}</div></div></section><section class="card guide-instruction"><div class="watch-heading">CÁC BƯỚC THAO TÁC</div><ol class="guide-steps">${(ch.steps||[]).map((step,i)=>`<li><span class="gm-step-no">${i+1}</span><div><strong>Bước ${i+1}</strong><p>${esc(step)}</p></div></li>`).join('')}</ol>${ch.topic?`<div class="guide-activity"><strong>Chủ đề thao tác</strong><p>${esc(ch.topic)}</p></div>`:''}${ch.objective?`<div class="guide-activity"><strong>Kết quả cần đạt</strong><p>${esc(ch.objective)}</p></div>`:''}<div class="guide-note"><strong>Gợi ý thực hành</strong><p>Giữ trang này ở một tab và mở <a class="resource-link" href="https://gitmind.com/" target="_blank" rel="noopener noreferrer">gitmind.com</a> ở tab khác để thao tác song song.</p></div></section></div>`;
}
function journeyCompleteView(){return `<section class="journey-finale" role="region" aria-label="Chúc mừng hoàn thành hành trình"><canvas id="finale-confetti" aria-hidden="true"></canvas><div class="journey-finale-content"><span class="journey-finale-star" aria-hidden="true">✦</span><span class="eyebrow">IPA GROUP · HOÀN THÀNH HÀNH TRÌNH</span><h1>Chúc mừng!<br><span>Bạn đã làm chủ hành trình MindMap trong công việc.</span></h1><p>Từ việc ghi nhận thông tin, sắp xếp ý tưởng đến kết nối và thể hiện chúng trên GitMind — bạn đã có thêm một công cụ để làm việc rõ ràng hơn mỗi ngày.</p><div class="finale-stats"><strong>03 <small>học phần</small></strong><strong>04 <small>case thực hành</small></strong><strong>22 <small>bài GitMind</small></strong></div>${btn('← Quay về bài học','open-home','outline')}</div></section>`;}
function render(){
  window.GitMindOverview?.destroy();
  window.LearningMaps?.destroy();
  const views={intro:introView,home:homeView,m1video:m1VideoView,m1quiz:m1QuizView,m2:m2View,case:caseView,'m2-complete':m2CompleteView,m3:m3View,chapter:chapterView,'journey-complete':journeyCompleteView};
  $('#screen').innerHTML=(views[UI.page]||homeView)();
  renderNav(); crumbs(); refreshJourneyHUD();document.body.classList.toggle('sidebar-collapsed',UI.sidebarCollapsed); $('#screen').classList.remove('page-enter'); void $('#screen').offsetWidth; $('#screen').classList.add('page-enter');
  if(UI.page==='journey-complete')window.IPA_GAMIFY?.confetti($('#finale-confetti'));
  if(UI.page==='m3') window.GitMindOverview?.mount($('#gm-map'),{items:G,done:P.chapters,onOpen:goChapter});
  if(UI.page==='intro') window.LearningMaps?.intro($('#intro-screen'));
  if(UI.page==='home'){
    const next=getNext();
    window.IPA_GAMIFY?.dashboard($('#home-game-dashboard'),{xp:game.xp||0,seconds:game.activeSeconds||0,correct:game.correctTotal||0,total:game.answerTotal||0,nextLabel:next.label,onNext:()=>action('next-lesson',{})});
    const items=[
      {id:'m1',title:'Vì sao & Khi nào',desc:'Video bài học và 5 câu hỏi tương tác · Hiểu MindMap và ba bước Ghi nhận → Sắp xếp → Kết nối.'},
      {id:'m2',title:'Thực hành MindMap',desc:'4 case công việc · Kéo thả node, kết nối nhánh và kiểm tra để hiểu cách tổ chức thông tin.'},
      {id:'m3',title:'Học GitMind',desc:'22 bài có GIF hướng dẫn · Thực hành thao tác trực tiếp trên GitMind.'}
    ];
    window.LearningMaps?.overview($('#journey-map'),{items,title:'MindMap',subtitle:'Trong công việc',kind:'modules',onOpen:id=>navigate(id==='m1'?'m1video':id)});
  }
  if(UI.page==='m2') window.LearningMaps?.overview($('#m2-overview'),{items:C.module2Cases.map(x=>({id:x.id,title:x.title,desc:x.task})),title:'Thực hành MindMap',subtitle:'4 case công việc',kind:'cases',done:Object.fromEntries(C.module2Cases.map(x=>[x.id,!!P.labs[x.id]?.complete])),onOpen:goCase});
  if(UI.page==='case'){
    const obj=getCase(UI.caseId),c=getCurrentStage(obj),st=c.state;
    window.LearningMaps?.mountCase($('#case-mindmap'),{
      stage:c.stage,caseObj:obj,state:st,selected:UI.selectedCard,checked:!!st.checked,solved:stageSolved(c.stage,st),stepIndex:c.idx,stepCount:c.count,
      onSelect:i=>{UI.selectedCard=i;window.LearningMaps?.refreshCase({selected:i});},
      onPlace:(i,zone)=>{
        const itemCount=c.stage.type==='multi'?c.stage.options.length:c.stage.cards.length;
        if(i<0||i>=itemCount)return;
        st.placements ||= {};
        if(zone==='__bank__')delete st.placements[i];else st.placements[i]=zone;
        if(c.stage.type==='multi')st.selected=Object.keys(st.placements).filter(k=>st.placements[k]==='Cần thu thập').map(Number);
        st.checked=false;UI.selectedCard=null;save();window.LearningMaps?.refreshCase({selected:null,checked:false});
      },
      onCheck:()=>action('check-stage',{}),onReset:()=>action('reset-stage',{}),
      onNext:()=>action('next-stage',{}),onPrev:()=>action('prev-stage',{}),onFinish:()=>action('finish-case',{})
    });
  }
}
function goCase(id){if(!getCase(id)) return; navigate('case',{state:{caseId:id}});}
function goChapter(id){if(!G.find(x=>x.id===id))return;P.chapters[id]=true;addXP('chapter',id,4);save();rewardModule('m3');navigate('chapter',{state:{chapter:id}});}
function openGitMind(){window.open('https://gitmind.com/','_blank','noopener');}
function action(a,el){
  if(a.startsWith('quiz-')){
    const i=UI.quizIndex,oldSubmitted=!!P.quiz[i]?.submitted;
    if(window.IPA_QUIZ.handle(a,el,{C,P,UI,save,render,message,navigate})){
      if(a==='quiz-submit'&&!oldSubmitted&&P.quiz[i]?.submitted){addXP('quiz',String(i),10);rewardModule('m1');}
      return;
    }
  }
  switch(a){
    case 'open-home': navigate('home'); return;
    case 'toggle-sidebar':{UI.sidebarCollapsed=!UI.sidebarCollapsed;document.body.classList.toggle('sidebar-collapsed',UI.sidebarCollapsed);$('#desktop-sidebar-toggle').setAttribute('aria-expanded',String(!UI.sidebarCollapsed));$('#desktop-sidebar-toggle').setAttribute('aria-label',UI.sidebarCollapsed?'Hiện thanh menu':'Ẩn thanh menu');return;}
    case 'next-lesson':{const n=getNext();if(n.page==='case')goCase(n.id);else if(n.page==='chapter')goChapter(n.id);else navigate(n.page);return;}

    case 'explore-intro': window.LearningMaps?.exploreIntro($('#intro-screen'));return;
    case 'enter-home': case 'skip-intro': navigate('home'); return;
    case 'open-m1': case 'open-m1video': navigate('m1video'); return;
    case 'open-m1quiz': navigate('m1quiz'); return;
    case 'open-m2': navigate('m2'); return;
    case 'open-m3': navigate('m3'); return;
    case 'open-case': goCase(el.dataset.id); return;
    case 'start-chapter': goChapter(G[0]?.id); return;
    case 'open-chapter': goChapter(el.dataset.id); return;
    case 'mark-chapter':P.chapters[UI.chapter]=true;addXP('chapter',UI.chapter,4);save();rewardModule('m3');message('Đã ghi nhận bài đã xem');render();return;
    case 'chapter-prev': {const i=G.findIndex(x=>x.id===UI.chapter); if(i>0) goChapter(G[i-1].id); return;}
    case 'chapter-next':{const i=G.findIndex(x=>x.id===UI.chapter);if(i>=0&&i<G.length-1)goChapter(G[i+1].id);else{rewardModule('m3');if(m1Done()&&m2Done()&&m3Done())navigate('journey-complete');else{navigate('m3');message('Bạn đã xem bài cuối; hãy hoàn thành các phần còn lại để nhận huy hiệu toàn hành trình.');}}return;}
    case 'open-gitmind': openGitMind(); return;
    case 'pick-card': UI.selectedCard = Number(el.dataset.index); render(); return;
    case 'assign-zone': {
      const caseObj=getCase(UI.caseId); const current=getCurrentStage(caseObj); if(UI.selectedCard===null) return message('Hãy chọn một thẻ trước');
      current.state.placements[UI.selectedCard]=el.dataset.zone; current.state.checked=false; UI.selectedCard=null; save(); render(); return;
    }
    case 'reset-stage': {
      const caseObj=getCase(UI.caseId); const current=getCurrentStage(caseObj);
      current.state.placements={}; if(current.stage.type==='multi')current.state.selected=[];
      current.state.checked=false; UI.selectedCard=null; save(); window.LearningMaps?.refreshCase({selected:null,checked:false}); return;
    }
    case 'check-stage': {
      const caseObj=getCase(UI.caseId); const current=getCurrentStage(caseObj);
      if(!current.state.checked){const items=current.stage.type==='multi'?current.stage.options.map(x=>({correct:x.correct?'Cần thu thập':'Không cần thu thập'})):current.stage.cards;game.correctTotal=(game.correctTotal||0)+items.filter((card,i)=>current.state.placements?.[i]===card.correct).length;game.answerTotal=(game.answerTotal||0)+items.length;}
      current.state.checked=true; save(); window.LearningMaps?.refreshCase({checked:true});refreshJourneyHUD(); message(stageSolved(current.stage,current.state)?'Bạn đã sắp xếp đúng':'Đã có phản hồi để bạn chỉnh lại'); return;
    }
    case 'next-stage': {const caseObj=getCase(UI.caseId); const ls=labState(caseObj.id); ls.step=Math.min(ls.step+1, stageList(caseObj).length-1); save(); render(); return;}
    case 'prev-stage': {const caseObj=getCase(UI.caseId); const ls=labState(caseObj.id); ls.step=Math.max(ls.step-1,0); save(); render(); return;}
    case 'toggle-multi': {
      const caseObj=getCase(UI.caseId); const current=getCurrentStage(caseObj); const i=Number(el.dataset.index); const arr=current.state.selected||[];
      current.state.selected = arr.includes(i)?arr.filter(x=>x!==i):[...arr,i]; current.state.checked=false; save(); render(); return;
    }
    case 'finish-case': {
      const caseObj=getCase(UI.caseId); if(!caseSolved(caseObj)||!getCurrentStage(caseObj).state.checked)return message('Bạn cần kiểm tra đúng các node trước khi hoàn thành.');markCaseComplete(caseObj); const idx=C.module2Cases.findIndex(x=>x.id===caseObj.id);
      if(idx>=0 && idx < C.module2Cases.length-1){ const next=C.module2Cases[idx+1]; message('Đã hoàn thành '+caseObj.title); goCase(next.id); }
      else navigate('m2-complete');
      return;
    }
    case 'map-expand': openMap(el); return;
    case 'map-zoom': zoomMap(el,Number(el.dataset.delta)); return;
    case 'map-fit': zoomMap(el,0,true); return;
    case 'open-media': openMedia(el.dataset.src, el.dataset.alt||'Minh họa thao tác'); return;
  }
}
let mapOpener=null, mediaOpener=null;
function setMenu(open){$('#sidebar').classList.toggle('open',open); $('#menu-scrim').hidden=!open; $('#menu-toggle').setAttribute('aria-expanded',String(open));}
function openMap(el){mapOpener=el; const panel=el.closest('.canvas-panel')||el.closest('.map-surface'); $('#expanded-map').innerHTML=panel.outerHTML; $('#expanded-map').querySelector('[data-action="map-expand"]')?.remove(); const d=$('#map-dialog'); if(typeof d.showModal==='function') d.showModal(); else d.setAttribute('open',''); document.body.classList.add('map-open'); $('#map-dialog [data-global-action="close-map"]').focus();}
function closeMap(){const d=$('#map-dialog'); if(d?.open){if(typeof d.close==='function') d.close(); else d.removeAttribute('open');} document.body.classList.remove('map-open'); mapOpener?.focus(); mapOpener=null;}
function zoomMap(el,delta,reset=false){const p=el.closest('.canvas-panel'); const z=p.querySelector('.zoom-content'); const scale=reset?1:Math.max(.55,Math.min(1.9,Number(z.dataset.scale||1)+delta)); z.dataset.scale=scale; z.style.zoom=String(scale); p.querySelector('[data-action="map-fit"]').textContent=Math.round(scale*100)+'%';}
function openMedia(src,alt){const d=$('#media-dialog'); if(!d) return; mediaOpener=document.activeElement; $('#media-image').src=src; $('#media-image').alt=alt||''; $('#media-title').textContent=alt||'Phóng to minh họa'; if(typeof d.showModal==='function') d.showModal(); else d.setAttribute('open',''); document.body.classList.add('media-open');}
function closeMedia(){const d=$('#media-dialog'); if(d?.open){if(typeof d.close==='function') d.close(); else d.removeAttribute('open');} document.body.classList.remove('media-open'); mediaOpener?.focus(); mediaOpener=null;}
$('#map-dialog').addEventListener('click',e=>{const el=e.target.closest('[data-action]'); if(el) action(el.dataset.action,el)});
$('#map-dialog').addEventListener('close',()=>{document.body.classList.remove('map-open'); mapOpener?.focus(); mapOpener=null;});
$('#media-dialog').addEventListener('click',e=>{if(e.target.matches('#media-dialog')) closeMedia(); const el=e.target.closest('[data-global-action]'); if(el?.dataset.globalAction==='close-media') closeMedia();});
$('#media-dialog').addEventListener('close',()=>{document.body.classList.remove('media-open'); mediaOpener?.focus(); mediaOpener=null;});
$('#screen').addEventListener('click',e=>{const el=e.target.closest('[data-action]'); if(el&&!el.disabled) action(el.dataset.action,el);});
$('#screen').addEventListener('dragstart',e=>{if(e.target.closest('.lm-case-workspace'))return;const chip=e.target.closest('[data-draggable-card]'); if(!chip) return; UI.selectedCard=Number(chip.dataset.draggableCard); e.dataTransfer?.setData('text/plain','card:'+chip.dataset.draggableCard); e.dataTransfer.effectAllowed='move'; chip.classList.add('dragging');});
$('#screen').addEventListener('dragover',e=>{if(e.target.closest('.lm-case-workspace'))return;const z=e.target.closest('[data-drop-zone]'); if(z){e.preventDefault(); z.classList.add('drag-over');}});
$('#screen').addEventListener('dragleave',e=>{if(e.target.closest('.lm-case-workspace'))return;const z=e.target.closest('[data-drop-zone]'); if(z && !z.contains(e.relatedTarget)) z.classList.remove('drag-over');});
$('#screen').addEventListener('drop',e=>{
  if(e.target.closest('.lm-case-workspace'))return;
  const zone=e.target.closest('[data-drop-zone]'); if(!zone) return; e.preventDefault(); zone.classList.remove('drag-over'); const raw=e.dataTransfer?.getData('text/plain')||''; const idx=raw.startsWith('card:')?Number(raw.slice(5)):UI.selectedCard; const caseObj=getCase(UI.caseId); if(!caseObj) return; const current=getCurrentStage(caseObj); if(!Number.isInteger(idx)) return;
  if(zone.dataset.dropZone==='__bank__') delete current.state.placements[idx]; else current.state.placements[idx]=zone.dataset.dropZone; current.state.checked=false; UI.selectedCard=null; save(); render();
});
document.addEventListener('click',e=>{const a=e.target.closest('[data-global-action]'); if(!a) return; const v=a.dataset.globalAction;
  if(v==='close-map') return closeMap(); if(v==='close-media') return closeMedia(); if(v==='back') return back(); if(v==='toggle-nav'){UI.navOpen[a.dataset.id]=!UI.navOpen[a.dataset.id]; return renderNav();}
  if(v==='toggle-guide-group'){UI.guideGroups[a.dataset.id]=!(UI.guideGroups[a.dataset.id]!==false); return renderNav();}
  if(v==='noop') return;
  if(v==='open-home') return navigate('home'); if(v==='open-m1video') return navigate('m1video'); if(v==='open-m1quiz') return navigate('m1quiz'); if(v==='open-m2') return navigate('m2'); if(v==='open-m3') return navigate('m3'); if(v==='open-case') return goCase(a.dataset.id); if(v==='open-chapter') return goChapter(a.dataset.id);
});
$('#desktop-sidebar-toggle').addEventListener('click',()=>action('toggle-sidebar',$('#desktop-sidebar-toggle')));
$('#menu-toggle').addEventListener('click',()=>setMenu(!$('#sidebar').classList.contains('open')));
$('#menu-scrim').addEventListener('click',()=>setMenu(false));
document.addEventListener('keydown',e=>{if(e.key==='Escape'){closeMap(); closeMedia(); setMenu(false);}});
$('#reset-progress').addEventListener('click',()=>{if(confirm('Xóa tiến độ đã lưu trên trình duyệt này? Video và mã nguồn không bị ảnh hưởng.')){P=defaults(); save(); UI.quizIndex=0; UI.caseId=C.module2Cases[0]?.id||'meeting'; UI.chapter=G[0]?.id||''; UI.stack=[]; navigate('home',{noPush:true}); message('Đã đặt lại tiến độ');}});
render();
let recentActivity=Date.now();['pointerdown','keydown','wheel'].forEach(event=>document.addEventListener(event,()=>recentActivity=Date.now(),{passive:true}));
setInterval(()=>{if(document.visibilityState==='visible'&&!['intro','journey-complete'].includes(UI.page)&&Date.now()-recentActivity<120000){game.activeSeconds=(game.activeSeconds||0)+15;save();}},15000);
})();
