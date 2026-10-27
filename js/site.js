(function(){
var d=document,$=function(s,c){return(c||d).querySelector(s)},$$=function(s,c){return Array.prototype.slice.call((c||d).querySelectorAll(s))};
var ls=function(k,v){try{if(v===undefined)return localStorage.getItem(k);localStorage.setItem(k,v)}catch(e){return null}};
var reduce=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;
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
$$('.plate').forEach(function(p){p.addEventListener('click',function(){var on=p.classList.toggle('on');p.setAttribute('aria-pressed',on?'true':'false')})});
/* entrances: parts of each section rise in turn, once */
var rv=$$('.tile,.mh,.info-grid>div,.dish,.pz,.rows li');
rv.forEach(function(el,i){el.classList.add('rv');el.style.setProperty('--d',((i%4)*0.08)+'s')});
if('IntersectionObserver' in window&&!reduce){var io=new IntersectionObserver(function(es){es.forEach(function(x){if(x.isIntersecting){x.target.classList.add('in');io.unobserve(x.target)}})},{threshold:.12});rv.forEach(function(x){io.observe(x)})}else{rv.forEach(function(x){x.classList.add('in')})}
/* the quick-action bar steps aside when the footer arrives */
var tb=$('.tabbar'),ft=$('.foot');
if(tb&&ft&&'IntersectionObserver' in window){new IntersectionObserver(function(es){tb.classList.toggle('off',es[0].isIntersecting)},{threshold:.15}).observe(ft)}
})();
