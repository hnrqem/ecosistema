export default class Mundo {
    constructor(canvas, largura, altura) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.largura = largura;
        this.altura = altura;

        this.populacao = [];
        this.predadores = [];
        this.comidas = [];

        this.MAX_COMIDA = 200;
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
        // PRESAS
        for (let i = this.populacao.length - 1; i >= 0; i--) {
            let s = this.populacao[i];
            s.viver(this.comidas, this.predadores);
            s.checarBordas();

            if (s.energia <= 0) {
                this.populacao.splice(i, 1);
            }
        }

        // PREDADORES
        for (let i = this.predadores.length - 1; i >= 0; i--) {
            let p = this.predadores[i];
            p.viver(this.populacao);
            p.checarBordas();

            if (p.energia <= 0) {
                this.predadores.splice(i, 1);
            }
        }

        if (Math.random() < 0.03) this.gerarComida();
    }

    desenhar() {
        this.ctx.fillStyle = 'rgba(10, 10, 30, 0.4)';
        this.ctx.fillRect(0, 0, this.largura, this.altura);

        // Comida
        for (let i = 0; i < this.comidas.length; i++) {
            const c = this.comidas[i];
            this.ctx.fillStyle = '#4ae216';
            this.ctx.beginPath();
            this.ctx.arc(c.x, c.y, 2, 0, Math.PI * 2);
            this.ctx.fill();
        }

        // Presas
        for (let i = 0; i < this.populacao.length; i++) {
            const s = this.populacao[i];
            const tamanho = Math.max(2, s.energia / 25);

            this.ctx.fillStyle = s.dna.cor;
            this.ctx.beginPath();
            this.ctx.arc(s.x, s.y, tamanho, 0, Math.PI * 2);
            this.ctx.fill();
        }

        // Predadores
        for (let i = 0; i < this.predadores.length; i++) {
            const p = this.predadores[i];
            const tamPred = Math.max(4, p.energia / 20);

            this.ctx.fillStyle = '#ff0000';
            this.ctx.fillRect(
                p.x - tamPred,
                p.y - tamPred,
                tamPred * 2,
                tamPred * 2
            );
        }
    }
}
