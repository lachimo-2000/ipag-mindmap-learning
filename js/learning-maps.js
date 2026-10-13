/* IPA Group MindMap interactive canvases · v2.7 · no external dependencies */
(function(){
'use strict';
const E = value => String(value??'').replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
let overviewSession=null, caseSession=null, introCleanup=null;
function panZoom(host,world,opts={}){
  const viewport=host.querySelector('[data-map-viewport]');
  let scale=opts.scale||1,panX=0,panY=0,drag=null;
  const frame={width:opts.width||1300,height:opts.height||1050};
  const percent=host.querySelector('[data-map-percent]');
  function apply(smooth=false){world.style.transition=smooth?'transform .3s ease':'none';world.style.transform=`translate(${panX}px,${panY}px) scale(${scale})`;if(percent)percent.textContent=Math.round(scale*100)+'%';}
  function fit(smooth=false){const r=viewport.getBoundingClientRect();if(!r.width)return;scale=clamp(opts.fitWidthOnly?(r.width-38)/frame.width:Math.min((r.width-38)/frame.width,(r.height-34)/frame.height),opts.minScale||.42,opts.maxScale||1.4);panX=(r.width-frame.width*scale)/2;panY=opts.fitWidthOnly?24:(r.height-frame.height*scale)/2;apply(smooth);}
  function zoom(factor,x,y){const r=viewport.getBoundingClientRect();const px=(x??(r.left+r.width/2))-r.left,py=(y??(r.top+r.height/2))-r.top;const next=clamp(scale*factor,opts.minScale||.42,opts.maxScale||2.1);const wx=(px-panX)/scale,wy=(py-panY)/scale;panX=px-wx*next;panY=py-wy*next;scale=next;apply();}
  const wheel=e=>{if(e.ctrlKey||e.metaKey||opts.wheelZoom!==false){e.preventDefault();zoom(e.deltaY<0?1.12:1/1.12,e.clientX,e.clientY);}};
  const pointerDown=e=>{if(e.button!==0||e.target.closest('button,[draggable],a,input,select'))return;drag={x:e.clientX,y:e.clientY,panX,panY,id:e.pointerId};viewport.classList.add('is-panning');viewport.setPointerCapture(e.pointerId);};
  const pointerMove=e=>{if(!drag)return;panX=drag.panX+e.clientX-drag.x;panY=drag.panY+e.clientY-drag.y;apply();};
  const pointerUp=e=>{if(!drag)return;drag=null;viewport.classList.remove('is-panning');if(viewport.hasPointerCapture(e.pointerId))viewport.releasePointerCapture(e.pointerId);};
  viewport.addEventListener('wheel',wheel,{passive:false});viewport.addEventListener('pointerdown',pointerDown);viewport.addEventListener('pointermove',pointerMove);viewport.addEventListener('pointerup',pointerUp);viewport.addEventListener('pointercancel',pointerUp);
  function focus(wx,wy,s=scale,smooth=true){const r=viewport.getBoundingClientRect();scale=clamp(s,opts.minScale||.42,opts.maxScale||2.1);panX=r.width/2-wx*scale;panY=r.height/2-wy*scale;apply(smooth);}
  const tool=e=>{const t=e.target.closest('[data-map-control]');if(!t)return;switch(t.dataset.mapControl){case 'fit':fit(true);break;case 'in':zoom(1.2);break;case 'out':zoom(1/1.2);break;}};
  host.addEventListener('click',tool);
  let destroyed=false;const onResize=()=>{if(!destroyed)fit();};window.addEventListener('resize',onResize);
  return {fit,zoom,apply,focus,view:viewport,nudge(dx,dy){panX+=dx;panY+=dy;apply();},destroy(){destroyed=true;window.removeEventListener('resize',onResize);viewport.removeEventListener('wheel',wheel);viewport.removeEventListener('pointerdown',pointerDown);viewport.removeEventListener('pointermove',pointerMove);viewport.removeEventListener('pointerup',pointerUp);viewport.removeEventListener('pointercancel',pointerUp);host.removeEventListener('click',tool);}};
}
function overview(host,{items=[],title='MindMap',subtitle='',kind='cases',done={},onOpen=()=>{}}={}){
  if(overviewSession)overviewSession.destroy();if(!host)return;
  const count=items.length;
  // Root is always to the left; all first-level branches align to the right.
  const W=1500,H=860, root={x:265,y:420,w:270,h:110},branchX=880,detailX=1250;
  const ys=count===3?[215,420,625]:items.map((_,i)=>count===4?170+i*166:150+i*(570/Math.max(count-1,1)));
  let open={};
  host.innerHTML=`<div class="lm-overview"><div class="lm-map-tools"><div><strong>${kind==='cases'?`Tổng quan · ${count} case công việc`:'Hành trình học · 3 module'}</strong><small>Chọn dấu + để xem mô tả · Chọn ↗ để đi vào nội dung</small></div><div class="lm-zoom-tools"><button data-overview-expandall="1">Mở tất cả</button><button data-overview-collapseall="1">Thu gọn</button><button data-map-control="out" aria-label="Thu nhỏ">−</button><output data-map-percent>100%</output><button data-map-control="in" aria-label="Phóng to">+</button><button data-map-control="fit">Vừa khung</button></div></div><div class="lm-overview-viewport" data-map-viewport tabindex="0" aria-label="MindMap: các nhánh bên phải, kéo để di chuyển, cuộn để phóng to thu nhỏ"><div class="lm-overview-world" style="width:${W}px;height:${H}px"><svg class="lm-overview-paths" viewBox="0 0 ${W} ${H}" aria-hidden="true"><g class="lm-overview-trunk">${items.map((it,i)=>{const end=branchX-143,y=ys[i],start=root.x+root.w/2;return `<path d="M${start} ${root.y} C${start+185} ${root.y},${end-145} ${y},${end} ${y}" class="lm-branch-path p${i%6}"/>`;}).join('')}</g><g class="lm-overview-detail-paths"></g></svg><div class="lm-ov-root" style="left:${root.x}px;top:${root.y}px"><small>CHỦ ĐỀ TRUNG TÂM</small><strong>${E(title)}</strong><span>${E(subtitle)}</span></div>${items.map((it,i)=>`<div class="lm-ov-branch p${i%6}" style="left:${branchX}px;top:${ys[i]}px" data-ov-branch="${i}"><button class="lm-ov-expand" data-overview-expand="${i}" aria-label="Mở mô tả ${E(it.title)}" aria-expanded="false">+</button><div class="lm-ov-label"><small>${kind==='cases'?`CASE ${i+1}`:`MODULE ${i+1}`} ${done[it.id]?'· ✓ ĐÃ XONG':''}</small><strong>${E(it.title)}</strong></div><button class="lm-ov-go" data-overview-open="${E(it.id)}" aria-label="Vào ${E(it.title)}">↗</button></div>`).join('')}<div class="lm-overview-detail-nodes"></div></div></div><div class="lm-map-status" data-overview-status aria-live="polite">0/${count} nhóm đang mở</div></div>`;
  const detailLayer=host.querySelector('.lm-overview-detail-nodes');
  const detailPaths=host.querySelector('.lm-overview-detail-paths');
  function syncDetails(){
    detailPaths.innerHTML=items.map((it,i)=>open[i]?`<path d="M${branchX+142} ${ys[i]} C${branchX+214} ${ys[i]},${detailX-217} ${ys[i]},${detailX-160} ${ys[i]}" class="lm-leaf-path"/>`:'').join('');
    // Only details are updated: root and branch nodes remain in the DOM.
    detailLayer.innerHTML=items.map((it,i)=>open[i]?`<div class="lm-ov-detail p${i%6} lm-detail-arrival" style="left:${detailX}px;top:${ys[i]}px"><p>${E(it.desc||it.subtitle||'')}</p><button data-overview-open="${E(it.id)}">Khám phá →</button></div>`:'').join('');
    items.forEach((it,i)=>{const b=host.querySelector(`[data-overview-expand="${i}"]`);if(b){b.textContent=open[i]?'−':'+';b.setAttribute('aria-expanded',String(!!open[i]));b.setAttribute('aria-label',`${open[i]?'Thu gọn':'Mở'} mô tả ${it.title}`);}});
    host.querySelector('[data-overview-status]').textContent=`${Object.values(open).filter(Boolean).length}/${count} nhóm đang mở`;
  }
  const pan=panZoom(host,host.querySelector('.lm-overview-world'),{width:W,height:H,minScale:.19,maxScale:2.2,fitWidthOnly:true});
  requestAnimationFrame(()=>pan.fit());
  const click=e=>{const exp=e.target.closest('[data-overview-expand]');if(exp){const i=Number(exp.dataset.overviewExpand);open[i]=!open[i];syncDetails();return;}
    const go=e.target.closest('[data-overview-open]');if(go){onOpen(go.dataset.overviewOpen);return;}
    if(e.target.closest('[data-overview-expandall]')){items.forEach((_,i)=>open[i]=true);syncDetails();return;}
    if(e.target.closest('[data-overview-collapseall]')){open={};syncDetails();}
  };
  host.addEventListener('click',click);
  overviewSession={destroy(){host.removeEventListener('click',click);pan.destroy();}};
}
function mountCase(host,{stage,caseObj,state,selected,onSelect,onPlace,onCheck,onReset,onNext,onPrev,onFinish,stepIndex=0,stepCount=1,solved=false,checked=false}={}){
  if(caseSession)caseSession.destroy();if(!host)return;
  const isMulti=stage.type==='multi';
  const cards=isMulti?stage.options.map(x=>({text:x.text,correct:x.correct?'Cần thu thập':'Không cần thu thập',why:x.why})):stage.cards;
  const zones=isMulti?[{id:'Cần thu thập',label:'Bằng chứng cần thu thập',hint:'Cần để kiểm chứng giả thuyết'},{id:'Không cần thu thập',label:'Không cần thu thập',hint:'Không giúp kiểm chứng giả thuyết'}]:stage.zones;
  const placements=state.placements||(state.placements={});
  const nestedParent=caseObj.id==='project'?{'Truyền thông':'Nhóm công việc'}:{};
  const mainZones=zones.filter(z=>!nestedParent[z.id]);
  const mainGap=154, W=1460, rootX=155, mainX=495, childX=810, cardX1=875, cardX2=1165;
  const firstY=155;
  const zoneCoords={};
  mainZones.forEach((z,i)=>{zoneCoords[z.id]={x:mainX,y:firstY+i*mainGap};});
  zones.forEach(z=>{if(nestedParent[z.id]){const parent=zoneCoords[nestedParent[z.id]];zoneCoords[z.id]={x:childX,y:parent.y+205};}});
  const rootY=(firstY+(firstY+(mainZones.length-1)*mainGap))/2;
  const bottomY=Math.max(...Object.values(zoneCoords).map(z=>z.y));
  const H=Math.max(740,bottomY+210);
  const zoneDivs=zones.map((z,j)=>{const p=zoneCoords[z.id];return `<button type="button" class="lm-case-zone p${j%6}" data-zone="${E(z.id)}" data-drop-zone="${E(z.id)}" style="left:${p.x}px;top:${p.y}px;width:245px" title="Kết nối node vào ${E(z.label)}"><strong>${E(z.label.replace(/^↳\s*/,''))}</strong><small>${E(z.hint)}</small><span class="lm-zone-count" data-count-for="${E(z.id)}">0 node</span></button>`;}).join('');
  const nodeDivs=cards.map((c,i)=>`<button type="button" class="lm-free-node floating" data-card="${i}" aria-pressed="false" title="Giữ và kéo node tới nhánh; hoặc chọn node rồi chọn nhánh"><span class="lm-node-id">${String(i+1).padStart(2,'0')}</span><span>${E(c.text)}</span><span class="lm-node-result" aria-hidden="true"></span></button>`).join('');
  host.innerHTML=`<div class="lm-case-workspace"><div class="lm-case-toolbar"><div><strong>MindMap · ${E(caseObj.root)}</strong><small>Thả node từ khay bên phải vào nhánh · Giữ node và rê gần mép để di chuyển sơ đồ · Chọn node rồi chọn nhánh cũng được</small></div><div class="lm-zoom-tools"><button data-map-control="out" aria-label="Thu nhỏ">−</button><output data-map-percent>100%</output><button data-map-control="in" aria-label="Phóng to">+</button><button data-map-control="fit">Vừa khung</button><button class="lm-mobile-jump" data-case-nav="branches">Xem nhánh</button><button class="lm-mobile-jump" data-case-nav="bank">Xem thẻ</button></div></div><div class="lm-case-viewport" data-map-viewport tabindex="0" aria-label="Sơ đồ thực hành MindMap có các thẻ kéo thả ở khay bên phải"><div class="lm-case-world" style="height:${H}px;width:${W}px"><svg viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" class="lm-case-paths" aria-hidden="true"><g class="lm-case-main-paths"></g><g class="lm-case-node-paths"></g></svg><div class="lm-case-root" style="left:${rootX}px;top:${rootY}px"><span>CHỦ ĐỀ TRUNG TÂM</span><strong>${E(caseObj.root)}</strong></div>${zoneDivs}</div><section class="lm-node-dock" data-drop-zone="__bank__" aria-label="Các node chưa kết nối"><div class="lm-dock-head"><strong>NODE CHƯA KẾT NỐI</strong><small>Giữ và kéo qua trái đến nhánh</small></div><div class="lm-dock-items" data-dock-items>${nodeDivs}</div></section></div><div class="lm-case-actionbar"><div class="lm-stage-indicator" data-case-status></div><div class="lm-case-actions" data-case-actions></div></div><div class="lm-case-feedback" aria-live="polite"></div></div>`;
  const world=host.querySelector('.lm-case-world');const dock=host.querySelector('[data-dock-items]');const pan=panZoom(host,world,{width:W,height:H,minScale:.40,maxScale:2.4,fitWidthOnly:true});
  const mainPathGroup=host.querySelector('.lm-case-main-paths');
  const nodesPathGroup=host.querySelector('.lm-case-node-paths');
  const mainPaths=[];
  // Every main branch starts at the right edge of the central topic and fans out symmetrically.
  const fromX=rootX+114, toX=mainX-123, middleX=(fromX+toX)/2;
  mainZones.forEach(z=>{const p=zoneCoords[z.id];mainPaths.push(`<path class="lm-case-curve" d="M${fromX} ${rootY} C${middleX} ${rootY},${middleX} ${p.y},${toX} ${p.y}"/>`);});
  zones.filter(z=>nestedParent[z.id]).forEach(z=>{const p=zoneCoords[z.id],parent=zoneCoords[nestedParent[z.id]];const startX=parent.x+123,endX=p.x-123,midX=(startX+endX)/2;mainPaths.push(`<path class="lm-case-subcurve" d="M${startX} ${parent.y} C${midX} ${parent.y},${midX} ${p.y},${endX} ${p.y}"/>`);});
  mainPathGroup.innerHTML=mainPaths.join('');
  const nodeEls=cards.map((_,i)=>host.querySelector(`[data-card="${i}"]`));
  const zoneEls=zones.map(z=>host.querySelector(`[data-zone="${CSS.escape(z.id)}"]`));
  let selectedNow=selected;
  function refresh(next={}){
    if('selected'in next)selectedNow=next.selected;
    if('checked'in next)state.checked=!!next.checked;
    const currentChecked=!!state.checked;
    const currentSolved=cards.every((c,i)=>placements[i]===c.correct);
    const pathParts=[];
    zones.forEach((zone,j)=>{
      const zp=zoneCoords[zone.id];
      const assigned=cards.map((card,i)=>({card,i})).filter(({i})=>placements[i]===zone.id);
      const nested=!!nestedParent[zone.id];
      assigned.forEach(({i},idx)=>{
        const x=nested?1320:(idx%2===0?cardX1:cardX2);
        const y=zp.y+(Math.floor(idx/(nested?1:2))*83)-(assigned.length>2?32:0);
        const el=nodeEls[i];if(el.parentElement!==world)world.appendChild(el);el.style.left=x+'px';el.style.top=y+'px';
        el.classList.toggle('floating',false);el.classList.toggle('attached',true);
        el.classList.forEach(cls=>{if(/^p[0-5]$/.test(cls))el.classList.remove(cls);});el.classList.add('p'+j%6);
        const from=zp.x+124,to=x-133,control=(from+to)/2;
        pathParts.push(`<path class="lm-card-curve" d="M${from} ${zp.y} C${control} ${zp.y},${control} ${y},${to} ${y}"/>`);
      });
      zoneEls[j].querySelector('.lm-zone-count').textContent=assigned.length+' node';
      zoneEls[j].classList.toggle('can-connect',selectedNow!==null);
    });
    const floating=cards.map((card,i)=>({card,i})).filter(({i})=>!placements[i]);
    floating.forEach(({i})=>{const el=nodeEls[i];if(el.parentElement!==dock)dock.appendChild(el);el.style.removeProperty('left');el.style.removeProperty('top');el.classList.remove('attached');el.classList.add('floating');el.classList.forEach(cls=>{if(/^p[0-5]$/.test(cls))el.classList.remove(cls);});});
    host.querySelector('.lm-dock-head strong').textContent=`NODE CHƯA KẾT NỐI · ${floating.length}`;
    nodesPathGroup.innerHTML=pathParts.join('');
    cards.forEach((card,i)=>{
      const el=nodeEls[i],right=currentChecked&&placements[i]===card.correct,wrong=currentChecked&&placements[i]!==card.correct;
      el.classList.toggle('selected',selectedNow===i);el.setAttribute('aria-pressed',String(selectedNow===i));
      el.classList.toggle('correct',right);el.classList.toggle('incorrect',wrong);
      el.querySelector('.lm-node-result').textContent=right?'✓':wrong?'↻':'';
      el.title=right?'Đã đặt đúng nhánh':wrong?'Cần chuyển về: '+card.correct:placements[i]?'Kéo sang nhánh khác hoặc về Chưa kết nối':'Kéo đến một nhánh để kết nối';
    });
    host.querySelector('[data-case-status]').textContent=caseObj.title+' · '+(stepCount>1?`Bước ${stepIndex+1}/${stepCount}`:'Thực hành')+(selectedNow!==null?' · Đã chọn node '+(selectedNow+1):'');
    const available=cards.every((_,i)=>!!placements[i]);
    host.querySelector('[data-case-actions]').innerHTML=`${stepIndex>0?'<button data-case-cmd="prev" class="outline">← Bước trước</button>':''}<button data-case-cmd="reset" class="outline">Đặt lại</button><button data-case-cmd="check" class="primary" ${available?'':'disabled'}>Kiểm tra đáp án</button>${currentChecked&&currentSolved?`<button data-case-cmd="${stepIndex<stepCount-1?'next':'finish'}" class="primary journey-cta">${stepIndex<stepCount-1?'Tiếp tục bước tiếp theo →':'Hoàn thành case →'}</button>`:''}`;
    const incorrect=cards.map((card,i)=>({card,i})).filter(({card,i})=>placements[i]!==card.correct);
    const feedback=host.querySelector('.lm-case-feedback');
    if(!currentChecked){feedback.innerHTML='';return;}
    const n=cards.length-incorrect.length;
    feedback.innerHTML=`<section class="lm-case-review ${currentSolved?'is-success':''}" data-map-feedback><div class="lm-case-review-head"><strong>${currentSolved?'✓ Đã hoàn thành bước này':'Cần điều chỉnh một số node'}</strong><span>${n}/${cards.length} đúng</span></div>${currentSolved?`<p class="lm-case-review-good">Tất cả node đều được nối đúng nhánh. ${E(caseObj.summary)}</p>`:incorrect.map(({card,i})=>`<div class="lm-review-entry wrong"><strong>↻ ${E(card.text)}</strong><span><b>Bạn đặt:</b> ${E(placements[i]||'Chưa kết nối')} → <b>Gợi ý:</b> ${E(card.correct)}</span><p>${E(card.why)}</p></div>`).join('')}</section>`;
  }
  refresh({selected,checked});
  requestAnimationFrame(()=>{pan.focus(610,rootY,window.innerWidth<650?.59:.80,false);});
  const handleClick=e=>{if(ignoreClick){e.preventDefault();e.stopPropagation();return;}
    const jump=e.target.closest('[data-case-nav]');if(jump){if(jump.dataset.caseNav==='bank'){dock.closest('.lm-node-dock')?.classList.add('dock-emphasis');setTimeout(()=>dock.closest('.lm-node-dock')?.classList.remove('dock-emphasis'),800);}else pan.focus(570,rootY,window.innerWidth<650?.59:.8);return;}
    const cmd=e.target.closest('[data-case-cmd]');if(cmd){({check:onCheck,reset:onReset,next:onNext,prev:onPrev,finish:onFinish})[cmd.dataset.caseCmd]?.();return;}
    const item=e.target.closest('[data-card]');if(item){onSelect(Number(item.dataset.card));return;}
    const zone=e.target.closest('[data-zone]');if(zone&&selectedNow!==null){onPlace(selectedNow,zone.dataset.zone);return;}
  };
  // Pointer drag works with mouse, touch and pen; while held near an edge the canvas pans.
  let pointerDrag=null,ignoreClick=false,frameId=0;
  const dragStart=e=>{
    const node=e.target.closest('[data-card]');if(!node||e.button!==0)return;
    pointerDrag={i:Number(node.dataset.card),x:e.clientX,y:e.clientY,startX:e.clientX,startY:e.clientY,active:false,ghost:null};
    try{node.setPointerCapture(e.pointerId)}catch(_){}
  };
  const panEdge=()=>{
    if(!pointerDrag?.active)return;
    const d=pointerDrag;const bounds=pan.view.getBoundingClientRect();const dockBounds=host.querySelector('.lm-node-dock').getBoundingClientRect();
    const edge=62,left=bounds.left+edge,right=Math.min(bounds.right,dockBounds.left)-edge,top=bounds.top+edge,bottom=bounds.bottom-edge;
    if(d.x>=dockBounds.left-2){frameId=requestAnimationFrame(panEdge);return;}
    const dx=d.x<left?Math.min(19,(left-d.x)*.24):d.x>right?Math.max(-19,(right-d.x)*.24):0;
    const dy=d.y<top?Math.min(15,(top-d.y)*.20):d.y>bottom?Math.max(-15,(bottom-d.y)*.20):0;
    if((dx||dy) && d.x>=bounds.left && d.x<=bounds.right && d.y>=bounds.top && d.y<=bounds.bottom)pan.nudge(dx,dy);
    frameId=requestAnimationFrame(panEdge);
  };
  const dragMove=e=>{
    if(!pointerDrag)return;const d=pointerDrag;d.x=e.clientX;d.y=e.clientY;
    if(!d.active&&Math.hypot(d.x-d.startX,d.y-d.startY)>8){
      d.active=true;ignoreClick=true;
      d.ghost=nodeEls[d.i].cloneNode(true);d.ghost.classList.add('lm-drag-ghost');d.ghost.style.left=d.x+'px';d.ghost.style.top=d.y+'px';d.ghost.style.width='235px';document.body.appendChild(d.ghost);
      frameId=requestAnimationFrame(panEdge);
    }
    if(d.active){e.preventDefault();d.ghost.style.left=d.x+'px';d.ghost.style.top=d.y+'px';}
  };
  const dragStop=e=>{
    if(!pointerDrag)return;const d=pointerDrag;pointerDrag=null;cancelAnimationFrame(frameId);
    d.ghost?.remove();if(!d.active)return;
    const target=document.elementFromPoint(d.x,d.y)?.closest('[data-drop-zone],[data-zone],[data-card]');
    let zone=target?.dataset.dropZone||target?.dataset.zone;
    if(!zone&&target?.dataset.card!==undefined)zone=placements[Number(target.dataset.card)];
    if(zone)onPlace(d.i,zone);
    setTimeout(()=>{ignoreClick=false;},80);
  };
  host.addEventListener('click',handleClick);host.addEventListener('pointerdown',dragStart);host.addEventListener('pointermove',dragMove);host.addEventListener('pointerup',dragStop);host.addEventListener('pointercancel',dragStop);
  caseSession={refresh,destroy(){host.removeEventListener('click',handleClick);host.removeEventListener('pointerdown',dragStart);host.removeEventListener('pointermove',dragMove);host.removeEventListener('pointerup',dragStop);host.removeEventListener('pointercancel',dragStop);cancelAnimationFrame(frameId);pointerDrag?.ghost?.remove();pan.destroy();}};
}
function intro(host){
  if(introCleanup)introCleanup();if(!host)return;
  const reduce=window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  const timers=new Set(), intervals=new Set();let stopped=false;
  const wait=(fn,ms)=>{const t=setTimeout(()=>{timers.delete(t);if(!stopped)fn();},ms);timers.add(t);return t;};
  const clear=()=>{stopped=true;timers.forEach(clearTimeout);intervals.forEach(clearInterval);timers.clear();intervals.clear();};
  function typeText(el,str,next){
    if(!el)return next();
    if(reduce){el.textContent=str;next();return;}
    let i=0;el.classList.add('typing');const t=setInterval(()=>{
      if(stopped){clearInterval(t);return;}el.textContent=str.slice(0,++i);
      if(i>=str.length){clearInterval(t);intervals.delete(t);el.classList.remove('typing');wait(next,190);}
    },Math.max(25,Math.min(64,960/str.length)));intervals.add(t);
  }
  const headingA=host.querySelector('.intro-title'), headingB=host.querySelector('.intro-title-secondary');
  const lines=[['.intro-lead','Tư duy rõ ràng hơn.'],['.intro-line','Kết nối thông tin tốt hơn.'],['.intro-line-two','Biến thông tin thành một bức tranh có thể hành động.']];
  function showLines(i=0){if(i>=lines.length){wait(()=>host.querySelector('.intro-ready')?.classList.add('visible'),360);return;}
    const [selector,text]=lines[i],node=host.querySelector(selector);if(node){node.textContent=text;node.classList.add('line-reveal');}wait(()=>showLines(i+1),reduce?0:660);
  }
  typeText(headingA,'MindMap',()=>typeText(headingB,'Trong công việc.',()=>wait(()=>showLines(),200)));
  introCleanup=clear;
}
function exploreIntro(host,onComplete=()=>{}){
  if(!host||host.dataset.stage==='explore')return;
  if(introCleanup)introCleanup();introCleanup=null;
  host.dataset.stage='explore';
  const reduce=window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  const headline=host.querySelector('.intro-headline');
  const rect=headline.getBoundingClientRect();
  const map=host.querySelector('.intro-morph-map');
  map.hidden=false;
  // FLIP: reuse the actual title element, converting it into the central MindMap node.
  const target=host.querySelector('.intro-map-root-anchor').getBoundingClientRect();
  headline.classList.add('is-morphing');
  Object.assign(headline.style,{position:'fixed',left:rect.left+'px',top:rect.top+'px',width:rect.width+'px',height:rect.height+'px',margin:'0',transform:'none'});
  // Flush starting geometry before animating to the destination bounding box.
  void headline.offsetWidth;
  host.classList.add('is-exploring');
  const showNodes=()=>{
    host.querySelector('.intro-map-branches')?.classList.add('is-visible');
    const branches=[...host.querySelectorAll('.intro-map-branch')];
    const gap=reduce?0:430;
    branches.forEach((b,i)=>setTimeout(()=>b.classList.add('visible'),i*gap+180));
    setTimeout(()=>{host.querySelector('.intro-start')?.classList.add('visible');onComplete();},(branches.length-1)*gap+(reduce?40:930));
  };
  requestAnimationFrame(()=>requestAnimationFrame(()=>{
    Object.assign(headline.style,{left:target.left+'px',top:target.top+'px',width:target.width+'px',height:target.height+'px'});
    if(reduce)showNodes();else setTimeout(showNodes,940);
  }));
}
window.LearningMaps={overview,mountCase,refreshCase(next){caseSession?.refresh(next);},intro,exploreIntro,destroy(){if(overviewSession){overviewSession.destroy();overviewSession=null;}if(caseSession){caseSession.destroy();caseSession=null;}if(introCleanup){introCleanup();introCleanup=null;}}};
})();
