export default class Mundo {
    constructor(canvas, largura, altura) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.largura = largura;
        this.altura = altura;

        this.populacao = [];
        this.predadores = [];
        this.comidas = [];

        this.MAX_COMIDA = 250;
    }

    gerarComida() {
        if (this.comidas.length < this.MAX_COMIDA) {
            this.comidas.push({
                x: Math.random() * this.largura,
                y: Math.random() * this.altura
            });
        }
    }

    atualizar() {

        for (let i = this.populacao.length - 1; i >= 0; i--) {
            let s = this.populacao[i];
            s.viver(this.comidas, this.predadores);
            s.checarBordas();

            if (s.energia <= 0) {
                this.populacao.splice(i, 1);
            }
        }

        for (let i = this.predadores.length - 1; i >= 0; i--) {
            let p = this.predadores[i];
            p.viver(this.populacao);
            p.checarBordas();

            if (p.energia <= 0) {
                this.predadores.splice(i, 1);
            }
        }

        if (Math.random() < 0.07) this.gerarComida();
    }

    desenhar() {
        // Fundo com leve rastro
        this.ctx.fillStyle = 'rgba(8, 8, 20, 0.35)';
        this.ctx.fillRect(0, 0, this.largura, this.altura);

        // Comida
        for (let i = 0; i < this.comidas.length; i++) {
            const c = this.comidas[i];
            this.ctx.fillStyle = '#4ae216';
            this.ctx.beginPath();
            this.ctx.arc(c.x, c.y, 3, 0, Math.PI * 2);
            this.ctx.fill();
        }

        // Presas (MAIORES visualmente)
        for (let i = 0; i < this.populacao.length; i++) {
            const s = this.populacao[i];

            const tamanhoBase = 6; // 🔥 maior que antes
            const tamanhoEnergia = Math.max(0, s.energia / 40);
            const tamanhoFinal = tamanhoBase + tamanhoEnergia;

            this.ctx.fillStyle = s.dna.cor;
            this.ctx.beginPath();
            this.ctx.arc(s.x, s.y, tamanhoFinal, 0, Math.PI * 2);
            this.ctx.fill();
        }

        // Predadores
        for (let i = 0; i < this.predadores.length; i++) {
            const p = this.predadores[i];

            const tamanhoBase = 8;
            const tamanhoEnergia = Math.max(0, p.energia / 35);
            const tam = tamanhoBase + tamanhoEnergia;

            this.ctx.fillStyle = '#ff2b2b';
            this.ctx.shadowBlur = 15;
            this.ctx.shadowColor = '#ff0000';

            this.ctx.fillRect(
                p.x - tam,
                p.y - tam,
                tam * 2,
                tam * 2
            );

            this.ctx.shadowBlur = 0;
        }
    }
}

