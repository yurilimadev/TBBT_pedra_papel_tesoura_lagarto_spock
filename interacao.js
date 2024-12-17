let jogadaKripke = null;
let jogadaSheldon = null;

var inicio = document.querySelectorAll('.opcoes');
var inicioLegenda = document.querySelector('.resultado h2');


var iniciar = document.querySelector('.iniciar');
var reset = document.querySelector('.reiniciar');
iniciar.addEventListener('click', ()=>{
    inicio[0].style.display = 'flex';
    inicioLegenda.innerHTML = 'PEDRA, PAPEL, TESOURA, LAGARTO, SPOCK!';
})

var placarSheldon = document.querySelector('.placar-sheldon');
pontoSheldon = parseInt(placarSheldon.textContent || "0", 0);
placarSheldon.innerHTML = pontoSheldon;
var imgSheldon = document.querySelector('.img--sheldon');


var placarKripke = document.querySelector('.placar-kripke');
pontoKripke = parseInt(placarKripke.textContent || "0", 0);
placarKripke.innerHTML = pontoKripke;
var imgKripe = document.querySelector('.img--kripke');

function reiniciar(){
    inicioLegenda.innerHTML = 'Melhor de 5!';
    for (let i=0;i<inicio.length;i++){
        inicio[i].style.display = 'none';
    }
    
    imgSheldon.src = 'img/sheldon/sheldon-inicio.png';
    imgKripe.src = 'img/kripke/barry-inicio.png';
    placarSheldon.innerHTML = '0';
    placarKripke.innerHTML = '0';

    pontoSheldon = 0;
    pontoKripke = 0;
}
reset.addEventListener('click', ()=>{
    reiniciar();
})

function round(){
    let regras = [{
        "tesoura":['spock', 'pedra'],
        "pedra":['spock', 'papel'],
        "papel":['tesoura', 'lagarto'],
        "lagarto":['tesoura','pedra'],
        "spock":['lagarto', 'papel']
    }]
    if(regras[0][jogadaSheldon].includes(jogadaKripke)){
        pontoKripke +=1;
        placarKripke.innerHTML = pontoKripke;
        imgSheldon.src = 'img/sheldon/sheldon-perdi.png';
        imgKripe.src = 'img/kripke/barry-ganhei.png';
        inicioLegenda.innerHTML = 'CHUPA ESSA MANGA!'
    } else if(jogadaKripke === jogadaSheldon){
        console.log('Empate');
        imgSheldon.src = 'img/sheldon/sheldon-perdi.png';
        imgKripe.src = 'img/kripke/barry-perdi.png';
        inicioLegenda.innerHTML = 'EMPATE!'
    }else{
        pontoSheldon +=1;
        placarSheldon.innerHTML = pontoSheldon;
        imgSheldon.src = 'img/sheldon/sheldon-ganhei.png';
        imgKripe.src = 'img/kripke/barry-perdi.png';
        inicioLegenda.innerHTML = 'BAZINGA!'
    }
}
function validarResposta(){
    jogadaKripke = respostaKripke();
    

    if (jogadaKripke == null || jogadaSheldon == null){
        
    }else{
        switch(jogadaSheldon){
            case "tesoura":
                round();
                break;
            case "pedra":
                round();
                break;
            case "papel":
                round();
                break;
            case "lagarto":
                round();
                break;
            case "spock":
                round();
                break;
            default:
                console.log('Jogada Inválida');
                break;
            
        }
        jogadaKripke = null;
        jogadaSheldon = null;
        
        setTimeout(()=>{
            imgSheldon.src = 'img/sheldon/sheldon-inicio.png';
            imgKripe.src = 'img/kripke/barry-inicio.png';
            var kripkeVolta = document.querySelector('.resposta-kripke');
            kripkeVolta.style.display = 'none';
            kripkeVolta.innerHTML = '';
            var respostaSheldon = document.querySelector('.resposta-sheldon');
            respostaSheldon.style.display = 'none';
            respostaSheldon.innerHTML = '';
        },2000);
    }
    
    if (pontoSheldon == 5){
        inicioLegenda.innerHTML = 'SHELDON É O VENCEDOR!';
        
    }else if(pontoKripke == 5){
        inicioLegenda.innerHTML = 'KRIPKE É O VENCEDOR!';
    }
};


var opcoesSheldon = document.querySelectorAll('.sheldon .icone img');
opcoesSheldon.forEach((opcao) =>{
    opcao.addEventListener('click', ()=>{
        jogadaSheldon = opcao.getAttribute('opt');
        console.log(jogadaSheldon);
        var respostaSheldon = document.querySelector('.resposta-sheldon');
        respostaSheldon.style.display = 'block';
        respostaSheldon.innerHTML = `
        <div class="icone">
            <img opt="${jogadaSheldon}" src="icones/Inspiração/${jogadaSheldon}.svg" alt="">
        </div>
    `;
        validarResposta();
    })
    
});

function respostaKripke(){
    let marcacao = Math.round(Math.random() * 3);
    var opcoesKripke = document.querySelectorAll('.kripke .icone img');
    // var kripke = document.querySelectorAll('.opcoes-kripke .icones .icone');
    
    jogadaKripke = opcoesKripke[marcacao].getAttribute('opt');
    
    //kripke[marcacao].style.backgroundColor = '#9A0F0F';
    var respostaKripke = document.querySelector('.resposta-kripke');
    respostaKripke.style.display = 'block';
    respostaKripke.innerHTML = `
        <div class="icone">
            <img opt="${jogadaKripke}" src="icones/Inspiração/${jogadaKripke}.svg" alt="">
        </div>
    `;
    setTimeout(()=>{
        //kripke[marcacao].style.backgroundColor = '#695151';
    },2000)
    
    return jogadaKripke;
    
}

