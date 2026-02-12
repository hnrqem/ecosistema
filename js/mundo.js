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
        // 1. Atualiza as Presas
        for (let i = this.populacao.length - 1; i >= 0; i--) {
            let s = this.populacao[i];
            s.viver(this.comidas, this.predadores);
            s.checarBordas(this.largura, this.altura);

            if (s.energia <= 0) {
                this.populacao.splice(i, 1);
            }
        }

        // 2. Atualiza os Predadores
        for (let i = this.predadores.length - 1; i >= 0; i--) {
            let p = this.predadores[i];
            p.viver(this.populacao);
            p.checarBordas(this.largura, this.altura);

            if (p.energia <= 0) {
                this.predadores.splice(i, 1);
            }
        }

        // 3. Nasce comida (5% de chance)
        if (Math.random() < 0.05) {
            this.gerarComida();
        }
    }

    desenhar() {
        // Fundo com rastro neon
        const grad = this.ctx.createRadialGradient(
            this.largura / 2, this.altura / 2, 0,
            this.largura / 2, this.altura / 2, this.largura
        );
        grad.addColorStop(0, '#1a1a2e');
        grad.addColorStop(1, '#020205');
        
        this.ctx.fillStyle = grad;
        this.ctx.globalAlpha = 0.4;
        this.ctx.fillRect(0, 0, this.largura, this.altura);
        this.ctx.globalAlpha = 1.0;

        // Desenha Comida
        this.comidas.forEach(c => {
            this.ctx.fillStyle = '#4ae216';
            this.ctx.beginPath();
            this.ctx.arc(c.x, c.y, 2, 0, Math.PI * 2);
            this.ctx.fill();
        });

        // Desenha Presas
        this.populacao.forEach(s => {
            const r = Math.min(10, Math.max(2, s.energia / 20));
            this.ctx.shadowBlur = 10;
            this.ctx.shadowColor = s.dna.cor;
            this.ctx.fillStyle = s.dna.cor;
            this.ctx.beginPath();
            this.ctx.arc(s.x, s.y, r, 0, Math.PI * 2);
            this.ctx.fill();
        });

        // Desenha Predadores
        this.predadores.forEach(p => {
            const tam = Math.min(12, Math.max(4, p.energia / 15));
            this.ctx.shadowBlur = 15;
            this.ctx.shadowColor = '#ff0000';
            this.ctx.fillStyle = '#ff0000';
            this.ctx.fillRect(p.x - tam, p.y - tam, tam * 2, tam * 2);
            this.ctx.strokeStyle = 'white';
            this.ctx.lineWidth = 2;
            this.ctx.strokeRect(p.x - tam, p.y - tam, tam * 2, tam * 2);
        });
        
        this.ctx.shadowBlur = 0;
    }
}
