(function(){
var d=document,$=function(s,c){return(c||d).querySelector(s)},$$=function(s,c){return Array.prototype.slice.call((c||d).querySelectorAll(s))};
var objs=$$('.obj'),picks=$$('.pk'),disc=$('#disc'),fact=$('#fact'),cap=$('#hotcap');
function ar(){return d.documentElement.lang==='ar'}
function show(i){objs.forEach(function(o,j){o.classList.toggle('on',j===i)});picks.forEach(function(p,j){p.classList.toggle('on',j===i);p.setAttribute('aria-pressed',j===i?'true':'false')});
 var o=objs[i];disc.style.setProperty('--c',o.getAttribute('data-c'));fact.setAttribute('data-ar',o.getAttribute('data-fa'));fact.setAttribute('data-en',o.getAttribute('data-f'));fact.textContent=ar()?o.getAttribute('data-fa'):o.getAttribute('data-f');cap.textContent=''}
picks.forEach(function(p){p.addEventListener('click',function(){show(+p.getAttribute('data-i'))})});
/* breakfast board: touch a dot to read what it is */
var hots=$$('.hot');
function name(h){return ar()?h.getAttribute('data-ar'):h.getAttribute('data-en')}
function pick(h){hots.forEach(function(x){x.classList.remove('on')});h.classList.add('on');cap.textContent=name(h)}
hots.forEach(function(h){h.addEventListener('click',function(){pick(h)});h.addEventListener('mouseenter',function(){pick(h)});h.addEventListener('focus',function(){pick(h)})});
d.addEventListener('tt-lang',function(){var on=$('.hot.on');if(on)cap.textContent=name(on)});
})();
