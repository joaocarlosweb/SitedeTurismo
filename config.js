
// Carousel functionality
let currentSlideIndex = 0;
const totalSlides = 5;

function updateCarousel() {
    const track = document.getElementById('carouselTrack');
    const indicators = document.querySelectorAll('.indicator');
    
    track.style.transform = `translateX(-${currentSlideIndex * 20}%)`;
    
    indicators.forEach((indicator, index) => {
        indicator.classList.toggle('active', index === currentSlideIndex);
    });
}

function nextSlide() {
    currentSlideIndex = (currentSlideIndex + 1) % totalSlides;
    updateCarousel();
}

function previousSlide() {
    currentSlideIndex = (currentSlideIndex - 1 + totalSlides) % totalSlides;
    updateCarousel();
}

function currentSlide(index) {
    currentSlideIndex = index - 1;
    updateCarousel();
}

// Auto-advance carousel
setInterval(nextSlide, 6000);

// Video modal functionality
function playVideo(videoId) {
    const modal = document.getElementById('videoModal') || createVideoModal();
    const videoContent = document.getElementById('videoContent');
    
    const videos = {
        1: `<video controls autoplay>
            <source src="depimento0.mp4" type="video/mp4">
            Seu navegador não suporta o vídeo.
        </video>`,
        2: `<video controls autoplay>
            <source src="depoimento1.mp4" type="video/mp4">
            Seu navegador não suporta o vídeo.
        </video>`,
        3: `<video controls autoplay>
            <source src="depoimento2.mp4" type="video/mp4">
            Seu navegador não suporta o vídeo.
        </video>`,
        4: `<video controls autoplay>
            <source src="depoimento3.mp4" type="video/mp4">
            Seu navegador não suporta o vídeo.
        </video>`,
        5: `<video controls autoplay>
            <source src="depoimento4.mp4" type="video/mp4">
            Seu navegador não suporta o vídeo.
        </video>`
    };
    
    videoContent.innerHTML = videos[videoId] || '<p>Vídeo não encontrado</p>';
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function createVideoModal() {
    const modal = document.createElement('div');
    modal.id = 'videoModal';
    modal.className = 'video-modal';
    modal.innerHTML = `
        <div class="video-container">
            <button class="close-modal" onclick="closeVideoModal()">×</button>
            <div class="video-placeholder" id="videoContent">
                Carregando vídeo...
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    
    // Close modal when clicking outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeVideoModal();
        }
    });
    
    return modal;
}

function closeVideoModal() {
    const modal = document.getElementById('videoModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
        const videoContent = document.getElementById('videoContent');
        if (videoContent) videoContent.innerHTML = ''; // limpa vídeo
    }
}


// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeVideoModal();
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
        }
    });
}, observerOptions);

// Observe all destination cards and features
document.querySelectorAll('.destination-card, .feature').forEach(el => {
    observer.observe(el);
});

// Variáveis para controlar o popup
let popupInterval;
let hasShownFirstTime = false;

// Função para mostrar o popup
function showWhatsAppPopup() {
    const popup = document.getElementById('whatsappPopup');
    if (popup) {
        popup.classList.add('show');
        hasShownFirstTime = true;
        
        // Auto-fechar após 15 segundos se não houver interação
        setTimeout(() => {
            if (popup.classList.contains('show')) {
                closePopup();
            }
        }, 15000);
    }
}

// Função para fechar o popup
function closePopup() {
    const popup = document.getElementById('whatsappPopup');
    if (popup) {
        popup.classList.remove('show');
        popup.classList.add('hide');
        
        // Remover classe hide após animação
        setTimeout(() => {
            popup.classList.remove('hide');
        }, 300);
        
        // Se já foi mostrado pela primeira vez, configurar intervalo de 1 minuto
        if (hasShownFirstTime) {
            startPopupInterval();
        }
    }
}

// Função para iniciar o intervalo de 1 minuto
function startPopupInterval() {
    // Limpar qualquer intervalo anterior
    if (popupInterval) {
        clearInterval(popupInterval);
    }
    
    // Configurar novo intervalo de 1 minuto (60000 ms)
    popupInterval = setInterval(() => {
        showWhatsAppPopup();
    }, 60300);
}

// Função para reabrir o popup ao clicar no botão flutuante
function reopenPopup() {
    const popup = document.getElementById('whatsappPopup');
    if (popup && !popup.classList.contains('show')) {
        showWhatsAppPopup();
    }
}

// Função para parar o intervalo (útil se o usuário responder)
function stopPopupInterval() {
    if (popupInterval) {
        clearInterval(popupInterval);
        popupInterval = null;
    }
}

// Inicializar o popup após 7 segundos (primeira vez)
setTimeout(showWhatsAppPopup, 15000);

// Adicionar evento de clique no botão flutuante para reabrir popup
document.querySelector('.floating-whatsapp').addEventListener('click', (e) => {
    e.preventDefault();
    reopenPopup();
});

// Fechar popup ao clicar fora dele
document.addEventListener('click', (e) => {
    const popup = document.getElementById('whatsappPopup');
    if (popup && popup.classList.contains('show') && !popup.contains(e.target)) {
        closePopup();
    }
});

// Prevenir fechamento ao clicar dentro do popup
document.getElementById('whatsappPopup').addEventListener('click', (e) => {
    e.stopPropagation();
});

// Parar o intervalo quando o usuário clicar no botão "Responder"
document.querySelector('.popup-btn.primary').addEventListener('click', () => {
    stopPopupInterval();
});

// Opcional: Parar o intervalo quando a página perder o foco (usuário saiu da aba)
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        stopPopupInterval();
    } else if (hasShownFirstTime) {
        // Reiniciar o intervalo quando voltar à aba
        startPopupInterval();
    }
});


// Mostrar banner se ainda não aceitou
  window.onload = function () {
    if (!localStorage.getItem("cookiesAceitos")) {
      document.getElementById("cookie-banner").classList.remove("hidden");
    }
  };

  function aceitarCookies() {
    localStorage.setItem("cookiesAceitos", "true");
    document.getElementById("cookie-banner").classList.add("hidden");
  }