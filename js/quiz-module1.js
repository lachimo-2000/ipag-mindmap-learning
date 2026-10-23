/* IPA Group | Quiz Module 1 v2.2
   Five distinct interactive formats. Data/feedback maintained separately from the app router.
   No backend is used; all local progress is persisted by app.js. */
(function(){'use strict';
const defs={
  q1:[
    ['Thông tin được tổ chức quanh một chủ đề trung tâm.',true,'Một chủ đề trung tâm giúp xác định phạm vi và mục đích của sơ đồ.'],
    ['Các nhánh tỏa ra giúp thể hiện nhóm ý và chi tiết.',true,'Nhánh chính và nhánh con giúp phân nhóm thông tin từ tổng quát đến cụ thể.'],
    ['Cách sắp xếp và kết nối giúp nhìn rõ mối liên hệ giữa các ý.',true,'Ý nghĩa của mối quan hệ quan trọng hơn số lượng đường nối.'],
    ['Phải chép nguyên văn tất cả thông tin.',false,'MindMap ưu tiên chọn lọc, nhóm và diễn đạt các ý đủ nghĩa, không phải bản chép lời.'],
    ['Mọi tình huống đều dùng cùng một cấu trúc nhánh.',false,'Cấu trúc cần thay đổi theo mục đích: họp, phân tích nguyên nhân, dự án hay quyết định.']
  ],
  q2:{names:['Ghi nhận','Sắp xếp','Kết nối'],descs:[
    'Nhìn các ý liên quan với nhau thế nào để hiểu rõ hơn.',
    'Giữ lại những ý quan trọng, dùng từ khóa ngắn nhưng đúng nghĩa.',
    'Gom các ý vào nhóm và phân chia thành nhánh chính, nhánh con.'
  ],correct:[1,2,0]},
  q5:[
    ['Ảnh',false,'Quá ngắn: không rõ cần làm gì, ai thực hiện và thời hạn.'],
    ['Bổ sung ảnh sản phẩm',false,'Đã giữ được công việc nhưng thiếu người chịu trách nhiệm và thời hạn.'],
    ['Lan · Ảnh sản phẩm · Trước thứ Tư',true,'Đủ người phụ trách, đầu việc và hạn hoàn thành để theo dõi.']
  ]
};
const quizTitles=['MindMap là gì?','Ba bước của MindMap','Cùng cuộc họp, khác cách ghi','Nhận diện cấu trúc','Từ khóa đủ nghĩa'];
const state=(P,i)=>{if(!P.quiz[i]||typeof P.quiz[i]!=='object'||Array.isArray(P.quiz[i]))P.quiz[i]={};return P.quiz[i]};
const finished=quiz=>Object.keys(quiz||{}).filter(k=>/^[0-4]$/.test(k)&&quiz[k]?.submitted).length;
function scoreOne(i,v){
 if(!v?.submitted)return null;
 if(i===0)return defs.q1.every((r,j)=>(v.selected||[]).includes(j)===r[1]);
 if(i===1)return defs.q2.correct.every((x,j)=>Number(v.pairs?.[j])===x);
 if(i===2)return v.selected===1;
 if(i===3)return ['central','main','child'].every((x,j)=>(v.picks||[])[j]===x);
 return v.selected===2;
}
function optionButton(title,choice,i,v,esc,answer){let chosen=(v.selected||[]).includes(i),verdict=v.submitted?(chosen&&answer?' right':chosen&&!answer?' wrong':''):'';
 return `<button type="button" class="q-choice ${chosen?'is-selected':''}${verdict}" data-action="quiz-toggle" data-value="${i}" aria-pressed="${chosen}" ${v.submitted?'disabled':''}><span class="q-checkbox" aria-hidden="true">${chosen?'✓':''}</span><span>${esc(title)}</span></button>`;
}
function view(ctx){const {P,UI,esc,btn,progress,tag,shell}=ctx,qi=UI.quizIndex,v=state(P,qi);
 const count=finished(P.quiz),all=count===5&&UI.quizResult;
 if(all){const n=[0,1,2,3,4].filter(i=>scoreOne(i,P.quiz[i])).length;
  return shell('Tổng kết — Kiến thức nền tảng về MindMap','Nhìn lại những nguyên tắc vừa học trước khi bước sang bài thực hành.','HỌC PHẦN 01 · 1.2 TỔNG KẾT')+`<section class="card pad-lg quiz-wrap"><div class="quiz-heading"><span class="eyebrow">ĐÃ HOÀN THÀNH · 5 CÂU HỎI</span>${tag(`${n}/5 câu phù hợp`,'complete')}</div><h3 class="quiz-question">MindMap — bức tranh kiến thức của bạn</h3><p>Khái niệm, cấu trúc, ba bước nền tảng và cách tổ chức theo mục đích là những điều cốt lõi cần ghi nhớ.</p><div class="quiz-summary-map"><div class="q-sum-root">MindMap</div><div class="q-sum-branches"><div class="q-sum-branch"><strong>Khái niệm</strong><small>Tổ chức và kết nối ý quanh chủ đề trung tâm</small></div><div class="q-sum-branch"><strong>Cấu trúc</strong><small>Chủ đề trung tâm → Nhánh chính → Nhánh con</small></div><div class="q-sum-branch"><strong>Ba bước</strong><small>Ghi nhận → Sắp xếp → Kết nối</small></div><div class="q-sum-branch"><strong>Dùng theo mục đích</strong><small>Cấu trúc phải phục vụ nhiệm vụ cần giải quyết</small></div></div></div><div class="feedback positive"><strong>Ghi nhớ</strong><p>Một sơ đồ tốt không phải là sơ đồ có nhiều nhánh nhất, mà là sơ đồ giúp người đọc hiểu và sử dụng được thông tin.</p></div><div class="btn-row item-space">${btn('Tiếp tục Học phần 2 →','open-m2')}${btn('Xem lại từng câu','quiz-review','outline')}${btn('Làm lại bài kiểm tra','reset-quiz','outline')}</div></section>`;
 }
 let content='';
 if(qi===0){
 content=`<p class="quiz-instruction">Những ý nào mô tả đúng về MindMap? <strong>Chọn tất cả ý phù hợp.</strong></p><div class="q-choice-list">${defs.q1.map((r,i)=>optionButton(r[0],null,i,v,esc,r[1])).join('')}</div>`;
 if(v.submitted){const right=defs.q1.filter((r,i)=>(v.selected||[]).includes(i)===r[1]).length;
  content+=`<section class="q-feedback"><strong>${right}/5 nhận định phù hợp</strong><div class="q-explanations">${defs.q1.map((r,i)=>{const chosen=(v.selected||[]).includes(i),isRight=chosen===r[1];return `<article class="q-explain ${isRight?'correct':'incorrect'}"><b>${isRight?'✓':'↻'} ${r[1]?'ĐÚNG':'CHƯA ĐÚNG'} · ${esc(r[0])}</b><p>${esc(r[2])}${!isRight?` <strong>${r[1]?'Nên chọn ý này.':'Không nên chọn ý này.'}</strong>`:''}</p></article>`}).join('')}</div><div class="q-definition"><strong>Định nghĩa tổng hợp</strong><p>MindMap là cách <b>tổ chức thông tin quanh một chủ đề trung tâm</b>, sử dụng <b>các nhánh để nhóm ý và chi tiết</b>, đồng thời thể hiện <b>mối liên hệ giữa các ý</b> để giúp tư duy và trao đổi rõ ràng hơn.</p></div></section>`;
 }
 }
 if(qi===1){
 content=`<p class="quiz-instruction">Giữ và kéo từ bước ở cột trái sang định nghĩa ở cột phải để nối. Hoặc bấm lần lượt vào hai cột (hỗ trợ bàn phím và điện thoại). Đường nối sẽ hiển thị ngay; bạn có thể nối lại trước khi kiểm tra.</p><div class="q-match-board" id="q-match-board"><svg class="q-match-lines" id="q-match-lines" aria-hidden="true"></svg><div class="q-match-col"><h4>Tên bước</h4>${defs.q2.names.map((x,i)=>`<button type="button" class="q-match-source q-match-draggable ${v.active===i?'active':''}" data-action="quiz-match-source" data-value="${i}" aria-pressed="${v.active===i}"><span class="q-match-index">${i+1}</span><span>${esc(x)}</span><span class="q-match-dot" data-connect-source="${i}"></span></button>`).join('')}</div><div class="q-match-col"><h4>Định nghĩa (đã xáo trộn)</h4>${defs.q2.descs.map((x,i)=>`<button type="button" class="q-match-target" data-action="quiz-match-target" data-value="${i}" ${v.active===undefined?'aria-label="Chọn bước ở cột trái trước"':''}><span class="q-match-dot" data-connect-target="${i}"></span><span>${esc(x)}</span></button>`).join('')}</div></div>`;
 if(v.submitted){content+=`<section class="q-feedback"><strong>${defs.q2.correct.filter((x,j)=>v.pairs?.[j]===x).length}/3 cặp đúng</strong><div class="q-explanations">${defs.q2.names.map((x,j)=>`<article class="q-explain ${v.pairs?.[j]===defs.q2.correct[j]?'correct':'incorrect'}"><b>${v.pairs?.[j]===defs.q2.correct[j]?'✓':'↻'} ${x}</b><p>Định nghĩa đúng: ${defs.q2.descs[defs.q2.correct[j]]}</p></article>`).join('')}</div><p class="note">Ba bước ở đây là cách diễn giải đơn giản trong bài học, không phải công thức bắt buộc cho mọi tình huống.</p></section>`;}
 }
 if(qi===2){
 const mapA=[['Nội dung workshop','Thông tin trình bày'],['Người tham gia','Các bộ phận'],['Truyền thông','Kênh thông báo']];
 const mapB=[['Vấn đề','Địa điểm cần điều chỉnh'],['Quyết định','Giữ thời gian tổ chức'],['Hành động','Lan · cập nhật tài liệu · Thứ Tư']];
 function card(n,title,data){return `<button type="button" class="q-map-choice ${v.selected===n?'is-selected':''}" data-action="quiz-select" data-value="${n}" aria-pressed="${v.selected===n}" ${v.submitted?'disabled':''}><span class="q-map-head"><strong>Map của ${title}</strong><span class="q-choice-indicator">${v.selected===n?'✓ Đã chọn':'Chọn sơ đồ này'}</span></span><div class="q-mini-map"><div class="q-mini-center">Cuộc họp workshop</div><div class="q-mini-branches">${data.map(([a,b])=>`<div class="q-mini-branch"><b>${esc(a)}</b><small>${esc(b)}</small></div>`).join('')}</div></div></button>`}
 content=`<p class="quiz-instruction">Team cần biết <strong>việc phải làm sau cuộc họp</strong>. Map nào giúp tìm nhanh hơn?</p><div class="q-map-grid">${card(0,'An',mapA)}${card(1,'Bình',mapB)}</div>`;
 if(v.submitted)content+=`<section class="q-feedback"><strong>${v.selected===1?'✓ Phù hợp với nhiệm vụ':'↻ Hãy xem lại mục đích sử dụng'}</strong><p><b>Map của Bình</b> có nhánh Vấn đề, Quyết định, Hành động; nội dung Hành động còn có người phụ trách và thời hạn. Nhờ vậy team có thể tìm nhanh những việc cần làm.</p><p><b>Map của An không sai:</b> nó vẫn hữu ích để nhìn các chủ đề đã trao đổi. Sơ đồ phù hợp nhất phụ thuộc vào mục đích sử dụng.</p></section>`;
 }
 if(qi===3){
 const stages=[['central','chủ đề trung tâm'],['main','nhánh chính'],['child','nhánh con']],pos=(v.picks||[]).length,next=stages[Math.min(pos,2)];
 const node=(label,role)=>`<button type="button" class="q-node q-node-${role}" data-action="quiz-node" data-role="${role}" ${v.submitted?'disabled':''}>${esc(label)}</button>`;
 content=`<p class="quiz-instruction">Trên sơ đồ “Chuẩn bị workshop”, hãy lần lượt chạm vào <strong>chủ đề trung tâm → nhánh chính → nhánh con</strong>.</p><div class="q-stage-list">${stages.map(([r,label],i)=>`<span class="q-stage ${i===pos&&!v.submitted?'current':''} ${i<pos?'complete':''}">${i+1}. ${label} ${i<pos?'✓':''}</span>`).join('')}</div>${pos<3&&!v.submitted?`<p class="q-tap-prompt" aria-live="polite">Bước ${pos+1}: Chạm vào <strong>${next[1]}</strong>.</p>`:''}<div class="q-node-map"><div class="q-node-root">${node('Chuẩn bị workshop','central')}</div><div class="q-node-branches"><div class="q-node-arm"><div>${node('Nội dung','main')}</div><div class="q-node-children">${node('Chương trình','child')}${node('Tài liệu','child')}</div></div><div class="q-node-arm"><div>${node('Tổ chức','main')}</div><div class="q-node-children">${node('Phòng họp','child')}${node('Thiết bị','child')}</div></div><div class="q-node-arm"><div>${node('Đánh giá','main')}</div><div class="q-node-children">${node('Phiếu phản hồi','child')}</div></div></div></div><p class="note">Các node có thể bấm bằng chuột, bàn phím hoặc chạm màn hình.</p>`;
 if(v.submitted)content+=`<section class="q-feedback"><strong>${scoreOne(3,v)?'✓ Bạn đã nhận diện đúng cả 3 cấp':'↻ Xem lại các cấp thông tin'}</strong><div class="q-explanations">${stages.map(([role,label],j)=>`<article class="q-explain ${(v.picks||[])[j]===role?'correct':'incorrect'}"><b>${(v.picks||[])[j]===role?'✓':'↻'} ${esc(label)}</b><p>${role==='central'?'Chủ đề trung tâm là điểm xuất phát bao quát toàn sơ đồ.':role==='main'?'Nhánh chính thể hiện một nhóm ý lớn trực tiếp từ chủ đề trung tâm.':'Nhánh con là thông tin chi tiết thuộc một nhánh chính.'}</p></article>`).join('')}</div></section>`;
 }
 if(qi===4){
 content=`<div class="q-source-note"><span>GHI CHÚ GỐC</span><strong>“Lan bổ sung ảnh sản phẩm trước thứ Tư.”</strong></div><p class="quiz-instruction">Cách viết nào giúp theo dõi công việc <strong>ngắn gọn nhưng đủ nghĩa</strong>?</p><div class="q-choice-list">${defs.q5.map(([txt,answer],i)=>`<button type="button" class="q-choice ${v.selected===i?'is-selected':''} ${v.submitted?(answer?'right':v.selected===i?'wrong':''):''}" data-action="quiz-select" data-value="${i}" aria-pressed="${v.selected===i}" ${v.submitted?'disabled':''}><span class="q-radio"></span><strong>${esc(txt)}</strong></button>`).join('')}</div>`;
 if(v.submitted)content+=`<section class="q-feedback"><strong>${v.selected===2?'✓ Cụm từ đủ nghĩa':'↻ Chưa đủ thông tin để theo dõi'}</strong><div class="q-explanations">${defs.q5.map(([x,correct,why],i)=>`<article class="q-explain ${correct?'correct':v.selected===i?'incorrect':''}"><b>${correct?'✓ Đáp án phù hợp':'•'} ${esc(x)}</b><p>${why}</p></article>`).join('')}</div><p class="q-definition">Nguyên tắc: <strong>Ngắn gọn không có nghĩa là bỏ đi thông tin cần để hành động.</strong></p></section>`;
 }
 let ready=qi===0?(v.selected||[]).length>0:qi===1?Object.keys(v.pairs||{}).length===3:qi===2||qi===4?v.selected!==undefined:(v.picks||[]).length===3;
 return shell('Củng cố kiến thức qua tương tác','Năm câu hỏi với năm hình thức thực hành khác nhau. Hãy thao tác rồi kiểm tra để nhận lời giải thích.','HỌC PHẦN 01 · 1.2 CÂU HỎI TƯƠNG TÁC')+`<section id="quiz" class="card pad-lg quiz-wrap quiz-v22"><div class="quiz-headline"><span class="quiz-num">CÂU ${qi+1}/5 · ${quizTitles[qi].toUpperCase()}</span><span class="q-complete-count">${count}/5 đã kiểm tra</span></div>${progress(qi+1,5)}<h3 class="quiz-question">${quizTitles[qi]}</h3>${content}<div class="btn-row between quiz-controls"><div>${qi>0?btn('← Câu trước','quiz-prev','outline'):btn('← Xem video','open-m1video','outline')}</div><div>${v.submitted?btn(qi===4?'Xem sơ đồ tổng kết →':'Tiếp tục câu tiếp theo →','quiz-next'):btn('Kiểm tra câu trả lời','quiz-submit','primary',ready?'':'disabled')} ${v.submitted?btn('Làm lại câu này','quiz-retry','outline'):''}</div></div></section>`;
}
function handle(a,el,ctx){const {P,UI,save,render,message,navigate}=ctx,i=UI.quizIndex,v=state(P,i);let done=false;
 switch(a){
 case 'quiz-toggle':{const j=Number(el.dataset.value);v.selected=v.selected||[];v.selected=v.selected.includes(j)?v.selected.filter(x=>x!==j):[...v.selected,j];done=true;break;}
 case 'quiz-match-source':v.active=Number(el.dataset.value);done=true;break;
 case 'quiz-match-target':if(v.active===undefined){message('Chọn một bước bên trái trước');return true;}v.pairs=v.pairs||{};{const dst=Number(el.dataset.value);Object.keys(v.pairs).forEach(k=>{if(v.pairs[k]===dst&&Number(k)!==v.active)delete v.pairs[k]});v.pairs[v.active]=dst;}v.active=undefined;done=true;break;
 case 'quiz-select':v.selected=Number(el.dataset.value);done=true;break;
 case 'quiz-node':v.picks=v.picks||[];if(v.picks.length<3){v.picks.push(el.dataset.role);done=true;}break;
 case 'quiz-submit':if(v.submitted)return true;v.submitted=true;done=true;message(scoreOne(i,v)?'Đã hoàn thành câu hỏi':'Đã có lời giải thích để bạn đối chiếu');break;
 case 'quiz-prev':UI.quizResult=false;UI.quizIndex=Math.max(0,i-1);render();return true;
 case 'quiz-next':if(!v.submitted)return true;if(i===4){UI.quizResult=true;}else{UI.quizIndex=i+1;UI.quizResult=false;}render();return true;
 case 'quiz-review':UI.quizResult=false;UI.quizIndex=0;render();return true;
 case 'quiz-retry':P.quiz[i]={};done=true;break;
 case 'reset-quiz':P.quiz={};UI.quizIndex=0;UI.quizResult=false;done=true;break;
 default:return false;
 }
 if(done){save();render();if(i!==1)document.querySelector('#quiz')?.scrollIntoView({block:'start',behavior:'smooth'});return true;}return false;
}
function drawConnections(){const board=document.querySelector('#q-match-board');if(!board)return;const svg=board.querySelector('#q-match-lines');if(!svg)return;
 const r=board.getBoundingClientRect();svg.setAttribute('viewBox',`0 0 ${r.width} ${r.height}`);svg.setAttribute('width',r.width);svg.setAttribute('height',r.height);
 const app=window.__ipaAppQuizState;const data=app?app():null;if(!data)return;
 const pairs=data.pairs||{},submitted=data.submitted;
 svg.innerHTML=Object.keys(pairs).map(k=>{const src=board.querySelector(`[data-connect-source="${k}"]`),dst=board.querySelector(`[data-connect-target="${pairs[k]}"]`);if(!src||!dst)return '';const a=src.getBoundingClientRect(),b=dst.getBoundingClientRect(),sx=a.left-r.left+a.width/2,sy=a.top-r.top+a.height/2,ex=b.left-r.left+b.width/2,ey=b.top-r.top+b.height/2,dx=(ex-sx)*.43;const correctness=submitted?(defs.q2.correct[Number(k)]===Number(pairs[k])?'line-right':'line-wrong'):'';return `<path class="q-link ${correctness}" d="M ${sx} ${sy} C ${sx+dx} ${sy}, ${ex-dx} ${ey}, ${ex} ${ey}"/>`;}).join('');
}
function bindMatching({P,UI,render,save}){
 const board=document.querySelector('#q-match-board');
 if(!board||UI.quizIndex!==1||board.dataset.dragBound==='1')return;
 board.dataset.dragBound='1';
 const svg=board.querySelector('#q-match-lines');
 let drag=null,preview=null;
 const coords=(ev)=>{const r=board.getBoundingClientRect();return {x:ev.clientX-r.left,y:ev.clientY-r.top};};
 const center=(el)=>{const b=el.getBoundingClientRect(),r=board.getBoundingClientRect();return {x:b.left-r.left+b.width/2,y:b.top-r.top+b.height/2};};
 const path=(a,b)=>{const dx=(b.x-a.x)*.46;return `M ${a.x} ${a.y} C ${a.x+dx} ${a.y}, ${b.x-dx} ${b.y}, ${b.x} ${b.y}`;};
 const down=e=>{
   const button=e.target.closest('[data-action="quiz-match-source"]');
   if(!button||P.quiz[1]?.submitted||e.button!==0)return;
   drag={index:Number(button.dataset.value),pointer:e.pointerId,started:coords(e),moved:false};
   const dot=button.querySelector('.q-match-dot');
   const from=center(dot||button);
   drag.from=from;
   preview=document.createElementNS('http://www.w3.org/2000/svg','path');
   preview.classList.add('q-link','q-link-preview');
   preview.setAttribute('d',path(from,from));
   svg.appendChild(preview);
   button.classList.add('q-is-dragging');
 };
 const move=e=>{
   if(!drag||e.pointerId!==drag.pointer)return;
   const now=coords(e);
   if(Math.hypot(now.x-drag.started.x,now.y-drag.started.y)>7){drag.moved=true;e.preventDefault();}
   preview?.setAttribute('d',path(drag.from,now));
   const hover=document.elementFromPoint(e.clientX,e.clientY)?.closest('[data-action="quiz-match-target"]');
   board.querySelectorAll('.q-match-target').forEach(x=>x.classList.toggle('q-drop-hover',x===hover));
 };
 const up=e=>{
   if(!drag||e.pointerId!==drag.pointer)return;
   const target=document.elementFromPoint(e.clientX,e.clientY)?.closest('[data-action="quiz-match-target"]');
   const index=drag.index,moved=drag.moved;
   drag=null;preview?.remove();preview=null;
   board.querySelectorAll('.q-match-target').forEach(x=>x.classList.remove('q-drop-hover'));
   board.querySelectorAll('.q-match-source').forEach(x=>x.classList.remove('q-is-dragging'));
   if(!moved||!target||!board.contains(target))return;
   const v=state(P,1),destination=Number(target.dataset.value);
   v.pairs ||= {};
   Object.keys(v.pairs).forEach(k=>{if(v.pairs[k]===destination&&Number(k)!==index)delete v.pairs[k];});
   v.pairs[index]=destination;v.active=undefined;v.submitted=false;
   save();render();
 };
 board.addEventListener('pointerdown',down);
 document.addEventListener('pointermove',move);
 document.addEventListener('pointerup',up);
 document.addEventListener('pointercancel',up);
 // Detached boards are cleaned up immediately after the next render.
 const obs=new MutationObserver(()=>{if(board.isConnected)return;obs.disconnect();document.removeEventListener('pointermove',move);document.removeEventListener('pointerup',up);document.removeEventListener('pointercancel',up);});
 obs.observe(document.querySelector('#screen')||document.body,{childList:true,subtree:true});
}
window.IPA_QUIZ={view,handle,finished,drawConnections,bindMatching,getCurrentState:state};
})();
