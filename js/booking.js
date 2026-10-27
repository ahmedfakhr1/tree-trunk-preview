(function(){
var d=document,$=function(s,c){return(c||d).querySelector(s)},$$=function(s,c){return Array.prototype.slice.call((c||d).querySelectorAll(s))};
function hoursFor(dt){var g=dt.getDay();return g===5||g===6?[10,24]:[11,24]}
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
})();
