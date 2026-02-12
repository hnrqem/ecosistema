import Ser from './ser.js';

export default class Mundo {
    constructor(canvas) {
        this.ctx = canvas.getContext('2d');
        this.largura = canvas.width;
        this.altura = canvas.height;
        this.populacao = [];
        this.comidas = [];
        this.predadores = [];
    }

    atualizar() {
    // 1. Ciclo das Presas (Seres)
    for (let i = this.populacao.length - 1; i >= 0; i--) {
        this.populacao[i].viver(this.comidas);
        if (this.populacao[i].energia <= 0) this.populacao.splice(i, 1);
    }

    // 2. Ciclo dos Predadores (Caçadores)
    for (let i = this.predadores.length - 1; i >= 0; i--) {
        // O predador "vive" caçando a população de seres
        this.predadores[i].viver(this.populacao); 
        
        if (this.predadores[i].energia <= 0) {
            this.predadores.splice(i, 1);
        }
    }

    if (Math.random() < 0.15) this.gerarComida();
}

    gerarComida() {
        this.comidas.push({
            x: Math.random() * this.largura,
            y: Math.random() * this.altura
        });
    }

    // VEJA SE ESTE MÉTODO ESTÁ EXATAMENTE AQUI:
    desenhar() {
    const gradient = this.ctx.createRadialGradient(
        this.largura / 2, this.altura / 2, 50, 
        this.largura / 2, this.altura / 2, this.largura
    );
    gradient.addColorStop(0, '#1a1a2e'); // Azul bem escuro no centro
    gradient.addColorStop(1, '#0f0f1b'); // Quase preto nas bordas

    this.ctx.fillStyle = gradient;
    this.ctx.globalAlpha = 0.4; // Ajuste para o rastro ficar suave
    this.ctx.fillRect(0, 0, this.largura, this.altura);
    this.ctx.globalAlpha = 1.0;

    // Para a Comida (Brilho Verde)
this.ctx.shadowBlur = 10;
this.ctx.shadowColor = '#4ae216';
// ... código de desenhar comida ...

// Para os Seres (Brilho na cor do DNA)
this.populacao.forEach(ser => {
    this.ctx.shadowBlur = 15;
    this.ctx.shadowColor = ser.dna.cor;
    // ... código de desenhar ser ...
});

// Importante: Desligue o brilho após desenhar para não pesar o processamento
this.ctx.shadowBlur = 0;

    // 2. Desenhar Comidas (pontinhos verdes)
    this.comidas.forEach(comida => {
        this.ctx.fillStyle = '#4ae216';
        this.ctx.beginPath();
        this.ctx.arc(comida.x, comida.y, 3, 0, Math.PI * 2);
        this.ctx.fill();
    });

    // 3. Desenhar Presas (Círculos coloridos)
    this.populacao.forEach(ser => {
        const tamanho = Math.max(2, ser.energia / 20);
        this.ctx.fillStyle = ser.dna.cor;
        this.ctx.beginPath();
        this.ctx.arc(ser.x, ser.y, tamanho, 0, Math.PI * 2);
        this.ctx.fill();
    });

    // 4. Desenhar Predadores (Círculos vermelhos e maiores)
    // mundo.js (método desenhar)
this.predadores.forEach(predador => {
    const tamanho = Math.max(4, predador.energia / 15);
    
    this.ctx.fillStyle = predador.dna.cor;
    
    // Desenha um QUADRADO em vez de círculo para o predador
    this.ctx.fillRect(
        predador.x - tamanho, 
        predador.y - tamanho, 
        tamanho * 2, 
        tamanho * 2
    );

    // Borda branca para dar destaque
    this.ctx.strokeStyle = 'white';
    this.ctx.strokeRect(
        predador.x - tamanho, 
        predador.y - tamanho, 
        tamanho * 2, 
        tamanho * 2
    );
});
}
}
// Fechamento da classe