// Allegati della tesi: filtro delle tavole, filtro nelle interviste, copia del collegamento a un segmento, ricerca in tutte le interviste.
(function(){
  // la linea di suolo sotto il titolo si disegna all'apertura della pagina
  setTimeout(function(){document.querySelectorAll('.sotto.via').forEach(function(x){x.classList.remove('via');});},150);
  function norm(s){return (s||'').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g,'');}
  // filtro di una tavola: <input data-filtra="idtavola">
  document.querySelectorAll('input[data-filtra]').forEach(function(inp){
    var tb=document.getElementById(inp.dataset.filtra), conta=document.getElementById(inp.dataset.filtra+'-conta');
    var righe=tb?Array.prototype.slice.call(tb.querySelectorAll('tbody tr')):[];
    function f(){var q=norm(inp.value).trim(), n=0; righe.forEach(function(r){var ok=!q||norm(r.textContent).indexOf(q)>=0; r.classList.toggle('nascosto',!ok); if(ok)n++;}); if(conta)conta.textContent=n+' righe su '+righe.length;}
    inp.addEventListener('input',f); f();
  });
  // filtro dei segmenti di una intervista
  var fi=document.getElementById('filtro-segmenti');
  if(fi){var segs=Array.prototype.slice.call(document.querySelectorAll('.seg')), c=document.getElementById('filtro-conta');
    fi.addEventListener('input',function(){var q=norm(fi.value).trim(),n=0; segs.forEach(function(s){var ok=!q||norm(s.textContent).indexOf(q)>=0; s.style.display=ok?'':'none'; if(ok)n++;}); c.textContent=q?n+' segmenti':'';});}
  // clic sull'etichetta del segmento: copia il collegamento
  document.querySelectorAll('.seg .sid').forEach(function(a){a.addEventListener('click',function(){var u=location.href.split('#')[0]+'#'+a.dataset.id; if(navigator.clipboard)navigator.clipboard.writeText(u);});});
  // ricerca in tutte le interviste
  var q=document.getElementById('cerca-tutto'), out=document.getElementById('risultati');
  if(q&&window.INDICE){q.addEventListener('input',function(){var t=norm(q.value).trim(); out.innerHTML=''; if(t.length<3)return; var r=window.INDICE.filter(function(x){return norm(x.t).indexOf(t)>=0;}).slice(0,200);
    out.innerHTML='<p class="muto">'+r.length+(r.length===200?'+':'')+' segmenti</p>'+r.map(function(x){var i=norm(x.t).indexOf(t), s=Math.max(0,i-90); return '<p class="seg"><a class="sid" href="'+x.u+'#'+x.id+'">'+x.id+'</a><b>'+x.v+'</b>, '+x.s+'. … '+x.t.substring(s,i+t.length+140).replace(/</g,'&lt;')+' …</p>';}).join('');});}
})();
