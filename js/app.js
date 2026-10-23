(function(){
'use strict';
const C=window.LEARNING_CONTENT;
const G=window.GITMIND_CHAPTERS||[];
/* No learner-completion/view tracking: all exercise answers are session-only. */
const defaults=()=>({quiz:{}});
let P=defaults();
// Clean up only legacy progress keys from earlier versions; do not persist new activity.
try{localStorage.removeItem('ipa-mindmap-lab-v25');localStorage.removeItem('ipa-mindmap-lab-v2');}catch(_){}
let UI={page:'intro',quizIndex:0,caseId:C.module2Cases[0]?.id||'identify',chapter:G[0]?.id||'',navOpen:{m1:true,m2:false,m3:false},guideGroups:{},stack:[],selectedCard:null,sidebarCollapsed:false};
const $=s=>document.querySelector(s);
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const save=()=>{};
const message=s=>{const t=$('#toast');if(!t)return;t.textContent=s;t.classList.add('show');clearTimeout(message.t);message.t=setTimeout(()=>t.classList.remove('show'),2500);};
const cnt=o=>Object.values(o||{}).filter(Boolean).length;
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
  const isHome=['home','intro'].includes(UI.page); document.body.dataset.page=UI.page; $('.back-link').hidden=isHome;
  let path=isHome?[]:[{t:'Trang chủ',act:'open-home'}];
  if(['m1video','m1quiz'].includes(UI.page)){path.push({t:'Module 1 · Vì sao & Khi nào',act:'open-m1video'}); if(UI.page==='m1quiz') path.push({t:'Bài kiểm tra tương tác',act:'noop'});}
  if(['m2','case','m2-complete'].includes(UI.page)){path.push({t:'Module 2 · IPAM Way',act:'open-m2'}); if(UI.page==='case'){const c=getCase(UI.caseId); path.push({t:c?`${c.num} · ${c.title}`:'Case',act:'noop'});} if(UI.page==='m2-complete') path.push({t:'Tổng kết Module 2',act:'noop'});}
  if(['m3','chapter'].includes(UI.page)){path.push({t:'Module 3 · Học GitMind',act:'open-m3'}); if(UI.page==='chapter'){const i=G.findIndex(x=>x.id===UI.chapter); if(i>=0) path.push({t:`3.${i+1} · ${G[i].title}`,act:'noop'});} }
  $('#breadcrumb').innerHTML=path.map((x,i)=>`${i?'<span class="crumb-sep">›</span>':''}<button class="crumb ${i===path.length-1?'current':''}" data-global-action="${x.act}" ${i===path.length-1?'disabled aria-current="page"':''}>${esc(x.t)}</button>`).join('');
}
function navGroup(id,title,subtitle,entries){
  const active=(['m1video','m1quiz'].includes(UI.page)&&id==='m1')||(['m2','case','m2-complete'].includes(UI.page)&&id==='m2')||(['m3','chapter'].includes(UI.page)&&id==='m3');
  return `<div class="nav-group"><button class="nav-parent ${active?'selected':''}" data-global-action="toggle-nav" data-id="${id}" aria-expanded="${UI.navOpen[id]?'true':'false'}"><span class="nav-parent-icon">${id==='m1'?'01':id==='m2'?'02':'03'}</span><span class="nav-parent-copy"><strong>${title}</strong><small>${subtitle}</small></span><span class="nav-chevron">⌄</span></button>${UI.navOpen[id]?`<div class="nav-children">${entries.map(x=>`<button class="nav-child ${x.active?'active':''}" data-global-action="${x.act}" ${x.id?`data-id="${x.id}"`:''}><span class="nav-child-num">${x.num||''}</span><span>${esc(x.title)}</span></button>`).join('')}</div>`:''}</div>`;
}
function renderNav(){
  const m1=[{num:'1.1',title:'Video bài học',act:'open-m1video',active:UI.page==='m1video'},{num:'1.2',title:'5 câu hỏi tương tác',act:'open-m1quiz',active:UI.page==='m1quiz'}];
  const m2=[{num:'',title:'Tổng quan IPAM Way',act:'open-m2',active:UI.page==='m2'}].concat(C.module2Cases.map(c=>({num:c.num,title:c.title,act:'open-case',id:c.id,active:UI.page==='case'&&UI.caseId===c.id,done:false})));
  const sections=[['gA','01 · Bắt đầu & quản lý',0,4],['gB','02 · Tạo & chỉnh node',4,6],['gC','03 · Bố cục & định dạng',6,10],['gD','04 · Chèn & kết nối',10,15],['gE','05 · Trao đổi & trình bày',15,19],['gF','06 · Chia sẻ & xuất file',19,22]];
  const guideNav=sections.map(([id,title,from,to])=>{
    const isOpen=UI.guideGroups[id]!==false;
    return `<div class="nav-subgroup"><button class="nav-subgroup-toggle" data-global-action="toggle-guide-group" data-id="${id}" aria-expanded="${isOpen}">${esc(title)} <span>${isOpen?'−':'+'}</span></button>${isOpen?G.slice(from,to).map((v,j)=>`<button class="nav-child ${UI.page==='chapter'&&UI.chapter===v.id?'active':''}" data-global-action="open-chapter" data-id="${v.id}"><span class="nav-child-num">3.${from+j+1}</span><span>${esc(v.title)}</span></button>`).join(''):''}</div>`;
  }).join('');
  const m3 = `<div class="nav-group"><button class="nav-parent ${['m3','chapter'].includes(UI.page)?'selected':''}" data-global-action="toggle-nav" data-id="m3" aria-expanded="${UI.navOpen.m3?'true':'false'}"><span class="nav-parent-icon">03</span><span class="nav-parent-copy"><strong>HỌC GITMIND</strong><small>${G.length} bài hướng dẫn thao tác</small></span><span class="nav-chevron">⌄</span></button>${UI.navOpen.m3?`<div class="nav-children"><button class="nav-child ${UI.page==='m3'?'active':''}" data-global-action="open-m3"><span>Tổng quan Module 3</span></button>${guideNav}</div>`:''}</div>`;
  const previousScroll=$('#sidebar').scrollTop;
  $('#side-nav').innerHTML = navGroup('m1','VÌ SAO & KHI NÀO','Video và câu hỏi',m1) + navGroup('m2','IPAM WAY','4 giai đoạn · Nội dung đọc hiểu',m2) + m3;
  $('#sidebar').scrollTop=previousScroll;
}
function getCase(id){return C.module2Cases.find(x=>x.id===id);}
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
      <div class="intro-map-branch" style="--branch:1"><small>MODULE 2</small><strong>IPAM Way</strong><p>4 giai đoạn IPAM Way · Nhận diện, lập kế hoạch, hành động, làm chủ</p></div>
      <div class="intro-map-branch" style="--branch:2"><small>MODULE 3</small><strong>Học GitMind</strong><p>22 bài hướng dẫn GIF · Thực hành trực tiếp trên GitMind</p></div>
    </div>
    <button type="button" class="intro-start" data-action="enter-home">Bắt đầu ngay <span aria-hidden="true">→</span></button>
  </div>
  <div class="intro-bottom">MINDMAP AS A SKILL · IPA GROUP</div>
 </section>`;
}
function homeView(){
 return `<section class="journey-heading"><span class="eyebrow">IPA GROUP · HÀNH TRÌNH HỌC TẬP</span><h1>MindMap <span>Trong công việc.</span></h1><p>Khám phá ba học phần trên cùng một sơ đồ. Mở nhánh để xem giới thiệu, sau đó bấm vào module muốn học.</p></section><div id="journey-map" aria-label="MindMap hành trình học tập"></div><div class="learning-strip journey-note"><div style="font-size:1.6rem;color:var(--ipa-deep)">✧</div><div><strong>Học để ứng dụng</strong><p>Ghi nhận → Sắp xếp → Kết nối. Mỗi sơ đồ giúp bạn tổ chức thông tin rõ ràng và có thể hành động.</p></div></div>`;
}
function m1VideoView(){return shell('Vì sao và khi nào nên dùng MindMap?','Xem video bài học, sau đó trả lời năm câu hỏi tương tác để củng cố kiến thức vừa học.','HỌC PHẦN 01 · 1.1 XEM VIDEO')+
 `<section class="card pad-lg video-lesson"><div class="workspace-title">VIDEO BÀI HỌC · MINDMAP AS A SKILL</div><div class="video-wrap"><video controls preload="metadata" playsinline src="assets/videos/module-1/module-01.mp4" aria-label="MindMap as a Skill - Module 1"></video></div><div class="btn-row end">${btn('Tiếp tục: Câu hỏi tương tác →','open-m1quiz')}</div></section>`;}
function m1QuizView(){ return window.IPA_QUIZ.view({C,P,UI,esc,btn,progress,tag,shell}); }
function m2View(){
 const steps=C.module2Cases;
 return shell('Module 2 — IPAM Way: Từ nhận diện đến làm chủ',
 'Khám phá mô hình IPAM Way theo bản chia sẻ mới nhất: Identify → Plan → Action → Mastery. Chọn từng nhánh trên MindMap để đọc nội dung.',
 'HỌC PHẦN 02 · TỔNG QUAN')+
 `<section class="ipam-v212-why card"><span class="eyebrow">TƯ DUY LÀM VIỆC THEO MỤC TIÊU</span><h3>Từ việc của riêng mình đến giá trị chung của tổ chức</h3><p>Bản chia sẻ nhấn mạnh rằng làm chủ vai trò chuyên môn thôi chưa đủ: mỗi người cần nhìn thấy công việc của mình đóng góp như thế nào cho nhiệm vụ, mục tiêu và chuỗi giá trị tổ chức. IPAM Way là cách cùng nhận diện, lập kế hoạch, hành động và làm chủ hành trình thực thi.</p><div class="ipam-v212-cycle">${steps.map((x,i)=>`<span><b>${'IPAM'[i]}</b> ${esc(x.short)}</span>`).join('<span class="ipam-v212-cycle-arrow" aria-hidden="true">→</span>')}</div></section>
 <div id="m2-overview" aria-label="MindMap 4 giai đoạn IPAM Way"></div>
 <div class="ipam-v212-source"><strong>Về nội dung nguồn</strong><p>Biên soạn từ <i>phan1.ipamwayframework.pdf</i> (bản chép lời, 8 trang). Đây là bản diễn giải định hướng tư duy, không phải văn bản công bố danh sách 5A/5M chính thức. Một số thuật ngữ trong bản ghi có thể bị nhận dạng giọng nói sai.</p></div>`;
}
function caseView(){
 const obj=getCase(UI.caseId); if(!obj)return m2View();
 const idx=C.module2Cases.indexOf(obj),previous=C.module2Cases[idx-1],next=C.module2Cases[idx+1];
 return shell(obj.title,obj.tagline,`HỌC PHẦN 02 · ${obj.num} / 2.4`)+
 `<section class="ipam-v212-lesson">
 <div class="ipam-v212-lead"><div><span class="eyebrow">${esc(obj.short.toUpperCase())} · IPAM WAY</span><h3>${esc(obj.intro)}</h3><p>${esc(obj.why)}</p></div><div class="ipam-v212-stageletter" aria-hidden="true">${'IPAM'[idx]}</div></div>
 <div class="ipam-v212-sectionheader"><span class="eyebrow">BỨC TRANH MINDMAP</span><h3>Các ý chính cần hiểu</h3><p>Quan sát cách các nội dung thuộc cùng một giai đoạn liên kết với nhau. Đây là phần đọc hiểu, không có bài tập hoặc chấm đáp án.</p></div>
 <div class="ipam-v212-mindmap" role="group" aria-label="Nhánh tư duy ${esc(obj.short)}"><div class="ipam-v212-center"><small>GIAI ĐOẠN ${idx+1}</small><strong>${esc(obj.short)}</strong></div><div class="ipam-v212-branches">${obj.concepts.map(([term,definition],i)=>`<article class="ipam-v212-branch" style="--branch-index:${i}"><span class="ipam-v212-branch-title">${esc(term)}</span><p>${esc(definition)}</p></article>`).join('')}</div></div>
 <div class="ipam-v212-sectionheader"><span class="eyebrow">GIẢI THÍCH THEO BẢN CHIA SẺ</span><h3>Hiểu sâu hơn về ${esc(obj.short)}</h3></div>
 <div class="ipam-v212-reading">${obj.sections.map((sec,i)=>`<article class="ipam-v212-reading-card"><span class="ipam-v212-reading-index">${String(i+1).padStart(2,'0')}</span><div><h4>${esc(sec.title)}</h4><p>${esc(sec.text)}</p></div></article>`).join('')}</div>
 <div class="ipam-v212-takeaway"><strong>Điểm chốt</strong><p>${esc(obj.takeaway)}</p></div>
 <p class="ipam-v212-reference">Nguồn: ${esc(obj.source)} Diễn giải từ bản chép lời; những thuật ngữ chưa có danh sách đầy đủ không được tự bổ sung.</p>
 <div class="btn-row between ipam-v212-nav"><div>${previous?btn('← '+previous.short,'read-prev','outline'):btn('← Tổng quan IPAM Way','open-m2','outline')}</div><div>${next?btn('Tiếp tục: '+next.short+' →','read-next','primary journey-cta'):btn('Tiếp tục Module 3 →','open-m3','primary journey-cta')}</div></div>
 </section>`;
}
function m2CompleteView(){return m2View();}
function m3View(){
  return shell('Module 3 — Học GitMind để thực hành trực tiếp','Khám phá nội dung bằng sơ đồ: mở nhánh để xem bài, cuộn chuột để phóng to/thu nhỏ và kéo vùng trống để di chuyển.','HỌC PHẦN 03 · HƯỚNG DẪN GITMIND')+
  `<section class="m3-hero card"><div class="m3-hero-bg" style="background-image:url('assets/images/gitmind-homepage.png')"></div><div class="m3-hero-overlay"></div><div class="m3-hero-content"><span class="eyebrow" style="color:var(--ipa-sand-light)">THỰC HÀNH TRỰC TIẾP</span><h2 style="margin:10px 0 12px;color:#fff">Mở GitMind và thực hành theo từng bài</h2><p style="color:#fff;max-width:700px">Truy cập GitMind, đăng nhập và thử thao tác trên giao diện thật. Bên dưới là mindmap 22 bài hướng dẫn tiếng Việt. Chọn một nhóm để khám phá từng bài.</p><div class="btn-row"><a class="primary external-link gitmind-attention" href="https://gitmind.com/" target="_blank" rel="noopener noreferrer">Truy cập GitMind ↗</a> ${btn('Bắt đầu bài 3.1 →','start-chapter','outline')}</div></div></section>
  <div class="m3-map-section item-space"><div id="gm-map"><p class="note">Đang khởi tạo sơ đồ nội dung…</p></div><p class="m3-map-help">Hỗ trợ chuột, cảm ứng và bàn phím: dùng các nút +/- hoặc con lăn để thu/phóng; kéo vùng trống để di chuyển; chọn nhánh để mở hoặc thu gọn; chọn bài để xem hướng dẫn.</p></div>`;
}
function chapterView(){
  const ch=G.find(x=>x.id===UI.chapter);if(!ch)return m3View();
  const i=G.findIndex(x=>x.id===ch.id),img=`assets/gitmind-chapters/${ch.image}`;
  return shell(`3.${i+1} · ${ch.title}`,'Quan sát ảnh động, đọc các bước và thực hành trực tiếp trên GitMind.','HỌC PHẦN 03 · HƯỚNG DẪN GITMIND')+
  `<div class="guide-watch-layout guide-clean-layout"><section class="card guide-watch"><div class="guide-media-head"><span>${esc(ch.english||'GitMind')}</span>${tag(`Bài ${i+1}`,'gold')}</div><button class="guide-media guide-media-button" type="button" data-action="open-media" data-src="${esc(img)}" data-alt="${esc(ch.title)}"><img src="${esc(img)}" alt="GIF minh họa thao tác ${esc(ch.title)}"><span class="media-hint">Bấm vào GIF để phóng to</span></button><div class="btn-row">${btn('Truy cập GitMind ↗','open-gitmind','primary')}</div><div class="btn-row between guide-navigation"><div>${btn('← Bài trước','chapter-prev','outline',i===0?'disabled':'')}</div><div>${btn(i===G.length-1?'Về tổng quan Module 3 →':'Bài tiếp theo →','chapter-next','primary')}</div></div></section><section class="card guide-instruction"><div class="watch-heading">CÁC BƯỚC THAO TÁC</div><ol class="guide-steps" id="chapter-instructions">${(ch.steps||[]).map((step,j)=>`<li><span class="gm-step-no">${j+1}</span><div><strong>Bước ${j+1}</strong><p>${esc(step)}</p></div></li>`).join('')}</ol></section></div>`;
}
function render(){
  window.GitMindOverview?.destroy();
  window.LearningMaps?.destroy();
  const views={intro:introView,home:homeView,m1video:m1VideoView,m1quiz:m1QuizView,m2:m2View,case:caseView,'m2-complete':m2CompleteView,m3:m3View,chapter:chapterView};
  $('#screen').innerHTML=(views[UI.page]||homeView)();
  renderNav(); crumbs(); document.body.classList.toggle('sidebar-collapsed',UI.sidebarCollapsed); $('#screen').classList.remove('page-enter'); void $('#screen').offsetWidth; $('#screen').classList.add('page-enter');

  if(UI.page==='m1quiz'&&UI.quizIndex===1){window.__ipaAppQuizState=()=>P.quiz[1];window.IPA_QUIZ?.drawConnections();window.IPA_QUIZ?.bindMatching({P,UI,render,save});}
  if(UI.page==='m3') window.GitMindOverview?.mount($('#gm-map'),{items:G,done:{},onOpen:goChapter});
  if(UI.page==='intro') window.LearningMaps?.intro($('#intro-screen'));
  if(UI.page==='home'){
    
    const items=[
      {id:'m1',title:'Vì sao & Khi nào',desc:'Video bài học và 5 câu hỏi tương tác · Ba bước Ghi nhận → Sắp xếp → Kết nối.'},
      {id:'m2',title:'IPAM Way',desc:'4 giai đoạn · Identify, Plan, Action, Mastery · Học nội dung trên MindMap.'},
      {id:'m3',title:'Học GitMind',desc:'22 bài có GIF thao tác trên công cụ GitMind.'}
    ];
    window.LearningMaps?.overview($('#journey-map'),{items,title:'MindMap',subtitle:'Trong công việc',kind:'modules',onOpen:id=>navigate(id==='m1'?'m1video':id)});
  }
  if(UI.page==='m2') window.LearningMaps?.overview($('#m2-overview'),{items:C.module2Cases.map(x=>({id:x.id,title:x.short,desc:x.tagline})),title:'IPAM Way',subtitle:'4 giai đoạn quản trị mục tiêu',kind:'cases',done:{},onOpen:goCase});

}
function goCase(id){if(!getCase(id)) return; navigate('case',{state:{caseId:id}});}
function goChapter(id){if(!G.find(x=>x.id===id))return;navigate('chapter',{state:{chapter:id}});}
function openGitMind(){window.open('https://gitmind.com/','_blank','noopener');}
function action(a,el){
  if(a.startsWith('quiz-')&&window.IPA_QUIZ.handle(a,el,{C,P,UI,save,render,message,navigate}))return;
  switch(a){
    case 'open-home': navigate('home'); return;
    case 'toggle-sidebar':{UI.sidebarCollapsed=!UI.sidebarCollapsed;document.body.classList.toggle('sidebar-collapsed',UI.sidebarCollapsed);$('#desktop-sidebar-toggle').setAttribute('aria-expanded',String(!UI.sidebarCollapsed));$('#desktop-sidebar-toggle').setAttribute('aria-label',UI.sidebarCollapsed?'Hiện thanh menu':'Ẩn thanh menu');return;}

    case 'explore-intro': window.LearningMaps?.exploreIntro($('#intro-screen'));return;
    case 'enter-home': case 'skip-intro': navigate('home'); return;
    case 'open-m1': case 'open-m1video': navigate('m1video'); return;
    case 'open-m1quiz': navigate('m1quiz'); return;
    case 'open-m2': navigate('m2'); return;
    case 'open-m3': navigate('m3'); return;
    case 'open-case': goCase(el.dataset.id); return;
    case 'start-chapter': goChapter(G[0]?.id); return;
    case 'open-chapter': goChapter(el.dataset.id); return;
    case 'chapter-prev': {const i=G.findIndex(x=>x.id===UI.chapter); if(i>0) goChapter(G[i-1].id); return;}
    case 'chapter-next':{const i=G.findIndex(x=>x.id===UI.chapter);if(i>=0&&i<G.length-1)goChapter(G[i+1].id);else navigate('m3');return;}
    case 'open-gitmind': openGitMind(); return;
    case 'read-next': {const i=C.module2Cases.findIndex(x=>x.id===UI.caseId);if(i>=0&&i<C.module2Cases.length-1)goCase(C.module2Cases[i+1].id);return;}
    case 'read-prev': {const i=C.module2Cases.findIndex(x=>x.id===UI.caseId);if(i>0)goCase(C.module2Cases[i-1].id);return;}
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
function openMedia(src,alt){const d=$('#media-dialog');if(!d)return;mediaOpener=document.activeElement;$('#media-image').src=src;$('#media-image').alt=alt||'';$('#media-title').textContent=alt||'Phóng to minh họa';if(typeof d.showModal==='function')d.showModal();else d.setAttribute('open','');document.body.classList.add('media-open');}
function closeMedia(){const d=$('#media-dialog'); if(d?.open){if(typeof d.close==='function') d.close(); else d.removeAttribute('open');} document.body.classList.remove('media-open'); mediaOpener?.focus(); mediaOpener=null;}
$('#map-dialog').addEventListener('click',e=>{const el=e.target.closest('[data-action]'); if(el) action(el.dataset.action,el)});
$('#map-dialog').addEventListener('close',()=>{document.body.classList.remove('map-open'); mapOpener?.focus(); mapOpener=null;});
$('#media-dialog').addEventListener('click',e=>{if(e.target.matches('#media-dialog')) closeMedia(); const el=e.target.closest('[data-global-action]'); if(el?.dataset.globalAction==='close-media') closeMedia();});
$('#media-dialog').addEventListener('close',()=>{document.body.classList.remove('media-open'); mediaOpener?.focus(); mediaOpener=null;});
$('#screen').addEventListener('click',e=>{const el=e.target.closest('[data-action]'); if(el&&!el.disabled) action(el.dataset.action,el);});
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
render();
})();
