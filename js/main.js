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

// 🔥 Limite para evitar explosão
const MAX_SERES = 250;
const MAX_PREDADORES = 80;

canvas.addEventListener('click', (e) => {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Clique esquerdo cria presa
    if (e.button === 0 && meuMundo.populacao.length < MAX_SERES) {
        meuMundo.populacao.push(new Ser(x, y));
    }

    // Clique direito cria predador
    if (e.button === 2 && meuMundo.predadores.length < MAX_PREDADORES) {
        meuMundo.predadores.push(new Predador(x, y));
    }
});

// Bloqueia menu do botão direito
canvas.addEventListener('contextmenu', e => e.preventDefault());

function loop() {
    meuMundo.atualizar();
    meuMundo.desenhar();

    const pPresas = document.getElementById('count');
    const pPreds = document.getElementById('predCount');

    if (pPresas) pPresas.innerText = meuMundo.populacao.length;
    if (pPreds) pPreds.innerText = meuMundo.predadores.length;

    requestAnimationFrame(loop);
}

loop();
