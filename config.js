
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
setInterval(nextSlide, 5000);

// Video modal functionality
function playVideo(videoId) {
    const modal = document.getElementById('videoModal') || createVideoModal();
    const videoContent = document.getElementById('videoContent');
    
    const videos = {
        1: 'Vídeo de Fernando de Noronha\n\n🎬 Aqui seria exibido um vídeo real mostrando:\n• Mergulho com golfinhos\n• Praias cristalinas\n• Pores do sol espetaculares\n• Depoimentos dos clientes',
        2: 'Vídeo da Chapada Diamantina\n\n🎬 Aqui seria exibido um vídeo real mostrando:\n• Trilhas e cachoeiras\n• Paisagens deslumbrantes\n• Aventuras radicais\n• Momentos únicos dos visitantes',
        3: 'Vídeo dos Lençóis Maranhenses\n\n🎬 Aqui seria exibido um vídeo real mostrando:\n• Dunas e lagoas cristalinas\n• Voos de drone\n• Experiências únicas\n• Testemunhos emocionantes',
        4: 'Vídeo de Jericoacoara\n\n🎬 Aqui seria exibido um vídeo real mostrando:\n• Pôr do sol na Pedra Furada\n• Kitesurf e windsurf\n• Buggy nas dunas\n• Momentos mágicos dos clientes',
        5: 'Vídeo do Pantanal\n\n🎬 Aqui seria exibido um vídeo real mostrando:\n• Safari fotográfico\n• Onças e vida selvagem\n• Pescarias esportivas\n• Aventuras inesquecíveis'
    };
    
    videoContent.textContent = videos[videoId] || 'Vídeo não encontrado';
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
    }, 60000);
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
setTimeout(showWhatsAppPopup, 7000);

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
