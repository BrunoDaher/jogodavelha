//toDO
//marcacao de pontos do Adv


let somaMarcas = 0;
let final = [36,69,96,66,63];
let pos = [];
let marcas = [];
let marcasAdv = [];

let matriz = [];

let win = [11,12,13,21,22,23,31,32,33,11,22,33,11,21,31,12,22,32,13,23,33,31,22,13];
let bloco = [];


//divide o array win em 8 elementos
let b = [];
let s = 0;
    for(let x = 0; x< win.length;x++){                        
        b.push(win[x]);
        s = s + 1;
        if(s == 3){                                                                
            bloco.push(b)
            s=0;
            b = [];
        }                                    
    }        

let adv = null;   

const playA = 'x';
const playB = 'o';

let quadro = document.querySelector('.grid').childNodes;                    

quadro.forEach(element => {                        
    if(element.id != undefined){
        pos.push(element.id);                
    }
    element.onclick = ()=> {                                                      
        //somaMarcas = somaInt(somaMarcas,element.id);                                                
        element.value = playA;    
        //guarda pontos
        marcas.push(parseInt(element.id));                            
        //clica na tecla
        marca(element);                                            
        //se vencer ou nao sobrar posicao
        if(checkResult(marcas) || pos.length == 0){                        
            encerra();                      
        }   
        //vez do adversario 
        else{
            //guarda pontos            
            adv = setTimeout(adversario,600);
        }       
    };
});

const adversario = function(){          
    //numero randomico dentro do array
    let random = pos[Math.floor(Math.random()*pos.length)];    
    let id = document.getElementById(random);        

    //carta adv
    id.value = playB;
    marcasAdv.push(parseInt(random));   
    id.classList.add('advColor')
    marca(id);

    //desbloqueia
    lock(false);
}
          
//parte vsual
const marca = function(element){        
    element.classList.toggle('locked');
    element.setAttribute('disabled',true);        
    //elimina do array de casas
    pos.splice(pos.indexOf(element.id), 1);                
    //bloqueia        
    lock(true);        

    if(checkResult(marcasAdv) || pos.length == 0){                        
        encerra();                      
    }   
}   

const encerra = function(){
    lock(true);        
    let msg = document.querySelector('#message');
    msg.classList.add('m0');
    msg.append('Replay');

    setTimeout(
        ()=>{ 
            //msg.innerText = 'replay'; 
            msg.onclick = ()=>{ location.reload() }
    },700);    
}

const lock = function(par){
    if(par){
    pos.forEach(e => {
        document.getElementById(e).setAttribute('disabled',par);
    });
    }
    else{
    pos.forEach(e => {
        document.getElementById(e).removeAttribute('disabled');
    });
    }
}

const checkResult = function(arr){                          
    fim = false;        
    
    if(arr.length>=3){                     
        //console.warn("marcas->" + marcas.sort())    
        let rep = null;
        
        //verifica se a trinca se iguala à um dos elementos do Bloco
        
        for (let element of bloco) {
            
            //transforma em string
            let strElement = JSON.stringify(element.sort());
            let strMarcas = JSON.stringify(arr.sort());
            
            //verifica se a trinca está dentro do array win
            if(strElement == strMarcas){                        
                fim = true;
            }              
            else{                              
                //dificil explicar o q eu fiz aqui
                rep = repescagem(bloco,arr);                                                                        
                fim = rep.length > 2 ? true : false;
            }   
        }
    }

    return fim;
}

const repescagem = function(_arr,marcas){        
    let best_match = []
    for(arr of _arr)
    {
        let interseccao = marcas.filter(x => arr.includes(x))            
        if(best_match.length < interseccao.length){
            best_match = interseccao;                                        
        }                        
    }

    return best_match;   
}

const somaInt = function(a,b){
    return parseInt(a) + parseInt(b);
}   
//referencia
//https://www.delftstack.com/pt/howto/javascript/compare-two-arrays-javascript/
Array.prototype.equals = function (getArray) {
if (this.length != getArray.length) return false;

for (var i = 0; i < getArray.length; i++) {
    if (this[i] instanceof Array && getArray[i] instanceof Array) {
    if (!this[i].equals(getArray[i])) return false;
    } else if (this[i] != getArray[i]) {
    return false;
    }
}

return true;
};