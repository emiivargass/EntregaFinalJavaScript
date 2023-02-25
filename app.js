
let palabras2;
let cant_errores = 0; ///cuantas veces me equivoque
let cant_aciertos = 0; ///cuantas letras adivine

const palabras = [
    'campanas',     /*0*/
    'llavero',      /*1*/
    'messi',        /*2*/
    'cereza',       /*3*/
    'fiat',         /*4*/
    'camion',       /*5*/
    'camioneta',    /*6*/
    'festival',     /*7*/
    'asado',        /*8*/
    'truco',        /*9*/
    'estatua',      /*10*/
];
const imagen = id('imagen');
const btn = id('jugar');
const btn_letras = document.querySelectorAll("#letras button");
///const btn = document.getElementById('jugar');

///inicio del juego con un click
btn.addEventListener('click', iniciar);

function id(str) {
    return document.getElementById(str);
}

function obtener_aleatorio(num_min, num_max) {
    const amplitud_valores = num_max - num_min; //palabras al azar

    const valor_al_azar = Math.floor(Math.random() * amplitud_valores) + num_min;

    return valor_al_azar;
}

function iniciar(event) {
    imagen.src = 'img/img0.png';
    btn.disabled = true;
    cant_errores = 0; ///cuantas veces me equivoque
    cant_aciertos = 0; ///cuantas letras adivine

    const parrafo = id('palabra_a_adivinar');
    parrafo.innerHTML = '';

    const cant_palabras = palabras.length;
    //const valor_mas_bajo = 0; ///valor mas bajo del array
    const valor_al_azar = obtener_aleatorio(0, cant_palabras);

    palabras2 = palabras[valor_al_azar];
    const cant_letras = palabras2.length;

    for (let i = 0; i < btn_letras.length; i++) {
        btn_letras[i].disabled = false;
    }


    for (let i = 0; i < cant_letras; i++) {
        const span = document.createElement('span');
        parrafo.appendChild(span);
    }
    console.log(palabras2);

}
/// click para adivinar letra

for (let i = 0; i < btn_letras.length; i++) {
    btn_letras[i].addEventListener('click', click_letras);
}

function click_letras(event) {
    const spans = document.querySelectorAll('#palabra_a_adivinar span');
    const button = event.target; /// cual de todas las letras toque
    button.disabled = true;//deshabilito la letra que toque
    const letra = button.innerHTML.toLowerCase();
    const palabras = palabras2.toLowerCase(); //comparo si todas la letras son minus o mayus

    let acerto = false;
    for (let i = 0; i < palabras.length; i++) {
        if (letra == palabras[i]) { /// la variable i es la posicion de la letra en la palabra que coicnide en el span al que tenemos que mostrarle esta letra
            spans[i].innerHTML = letra;
            cant_aciertos++,
                acerto = true;
        }
    }
    if (acerto == false) {
        cant_errores++;
        const source = `img/img${cant_errores}.png`
        const imagen = id('imagen');
        imagen.src = source;
    }

    if (cant_errores == 7) {
        id('resultado').innerHTML = "Perdiste =( la palabra era " + palabras2;
        game_over();
    } else if (cant_aciertos == palabras2.length) {
        id('resultado').innerHTML = "Ganaste!! =)";
        game_over();
    }
    console.log("la letra " + letra + " en la palabra " + palabras + " ¿existe? " + acerto);
}
 ///fin del juego
function game_over() {
    for (let i = 0; i < btn_letras.length; i++) {
        btn_letras[i].disabled = true;
    }

    btn.disabled = false;
}

game_over() ///desabilito los botones de las letras para iniciar el juego


const toggle = document.querySelector('#toggle');
const themeActual = localStorage.getItem('theme');

if (themeActual) {
  document.documentElement.setAttribute('data-theme', themeActual);
}

if (themeActual === 'oscuro') {
  toggle.checked = true;
}

const cambiarTheme = (event) => {
  if (event.target.checked) {
    document.documentElement.setAttribute('data-theme', 'oscuro');
    localStorage.setItem('theme', 'oscuro');
  } else {
    document.documentElement.setAttribute('data-theme', null);
    localStorage.setItem('theme', null);
  }
};

toggle.addEventListener('click', cambiarTheme);
