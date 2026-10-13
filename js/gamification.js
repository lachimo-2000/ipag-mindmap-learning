/* IPA Group v2.10 — Lightweight local-only learning rewards (no CDN dependency). */
(function(){
'use strict';
let confettiRAF=0;
const prefersReduced=()=>window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
const qs=(root,selector)=>root.querySelector(selector);
function countTo(node,value,format){
 if(!node)return;
 if(prefersReduced()){node.textContent=format(value);return;}
 const start=performance.now(),duration=850;
 const tick=now=>{if(!node.isConnected)return;const t=Math.min(1,(now-start)/duration),ease=1-(1-t)**3;node.textContent=format(Math.round(value*ease));if(t<1)requestAnimationFrame(tick);};
 requestAnimationFrame(tick);
}
function dashboard(host,{xp=0,seconds=0,correct=0,total=0,nextLabel='Bài tiếp theo',onNext=()=>{}}={}){
 if(!host)return;
 const minutes=Math.floor(seconds/60);
 const accuracy=total?Math.round(correct/total*100):null;
 host.innerHTML=`<section class="game-dashboard card" aria-label="Thành tích học tập"><div class="game-dashboard-head"><div><span class="eyebrow">HÀNH TRÌNH CỦA BẠN</span><h2>Tiến bộ từng bước</h2><p>Điểm XP và thời gian học được ghi nhận trên trình duyệt này.</p></div><div class="xp-pill"><span class="xp-spark">✦</span><strong data-xp-count>0</strong><small>XP</small></div></div><div class="game-metrics"><div><small>Thời gian học ước tính</small><strong data-time-count>${minutes}</strong><span>phút</span></div><div><small>Độ chính xác Module 2</small><strong data-accuracy>${accuracy===null?'—':accuracy+'%'}</strong><span>${total?`${correct}/${total} lượt phân loại đúng`:'Chưa có lần kiểm tra'}</span></div><div><small>XP đã tích lũy</small><strong data-total-xp>0</strong><span>điểm kinh nghiệm</span></div></div><div class="game-dash-footer"><span>✦ Hoàn thành bài học và case để nhận huy hiệu.</span><button class="primary journey-cta" type="button" data-dashboard-next>Bài tiếp theo →</button></div></section>`;
 qs(host,'[data-dashboard-next]').addEventListener('click',onNext);
 countTo(qs(host,'[data-xp-count]'),xp,v=>v.toLocaleString('vi-VN'));
 countTo(qs(host,'[data-total-xp]'),xp,v=>'+'+v.toLocaleString('vi-VN'));
}
function badge(id,target){
 const names={m1:'Module 1 · Vì sao & Khi nào',m2:'Module 2 · Thực hành MindMap',m3:'Module 3 · Học GitMind'};
 const overlay=document.createElement('div');overlay.className='achievement-overlay';overlay.setAttribute('role','status');overlay.setAttribute('aria-live','polite');
 overlay.innerHTML=`<div class="achievement-stamp"><div class="achievement-star" aria-hidden="true">★</div><strong>Hoàn thành học phần!</strong><span>${names[id]||'MindMap'}</span><small>+50 XP · Đã nhận huy hiệu</small></div>`;
 document.body.appendChild(overlay);
 if(prefersReduced()){setTimeout(()=>overlay.remove(),1700);return;}
 const stamp=overlay.querySelector('.achievement-stamp');
 stamp.animate([{opacity:0,transform:'perspective(700px) rotateY(-40deg) rotateX(15deg) scale(.3)'},{opacity:1,transform:'perspective(700px) rotateY(9deg) rotateX(-4deg) scale(1.08)',offset:.65},{opacity:1,transform:'perspective(700px) rotateY(0deg) rotateX(0deg) scale(1)'}],{duration:780,easing:'cubic-bezier(.22,1,.36,1)',fill:'both'});
 setTimeout(()=>{
  if(!stamp.isConnected)return;
  const r=stamp.getBoundingClientRect(),dest=target?.getBoundingClientRect();
  const dx=dest?dest.left+dest.width/2-(r.left+r.width/2):0;
  const dy=dest?dest.top+dest.height/2-(r.top+r.height/2):-150;
  stamp.animate([{opacity:1,transform:'translate(0,0) scale(1)'},{opacity:.1,transform:`translate(${dx}px,${dy}px) rotate(24deg) scale(.12)`}],{duration:950,easing:'cubic-bezier(.35,0,.9,.8)',fill:'both'}).onfinish=()=>overlay.remove();
 },1350);
 setTimeout(()=>overlay.remove(),3500);
}
function confetti(canvas){
 if(!canvas)return;
 cancelAnimationFrame(confettiRAF);
 if(prefersReduced())return;
 const context=canvas.getContext('2d');if(!context)return;
 const colors=['#59798F','#C4AA78','#3E5B6C','#D0BB93','#DCCCAE','#E7DDC9','#9F8668'];
 let w,h,particles=[];const count=115;
 const size=()=>{const box=canvas.getBoundingClientRect();w=canvas.width=Math.min(1900,box.width*devicePixelRatio);h=canvas.height=Math.min(1300,box.height*devicePixelRatio);};size();
 for(let i=0;i<count;i++){const side=i%2?1:-1;particles.push({x:side===1?w+10:-10,y:h*.74+Math.random()*h*.15,vx:side===1?-(3+Math.random()*13):(3+Math.random()*13),vy:-10-Math.random()*16,w:3+Math.random()*6,h:5+Math.random()*9,angle:Math.random()*6.28,spin:(Math.random()-.5)*.18,color:colors[i%colors.length]});}
 const begin=performance.now();const frame=now=>{context.clearRect(0,0,w,h);for(const p of particles){p.x+=p.vx;p.y+=p.vy;p.vy+=.34*devicePixelRatio;p.vx*=.997;p.angle+=p.spin;context.save();context.translate(p.x,p.y);context.rotate(p.angle);context.fillStyle=p.color;context.fillRect(-p.w/2,-p.h/2,p.w,p.h);context.restore();}
   if(now-begin<4400)confettiRAF=requestAnimationFrame(frame);else context.clearRect(0,0,w,h);};
 confettiRAF=requestAnimationFrame(frame);
}
window.IPA_GAMIFY={dashboard,badge,confetti};
})();
