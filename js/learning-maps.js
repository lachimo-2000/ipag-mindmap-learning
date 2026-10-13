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
  const tool=e=>{const t=e.target.closest('[data-map-control]');if(!t)return;switch(t.dataset.mapControl){case 'fit':fit(true);break;case 'in':zoom(1.2);break;case 'out':zoom(1/1.2);break;}};
  host.addEventListener('click',tool);
  let destroyed=false;const onResize=()=>{if(!destroyed)fit();};window.addEventListener('resize',onResize);
  return {fit,zoom,apply,view:viewport,destroy(){destroyed=true;window.removeEventListener('resize',onResize);viewport.removeEventListener('wheel',wheel);viewport.removeEventListener('pointerdown',pointerDown);viewport.removeEventListener('pointermove',pointerMove);viewport.removeEventListener('pointerup',pointerUp);viewport.removeEventListener('pointercancel',pointerUp);host.removeEventListener('click',tool);}};
}
function overview(host,{items=[],title='MindMap',subtitle='',kind='cases',done={},onOpen=()=>{}}={}){
  if(overviewSession)overviewSession.destroy();if(!host)return;
  let open={};let view=null;
  const worldW=1320,baseH=860;
  function draw(){
    const nodes=[],edges=[];const root={x:660,y:430,w:260,h:105};nodes.push({...root,kind:'root'});
    items.forEach((it,i)=>{
      const side=i%2===0?'left':'right',order=Math.floor(i/2),x=side==='left'?270:1060,y=175+order*260;
      const n={x,y,w:280,h:85,it,i,side};nodes.push({...n,kind:'branch'});
      const dir=side==='left'?-1:1;const sx=root.x+dir*root.w/2,ex=x-dir*n.w/2;
      edges.push(`<path d="M${sx} ${root.y} C${sx+dir*88} ${root.y},${ex-dir*88} ${y},${ex} ${y}" class="lm-branch-path p${i%6}"/>`);
      if(open[i]){
        const cx=side==='left'?270:1060,cy=y+104;
        edges.push(`<path d="M${x} ${y+43} Q${x+dir*80} ${y+78} ${cx} ${cy-22}" class="lm-leaf-path"/>`);
        nodes.push({kind:'detail',x:cx,y:cy,w:315,h:80,it,i});
      }
    });
    host.querySelector('.lm-overview-world').innerHTML=`<svg class="lm-overview-paths" viewBox="0 0 ${worldW} ${baseH}" aria-hidden="true">${edges.join('')}</svg>${nodes.map(n=>{
      if(n.kind==='root')return `<div class="lm-ov-root" style="left:${n.x}px;top:${n.y}px"><small>CHỦ ĐỀ TRUNG TÂM</small><strong>${E(title)}</strong><span>${E(subtitle)}</span></div>`;
      const a=n.it,finished=!!done[a.id];
      if(n.kind==='branch')return `<div class="lm-ov-branch p${n.i%6}" style="left:${n.x}px;top:${n.y}px"><button class="lm-ov-expand" data-overview-expand="${n.i}" aria-label="${open[n.i]?'Thu gọn':'Mở'} mô tả ${E(a.title)}" aria-expanded="${!!open[n.i]}">${open[n.i]?'−':'+'}</button><div class="lm-ov-label"><small>${kind==='cases'?`CASE ${n.i+1}`:`MODULE ${n.i+1}`} ${finished?'· ✓ ĐÃ XONG':''}</small><strong>${E(a.title)}</strong></div><button class="lm-ov-go" data-overview-open="${E(a.id)}" title="Mở ${E(a.title)}">↗</button></div>`;
      return `<div class="lm-ov-detail p${n.i%6}" style="left:${n.x}px;top:${n.y}px"><p>${E(a.desc||a.subtitle||'')}</p><button data-overview-open="${E(a.id)}">Khám phá →</button></div>`;
    }).join('')}`;
    host.querySelector('[data-overview-status]').textContent=`${Object.values(open).filter(Boolean).length}/${items.length} nhóm đang mở`;
  }
  host.innerHTML=`<div class="lm-overview"><div class="lm-map-tools"><div><strong>${kind==='cases'?'Tổng quan · 5 case công việc':'Hành trình học · 3 module'}</strong><small>Chọn dấu + để xem mô tả · Chọn ↗ để đi vào nội dung</small></div><div class="lm-zoom-tools"><button data-overview-expandall="1">Mở tất cả</button><button data-overview-collapseall="1">Thu gọn</button><button data-map-control="out" aria-label="Thu nhỏ">−</button><output data-map-percent>100%</output><button data-map-control="in" aria-label="Phóng to">+</button><button data-map-control="fit">Vừa khung</button></div></div><div class="lm-overview-viewport" data-map-viewport tabindex="0" aria-label="Sơ đồ mindmap có thể kéo để di chuyển, cuộn chuột để phóng to và thu nhỏ"><div class="lm-overview-world"></div></div><div class="lm-map-status" data-overview-status aria-live="polite"></div></div>`;
  draw();view=panZoom(host,host.querySelector('.lm-overview-world'),{width:worldW,height:baseH,minScale:.37,maxScale:2.2,fitWidthOnly:true});requestAnimationFrame(()=>view.fit());
  const click=e=>{const expansion=e.target.closest('[data-overview-expand]');if(expansion){const i=Number(expansion.dataset.overviewExpand);open[i]=!open[i];draw();return;}const go=e.target.closest('[data-overview-open]');if(go){onOpen(go.dataset.overviewOpen);return;}if(e.target.closest('[data-overview-expandall]')){items.forEach((_,i)=>open[i]=true);draw();return;}if(e.target.closest('[data-overview-collapseall]')){open={};draw();}};
  host.addEventListener('click',click);overviewSession={destroy(){host.removeEventListener('click',click);view.destroy();}};
}
function mountCase(host,{stage,caseObj,state,selected,onSelect,onPlace,onCheck,onReset,onNext,onPrev,onFinish,stepIndex=0,stepCount=1,solved=false,checked=false}={}){
  if(caseSession)caseSession.destroy();if(!host)return;
  const isMulti=stage.type==='multi';const cards=isMulti?stage.options.map(x=>({text:x.text,correct:x.correct?'Cần thu thập':'Không cần thu thập',why:x.why})):stage.cards;
  const zones=isMulti?[{id:'Cần thu thập',label:'Bằng chứng cần thu thập',hint:'Cần để kiểm chứng giả thuyết'},{id:'Không cần thu thập',label:'Không cần thu thập',hint:'Không giúp kiểm chứng giả thuyết'}]:stage.zones;
  let placements=isMulti?(state.placements||{}):(state.placements||{});
  const W=1400,branchY=265,zoneWidth=210,cardWidth=210;
  const xs=zones.length===2?[470,930]:zones.length===3?[290,700,1110]:zones.length===4?[230,545,860,1175]:[155,425,700,975,1245];
  const counts=zones.map(z=>cards.filter((_,i)=>placements[i]===z.id).length);
  const nestedParent=caseObj.id==='project'?{'Truyền thông':'Nhóm công việc'}:caseObj.id==='picture'?{'Chi tiết để tra cứu':'Tổng quan'}:{};
  const zoneYs=zones.map(z=>nestedParent[z.id]?branchY+120:branchY);
  const maxAttachments=Math.max(0,...counts);
  const freeStartY=Math.max(...zoneYs)+152+maxAttachments*103;
  const floating=cards.map((card,i)=>({card,i})).filter(x=>!placements[x.i]);
  const freeRows=Math.ceil(Math.max(1,floating.length)/4),H=Math.max(840,freeStartY+120+freeRows*118);
  const centerX=700,centerY=80;
  const visibleNodes=[],paths=[];
  zones.forEach((z,j)=>{
    const x=xs[j],zy=zoneYs[j],dir=x<centerX?-1:1, startX=centerX+(x<centerX?-112:112),endX=x-(x<centerX?-1:1)*(zoneWidth/2);
    const parentIndex=zones.findIndex(parent=>parent.id===nestedParent[z.id]);
    if(parentIndex>=0){const px=xs[parentIndex],py=zoneYs[parentIndex],pd=x>px?1:-1;paths.push(`<path class="lm-case-curve p${j%6}" d="M${px+pd*zoneWidth/2} ${py} C${px+pd*135} ${py},${x-pd*150} ${zy},${x-pd*zoneWidth/2} ${zy}"/>`);}
    else paths.push(`<path class="lm-case-curve p${j%6}" d="M${startX} ${centerY+28} C${startX+dir*135} ${centerY+120},${endX-dir*65} ${zy-65},${endX} ${zy}"/>`);
    cards.forEach((card,i)=>{if(placements[i]!==z.id)return;const prev=cards.slice(0,i).filter((c,k)=>placements[k]===z.id).length; const cy=zy+110+prev*103;
      paths.push(`<path class="lm-card-curve p${j%6}" d="M${x} ${zy+39} C${x} ${zy+72},${x} ${cy-36},${x} ${cy-32}"/>`);
      visibleNodes.push({card,i,x,y:cy,branch:j,assigned:true});
    });
  });
  floating.forEach(({card,i},j)=>visibleNodes.push({card,i,x:235+j%4*310,y:freeStartY+91+Math.floor(j/4)*118,branch:-1,assigned:false}));
  const available=cards.every((_,i)=>placements[i]);
  const feedback=checked?`<div class="lm-case-review" data-map-feedback><div class="lm-case-review-head"><strong>${solved?'✓ Đã sắp xếp phù hợp':'Cần điều chỉnh một số node'}</strong><span>${cards.filter((c,i)=>placements[i]===c.correct).length}/${cards.length} đúng</span></div>${cards.map((c,i)=>`<div class="lm-review-entry ${placements[i]===c.correct?'right':'wrong'}"><strong>${placements[i]===c.correct?'✓':'↻'} ${E(c.text)}</strong><span><b>Bạn đặt:</b> ${E(placements[i]||'Chưa kết nối')} → <b>Gợi ý:</b> ${E(c.correct)}</span><p>${E(c.why)}</p></div>`).join('')}</div>`:'';
  host.innerHTML=`<div class="lm-case-workspace"><div class="lm-case-toolbar"><div><strong>MindMap · ${E(caseObj.root)}</strong><small>Kéo node tự do đến nhánh · Hoặc chọn node rồi chọn nhánh · Kéo về vùng “Chưa kết nối” để sửa</small></div><div class="lm-zoom-tools"><button data-map-control="out" aria-label="Thu nhỏ">−</button><output data-map-percent>100%</output><button data-map-control="in" aria-label="Phóng to">+</button><button data-map-control="fit">Vừa khung</button></div></div><div class="lm-case-viewport" data-map-viewport tabindex="0" aria-label="Sơ đồ thực hành: kéo thả node vào các nhánh và bấm Kiểm tra đáp án"><div class="lm-case-world" style="height:${H}px;width:${W}px"><svg viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" class="lm-case-paths" aria-hidden="true">${paths.join('')}</svg><div class="lm-case-root" style="left:${centerX}px;top:${centerY}px"><span>CHỦ ĐỀ TRUNG TÂM</span><strong>${E(caseObj.root)}</strong></div>${zones.map((z,j)=>`<button class="lm-case-zone p${j%6} ${selected!==null?'can-connect':''}" data-zone="${E(z.id)}" data-drop-zone="${E(z.id)}" style="left:${xs[j]}px;top:${zoneYs[j]}px;width:${zoneWidth}px" title="Kết nối node vào ${E(z.label)}"><strong>${E(z.label.replace(/^↳\s*/,''))}</strong><small>${E(z.hint)}</small><span class="lm-zone-count">${counts[j]} node</span></button>`).join('')}${visibleNodes.map(n=>`<button type="button" draggable="true" class="lm-free-node ${n.assigned?`attached p${n.branch%6}`:'floating'} ${selected===n.i?'selected':''} ${checked?(placements[n.i]===n.card.correct?'correct':'incorrect'):''}" data-card="${n.i}" style="left:${n.x}px;top:${n.y}px;width:${cardWidth}px" aria-pressed="${selected===n.i}" title="${n.assigned?'Kéo sang nhánh khác hoặc chọn node rồi chọn nhánh':'Kéo đến một nhánh để kết nối'}"><span class="lm-node-id">${String(n.i+1).padStart(2,'0')}</span><span>${E(n.card.text)}</span></button>`).join('')}<div class="lm-free-label" style="top:${freeStartY+22}px">CÁC NODE CHƯA KẾT NỐI · KÉO NODE LÊN NHÁNH</div><div class="lm-free-drop" data-drop-zone="__bank__" style="top:${freeStartY+52}px;height:${105+freeRows*118}px" aria-label="Kéo node về vùng chưa kết nối để gỡ liên kết"></div></div></div><div class="lm-case-actionbar"><div class="lm-stage-indicator">${E(caseObj.title)} · ${stepCount>1?`Bước ${stepIndex+1}/${stepCount}`:'Thực hành'} ${selected!==null?'· Đã chọn node '+(selected+1):''}</div><div class="lm-case-actions">${stepIndex>0?'<button data-case-cmd="prev" class="outline">← Bước trước</button>':''}<button data-case-cmd="reset" class="outline">Đặt lại</button><button data-case-cmd="check" class="primary" ${available?'':'disabled'}>Kiểm tra đáp án</button>${checked&&solved?`<button data-case-cmd="${stepIndex<stepCount-1?'next':'finish'}" class="primary">${stepIndex<stepCount-1?'Tiếp tục bước tiếp theo →':'Hoàn thành case →'}</button>`:''}</div></div>${feedback}${checked&&solved?`<div class="lm-summary"><strong>Điểm chốt từ An & Bình</strong><p>${E(caseObj.summary)}</p></div>`:''}</div>`;
  const world=host.querySelector('.lm-case-world');const pan=panZoom(host,world,{width:W,height:H,minScale:.44,maxScale:2.4,fitWidthOnly:true});
  requestAnimationFrame(()=>{
    if(window.innerWidth<850){const r=pan.view.getBoundingClientRect(); pan.fit();}
    else pan.fit();
  });
  const handleClick=e=>{
    const cmd=e.target.closest('[data-case-cmd]');if(cmd){const a=cmd.dataset.caseCmd;({check:onCheck,reset:onReset,next:onNext,prev:onPrev,finish:onFinish})[a]?.();return;}
    const item=e.target.closest('[data-card]');if(item){onSelect(Number(item.dataset.card));return;}
    const zone=e.target.closest('[data-zone]');if(zone){if(selected===null)return;onPlace(selected,zone.dataset.zone);return;}
  };
  let dragged=null;
  const dragStart=e=>{const node=e.target.closest('[data-card]');if(!node)return;dragged=Number(node.dataset.card);e.dataTransfer?.setData('text/plain',`lm-card:${dragged}`);e.dataTransfer.effectAllowed='move';};
  const dragOver=e=>{const zone=e.target.closest('[data-drop-zone]');if(!zone)return;e.preventDefault();zone.classList.add('drop-focus');};
  const dragLeave=e=>{const zone=e.target.closest('[data-drop-zone]');if(zone&&!zone.contains(e.relatedTarget))zone.classList.remove('drop-focus');};
  const drop=e=>{const zone=e.target.closest('[data-drop-zone]');if(!zone)return;e.preventDefault();zone.classList.remove('drop-focus');const text=e.dataTransfer?.getData('text/plain')||'';const i=text.startsWith('lm-card:')?Number(text.slice(8)):dragged;if(Number.isInteger(i))onPlace(i,zone.dataset.dropZone);dragged=null;};
  host.addEventListener('click',handleClick);host.addEventListener('dragstart',dragStart);host.addEventListener('dragover',dragOver);host.addEventListener('dragleave',dragLeave);host.addEventListener('drop',drop);
  caseSession={destroy(){host.removeEventListener('click',handleClick);host.removeEventListener('dragstart',dragStart);host.removeEventListener('dragover',dragOver);host.removeEventListener('dragleave',dragLeave);host.removeEventListener('drop',drop);pan.destroy();}};
}
function intro(host){if(introCleanup)introCleanup();if(!host)return;
  const lines=[['.intro-title','MindMap'],['.intro-title-secondary','Trong công việc.'],['.intro-lead','Tư duy rõ ràng hơn.'],['.intro-line','Kết nối thông tin tốt hơn.'],['.intro-line-two','Biến thông tin thành một bức tranh có thể hành động.']];
  const reduce=window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  const timers=[];let stopped=false;
  function play(i){if(stopped)return;if(i===lines.length){const b=host.querySelector('.intro-ready');if(b)b.classList.add('visible');return;}
    const [selector,text]=lines[i],el=host.querySelector(selector);if(!el)return;el.classList.add('typing');if(reduce){el.textContent=text;play(i+1);return;}
    let j=0;const handle=window.setInterval(()=>{if(stopped){clearInterval(handle);return;}el.textContent=text.slice(0,++j);if(j>=text.length){clearInterval(handle);el.classList.remove('typing');timers.push(setTimeout(()=>play(i+1),i<2?240:320));}},Math.max(28,Math.min(62,1300/text.length)));timers.push(handle);
  }
  play(0);introCleanup=()=>{stopped=true;timers.forEach(clearTimeout);timers.forEach(clearInterval);};
}
window.LearningMaps={overview,mountCase,intro,destroy(){if(overviewSession){overviewSession.destroy();overviewSession=null;}if(caseSession){caseSession.destroy();caseSession=null;}if(introCleanup){introCleanup();introCleanup=null;}}};
})();
