/* Module 3 overview — Vanilla JS, interactive pan/zoom/collapse mind map.
   All colors come from the IPA Group brand palette via CSS variables.
   No external mapping package or CDN required. */
(function(){
'use strict';
const STRUCTURE = [
  {name:'Bắt đầu & quản lý',from:0,to:4,side:'left'},
  {name:'Tạo & chỉnh node',from:4,to:6,side:'left'},
  {name:'Bố cục & định dạng',from:6,to:10,side:'left'},
  {name:'Chèn & kết nối',from:10,to:15,side:'right'},
  {name:'Trao đổi & trình bày',from:15,to:19,side:'right'},
  {name:'Chia sẻ & xuất file',from:19,to:22,side:'right'}
];
const WORLD={w:1800,h:1400,centerX:900,centerY:700};
let session=null;
const escapeHtml=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const bounded=(x,min,max)=>Math.max(min,Math.min(max,x));
function createLayout(collapsed,items){
  const groups=STRUCTURE.map((g,i)=>({...g,index:i,open:!collapsed[i],items:items.slice(g.from,g.to)}));
  const nodes=[{id:'root',kind:'root',label:'Học GitMind',x:WORLD.centerX,y:WORLD.centerY,w:255,h:98}];
  const edges=[];
  const groupX=(side)=>side==='left'?520:1280;
  const leafX=(side)=>side==='left'?190:1610;
  for(const side of ['left','right']){
    const list=groups.filter(x=>x.side===side);
    const heights=list.map(g=>g.open?Math.max(74,g.items.length*77):76);
    const total=heights.reduce((a,b)=>a+b,0)+(list.length-1)*52;
    let top=WORLD.centerY-total/2;
    for(let index=0;index<list.length;index++){
      const g=list[index], height=heights[index];
      const y=top+height/2;top+=height+52;
      const node={id:`group-${g.index}`,kind:'group',group:g.index,label:g.name,count:g.items.length,open:g.open,x:groupX(side),y,w:262,h:74,side};
      nodes.push(node);edges.push({a:'root',b:node.id,side,kind:'main'});
      if(g.open){const n=g.items.length;g.items.forEach((lesson,j)=>{
        const child={id:`lesson-${lesson.id}`,kind:'lesson',label:lesson.title,subtitle:`3.${g.from+j+1}`,lessonId:lesson.id,x:leafX(side),y:y+(j-(n-1)/2)*77,w:300,h:66,side};
        nodes.push(child);edges.push({a:node.id,b:child.id,side,kind:'detail'});
      });}
    }
  }
  const bound={x1:Infinity,y1:Infinity,x2:-Infinity,y2:-Infinity};
  nodes.forEach(n=>{bound.x1=Math.min(bound.x1,n.x-n.w/2);bound.x2=Math.max(bound.x2,n.x+n.w/2);bound.y1=Math.min(bound.y1,n.y-n.h/2);bound.y2=Math.max(bound.y2,n.y+n.h/2)});
  return {nodes,edges,bound,groups};
}
function makeCurve(a,b,side){
  const dir=side==='left'?-1:1;
  const startX=a.x+dir*a.w/2,endX=b.x-dir*b.w/2;
  const span=endX-startX;
  const bend=Math.max(35,Math.abs(span)*.5)*dir;
  return `M ${startX} ${a.y} C ${startX+bend} ${a.y}, ${endX-bend} ${b.y}, ${endX} ${b.y}`;
}
function renderWorld(s){
  s.layout=createLayout(s.collapsed,s.items);
  const byId=new Map(s.layout.nodes.map(n=>[n.id,n]));
  const paths=s.layout.edges.map(e=>`<path class="gm-edge ${e.kind}" d="${makeCurve(byId.get(e.a),byId.get(e.b),e.side)}"/>`).join('');
  const nodes=s.layout.nodes.map(n=>{
    if(n.kind==='root')return `<div class="gm-branch-node gm-root" style="left:${n.x}px;top:${n.y}px;width:${n.w}px" aria-label="Chủ đề trung tâm: Học GitMind"><span class="gm-root-icon" aria-hidden="true">✧</span><strong>Học GitMind</strong><small>22 bài · 6 nhóm</small></div>`;
    if(n.kind==='group')return `<button type="button" class="gm-branch-node gm-group ${n.open?'expanded':''}" data-map-group="${n.group}" aria-expanded="${n.open}" style="left:${n.x}px;top:${n.y}px;width:${n.w}px" aria-label="${n.open?'Thu gọn':'Mở rộng'} nhóm ${escapeHtml(n.label)}, ${n.count} bài"><span class="gm-group-label">${escapeHtml(n.label)}</span><span class="gm-group-meta">${n.count} bài <span class="gm-group-icon">${n.open?'−':'+'}</span></span></button>`;
    const completed=!!s.done[n.lessonId];
    return `<button type="button" class="gm-branch-node gm-lesson ${completed?'read':''}" data-map-lesson="${escapeHtml(n.lessonId)}" style="left:${n.x}px;top:${n.y}px;width:${n.w}px" aria-label="Mở bài ${escapeHtml(n.subtitle)}: ${escapeHtml(n.label)}"><span class="gm-lesson-number">${escapeHtml(n.subtitle)}</span><span class="gm-lesson-title">${escapeHtml(n.label)}</span>${completed?'<span class="gm-lesson-done" aria-label="Đã xem">✓</span>':''}</button>`;
  }).join('');
  s.world.innerHTML=`<svg class="gm-mindmap-edges" width="${WORLD.w}" height="${WORLD.h}" viewBox="0 0 ${WORLD.w} ${WORLD.h}" aria-hidden="true">${paths}</svg>${nodes}`;
  const open=s.layout.groups.filter(g=>g.open).length;
  s.status.textContent=`${open}/6 nhóm đang mở · ${s.layout.nodes.filter(n=>n.kind==='lesson').length}/22 bài đang hiện`;
}
function applyTransform(s,animate=false){
  if(animate)s.world.style.transition='transform .25s ease';else s.world.style.transition='none';
  s.world.style.transform=`translate(${s.panX}px, ${s.panY}px) scale(${s.scale})`;
  s.percent.textContent=`${Math.round(s.scale*100)}%`;
}
function fit(s,animate=false,forceFull=false){
  const r=s.viewport.getBoundingClientRect(); if(!r.width||!r.height)return;
  if(r.width<640&&!forceFull){
    // On narrow screens a full-map fit would make the letters unreadable.
    // Start at a legible scale and let learners pan to the side branches.
    const g=s.layout.groups.find(x=>x.index===s.focusGroup);
    const focusX=g ? (g.side==='left'?520:1280) : WORLD.centerX;
    const focusY=g ? s.layout.nodes.find(x=>x.id===`group-${g.index}`)?.y||WORLD.centerY : WORLD.centerY;
    s.scale=.79;s.panX=r.width/2-focusX*s.scale;s.panY=r.height/2-focusY*s.scale;
    applyTransform(s,animate);return;
  }
  const b=s.layout.bound;
  const width=b.x2-b.x1+130,height=b.y2-b.y1+115;
  const scale=bounded(Math.min(r.width/width,r.height/height),.37,1.23);
  s.scale=scale;
  s.panX=r.width/2-((b.x1+b.x2)/2)*scale;
  s.panY=r.height/2-((b.y1+b.y2)/2)*scale;
  applyTransform(s,animate);
}
function zoom(s,factor,clientX,clientY){
  const rect=s.viewport.getBoundingClientRect();
  const pX=clientX-rect.left,pY=clientY-rect.top;
  const newScale=bounded(s.scale*factor,.35,2.25);
  const wX=(pX-s.panX)/s.scale,wY=(pY-s.panY)/s.scale;
  s.panX=pX-wX*newScale;s.panY=pY-wY*newScale;s.scale=newScale;
  applyTransform(s);
}
function mount(host,options){
  if(session)destroy();
  if(!host)return;
  const source=Array.isArray(options?.items)?options.items:[];
  const s={host,items:source,done:options?.done||{},onOpen:options?.onOpen||(()=>{}),collapsed:[true,true,true,true,true,true],focusGroup:window.innerWidth<640?0:null,scale:1,panX:0,panY:0,drag:null};
  host.innerHTML=`<section class="gm-overview" aria-label="Sơ đồ nội dung Module 3"><div class="gm-map-toolbar"><div class="gm-map-intro"><strong>MindMap nội dung GitMind</strong><span>Chọn nhánh để mở/thu gọn · Bấm vào bài để xem hướng dẫn</span></div><div class="gm-map-actions"><select class="gm-group-picker" data-map-picker aria-label="Chọn nhóm bài học"><option value="">Chọn nhóm cần xem…</option>${STRUCTURE.map(g=>`<option value="${STRUCTURE.indexOf(g)}">${escapeHtml(g.name)}</option>`).join('')}</select><button data-map-tool="collapse" title="Thu gọn tất cả nhánh">Thu gọn</button><button data-map-tool="expand" title="Mở tất cả nhánh">Mở tất cả</button><span class="gm-map-separator"></span><button data-map-tool="out" aria-label="Thu nhỏ">−</button><output class="gm-map-percent" aria-label="Tỷ lệ phóng to">100%</output><button data-map-tool="in" aria-label="Phóng to">+</button><button data-map-tool="fit" title="Căn vừa sơ đồ">Vừa khung</button></div></div><div class="gm-map-viewport" tabindex="0" role="region" aria-label="Mindmap GitMind. Dùng con lăn chuột để phóng to, kéo vùng trống để di chuyển, bấm các nhóm để thu gọn hoặc mở rộng"><div class="gm-map-world"></div></div><footer class="gm-map-footer"><span class="gm-map-status" aria-live="polite"></span><span>Cuộn chuột: zoom · Kéo nền trống: di chuyển</span></footer></section>`;
  s.viewport=host.querySelector('.gm-map-viewport');s.world=host.querySelector('.gm-map-world');s.status=host.querySelector('.gm-map-status');s.percent=host.querySelector('.gm-map-percent');
  const onClick=e=>{
    const group=e.target.closest('[data-map-group]');
    if(group){const i=Number(group.dataset.mapGroup);s.collapsed[i]=!s.collapsed[i];s.focusGroup=s.collapsed[i]?null:i;renderWorld(s);fit(s,true);return;}
    const lesson=e.target.closest('[data-map-lesson]');
    if(lesson){s.onOpen(lesson.dataset.mapLesson);return;}
    const tool=e.target.closest('[data-map-tool]');if(!tool)return;
    switch(tool.dataset.mapTool){
      case 'expand':s.collapsed.fill(false);s.focusGroup=null;renderWorld(s);fit(s,true);break;
      case 'collapse':s.collapsed.fill(true);s.focusGroup=null;renderWorld(s);fit(s,true);break;
      case 'fit':fit(s,true,true);break;
      case 'in':{const r=s.viewport.getBoundingClientRect();zoom(s,1.2,r.left+r.width/2,r.top+r.height/2);break;}
      case 'out':{const r=s.viewport.getBoundingClientRect();zoom(s,1/1.2,r.left+r.width/2,r.top+r.height/2);break;}
    }
  };
  const onChange=e=>{if(!e.target.matches('[data-map-picker]'))return;const value=e.target.value;if(value==='')return;const i=Number(value);s.collapsed[i]=false;s.focusGroup=i;renderWorld(s);fit(s,true);};
  const onWheel=e=>{e.preventDefault();zoom(s,e.deltaY<0?1.095:1/1.095,e.clientX,e.clientY)};
  const onPointerDown=e=>{if(e.button!==0||e.target.closest('button'))return;s.drag={x:e.clientX,y:e.clientY,panX:s.panX,panY:s.panY,id:e.pointerId};s.viewport.classList.add('panning');s.viewport.setPointerCapture(e.pointerId);};
  const onPointerMove=e=>{if(!s.drag)return;s.panX=s.drag.panX+e.clientX-s.drag.x;s.panY=s.drag.panY+e.clientY-s.drag.y;applyTransform(s)};
  const onPointerUp=e=>{if(!s.drag)return;s.drag=null;s.viewport.classList.remove('panning');if(s.viewport.hasPointerCapture(e.pointerId))s.viewport.releasePointerCapture(e.pointerId);};
  const onKey=e=>{if(e.target.closest('button'))return;const r=s.viewport.getBoundingClientRect();const x=r.left+r.width/2,y=r.top+r.height/2;if(e.key==='+'||e.key==='='){e.preventDefault();zoom(s,1.2,x,y);}else if(e.key==='-'){e.preventDefault();zoom(s,1/1.2,x,y);}else if(e.key==='0'){e.preventDefault();fit(s,true);}else if(e.key.startsWith('Arrow')){e.preventDefault();s.panX+=(e.key==='ArrowLeft'?30:e.key==='ArrowRight'?-30:0);s.panY+=(e.key==='ArrowUp'?30:e.key==='ArrowDown'?-30:0);applyTransform(s);}};
  host.addEventListener('click',onClick);
  host.addEventListener('change',onChange);
  s.viewport.addEventListener('wheel',onWheel,{passive:false});
  s.viewport.addEventListener('pointerdown',onPointerDown);
  s.viewport.addEventListener('pointermove',onPointerMove);
  s.viewport.addEventListener('pointerup',onPointerUp);
  s.viewport.addEventListener('pointercancel',onPointerUp);
  s.viewport.addEventListener('keydown',onKey);
  s.destroy=()=>{host.removeEventListener('click',onClick);host.removeEventListener('change',onChange);s.viewport.removeEventListener('wheel',onWheel);s.viewport.removeEventListener('pointerdown',onPointerDown);s.viewport.removeEventListener('pointermove',onPointerMove);s.viewport.removeEventListener('pointerup',onPointerUp);s.viewport.removeEventListener('pointercancel',onPointerUp);s.viewport.removeEventListener('keydown',onKey);s.resize?.disconnect();};
  session=s; renderWorld(s);
  s.resize=new ResizeObserver(()=>{if(session===s&&!s.drag)fit(s)});s.resize.observe(s.viewport);
  fit(s);
}
function destroy(){if(session){session.destroy?.();session=null;}}
window.GitMindOverview={mount,destroy};
})();
