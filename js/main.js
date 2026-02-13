import Mundo from './mundo.js';
import Ser from './ser.js';
import Predador from './predador.js';

const canvas = document.getElementById('simulador');
canvas.width = 1100;
canvas.height = 800;

const meuMundo = new Mundo(canvas, 1100, 800);

// População inicial
for (let i = 0; i < 20; i++) {
    meuMundo.populacao.push(
        new Ser(Math.random() * 1100, Math.random() * 800)
    );
}

const MAX_SERES = 300;
const MAX_PREDADORES = 100;

// Clique do mouse
canvas.addEventListener('mousedown', (e) => {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (e.button === 0) { // ESQUERDO = Presa
        if (meuMundo.populacao.length < MAX_SERES) {
            meuMundo.populacao.push(new Ser(x, y));
        }
    }

    if (e.button === 2) { // DIREITO = Predador
        if (meuMundo.predadores.length < MAX_PREDADORES) {
            meuMundo.predadores.push(new Predador(x, y));
        }
    }
});

// Bloqueia menu do botão direito
canvas.addEventListener('contextmenu', e => e.preventDefault());

function loop() {
    meuMundo.atualizar();
    meuMundo.desenhar();

    document.getElementById('count').innerText = meuMundo.populacao.length;
    document.getElementById('predCount').innerText = meuMundo.predadores.length;
    document.getElementById('foodCount').innerText = meuMundo.comidas.length;

    requestAnimationFrame(loop);
}

loop();
