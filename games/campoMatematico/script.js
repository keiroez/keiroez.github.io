
var matriz = []
var divAtual = 1
var posAtual = 1
var sorteioAtual
var somasGeral
var statusAtual = "menu"


class Valores{
    constructor(n1, n2, op, result){
        this.n1 = n1;
        this.n2 = n2;
        this.op = op;
        this.result = result
    }
}

class Div{
    constructor(div, status, valor, posX, posY){
        this.div = div;
        this.status = status;
        this.valor = valor;
        this.posX = posX;
        this.posY = posY;
    }
}

class Vizinhos{
    constructor(casa, cima, cimaDireito, cimaEsquerdo, baixo, baixoDireita, baixoEsquerda, direita,esquerda, qtd){
        this.casa = casa;
        this.cima = cima;
        this.cimaDireito = cimaDireito;
        this.cimaEsquerdo = cimaEsquerdo;
        this.baixo = baixo;
        this.baixoDireita = baixoDireita;
        this.baixoEsquerda = baixoEsquerda;
        this.direita = direita;
        this.esquerda = esquerda;
        this.qtd = qtd;
    }
}

    function carregar(op, nivel){
        statusAtual = "jogo"
        var somas = gerarCaminho(op, nivel)
        somasGeral = somas
        var x = 0
        var y = 0
        var tela = document.getElementById("tela")
        var menu = document.getElementById("menuOperacao")
        
        tela.removeChild(menu)
        
        
            for(var i = 1; i<37; i++){
                var corpo = document.getElementById("jogo")
                var quadrado = document.createElement('div')
                quadrado.setAttribute("class","quadrado")
                quadrado.setAttribute("value",i)

                posicaoMatriz = criarMatriz(i)
                div = new Div(quadrado, "inativo", somas[i].result,posicaoMatriz[0], posicaoMatriz[1])
                if(i==1){
                    quadrado.innerHTML = "?"
                    quadrado.style.backgroundColor = "maroon"
                    quadrado.style.fontSize = 50
                    div.status = "concluido"
                    quadrado.setAttribute("onclick","ajuda()")
                }
                else if(i==somas.length-1){
                    quadrado.innerHTML = "→"
                    quadrado.style.backgroundColor = "green"
                    quadrado.style.fontSize = 50
                    div.status = "concluido"
                }
                else{
                    if(i==29 || i==30 || i==35){
                        quadrado.style.backgroundColor = "yellowgreen"
                        div.status = 'inativo'
                    }
                    if(op=="/")
                        quadrado.innerHTML = somas[i].result
                    else
                        quadrado.innerHTML = somas[i].result
                    quadrado.setAttribute("onclick","clicarDiv("+i+")")
                }
                corpo.appendChild(quadrado)

                matriz[i]=div
                
            }  
        sorteio = sortearCalculo(posAtual);
        sorteioAtual = sorteio
        operacao(somas[sorteio].n1, somas[sorteio].n2, somas[sorteio].op)
        posAtual = sorteio
    }

    function menu(){
        statusAtual = "menu"
        var corpo = document.getElementById("tela")
        var menu = document.createElement('div')
        var iniciar = document.createElement('div')
        var ajuda = document.createElement('div')
        
        iniciar.setAttribute("id","textoMenu")
        ajuda.setAttribute("id","textoMenu")
        menu.setAttribute("id", "menu")
        
        iniciar.setAttribute("onclick", "menuOperacao()")
        iniciar.innerHTML = "Iniciar"
        ajuda.innerHTML = "Ajuda"
        ajuda.setAttribute("onclick","ajuda()")
        menu.appendChild(iniciar)
        menu.appendChild(ajuda)
        corpo.appendChild(menu)        
    }

    function menuOperacao(){
        statusAtual = "menuoperacao"
        var tela = document.getElementById("tela")
        var menu = document.getElementById("menu")
        
        tela.removeChild(menu)

        var corpo = document.getElementById("tela")
        var menuOp = document.createElement('div')
        var soma = document.createElement('div')
        var sub = document.createElement('div')
        var mult = document.createElement('div')
        var divisao = document.createElement('div')

        menuOp.setAttribute("id", "menuOperacao")
        soma.setAttribute("id","textoMenu")
        soma.setAttribute("onclick","menuNivel('+')")

        sub.setAttribute("id","textoMenu")
        sub.setAttribute("onclick", "menuNivel('-')")

        mult.setAttribute("id","textoMenu")
        mult.setAttribute("onclick","menuNivel('x')")

        divisao.setAttribute("id","textoMenu")
        divisao.setAttribute("onclick", "menuNivel('/')")

        soma.innerHTML = "Somar( + )"
        sub.innerHTML = "Subtrair( - )"
        mult.innerHTML = "Multiplicar( x )"
        divisao.innerHTML = "Dividir( / )"

        menuOp.appendChild(soma)
        menuOp.appendChild(sub)
        menuOp.appendChild(mult)
        menuOp.appendChild(divisao)

        corpo.appendChild(menuOp)
    }

    function ajuda(){
        window.swal("", "Ande pela matriz de acordo com a operação matemática. Chegue até os quadrados ao redor da seta → para completar a fase.","info")
    }

    function voltar(){
        if(statusAtual == "jogo"){
            var jogo = document.getElementById("jogo")
            var op = document.getElementById("operacaoDiv")
            var tela = document.getElementById("tela")
            op.innerHTML = ""
            jogo.innerHTML = ""
            matriz = []
            divAtual = 1
            posAtual = 1
        }
        else if(statusAtual== "menuoperacao"){
            var menuOp = document.getElementById("menuOperacao")
            var tela = document.getElementById("tela")
            tela.removeChild(menuOp)
        }
        else if(statusAtual== "menunivel"){
            var menuNivel = document.getElementById("menuOperacao")
            var tela = document.getElementById("tela")
            tela.removeChild(menuNivel)
        }
        //tela.removeChild(op)
        //tela.removeChild(jogo)
        if(statusAtual!="menu")
                menu()
    }

    function menuNivel(operacao){
        statusAtual = "menunivel"
        var tela = document.getElementById("tela")
        var menuOp = document.getElementById("menuOperacao")
        tela.removeChild(menuOp)

        var menuN = document.createElement("div")
        var iniciante = document.createElement("div")
        var intermediario = document.createElement("div")
        var avancado = document.createElement("div")

        menuN.setAttribute("id","menuOperacao")
        iniciante.setAttribute("id", "textoMenu")
        iniciante.setAttribute("onclick","carregar('"+operacao+"','iniciante')")

        intermediario.setAttribute("id","textoMenu")
        intermediario.setAttribute("onclick","carregar('"+operacao+"','intermediario')")

        avancado.setAttribute("id","textoMenu")
        avancado.setAttribute("onclick","carregar('"+operacao+"','avancado')")

        iniciante.innerHTML = "Iniciante ✰"
        intermediario.innerHTML = "Intermediario ✰✰✰"
        avancado.innerHTML = "Avançado ✰✰✰✰✰"

        menuN.appendChild(iniciante)
        menuN.appendChild(intermediario)
        menuN.appendChild(avancado)

        tela.appendChild(menuN)
    }

    function selecionarDiv(valor, i){
        //console.log(somasGeral[posAtual].result+" = "+valor)
        if(i==29 || i==30 || i==35){
            if((i==29 && matriz[i].status=="ativo" && valor==somasGeral[posAtual].result) || 
            (i==30 && matriz[i].status=="ativo" && valor==somasGeral[posAtual].result) ||
            (i==35 && matriz[i].status=="ativo" && valor==somasGeral[posAtual].result)){
                //alert("Parabens, voce chegou ao final!! Aperte OK para reiniciar.")
                window.swal("", "Parabens, voce chegou ao final!! Aperte OK para reiniciar.","success")
                voltar()
                    //window.location.href="index.html"
            }
        }
            if(matriz[i].status=="ativo"){
                if(valor==somasGeral[posAtual].result){
                    //alert("Acertou Mizeravi")
                    matriz[i].div.setAttribute("onClick","")
                    matriz[i].div.style.backgroundColor = "green"
                    posAtual = i
                    matriz[i].status = "concluido"

                    sorteio = sortearCalculo(posAtual);
                    sorteioAtual = sorteio
                    operacao(somasGeral[sorteio].n1, somasGeral[sorteio].n2, somasGeral[sorteio].op)
                    posAtual = sorteio
                }
            }
    }

    function sortearCalculo(i){
        vizinhos = acharVizinhos(i)
        //console.log(i)
        vizinhos2 = []
        cont = 0
        
            if(vizinhos.cima>0){
                if(matriz[vizinhos.cima].status=="ativo" || matriz[vizinhos.cima].status=="inativo"){
                    vizinhos2[cont] = vizinhos.cima
                    cont++
                    matriz[vizinhos.cima].status = "ativo"
                    //console.log(1)
                }
            }
            if(vizinhos.cimaDireito>0){
                if(matriz[vizinhos.cimaDireito].status=="ativo" || matriz[vizinhos.cimaDireito].status=="inativo"){
                    vizinhos2[cont] = vizinhos.cimaDireito
                    cont++
                    matriz[vizinhos.cimaDireito].status = "ativo"
                    //console.log(2)
                }
            }
            if(vizinhos.cimaEsquerdo>0){
                if(matriz[vizinhos.cimaEsquerdo].status=="ativo" || matriz[vizinhos.cimaEsquerdo].status=="inativo"){
                    vizinhos2[cont] = vizinhos.cimaEsquerdo
                    cont++
                    matriz[vizinhos.cimaEsquerdo].status = "ativo"
                    //console.log(3)
                }
            }
            if(vizinhos.baixo>0){
                if(matriz[vizinhos.baixo].status=="ativo" || matriz[vizinhos.baixo].status=="inativo" ){
                    vizinhos2[cont] = vizinhos.baixo
                    cont++
                    matriz[vizinhos.baixo].status = "ativo"
                    //console.log(4)
                }
            }
            if(vizinhos.baixoDireita>0){
                if(matriz[vizinhos.baixoDireita].status=="ativo" || matriz[vizinhos.baixoDireita].status=="inativo"){
                    vizinhos2[cont] = vizinhos.baixoDireita
                    cont++
                    matriz[vizinhos.baixoDireita].status = "ativo"
                    //console.log(5)
                }
            }
            if(vizinhos.baixoEsquerda>0){
                if(matriz[vizinhos.baixoEsquerda].status=="ativo" || matriz[vizinhos.baixoEsquerda].status=="inativo"){
                    vizinhos2[cont] = vizinhos.baixoEsquerda
                    cont++
                    matriz[vizinhos.baixoEsquerda].status = "ativo"
                    //console.log(6)
                }
            }
            if(vizinhos.direita>0){
                if(matriz[vizinhos.direita].status=="ativo" || matriz[vizinhos.direita].status=="inativo"){
                    vizinhos2[cont] = vizinhos.direita
                    cont++
                    matriz[vizinhos.direita].status = "ativo"
                    //console.log(7)
                }
            }
            if(vizinhos.esquerda>0){
                if(matriz[vizinhos.esquerda].status=="ativo" || matriz[vizinhos.esquerda].status=="inativo"){
                    vizinhos2[cont] = vizinhos.esquerda
                    cont++
                    matriz[vizinhos.esquerda].status = "ativo"
                    //console.log(8)
                }
            }
            
        sorteio = Math.floor(Math.random() * cont)
        
        if(cont<1){
            window.swal("","Erro! Nao ha mais caminho por ai. Recomece!","warning")
            voltar()
        }
       console.log(cont)

            //for(var j = 0; j<vizinhos2.length;j++){
              //  matriz[vizinhos2[j]].status = "ativo"
            //}

        return vizinhos2[sorteio]

    }


    function acharVizinhos(i){
        qtd = 8
        cima = i-6
        cimaDireito = cima+1
        cimaEsquerdo = cima-1
        
        baixo = i+6
        baixoDireita = baixo+1
        baixoEsquerda = baixo-1

        direita = i+1
        esquerda = i-1

        if(cima<1){
            cima = -1;
            cimaDireito = -1;
            cimaEsquerdo = -1;
            qtd -= 3;
        }

        if(baixo>36){
            baixo = -1;
            baixoDireita = -1;
            baixoEsquerda = -1;
            qtd -= 3;
        }

        if(matriz[i].posY==1){
            esquerda = -1;
            qtd -=1;
            if(matriz[i].posX>1 && matriz[i].posX<6){
                cimaEsquerdo = -1;
                baixoEsquerda = -1;
                qtd -= 2;
            }
            else if (matriz[i].posX==1){
                qtd -=1;
                baixoEsquerda = -1;
            }
            else if(matriz[i].posX==6){
                qtd -=1;
                cimaEsquerdo = -1;
            }
        }

        else if(matriz[i].posY==6){
            direita = -1;
            qtd -=1;
            if(matriz[i].posX>1 && matriz[i].posX<6){
                cimaDireito = -1;
                baixoDireita = -1;
                qtd -= 2;
            }
            else if (matriz[i].posX==1){
                qtd -=1;
                baixoDireita = -1;
            }
            else if(matriz[i].posX==6){
                qtd -=1;
                cimaDireito = -1;
            }
        }

        

        vizinhos = new Vizinhos(i, cima, cimaDireito, cimaEsquerdo, baixo, baixoDireita, baixoEsquerda,
            direita, esquerda, qtd)

        //console.log(vizinhos.esquerda)
        return vizinhos
    }

    function operacao(n1, n2, operacao){
        var op = document.getElementById("operacaoDiv")
        var node = document.getElementById("soma")

        if(!node){
            var texto = document.createElement('div')
            texto.setAttribute("class", "operacao")
            texto.setAttribute("id","soma")
            texto.innerHTML=n1+" "+operacao+" "+n2
            op.appendChild(texto)
        }
        else{
            node.innerHTML = n1+" "+operacao+" "+n2
        }
    }

    function criarMatriz(i){
        pos = []
        
        var x = 0
        var y = 0
        if(i<7){
            x = 1
            y = i
        }
        else if(i>6 && i<13){
            x = 2
            y = i-6
        }
        else if(i>12 && i<19){
            x = 3
            y = i-12
        }
        else if(i>18 && i<25){
            x = 4
            y = i-18
        }
        else if(i>24 && i<31){
            x = 5
            y = i - 24
        }

        pos[0] = x
        pos[1] = y
        return pos
    }

    function clicarDiv(i){
        
        selecionarDiv(matriz[i].valor,i)

    }

    function gerarCaminho(op, nivel){
        var somas = new Array()
        var numero = 0
        if(nivel=='iniciante')
            numero = 10
        else if(nivel=='intermediario')
            numero = 50
        else if(nivel=='avancado')
            numero = 100
    
        for(var i = 1; i<37; i++){

            valores = new Valores()

            n1 = Math.floor(Math.random()*numero)+1
            n2 = Math.floor(Math.random()*numero)+1
            var somado = calcular(n1, n2, op)
            valores.n1 = somado[0]
            valores.n2 = somado[2]
            valores.op = somado[1]
            valores.result = somado[3]
            somas[i] = valores 
        }
        return somas
    }

    function calcular(n1, n2, op){
        var valores = []
        //Valor n1 na matriz
        valores[0] = n1
        valores[2] = n2
        //Operação
        if(op=='+'){
            valores[1] = "+"
            valores[3]=n1+n2
        }
        else if(op=='-'){
            valores[1] = "-"
            valores[3]=n1-n2
        }
        else if(op=='x'){
            valores[1] = "x"
            valores[3]=n1*n2
        }
        else if(op=='/'){
            temp = 0
            valores[1] = "/"
            temp = n1/n2
            valores[3]=temp.toFixed(1).replace(".",",")
        }
        
        return valores
    }
    
//setInterval(verificacoes, 50)


function verificacoes(){
    while (true){
        
    }
}

