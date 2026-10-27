(function(){
var d=document,$=function(s,c){return(c||d).querySelector(s)},$$=function(s,c){return Array.prototype.slice.call((c||d).querySelectorAll(s))};
var ls=function(k,v){try{if(v===undefined)return localStorage.getItem(k);localStorage.setItem(k,v)}catch(e){return null}};
var reduce=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;
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
 $$('[data-ar]').forEach(function(el){if(el.getAttribute('data-en')===null)el.setAttribute('data-en',el.textContent);el.textContent=ar?el.getAttribute('data-ar'):el.getAttribute('data-en')});ls('tt-lang',l);d.dispatchEvent(new CustomEvent('tt-lang'))}
/* Preview only: Arabic ships with the production site, so the button explains instead of switching */
(function(){var b=$('#lang'),pop=null,t=0;
 function hide(){if(pop){pop.classList.remove('on');var p=pop;pop=null;setTimeout(function(){p.remove()},200)}clearTimeout(t);b.setAttribute('aria-expanded','false')}
 function show(){if(pop){hide();return}
  pop=d.createElement('div');pop.className='langpop';pop.setAttribute('role','status');
  pop.innerHTML='<b>Arabic is not in this preview</b><span>It will be live in the final version of the site.</span>';
  d.body.appendChild(pop);var r=b.getBoundingClientRect(),w=pop.offsetWidth,x=Math.min(Math.max(12,r.right-w),innerWidth-w-12);
  pop.style.left=x+'px';pop.style.top=(r.bottom+10)+'px';pop.style.setProperty('--ax',(r.left+r.width/2-x)+'px');
  requestAnimationFrame(function(){pop&&pop.classList.add('on')});b.setAttribute('aria-expanded','true');t=setTimeout(hide,4000)}
 b.addEventListener('click',function(e){e.stopPropagation();show()});
 d.addEventListener('click',function(e){if(pop&&!pop.contains(e.target))hide()});
 d.addEventListener('keydown',function(e){if(e.key==='Escape')hide()});
 addEventListener('scroll',hide,{passive:true});
 if(ls('tt-lang')==='ar')ls('tt-lang','en')})();
/* plates: the drawing turns into the plate as served */
function setOn(p,on){p.classList.toggle('on',on);p.setAttribute('aria-pressed',on?'true':'false')}
$$('.plate').forEach(function(p){p.addEventListener('click',function(){setOn(p,!p.classList.contains('on'))})});
/* on touch screens the plate turns into the photo by itself as it scrolls through the middle of the screen */
if(matchMedia('(hover: none)').matches&&!reduce){
 var plates=$$('.plate'),raf=0,lastOn=[];
 var focusPlates=function(){raf=0;var vh=innerHeight,mid=vh/2,top=64,bot=vh-70,info=[];
  plates.forEach(function(p){var r=p.getBoundingClientRect();if(r.bottom<top||r.top>bot){info.push(null);return}var c=r.top+r.height/2;info.push(Math.abs(c-mid))});
  var best=Infinity;info.forEach(function(d){if(d!==null&&d<best)best=d});
  plates.forEach(function(p,i){var d=info[i],was=p.classList.contains('on');var on=d!==null&&best<vh*.22&&d<=best+48&&d<(was?vh*.27:vh*.2);if(on!==was&&!p.hasAttribute('data-m'))setOn(p,on)})};
 var kick=function(){if(!raf)raf=requestAnimationFrame(focusPlates)};
 window.addEventListener('scroll',kick,{passive:true});window.addEventListener('resize',kick);setTimeout(kick,300);
 plates.forEach(function(p){p.addEventListener('click',function(){p.setAttribute('data-m','1');clearTimeout(p._t);p._t=setTimeout(function(){p.removeAttribute('data-m')},2500)})})}
/* entrances: parts of each section rise in turn, once */
var rv=$$('.tile,.mh,.info-grid>div,.dish,.pz,.rows li');
rv.forEach(function(el,i){el.classList.add('rv');el.style.setProperty('--d',((i%4)*0.08)+'s')});
if('IntersectionObserver' in window&&!reduce){var io=new IntersectionObserver(function(es){es.forEach(function(x){if(x.isIntersecting){x.target.classList.add('in');io.unobserve(x.target)}})},{threshold:.12});rv.forEach(function(x){io.observe(x)})}else{rv.forEach(function(x){x.classList.add('in')})}
/* the quick-action bar steps aside when the footer arrives */
var tb=$('.tabbar'),seen={},inFoot=false,goingDown=false,lastY=window.scrollY;function applyTb(){if(tb)tb.classList.toggle('off',inFoot||goingDown)}
window.addEventListener('scroll',function(){var y=window.scrollY,dy=y-lastY;if(Math.abs(dy)>6){goingDown=dy>0&&y>120;lastY=y;applyTb()}},{passive:true});
if(tb&&'IntersectionObserver' in window){var tio=new IntersectionObserver(function(es){es.forEach(function(x){seen[x.target.className]=x.isIntersecting});inFoot=Object.keys(seen).some(function(k){return seen[k]});applyTb()},{threshold:.05});$$('.foot,.reserve').forEach(function(el){tio.observe(el)})}
})();
