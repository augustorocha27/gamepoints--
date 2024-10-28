let pontos = 0;
const randomButton = document.getElementById('random-button');
const pointsDisplay = document.getElementById('points');
const carousel = document.querySelector('.carousel');
const items = document.querySelectorAll('.carousel-item');
const itemWidth = items[0].offsetWidth + 10; // Largura do item + margem
let currentIndex = 0;

// Duplicando os itens para criar o efeito de looping contínuo
carousel.innerHTML += carousel.innerHTML;
const totalItems = document.querySelectorAll('.carousel-item').length;

// Função para gerar um número aleatório entre 10 e 100 que termina em 0
function gerarPontosAleatorios() {
    const valores = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
    return valores[Math.floor(Math.random() * valores.length)];
}

// Função para mostrar o botão no canto superior esquerdo do vídeo
function mostrarBotao() {
    randomButton.classList.remove('hidden');
}

// Evento para adicionar pontos aleatórios e somá-los
randomButton.addEventListener('click', () => {
    const pontosGanhados = gerarPontosAleatorios();
    pontos += pontosGanhados;

    // Salva os pontos no localStorage para exibir na loja
    localStorage.setItem('pontos', pontos);
    randomButton.classList.add('hidden');
    setTimeout(mostrarBotao, Math.random() * 3000 + 2000); // Botão reaparece entre 2 e 5 segundos
});

// Inicializa o botão
setTimeout(mostrarBotao, 2000);

// Função para mover o carrossel continuamente
function moveCarousel() {
    currentIndex++;

    // Checa se o carrossel chegou ao final da lista duplicada
    if (currentIndex >= totalItems / 2) {
        carousel.style.transition = 'none'; // Remove a animação
        currentIndex = 0; // Volta ao início
        carousel.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
        setTimeout(() => {
            carousel.style.transition = 'transform 0.5s ease'; // Restaura a animação
        }, 50); // Pequeno atraso para que o CSS aplique a mudança de transição
    } else {
        carousel.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
    }
}

// Define o intervalo para mover o carrossel
setInterval(moveCarousel, 3000); // Troca a imagem a cada 3 segundos
