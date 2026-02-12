import Mundo from './mundo.js';
import Ser from './ser.js';
import Predador from './predador.js';



const canvas = document.getElementById('simulador');
canvas.width = window.innerWidth * 0.8;
canvas.height = window.innerHeight * 0.8;

const meuMundo = new Mundo(canvas);

// main.js

// ... const meuMundo = new Mundo(canvas);

// 1. Gera uma fartura inicial de comida (ex: 50 unidades)
for (let i = 0; i < 50; i++) {
    meuMundo.gerarComida();
}

// 2. Agora sim, cria os 20 seres iniciais
for (let i = 0; i < 5; i++) {
    meuMundo.populacao.push(new Ser(Math.random() * canvas.width, Math.random() * canvas.height));
}

// População inicial
for (let i = 0; i < 5; i++) {
    meuMundo.populacao.push(new Ser(Math.random() * canvas.width, Math.random() * canvas.height));
}
// ... após criar a população de seres
meuMundo.predadores.push(new Predador(100, 100));
// Dentro da sua função loop()
function loop() {
    meuMundo.atualizar();
    meuMundo.desenhar();

    // 1. Tenta pegar os elementos
    const elementoPresas = document.getElementById('count');
    const elementoPredadores = document.getElementById('predCount');

    // 2. SÓ atualiza se eles existirem (evita o erro de 'null')
    if (elementoPresas) {
        elementoPresas.innerText = meuMundo.populacao.length;
    }
    
    if (elementoPredadores) {
        elementoPredadores.innerText = meuMundo.predadores.length;
    }

    requestAnimationFrame(loop);
}

canvas.addEventListener('mousedown', (event) => {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    if (event.button === 0) { 
        // Botão Esquerdo: Cria PREDADOR
        meuMundo.predadores.push(new Predador(x, y));
    } else if (event.button === 2) { 
        // Botão Direito: Cria SER COMUM (Presa)
        meuMundo.populacao.push(new Ser(x, y));
    }
});

// Desativa o menu de contexto do Windows ao clicar com o botão direito
canvas.oncontextmenu = (e) => e.preventDefault();

// Impede o menu de contexto no clique direito para não atrapalhar
canvas.oncontextmenu = (e) => e.preventDefault();

loop();