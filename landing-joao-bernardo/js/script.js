/* ===== CARROSSEL DE DEPOIMENTOS ===== */
var currentSlide = 0;
var totalSlides = 2;

function updateCarousel() {
  var cards = document.querySelectorAll('.test-card');
  cards.forEach(function(card) {
    card.style.display = (parseInt(card.dataset.slide) === currentSlide) ? 'block' : 'none';
  });
  document.querySelectorAll('.carousel-dot').forEach(function(dot, i) {
    dot.classList.toggle('active', i === currentSlide);
  });
}

function changeSlide(dir) {
  currentSlide = (currentSlide + dir + totalSlides) % totalSlides;
  updateCarousel();
}

function goToSlide(n) {
  currentSlide = n;
  updateCarousel();
}

/* ===== FORMULÁRIO — TOGGLE DE SITUAÇÃO ===== */
function selectToggle(el) {
  el.closest('.toggle-group').querySelectorAll('.toggle-btn').forEach(function(b) {
    b.classList.remove('active');
  });
  el.classList.add('active');
}

/* ===== FORMULÁRIO — ENVIO PARA WHATSAPP ===== */
function enviarWhatsApp() {
  var nome     = document.getElementById('f-nome').value.trim();
  var nasc     = document.getElementById('f-nasc').value;
  var cidade   = document.getElementById('f-cidade').value.trim();
  var situacao = document.querySelector('.toggle-btn.active')
                   ? document.querySelector('.toggle-btn.active').textContent.trim()
                   : '';
  var assunto  = document.getElementById('f-assunto').value;
  var msg      = document.getElementById('f-msg').value.trim();

  if (!nome)    { alert('Por favor, informe seu nome completo.'); return; }
  if (!assunto) { alert('Por favor, selecione o assunto.'); return; }

  var texto = '\uD83D\uDC4B *Olá, Dr. João! Gostaria de iniciar um atendimento.*\n\n';
  texto += '*Nome:* ' + nome + '\n';
  if (nasc)     texto += '*Nascimento:* ' + nasc + '\n';
  if (cidade)   texto += '*Cidade:* ' + cidade + '\n';
  if (situacao) texto += '*Situação:* ' + situacao + '\n';
  texto += '*Assunto:* ' + assunto + '\n';
  if (msg)      texto += '*Detalhes:* ' + msg + '\n';

  var url = 'https://wa.me/55?text=' + encodeURIComponent(texto);
  window.open(url, '_blank');
}

/* ===== INICIALIZAÇÃO ===== */
document.addEventListener('DOMContentLoaded', function() {
  updateCarousel();
});