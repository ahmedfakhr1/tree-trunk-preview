(function(){
var d=document,$=function(s,c){return(c||d).querySelector(s)},$$=function(s,c){return Array.prototype.slice.call((c||d).querySelectorAll(s))};
var reduce=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;
var chips=$$('#chiprow .chip'),secs=$$('.msec');
var spy=new IntersectionObserver(function(es){es.forEach(function(x){if(x.isIntersecting){var id=x.target.id;chips.forEach(function(c){var on=c.getAttribute('data-sec')===id;c.classList.toggle('on',on);if(on){$('#chiprow').scrollTo({left:c.offsetLeft-24,behavior:reduce?'auto':'smooth'})}})}})},{rootMargin:'-160px 0px -70% 0px'});
secs.forEach(function(s){spy.observe(s)});
var q=$('#q');q.addEventListener('input',function(){var v=q.value.trim().toLowerCase(),any=false;secs.forEach(function(s){var n=0;$$('.dish',s).forEach(function(li){var m=!v||li.textContent.toLowerCase().indexOf(v)>-1;li.hidden=!m;if(m)n++});s.hidden=!n;if(n)any=true});$('#empty').hidden=any});
})();
