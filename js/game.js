//toDO
//marcacao de pontos do Adv


let somaMarcas = 0;
    let final = [36,69,96,66,63];
    let pos = [];
    let marcas = [];
    let marcasAdv = [];

    let win = [
        //linha A
        11,12,13,
        //linha B
        21,22,23,        
        //linha C
        31,32,33,
        //linha diagonal 1 - 3
        11,22,33,
        
        //Coluna1
        11,21,31,
        //Coluna2
        12,22,32,
        //Coluna3
        13,23,33,
        //linha diagonal 3 - 1
        31,22,13
    ];

    let bloco = [];
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
    
    //console.log(bloco);            
    const playA = 'x';
    const playB = 'o';
            
    let quadro = document.querySelector('.grid').childNodes;        
        quadro.forEach(element => {                        
            if(element.id != undefined){
                pos.push(element.id);                
            }

            element.onclick = ()=> {                                                      
                //somaMarcas = somaInt(somaMarcas,element.id);                                                
                element.value = 'x';
                marca(element);
                marcas.push(parseInt(element.id))                
                if(checkResult()){                        
                    encerra();                      
                }                             
                else{
                    adv = setTimeout(adversario,600);
                }       
            };
        });
          //console.log(pos);   

      const marca = function(element){
          
        element.classList.toggle('locked');
        element.setAttribute('disabled',true);        
        //elimina do array de casas
        pos.splice(pos.indexOf(element.id), 1);                
        //bloqueia        
        lock(true);        
    }   

    const encerra = function(){
        lock(true);        
        let msg = document.querySelector('#message');
        msg.classList.add('m0');
        msg.append('FIM');
        
        setTimeout(
            ()=>{ 
                msg.innerText = 'replay'; 
                msg.onclick = ()=>{ location.reload() }
        },700)
        //console.log("FIM");
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

      const adversario = function(){          
        let random = pos[Math.floor(Math.random()*pos.length)]
        let id = document.getElementById(random);
        id.value='o';
        marca(id);
        //desbloqueia
        lock(false);
      }

    const checkResult = function(){                          
        fim = false;        
        //win.forEach(element => {
        if(marcas.length>=3){                     
            console.warn("marcas->" + marcas.sort())
            //console.log(bloco[0].sort().equals(marcas.sort()))
            let rep = null;
             bloco.forEach(element => {   
               //if(element.sort().equals(marcas.sort())){
                    //console.log('fim');
                    let strElement = JSON.stringify(element.sort());
                    let strMarcas = JSON.stringify(marcas.sort());
                    
                    if(strElement == strMarcas){                        
                        fim = true;
                    }              
                    else{                              
                        rep = repescagem(bloco,marcas);                                                                        
                        fim = rep.length > 2 ? true : false;
                    }       
               });                
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
        //ref 

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