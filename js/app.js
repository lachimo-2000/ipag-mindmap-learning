(function(){
'use strict';
const C=window.LEARNING_CONTENT;
const G=window.GITMIND_CHAPTERS||[];
const KEY='ipa-mindmap-lab-v25';
const defaults=()=>({quiz:{},labs:{},chapters:{}});
let P;try{P=Object.assign(defaults(),JSON.parse(localStorage.getItem(KEY)||'{}'))}catch(e){P=defaults()}
for(const k of Object.keys(defaults())) if(!P[k]||typeof P[k]!=='object'||Array.isArray(P[k])) P[k]={};
let UI={page:'home',quizIndex:0,caseId:C.module2Cases[0]?.id||'meeting',chapter:G[0]?.id||'',navOpen:{m1:true,m2:false,m3:false},guideGroups:{},stack:[],selectedCard:null};
const $=s=>document.querySelector(s);
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const save=()=>{try{localStorage.setItem(KEY,JSON.stringify(P))}catch(e){}}
const message=s=>{const t=$('#toast'); if(!t)return; t.textContent=s; t.classList.add('show'); clearTimeout(message.t); message.t=setTimeout(()=>t.classList.remove('show'),2500);};
const cnt=o=>Object.values(o||{}).filter(Boolean).length;
const completedCases=()=>C.module2Cases.filter(x=>P.labs[x.id]?.complete).length;
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
  if(['m3','chapter'].includes(page)) UI.navOpen.m3=true;
  $('#sidebar').classList.remove('open'); render(); window.scrollTo({top:0,behavior:'instant'});
}
function back(){const last=UI.stack.pop(); if(last) restore(last); else navigate('home',{noPush:true});}
function crumbs(){
  const isHome=UI.page==='home'; document.body.dataset.page=UI.page; $('.back-link').hidden=isHome;
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
  const m2=[{num:'2.0',title:'Giới thiệu 5 case',act:'open-m2',active:UI.page==='m2'}].concat(C.module2Cases.map(c=>({num:c.num,title:c.title,act:'open-case',id:c.id,active:UI.page==='case'&&UI.caseId===c.id,done:!!P.labs[c.id]?.complete})));
  const sections=[['gA','01 · Bắt đầu & quản lý',0,4],['gB','02 · Tạo & chỉnh node',4,6],['gC','03 · Bố cục & định dạng',6,10],['gD','04 · Chèn & kết nối',10,15],['gE','05 · Trao đổi & trình bày',15,19],['gF','06 · Chia sẻ & xuất file',19,22]];
  const guideNav=sections.map(([id,title,from,to])=>{
    const isOpen=UI.guideGroups[id]!==false;
    return `<div class="nav-subgroup"><button class="nav-subgroup-toggle" data-global-action="toggle-guide-group" data-id="${id}" aria-expanded="${isOpen}">${esc(title)} <span>${isOpen?'−':'+'}</span></button>${isOpen?G.slice(from,to).map((v,j)=>`<button class="nav-child ${UI.page==='chapter'&&UI.chapter===v.id?'active':''}" data-global-action="open-chapter" data-id="${v.id}"><span class="nav-child-num">3.${from+j+1}</span><span>${esc(v.title)}</span>${P.chapters[v.id]?'<span class="nav-done">✓</span>':''}</button>`).join(''):''}</div>`;
  }).join('');
  const m3 = `<div class="nav-group"><button class="nav-parent ${['m3','chapter'].includes(UI.page)?'selected':''}" data-global-action="toggle-nav" data-id="m3" aria-expanded="${UI.navOpen.m3?'true':'false'}"><span class="nav-parent-icon">03</span><span class="nav-parent-copy"><strong>HỌC GITMIND</strong><small>${G.length} bài hướng dẫn thao tác</small></span><span class="nav-chevron">⌄</span></button>${UI.navOpen.m3?`<div class="nav-children"><button class="nav-child ${UI.page==='m3'?'active':''}" data-global-action="open-m3"><span>Tổng quan Module 3</span></button>${guideNav}</div>`:''}</div>`;
  $('#side-nav').innerHTML = navGroup('m1','VÌ SAO & KHI NÀO','Video và câu hỏi',m1) + navGroup('m2','THỰC HÀNH MINDMAP','5 case tương tác',m2) + m3;
}
function getCase(id){return C.module2Cases.find(x=>x.id===id);}
function labState(id){return (P.labs[id] ||= {step:0,steps:{},complete:false});}
function stageList(caseObj){return caseObj.type==='multi-stage' ? caseObj.stages : [{type:'sort',title:'Thực hành',zones:caseObj.zones,cards:caseObj.cards}];}
function stepState(caseObj,idx){
  const stages=stageList(caseObj); const stage=stages[idx]; const state=labState(caseObj.id); state.steps ||= {};
  if(!state.steps[idx]) state.steps[idx]= stage.type==='sort'?{placements:{},checked:false}:{selected:[],checked:false};
  return state.steps[idx];
}
function caseSolved(caseObj){
  const stages=stageList(caseObj); const state=labState(caseObj.id);
  return stages.every((stage,idx)=>stageSolved(stage, stepState(caseObj,idx)));
}
function stageSolved(stage,st){
  if(stage.type==='sort') return stage.cards.every((card,i)=>(st.placements||{})[i]===card.correct);
  if(stage.type==='multi') return stage.options.every((opt,i)=>!!opt.correct === (st.selected||[]).includes(i));
  return false;
}
function getCurrentStage(caseObj){const all=stageList(caseObj); const ls=labState(caseObj.id); const idx=Math.max(0,Math.min(ls.step||0,all.length-1)); return {idx,stage:all[idx],state:stepState(caseObj,idx),count:all.length};}
function markCaseComplete(caseObj){const st=labState(caseObj.id); st.complete=true; save();}
function homeView(){const q=window.IPA_QUIZ.finished(P.quiz); const modules=[['01','VÌ SAO & KHI NÀO','Hiểu khi nào dùng MindMap trong năm tình huống công việc.','m1',`${q}/5 câu hỏi`],['02','THỰC HÀNH MINDMAP','Dùng mindmap để phân loại, tổ chức và làm rõ thông tin trong 5 case công việc.','m2',`${completedCases()}/5 case`],['03','HỌC GITMIND','Làm theo 22 hướng dẫn tiếng Việt và thực hành trực tiếp trên GitMind.','m3',`${cnt(P.chapters)}/${G.length} bài hướng dẫn`]];
 return `<section class="hero"><img class="hero-image" src="assets/images/ipa-building.png" alt="" aria-hidden="true"><div class="hero-copy"><span class="eyebrow">IPA GROUP · ĐÀO TẠO NỘI BỘ</span><h1>MindMap<br><span>Trong công việc.</span></h1><p>Tư duy rõ ràng hơn. Kết nối thông tin tốt hơn. Biến những tình huống công việc thường ngày thành một bức tranh dễ hiểu và có thể hành động.</p><div class="btn-row">${btn('Bắt đầu hành trình →','open-m1','primary')}${btn('Thực hành 5 case','open-m2','outline')}</div></div><div class="hero-stat"><strong>03</strong><span>Học phần</span><strong style="margin-top:20px">05</strong><span>Case công việc</span></div></section>
 <div class="section-heading"><div><h2>Hành trình học tập</h2><p>Hiểu khi nào dùng · Biết cách làm · Thực hành công cụ</p></div>${tag('Học qua thực hành','gold')}</div>
 <section class="module-grid">${modules.map(m=>`<article class="module-card card"><div class="module-n">HỌC PHẦN ${m[0]}</div><h3>${m[1]}</h3><p>${m[2]}</p><div class="mini-meta"><span class="pill">${m[4]}</span>${btn('Khám phá →','open-'+m[3],'ghost small')}</div></article>`).join('')}</section>
 <div class="learning-strip"><div style="font-size:1.6rem;color:var(--ipa-deep)">✧</div><div><strong>Tinh thần khóa học</strong><p>MindMap không chỉ là hình vẽ đẹp. Mỗi sơ đồ cần trả lời đúng câu hỏi, làm rõ cấu trúc thông tin và giúp chúng ta tiến lên bước tiếp theo.</p></div></div>`;
}
function m1VideoView(){return shell('Vì sao và khi nào nên dùng MindMap?','Xem video bài học, sau đó trả lời năm câu hỏi tương tác để củng cố kiến thức vừa học.','HỌC PHẦN 01 · 1.1 XEM VIDEO')+
 `<section class="card pad-lg video-lesson"><div class="workspace-title">VIDEO BÀI HỌC · MINDMAP AS A SKILL</div><div class="video-wrap"><video controls preload="metadata" playsinline src="assets/videos/module-1/module-01.mp4" aria-label="MindMap as a Skill - Module 1"></video></div><div class="btn-row end">${btn('Tiếp tục: Câu hỏi tương tác →','open-m1quiz')}</div></section>`;}
function m1QuizView(){ return window.IPA_QUIZ.view({C,P,UI,esc,btn,progress,tag,shell}); }
function m2View(){
  return shell('Module 2 — Thực hành MindMap trong công việc','Năm case giúp bạn dùng mindmap để phân loại, tổ chức và làm rõ thông tin trong công việc. An và Bình sẽ dẫn chuyện và phản hồi trong từng case.','HỌC PHẦN 02 · 5 CASE TƯƠNG TÁC')+
  `<div class="learning-strip" style="margin:0 0 22px"><div style="font-size:1.7rem;color:var(--ipa-deep)">◎</div><div><strong>Luồng học trong mỗi case</strong><p>Đọc bối cảnh → kéo thẻ vào ô nhận hoặc chọn thẻ rồi chọn ô → xem mindmap cập nhật → bấm Kiểm tra đáp án → sửa và kiểm tra lại → chuyển case tiếp theo.</p></div></div>
  <section class="scenario-grid">${C.module2Cases.map(c=>`<button class="scenario-card" data-action="open-case" data-id="${c.id}"><span class="scenario-icon">${c.num.split('.')[1]}</span><strong>${c.num} · ${c.title}</strong><small>${c.task}</small><span class="scenario-bottom">${P.labs[c.id]?.complete?'✓ Đã hoàn thành':'Bắt đầu case'} <span>↗</span></span></button>`).join('')}</section>
  <div class="card pad item-space">${progress(completedCases(),C.module2Cases.length)}<p class="note item-space">Các case là ví dụ giả định để luyện kỹ năng, không phản ánh quy trình hay chính sách đã được ban hành của IPA Group.</p><div class="btn-row end">${btn('Bắt đầu với Case 1 →','open-case','outline','data-id="meeting"')}</div></div>`;
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
  const caseObj=getCase(UI.caseId); if(!caseObj) return m2View();
  const current=getCurrentStage(caseObj);
  const stepLabel = stageList(caseObj).length>1 ? `<div class="stepper">${stageList(caseObj).map((s,i)=>`<div class="step ${current.idx===i?'active':''} ${current.idx>i||stageSolved(s,stepState(caseObj,i))?'done':''}"><b>${i+1}</b>${esc(s.title)}</div>`).join('')}</div>` : '';
  return shell('Module 2 — Thực hành MindMap trong công việc','Dùng mindmap để phân loại, tổ chức và làm rõ thông tin trong công việc. Sau mỗi lần kiểm tra, bạn có thể sửa và kiểm tra lại ngay.','HỌC PHẦN 02 · CASE TƯƠNG TÁC') + stepLabel + (current.stage.type==='sort' ? sortStageView(caseObj,current.stage,current.state) : multiStageView(caseObj,current.stage,current.state));
}
function m2CompleteView(){
  const branches=C.module2Cases.map(c=>({name:c.title,children:[{text:c.summary,style:'correct'}]}));
  return shell('Bạn đã hoàn thành Module 2','Năm case đã tổng hợp thành một mindmap ôn tập. Hãy mang các nguyên tắc này sang Module 3 để thực hành trên GitMind.','HỌC PHẦN 02 · TỔNG KẾT')+
  `<div class="card pad-lg"><div class="context"><strong>Tổng kết cùng An và Bình</strong><p>Ghi chú cuộc họp — Tìm nguyên nhân — Bắt đầu dự án — Giải thích toàn cảnh — Cùng ra quyết định. Mỗi case nhắc mình rằng sơ đồ chỉ thực sự có giá trị khi giúp công việc rõ ràng hơn.</p></div><div class="item-space">${renderMap('MindMap trong công việc',branches,'SƠ ĐỒ TỔNG KẾT MODULE 2')}</div><div class="btn-row end">${btn('Tiếp tục Module 3 →','open-m3')}</div></div>`;
}
function m3View(){
  return shell('Module 3 — Học GitMind để thực hành trực tiếp','Khám phá nội dung bằng sơ đồ: mở nhánh để xem bài, cuộn chuột để phóng to/thu nhỏ và kéo vùng trống để di chuyển.','HỌC PHẦN 03 · HƯỚNG DẪN GITMIND')+
  `<section class="m3-hero card"><div class="m3-hero-bg" style="background-image:url('assets/images/gitmind-homepage.png')"></div><div class="m3-hero-overlay"></div><div class="m3-hero-content"><span class="eyebrow" style="color:var(--ipa-sand-light)">THỰC HÀNH TRỰC TIẾP</span><h2 style="margin:10px 0 12px;color:#fff">Mở GitMind và thực hành theo từng bài</h2><p style="color:#fff;max-width:700px">Truy cập GitMind, đăng nhập và thử thao tác trên giao diện thật. Bên dưới là mindmap 22 bài hướng dẫn tiếng Việt. Chọn một nhóm để khám phá từng bài.</p><div class="btn-row"><a class="primary external-link" href="https://gitmind.com/" target="_blank" rel="noopener noreferrer">Mở trang chủ GitMind ↗</a> ${btn('Bắt đầu bài 3.1 →','start-chapter','outline')}</div></div></section>
  <div class="m3-map-section item-space"><div id="gm-map"><p class="note">Đang khởi tạo sơ đồ nội dung…</p></div><p class="m3-map-help">Hỗ trợ chuột, cảm ứng và bàn phím: dùng các nút +/- hoặc con lăn để thu/phóng; kéo vùng trống để di chuyển; chọn nhánh để mở hoặc thu gọn; chọn bài để xem hướng dẫn.</p></div>`;
}
function chapterView(){
  const ch=G.find(x=>x.id===UI.chapter); if(!ch) return m3View();
  const index=G.findIndex(x=>x.id===ch.id); const img=`assets/gitmind-chapters/${ch.image}`;
  return shell(`3.${index+1} · ${ch.title}`,'Xem nhanh cách thao tác, sau đó mở GitMind để tự thực hành trực tiếp.','HỌC PHẦN 03 · HƯỚNG DẪN GITMIND')+
  `<div class="guide-watch-layout"><section class="card guide-watch"><div class="guide-media-head"><span>${esc(ch.english||'GitMind')}</span>${tag(`Bài ${index+1}`,'gold')}</div><button class="guide-media guide-media-button" type="button" data-action="open-media" data-src="${esc(img)}" data-alt="${esc(ch.title)}"><img src="${esc(img)}" alt="Minh họa thao tác ${esc(ch.title)}"><span class="media-hint">Bấm vào GIF để phóng to</span></button><p class="caption">Bạn cũng có thể dùng nút phóng to để xem thao tác rõ hơn.</p><div class="btn-row">${btn('Phóng to GIF','open-media','outline','data-src="'+esc(img)+'" data-alt="'+esc(ch.title)+'"')}${btn('Mở GitMind để thực hành ↗','open-gitmind','primary')}</div><div class="guide-feature item-space"><strong>Mục tiêu sau bài</strong><p>${esc(ch.objective||ch.topic||'Biết cách thực hiện thao tác trong GitMind.')}</p></div>${ch.caution?`<div class="guide-note"><strong>Lưu ý</strong><p>${esc(ch.caution)}</p></div>`:''}<div class="btn-row between guide-navigation"><div>${btn('← Bài trước','chapter-prev','outline',index===0?'disabled':'')}</div><div>${btn('Đánh dấu đã xem','mark-chapter','outline')} ${btn(index===G.length-1?'Quay về tổng quan →':'Bài tiếp theo →','chapter-next')}</div></div></section><section class="card guide-instruction"><div class="watch-heading">CÁC BƯỚC THAO TÁC</div><ol class="guide-steps">${(ch.steps||[]).map((step,i)=>`<li><span class="gm-step-no">${i+1}</span><div><strong>Bước ${i+1}</strong><p>${esc(step)}</p></div></li>`).join('')}</ol>${ch.topic?`<div class="guide-activity"><strong>Chủ đề thao tác</strong><p>${esc(ch.topic)}</p></div>`:''}${ch.objective?`<div class="guide-activity"><strong>Kết quả cần đạt</strong><p>${esc(ch.objective)}</p></div>`:''}<div class="guide-note"><strong>Gợi ý thực hành</strong><p>Giữ trang này ở một tab và mở <a class="resource-link" href="https://gitmind.com/" target="_blank" rel="noopener noreferrer">gitmind.com</a> ở tab khác để thao tác song song.</p></div></section></div>`;
}
function render(){
  window.GitMindOverview?.destroy();
  const views={home:homeView,m1video:m1VideoView,m1quiz:m1QuizView,m2:m2View,case:caseView,'m2-complete':m2CompleteView,m3:m3View,chapter:chapterView};
  $('#screen').innerHTML=(views[UI.page]||homeView)();
  renderNav(); crumbs(); $('#screen').classList.remove('page-enter'); void $('#screen').offsetWidth; $('#screen').classList.add('page-enter');
  if(UI.page==='m3') window.GitMindOverview?.mount($('#gm-map'),{items:G,done:P.chapters,onOpen:goChapter});
}
function goCase(id){if(!getCase(id)) return; navigate('case',{state:{caseId:id}});}
function goChapter(id){if(!G.find(x=>x.id===id)) return; P.chapters[id]=true; save(); navigate('chapter',{state:{chapter:id}});}
function openGitMind(){window.open('https://gitmind.com/','_blank','noopener');}
function action(a,el){
  if(a.startsWith('quiz-') && window.IPA_QUIZ.handle(a,el,{C,P,UI,save,render,message,navigate})) return;
  switch(a){
    case 'open-home': navigate('home'); return;
    case 'open-m1': case 'open-m1video': navigate('m1video'); return;
    case 'open-m1quiz': navigate('m1quiz'); return;
    case 'open-m2': navigate('m2'); return;
    case 'open-m3': navigate('m3'); return;
    case 'open-case': goCase(el.dataset.id); return;
    case 'start-chapter': goChapter(G[0]?.id); return;
    case 'open-chapter': goChapter(el.dataset.id); return;
    case 'mark-chapter': P.chapters[UI.chapter]=true; save(); message('Đã ghi nhận bài đã xem'); render(); return;
    case 'chapter-prev': {const i=G.findIndex(x=>x.id===UI.chapter); if(i>0) goChapter(G[i-1].id); return;}
    case 'chapter-next': {const i=G.findIndex(x=>x.id===UI.chapter); if(i>=0 && i<G.length-1) goChapter(G[i+1].id); else navigate('m3'); return;}
    case 'open-gitmind': openGitMind(); return;
    case 'pick-card': UI.selectedCard = Number(el.dataset.index); render(); return;
    case 'assign-zone': {
      const caseObj=getCase(UI.caseId); const current=getCurrentStage(caseObj); if(UI.selectedCard===null) return message('Hãy chọn một thẻ trước');
      current.state.placements[UI.selectedCard]=el.dataset.zone; current.state.checked=false; UI.selectedCard=null; save(); render(); return;
    }
    case 'reset-stage': {
      const caseObj=getCase(UI.caseId); const current=getCurrentStage(caseObj);
      if(current.stage.type==='sort') current.state.placements={}; else current.state.selected=[];
      current.state.checked=false; UI.selectedCard=null; save(); render(); return;
    }
    case 'check-stage': {
      const caseObj=getCase(UI.caseId); const current=getCurrentStage(caseObj); current.state.checked=true; save(); render(); message(stageSolved(current.stage,current.state)?'Bạn đã sắp xếp đúng':'Đã có phản hồi để bạn chỉnh lại'); return;
    }
    case 'next-stage': {const caseObj=getCase(UI.caseId); const ls=labState(caseObj.id); ls.step=Math.min(ls.step+1, stageList(caseObj).length-1); save(); render(); return;}
    case 'prev-stage': {const caseObj=getCase(UI.caseId); const ls=labState(caseObj.id); ls.step=Math.max(ls.step-1,0); save(); render(); return;}
    case 'toggle-multi': {
      const caseObj=getCase(UI.caseId); const current=getCurrentStage(caseObj); const i=Number(el.dataset.index); const arr=current.state.selected||[];
      current.state.selected = arr.includes(i)?arr.filter(x=>x!==i):[...arr,i]; current.state.checked=false; save(); render(); return;
    }
    case 'finish-case': {
      const caseObj=getCase(UI.caseId); markCaseComplete(caseObj); const idx=C.module2Cases.findIndex(x=>x.id===caseObj.id);
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
$('#screen').addEventListener('dragstart',e=>{const chip=e.target.closest('[data-draggable-card]'); if(!chip) return; UI.selectedCard=Number(chip.dataset.draggableCard); e.dataTransfer?.setData('text/plain','card:'+chip.dataset.draggableCard); e.dataTransfer.effectAllowed='move'; chip.classList.add('dragging');});
$('#screen').addEventListener('dragover',e=>{const z=e.target.closest('[data-drop-zone]'); if(z){e.preventDefault(); z.classList.add('drag-over');}});
$('#screen').addEventListener('dragleave',e=>{const z=e.target.closest('[data-drop-zone]'); if(z && !z.contains(e.relatedTarget)) z.classList.remove('drag-over');});
$('#screen').addEventListener('drop',e=>{
  const zone=e.target.closest('[data-drop-zone]'); if(!zone) return; e.preventDefault(); zone.classList.remove('drag-over'); const raw=e.dataTransfer?.getData('text/plain')||''; const idx=raw.startsWith('card:')?Number(raw.slice(5)):UI.selectedCard; const caseObj=getCase(UI.caseId); if(!caseObj) return; const current=getCurrentStage(caseObj); if(!Number.isInteger(idx)) return;
  if(zone.dataset.dropZone==='__bank__') delete current.state.placements[idx]; else current.state.placements[idx]=zone.dataset.dropZone; current.state.checked=false; UI.selectedCard=null; save(); render();
});
document.addEventListener('click',e=>{const a=e.target.closest('[data-global-action]'); if(!a) return; const v=a.dataset.globalAction;
  if(v==='close-map') return closeMap(); if(v==='close-media') return closeMedia(); if(v==='back') return back(); if(v==='toggle-nav'){UI.navOpen[a.dataset.id]=!UI.navOpen[a.dataset.id]; return renderNav();}
  if(v==='toggle-guide-group'){UI.guideGroups[a.dataset.id]=!(UI.guideGroups[a.dataset.id]!==false); return renderNav();}
  if(v==='noop') return;
  if(v==='open-home') return navigate('home'); if(v==='open-m1video') return navigate('m1video'); if(v==='open-m1quiz') return navigate('m1quiz'); if(v==='open-m2') return navigate('m2'); if(v==='open-m3') return navigate('m3'); if(v==='open-case') return goCase(a.dataset.id); if(v==='open-chapter') return goChapter(a.dataset.id);
});
$('#menu-toggle').addEventListener('click',()=>setMenu(!$('#sidebar').classList.contains('open')));
$('#menu-scrim').addEventListener('click',()=>setMenu(false));
document.addEventListener('keydown',e=>{if(e.key==='Escape'){closeMap(); closeMedia(); setMenu(false);}});
$('#reset-progress').addEventListener('click',()=>{if(confirm('Xóa tiến độ đã lưu trên trình duyệt này? Video và mã nguồn không bị ảnh hưởng.')){P=defaults(); save(); UI.quizIndex=0; UI.caseId=C.module2Cases[0]?.id||'meeting'; UI.chapter=G[0]?.id||''; UI.stack=[]; navigate('home',{noPush:true}); message('Đã đặt lại tiến độ');}});
render();
})();
