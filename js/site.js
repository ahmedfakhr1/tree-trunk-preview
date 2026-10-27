(function(){
var d=document,$=function(s,c){return(c||d).querySelector(s)},$$=function(s,c){return Array.prototype.slice.call((c||d).querySelectorAll(s))};
var ls=function(k,v){try{if(v===undefined)return localStorage.getItem(k);localStorage.setItem(k,v)}catch(e){return null}};
var reduce=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;
try{if(d.documentElement.classList.contains('arrive'))sessionStorage.setItem('tt-seen','1')}catch(e){}
/* header turns solid after the hero starts to scroll away */
var hdr=$('#hdr');var onS=function(){hdr.classList.toggle('solid',window.scrollY>40)};onS();window.addEventListener('scroll',onS,{passive:true});
/* drawer */
var bg=$('#burger'),dr=$('#drawer');
function setDrawer(o){dr.classList.toggle('open',o);dr.setAttribute('aria-hidden',o?'false':'true');bg.setAttribute('aria-expanded',o?'true':'false');d.body.style.overflow=o?'hidden':''}
bg.addEventListener('click',function(){setDrawer(!dr.classList.contains('open'))});
$$('a',dr).forEach(function(a){a.addEventListener('click',function(){setDrawer(false)})});
d.addEventListener('keydown',function(e){if(e.key==='Escape')setDrawer(false)});
/* language */
function setLang(l){var ar=l==='ar';d.documentElement.lang=l;d.documentElement.dir=ar?'rtl':'ltr';
 $$('[data-ar]').forEach(function(el){if(el.getAttribute('data-en')===null)el.setAttribute('data-en',el.textContent);el.textContent=ar?el.getAttribute('data-ar'):el.getAttribute('data-en')});ls('tt-lang',l)}
$('#lang').addEventListener('click',function(){setLang(d.documentElement.lang==='ar'?'en':'ar')});
if(ls('tt-lang')==='ar')setLang('ar');
/* open badge */
var bd=$('#badge');if(bd){var n=new Date(),g=n.getDay(),s=g===5||g===6?10:11,x=n.getHours()+n.getMinutes()/60;bd.textContent=x>=s?'Open now':'Closed now'}
/* plates: sketch turns into the plate as served */
$$('.plate').forEach(function(p){p.addEventListener('click',function(){var on=p.classList.toggle('on');p.setAttribute('aria-pressed',on?'true':'false')})});
/* wave band drifts sideways as you scroll */
var dr2=$$('[data-drift]');
if(dr2.length&&!reduce){var tick=false;var run=function(){tick=false;dr2.forEach(function(el){var r=el.parentNode.getBoundingClientRect();var v=(r.top+r.height/2-innerHeight/2)/innerHeight;el.style.setProperty('--dx',Math.max(-40,Math.min(40,v*60))+'px')})};window.addEventListener('scroll',function(){if(!tick){tick=true;requestAnimationFrame(run)}},{passive:true});run()}
/* breakfast board: tap a dot on small screens */
var bs=$('.board svg');
if(bs&&window.matchMedia){var mq=matchMedia('(max-width: 768px)'),cap=$('#bcap');
 var vb=function(){bs.setAttribute('viewBox',mq.matches?'235 10 530 570':'0 0 1000 600')};vb();mq.addEventListener?mq.addEventListener('change',vb):0;
 $$('.lab',bs).forEach(function(g){var pick=function(){if(!mq.matches)return;$$('.lab',bs).forEach(function(o){o.classList.remove('on')});g.classList.add('on');cap.textContent=g.querySelector('text').textContent};g.addEventListener('click',pick);g.addEventListener('keydown',function(e){if(e.key==='Enter'||e.key===' '){e.preventDefault();pick()}})})}
})();
