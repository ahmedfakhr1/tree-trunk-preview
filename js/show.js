(function(){
var d=document,$=function(s,c){return(c||d).querySelector(s)},$$=function(s,c){return Array.prototype.slice.call((c||d).querySelectorAll(s))};
var stage=$('.stage'),flip=$('#flip'),objs=$$('.obj'),picks=$$('.pk'),disc=$('#disc'),fact=$('#fact'),cap=$('#hotcap');
function setAsked(on){stage.classList.toggle('asked',on);flip.setAttribute('aria-pressed',on?'true':'false');flip.textContent=on?(ar()?'شوف الرسمة':'See the drawing'):(ar()?'شوف الطبق زي ما بيتقدم':'See it as served')}
function ar(){return d.documentElement.lang==='ar'}
function show(i){objs.forEach(function(o,j){o.classList.toggle('on',j===i)});picks.forEach(function(p,j){p.classList.toggle('on',j===i);p.setAttribute('aria-pressed',j===i?'true':'false')});
 var o=objs[i];disc.style.setProperty('--c',o.getAttribute('data-c'));fact.setAttribute('data-ar',o.getAttribute('data-fa'));fact.setAttribute('data-en',o.getAttribute('data-f'));fact.textContent=ar()?o.getAttribute('data-fa'):o.getAttribute('data-f');cap.textContent='';if(o.classList.contains('annot'))setAsked(false);else if(matchMedia('(hover: none)').matches)setAsked(true)}
picks.forEach(function(p){p.addEventListener('click',function(){show(+p.getAttribute('data-i'))})});
flip.addEventListener('click',function(){setAsked(!stage.classList.contains('asked'))});
stage.addEventListener('click',function(e){if(e.target.closest('.hot')||e.target===flip)return;if(matchMedia('(hover: none)').matches)setAsked(!stage.classList.contains('asked'))});
if(matchMedia('(hover: none)').matches&&!window.matchMedia('(prefers-reduced-motion: reduce)').matches){var sraf=0,sOn=false;var sFocus=function(){sraf=0;var r=stage.getBoundingClientRect(),vh=innerHeight,c=r.top+r.height/2,d=Math.abs(c-vh/2),vis=r.bottom>64&&r.top<vh-70;var on=vis&&d<(sOn?vh*.3:vh*.22);var o=objs.filter(function(x){return x.classList.contains('on')})[0];if(o&&!o.classList.contains('annot')&&on!==sOn){sOn=on;setAsked(on)}};var sKick=function(){if(!sraf)sraf=requestAnimationFrame(sFocus)};window.addEventListener('scroll',sKick,{passive:true});setTimeout(sKick,300)}
/* breakfast board: touch a dot to read what it is */
var hots=$$('.hot');
function name(h){return ar()?h.getAttribute('data-ar'):h.getAttribute('data-en')}
function pick(h){hots.forEach(function(x){x.classList.remove('on')});h.classList.add('on');cap.textContent=name(h)}
hots.forEach(function(h){h.addEventListener('click',function(){pick(h)});h.addEventListener('mouseenter',function(){pick(h)});h.addEventListener('focus',function(){pick(h)})});
d.addEventListener('tt-lang',function(){setAsked(stage.classList.contains('asked'));var on=$('.hot.on');if(on)cap.textContent=name(on)});
})();
