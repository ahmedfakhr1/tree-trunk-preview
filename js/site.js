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
$('#lang').addEventListener('click',function(){setLang(d.documentElement.lang==='ar'?'en':'ar')});
if(ls('tt-lang')==='ar')setLang('ar');
/* plates: the drawing turns into the plate as served */
function setOn(p,on){p.classList.toggle('on',on);p.setAttribute('aria-pressed',on?'true':'false')}
$$('.plate').forEach(function(p){p.addEventListener('click',function(){setOn(p,!p.classList.contains('on'))})});
/* on touch screens the plate turns into the photo by itself as it scrolls through the middle of the screen */
if(matchMedia('(hover: none)').matches&&'IntersectionObserver' in window&&!reduce){
 var mid=new IntersectionObserver(function(es){es.forEach(function(x){setOn(x.target,x.isIntersecting)})},{rootMargin:'-40% 0px -40% 0px'});
 $$('.plate').forEach(function(p){mid.observe(p)})}
/* entrances: parts of each section rise in turn, once */
var rv=$$('.tile,.mh,.info-grid>div,.dish,.pz,.rows li');
rv.forEach(function(el,i){el.classList.add('rv');el.style.setProperty('--d',((i%4)*0.08)+'s')});
if('IntersectionObserver' in window&&!reduce){var io=new IntersectionObserver(function(es){es.forEach(function(x){if(x.isIntersecting){x.target.classList.add('in');io.unobserve(x.target)}})},{threshold:.12});rv.forEach(function(x){io.observe(x)})}else{rv.forEach(function(x){x.classList.add('in')})}
/* the quick-action bar steps aside when the footer arrives */
var tb=$('.tabbar'),seen={},inFoot=false,goingDown=false,lastY=window.scrollY;function applyTb(){if(tb)tb.classList.toggle('off',inFoot||goingDown)}
window.addEventListener('scroll',function(){var y=window.scrollY,dy=y-lastY;if(Math.abs(dy)>6){goingDown=dy>0&&y>120;lastY=y;applyTb()}},{passive:true});
if(tb&&'IntersectionObserver' in window){var tio=new IntersectionObserver(function(es){es.forEach(function(x){seen[x.target.className]=x.isIntersecting});inFoot=Object.keys(seen).some(function(k){return seen[k]});applyTb()},{threshold:.05});$$('.foot,.reserve').forEach(function(el){tio.observe(el)})}
})();
