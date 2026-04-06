// ─── 1. LIGHT / DARK MODE ───────────────────────
const themeBtn  = document.getElementById('themeBtn');
const themeIcon = document.getElementById('themeIcon');
const html      = document.documentElement;

let currentTheme = localStorage.getItem('rolo-theme') || 'dark';
applyTheme(currentTheme);

function applyTheme(theme) {
  html.setAttribute('data-theme', theme);
  if (themeIcon) themeIcon.textContent = theme === 'dark' ? '🌙' : '☀️';
  localStorage.setItem('rolo-theme', theme);
  currentTheme = theme;
}

if (themeBtn) {
  themeBtn.addEventListener('click', () => {
    const novoTema = currentTheme === 'dark' ? 'light' : 'dark';
    applyTheme(novoTema);
  });
}

// ─── 2. VERIFICAÇÃO DE IDADE ─────────────────────
function checkAge() {
  const resposta = prompt('Qual é a sua idade?');

  if (resposta === null || resposta.trim() === '') {
    alert('⚠️ Você precisa informar sua idade para acessar esta página.');
    return;
  }

  const idade = parseInt(resposta);

  if (isNaN(idade)) {
    alert('⚠️ Por favor, insira um número válido.');
    return;
  }

  if (idade >= 13) {
    alert('✅ Acesso liberado! Bem-vindo à página de contato do Rolo!');
    liberarConteudo();
  } else if (idade > 0) {
    alert('❌ Acesso restrito. Esta página é para maiores de 13 anos.');
  } else {
    alert('⚠️ Idade inválida. Insira um valor entre 1 e 120.');
  }
}

function liberarConteudo() {
  const contactContent = document.getElementById('contactContent');
  const ageGate        = document.getElementById('ageGate');
  if (contactContent) {
    contactContent.style.filter        = 'none';
    contactContent.style.pointerEvents = 'auto';
  }
  if (ageGate) ageGate.style.display = 'none';
  sessionStorage.setItem('rolo-age-ok', 'true');
}

if (sessionStorage.getItem('rolo-age-ok') === 'true') {
  liberarConteudo();
}

// ─── 3. FORMULÁRIO DE CONTATO ────────────────────
function sendForm() {
  const nome  = document.getElementById('userName');
  const email = document.getElementById('userEmail');
  const msg   = document.getElementById('userMsg');

  if (!nome  || nome.value.trim()  === '') { alert('⚠️ Informe seu nome.');   return; }
  if (!email || email.value.trim() === '') { alert('⚠️ Informe seu e-mail.'); return; }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.value.trim())) {
    alert('⚠️ E-mail inválido. Ex: seu@email.com');
    return;
  }

  if (!msg || msg.value.trim() === '') { alert('⚠️ Escreva uma mensagem.'); return; }

  alert(`✅ Mensagem enviada!\n\nObrigado, ${nome.value.trim()}! 🎮\nRetornaremos para ${email.value.trim()} em breve.`);

  nome.value  = '';
  email.value = '';
  msg.value   = '';
}

// ─── 4. VERIFICAÇÃO DE ANO DE LANÇAMENTO ─────────
const ANO_LANCAMENTO = 2025;

function verificarLancamento() {
  const launchStatus = document.getElementById('launchStatus');
  if (!launchStatus) return;

  const anoAtual = new Date().getFullYear();

  if (anoAtual < ANO_LANCAMENTO) {
    launchStatus.textContent = `🕐 Lançamento previsto para ${ANO_LANCAMENTO}.`;
    launchStatus.style.color = 'var(--yellow)';
  } else if (anoAtual === ANO_LANCAMENTO) {
    launchStatus.textContent = `🚀 LANÇAMENTO EM ${ANO_LANCAMENTO}! Disponível agora!`;
    launchStatus.style.color = 'var(--green)';
    setTimeout(() => {
      alert(`🎉 GRANDE LANÇAMENTO!\nRolo foi lançado em ${ANO_LANCAMENTO}!`);
    }, 1000);
  } else {
    launchStatus.textContent = `✅ Lançado em ${ANO_LANCAMENTO}. Já disponível!`;
    launchStatus.style.color = 'var(--green)';
  }
}

verificarLancamento();

// ─── 5. ANIMAÇÃO DE ENTRADA DOS CARDS ────────────
const animTargets = document.querySelectorAll(
  '.feature-card, .char-card, .world-card, .mech-item, .info-block'
);

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity   = '1';
      entry.target.style.transform = 'translateY(0)';
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

animTargets.forEach(el => {
  el.style.opacity    = '0';
  el.style.transform  = 'translateY(20px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  observer.observe(el);
});

// ─── 6. NAVBAR SCROLL EFFECT ─────────────────────
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  if (!navbar) return;
  navbar.style.boxShadow = window.scrollY > 20
    ? '0 4px 24px rgba(0,0,0,0.25)'
    : 'none';
});