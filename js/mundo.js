export default class Mundo {
    constructor(canvas, largura, altura) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.largura = largura;
        this.altura = altura;
        this.populacao = [];
        this.predadores = [];
        this.comidas = [];
    }

    gerarComida() {
        this.comidas.push({
            x: Math.random() * this.largura,
            y: Math.random() * this.altura
        });
    }

    atualizar() {
        // Ciclo das Presas
        for (let i = this.populacao.length - 1; i >= 0; i--) {
            this.populacao[i].viver(this.comidas, this.predadores);
            if (this.populacao[i].energia <= 0) this.populacao.splice(i, 1);
        }

        // Ciclo dos Predadores
        for (let i = this.predadores.length - 1; i >= 0; i--) {
            this.predadores[i].viver(this.populacao);
            if (this.predadores[i].energia <= 0) this.predadores.splice(i, 1);
        }

        if (Math.random() < 0.04) this.gerarComida(); // Menos comida
    }

    desenhar() {
        // Fundo Neon Gradiente
        const grad = this.ctx.createRadialGradient(this.largura/2, this.altura/2, 0, this.largura/2, this.altura/2, this.largura);
        grad.addColorStop(0, '#1a1a2e');
        grad.addColorStop(1, '#020205');
        this.ctx.fillStyle = grad;
        this.ctx.globalAlpha = 0.3; // Rastro
        this.ctx.fillRect(0, 0, this.largura, this.altura);
        this.ctx.globalAlpha = 1.0;

        this.ctx.shadowBlur = 0;

        // Comidas
        this.comidas.forEach(c => {
            this.ctx.fillStyle = '#4ae216';
            this.ctx.beginPath();
            this.ctx.arc(c.x, c.y, 2, 0, Math.PI * 2);
            this.ctx.fill();
        });

        // Presas (Círculos)
        this.populacao.forEach(s => {
            const r = Math.min(10, Math.max(2, s.energia / 15));
            this.ctx.shadowBlur = 10;
            this.ctx.shadowColor = s.dna.cor;
            this.ctx.fillStyle = s.dna.cor;
            this.ctx.beginPath();
            this.ctx.arc(s.x, s.y, r, 0, Math.PI * 2);
            this.ctx.fill();
        });

        // Predadores (Quadrados Neon)
        this.predadores.forEach(p => {
            const tam = Math.min(12, Math.max(4, p.energia / 12));
            this.ctx.shadowBlur = 15;
            this.ctx.shadowColor = '#ff0000';
            this.ctx.fillStyle = '#ff0000';
            this.ctx.fillRect(p.x - tam, p.y - tam, tam*2, tam*2);
            this.ctx.strokeStyle = 'white';
            this.ctx.strokeRect(p.x - tam, p.y - tam, tam*2, tam*2);
        });
        
        this.ctx.shadowBlur = 0;
    }
}
