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
    //ciclo de vida das presas 
    for (let i = this.populacao.length - 1; i >= 0; i--) {
        this.populacao[i].viver(this.comidas);
        if (this.populacao[i].energia <= 0) this.populacao.splice(i, 1);
    }

    //ciclo dos Predadores
    for (let i = this.predadores.length - 1; i >= 0; i--) {
        this.predadores[i].viver(this.populacao); 
        
        if (this.predadores[i].energia <= 0) {
            this.predadores.splice(i, 1);
        }
    }

    if (Math.random() < 0.15) this.gerarComida();
}
    // mundo.js -> no método atualizar()
this.populacao.forEach(ser => {
    // Passamos a comida E os predadores para o ser decidir o que fazer
    ser.viver(this.comidas, this.predadores); 
});

    gerarComida() {
        this.comidas.push({
            x: Math.random() * this.largura,
            y: Math.random() * this.altura
        });
    }

    desenhar() {
    const gradient = this.ctx.createRadialGradient(
        this.largura / 2, this.altura / 2, 50, 
        this.largura / 2, this.altura / 2, this.largura
    );
    gradient.addColorStop(0, '#1a1a2e'); 
    gradient.addColorStop(1, '#0f0f1b'); 

    this.ctx.fillStyle = gradient;
    this.ctx.globalAlpha = 0.4; // rastro
    this.ctx.fillRect(0, 0, this.largura, this.altura);
    this.ctx.globalAlpha = 1.0;

    //comida
this.ctx.shadowBlur = 10;
this.ctx.shadowColor = '#4ae216';

//presas
this.populacao.forEach(ser => {
    this.ctx.shadowBlur = 15;
    this.ctx.shadowColor = ser.dna.cor;
});

this.ctx.shadowBlur = 0;

    //desenhar comidas (pontinhos verdes)
    this.comidas.forEach(comida => {
        this.ctx.fillStyle = '#4ae216';
        this.ctx.beginPath();
        this.ctx.arc(comida.x, comida.y, 3, 0, Math.PI * 2);
        this.ctx.fill();
    });

    //desenhar dresas
    this.populacao.forEach(ser => {
        const tamanho = Math.max(2, ser.energia / 20);
        this.ctx.fillStyle = ser.dna.cor;
        this.ctx.beginPath();
        this.ctx.arc(ser.x, ser.y, tamanho, 0, Math.PI * 2);
        this.ctx.fill();
    });

    //desenhar predadores
this.predadores.forEach(predador => {
    const tamanho = Math.max(4, predador.energia / 15);
    
    this.ctx.fillStyle = predador.dna.cor;
    
    //forma predadores
    this.ctx.fillRect(
        predador.x - tamanho, 
        predador.y - tamanho, 
        tamanho * 2, 
        tamanho * 2
    );

    // borda branca
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


