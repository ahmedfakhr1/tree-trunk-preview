(function(){
var d=document,$=function(s,c){return(c||d).querySelector(s)},$$=function(s,c){return Array.prototype.slice.call((c||d).querySelectorAll(s))};
var ss=function(k,v){try{if(v===undefined)return sessionStorage.getItem(k);sessionStorage.setItem(k,v)}catch(e){return null}};
var ls=function(k,v){try{if(v===undefined)return localStorage.getItem(k);localStorage.setItem(k,v)}catch(e){return null}};
var reduce=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;
/* curtain */
var cur=$('#curtain');
if(cur){if(ss('tt-seen')||reduce){cur.remove()}else{ss('tt-seen','1');var gone=function(){cur.classList.add('out');setTimeout(function(){cur.remove()},400)};var tm=setTimeout(gone,1100);cur.addEventListener('click',function(){clearTimeout(tm);gone()});d.addEventListener('keydown',function(){clearTimeout(tm);gone()},{once:true})}}
/* header */
var hdr=$('#hdr');var onS=function(){hdr.classList.toggle('solid',window.scrollY>40)};onS();window.addEventListener('scroll',onS,{passive:true});
/* drawer */
var bg=$('#burger'),dr=$('#drawer');
function setDrawer(o){dr.classList.toggle('open',o);dr.setAttribute('aria-hidden',o?'false':'true');bg.setAttribute('aria-expanded',o?'true':'false');d.body.style.overflow=o?'hidden':''}
bg.addEventListener('click',function(){setDrawer(!dr.classList.contains('open'))});
$$('a',dr).forEach(function(a){a.addEventListener('click',function(){setDrawer(false)})});
d.addEventListener('keydown',function(e){if(e.key==='Escape')setDrawer(false)});
/* reveal */
var rv=$$('.rv');
if('IntersectionObserver' in window&&!reduce){var io=new IntersectionObserver(function(es){es.forEach(function(x){if(x.isIntersecting){x.target.classList.add('in');io.unobserve(x.target)}})},{threshold:.12});rv.forEach(function(x){io.observe(x)})}else{rv.forEach(function(x){x.classList.add('in')})}
/* parallax */
var px=$$('[data-px]');
if(px.length&&!reduce){var tick=false;var run=function(){tick=false;px.forEach(function(el){var r=el.parentNode.getBoundingClientRect();var v=(r.top+r.height/2-innerHeight/2)/innerHeight;el.style.setProperty('--py',Math.max(-30,Math.min(30,-v*40))+'px')})};window.addEventListener('scroll',function(){if(!tick){tick=true;requestAnimationFrame(run)}},{passive:true});run()}
/* language */
var AR={};
function setLang(l){var ar=l==='ar';d.documentElement.lang=l;d.documentElement.dir=ar?'rtl':'ltr';
 $$('[data-ar]').forEach(function(el){if(el.getAttribute('data-en')===null)el.setAttribute('data-en',el.textContent);el.textContent=ar?el.getAttribute('data-ar'):el.getAttribute('data-en')});ls('tt-lang',l)}
$('#lang').addEventListener('click',function(){setLang(d.documentElement.lang==='ar'?'en':'ar')});
if(ls('tt-lang')==='ar')setLang('ar');
/* open badge */
var bd=$('#badge');
function hoursFor(dt){var g=dt.getDay();return g===5||g===6?[10,24]:[11,24]}
if(bd){var n=new Date(),h=hoursFor(n),x=n.getHours()+n.getMinutes()/60;bd.textContent=x>=h[0]&&x<h[1]?'Open now':'Closed now'}
/* track */
var tk=$('#track');
if(tk){var sl=$$('.slide',tk),ct=$('#tcount');var upd=function(){var w=sl[0].offsetWidth+20,i=Math.round(Math.abs(tk.scrollLeft)/w);ct.textContent=(Math.min(i,sl.length-1)+1)+' / '+sl.length};
 var go=function(s){var w=sl[0].offsetWidth+20;tk.scrollBy({left:s*w*(d.documentElement.dir==='rtl'?-1:1),behavior:reduce?'auto':'smooth'})};
 $('#tprev').addEventListener('click',function(){go(-1)});$('#tnext').addEventListener('click',function(){go(1)});tk.addEventListener('scroll',upd,{passive:true})}
/* reservation */
var rf=$('#rform');
if(rf){var DN=['Sun','Mon','Tue','Wed','Thu','Fri','Sat'],MN=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
 var st={day:0,g:2,time:null,occ:null},days=$('#days'),times=$('#times'),sum=$('#sum'),now=new Date();
 var dates=[];for(var i=0;i<7;i++){var x=new Date(now.getFullYear(),now.getMonth(),now.getDate()+i);dates.push(x)}
 days.innerHTML='';dates.forEach(function(x,i){var b=d.createElement('button');b.type='button';b.className='chip';b.setAttribute('aria-pressed',i===0?'true':'false');b.textContent=i===0?'Tonight':DN[x.getDay()]+' '+x.getDate();b.addEventListener('click',function(){st.day=i;st.time=null;$$('.chip',days).forEach(function(c,j){c.setAttribute('aria-pressed',j===i?'true':'false')});drawTimes();upSum()});days.appendChild(b)});
 function drawTimes(){times.innerHTML='';var dt=dates[st.day],h=hoursFor(dt),nowH=now.getHours()+now.getMinutes()/60;
  for(var t=h[0];t<23.75;t+=.5){(function(t){var hh=Math.floor(t),mm=t%1?'30':'00',b=d.createElement('button');b.type='button';b.className='chip';var ap=hh>=12?'PM':'AM',h12=hh%12||12;b.textContent=h12+':'+mm+' '+ap;b.setAttribute('aria-pressed',st.time===t?'true':'false');
   if(st.day===0&&t<=nowH+.5)b.disabled=true;b.addEventListener('click',function(){st.time=t;$$('.chip',times).forEach(function(c){c.setAttribute('aria-pressed','false')});b.setAttribute('aria-pressed','true');upSum()});times.appendChild(b)})(t)}}
 function text(){var dt=dates[st.day],hh=st.time===null?null:Math.floor(st.time),mm=st.time%1?'30':'00';
  return st.time===null?'':'Table for '+st.g+', '+(st.day===0?'tonight':DN[dt.getDay()]+' '+dt.getDate()+' '+MN[dt.getMonth()])+', '+((hh%12)||12)+':'+mm+' '+(hh>=12?'PM':'AM')+(st.occ?' ('+st.occ+')':'')}
 function upSum(){sum.textContent=text()}
 $('#gp').addEventListener('click',function(){st.g=Math.min(12,st.g+1);$('#gn').textContent=st.g+(st.g===12?'+':'');upSum()});
 $('#gm').addEventListener('click',function(){st.g=Math.max(1,st.g-1);$('#gn').textContent=st.g;upSum()});
 $$('#occ .chip').forEach(function(c){c.addEventListener('click',function(){var on=c.getAttribute('aria-pressed')==='true';$$('#occ .chip').forEach(function(o){o.setAttribute('aria-pressed','false')});if(!on){c.setAttribute('aria-pressed','true');st.occ=c.getAttribute('data-v')}else st.occ=null;upSum()})});
 function check(){var ok=true;[['rn','rn-e'],['rp','rp-e']].forEach(function(p){var i=$('#'+p[0]),e=$('#'+p[1]),bad=!i.value.trim();i.setAttribute('aria-invalid',bad?'true':'false');e.hidden=!bad;if(bad)ok=false});return ok}
 ['rn','rp'].forEach(function(id){$('#'+id).addEventListener('blur',check)});
 function full(){return text()+'. Name: '+$('#rn').value.trim()+', phone: '+$('#rp').value.trim()}
 $('#copybtn').addEventListener('click',function(){if(!check()||st.time===null){if(st.time===null)sum.textContent='Pick a time first.';return}var s=full();var done=function(){$('#copied').hidden=false};if(navigator.clipboard){navigator.clipboard.writeText(s).then(done,done)}else done()});
 drawTimes();upSum()}
/* menu page */
var mc=$('#mcard');
if(mc){var chips=$$('#chiprow .chip'),secs=$$('.msec',mc);
 var spy=new IntersectionObserver(function(es){es.forEach(function(x){if(x.isIntersecting){var id=x.target.id;chips.forEach(function(c){var on=c.getAttribute('data-sec')===id;c.classList.toggle('on',on);if(on){var r=$('#chiprow');r.scrollTo({left:c.offsetLeft-24,behavior:reduce?'auto':'smooth'})}})}})},{rootMargin:'-140px 0px -70% 0px'});
 secs.forEach(function(s){spy.observe(s)});
 var q=$('#q');q.addEventListener('input',function(){var v=q.value.trim().toLowerCase(),any=false;secs.forEach(function(s){var n=0;$$('.dish',s).forEach(function(li){var m=!v||li.textContent.toLowerCase().indexOf(v)>-1;li.hidden=!m;if(m)n++});s.hidden=!n;if(n)any=true});$('#empty').hidden=any});
 var lb=$('#lb');function open(img,name,desc,price){$('#lb-img').src='img/'+img+'.jpg';$('#lb-img').alt=name;$('#lb-n').textContent=name;$('#lb-d').textContent=desc||'';$('#lb-p').textContent='EGP '+price;lb.showModal()}
 $$('.fav').forEach(function(f){f.addEventListener('click',function(){var n=f.getAttribute('data-name'),it=$$('.dish-in').filter(function(x){return x.getAttribute('data-name')===n})[0];open(f.getAttribute('data-img'),n,it?it.getAttribute('data-desc'):'',f.getAttribute('data-price'))})});
 $$('button.dish-in').forEach(function(b){b.addEventListener('click',function(){open(b.getAttribute('data-img'),b.getAttribute('data-name'),b.getAttribute('data-desc'),b.getAttribute('data-price'))})});
 lb.addEventListener('click',function(e){if(e.target===lb)lb.close()});
 var ty=null;lb.addEventListener('touchstart',function(e){ty=e.touches[0].clientY},{passive:true});lb.addEventListener('touchend',function(e){if(ty!==null&&e.changedTouches[0].clientY-ty>80)lb.close();ty=null})}
})();
