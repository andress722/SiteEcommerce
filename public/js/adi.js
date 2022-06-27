total = 0.00;

function adiciona(id) {
  calcula(id, "adicao");
}


function remove(id) {
  calcula(id, "subtracao");
}

function calcula(id, operacao) {
  nomeid = "nome" + id;
  precoid = "preco" + id;
  qtdid = "qtd" + id;

  nome = document.getElementById(nomeid).innerHTML;

  preco = document.getElementById(precoid).innerHTML;
  preco = textoParaFloat(preco);

  qtd = document.getElementById(qtdid).innerHTML;
  qtd = parseInt(qtd);

  //Debug
  //alert("Produto: " + nome + "\n Preço: " + preco);    

  if (operacao == "adicao") {
    total = total + preco;
    qtd = qtd + 1;
    var s = document.getElementById("exibe").innerHTML;
    // verificando se ele nao existe na exibiçao
    if (s.indexOf(nome) == -1) {
      //mostra a mensagem
      document.getElementById("exibe").innerHTML += "<span id=\""+nome+"\">"+nome + "(<a class='"+nome+"'>" + qtd + "</a>)<a onclick=\"remover('"+nome+"')\">X</a></span><br>";
    } else {
      document.getElementsByClassName(nome)[0].innerHTML=qtd;
    }
  } else {
    
    var s = document.getElementById("exibe").innerHTML;
    // verificando se ele nao existe na exibiçao
    if (s.indexOf(nome) == -1) {
      //mostra a mensagem
      s += "<span id=\""+nome+"\">"+nome + "(<a class='"+nome+"'>" + qtd-1 + "</a>)<a onclick=\"remover('"+nome+"')\">X</a></span><br>";
    } else {
      if(qtd>1){     
      document.getElementsByClassName(nome)[0].innerHTML=qtd-1;
        }
      else{
      
    document.getElementById("exibe").innerHTML=s.replace("<span id=\""+nome+"\">"+nome + "(<a class=\""+nome+"\">" + qtd + "</a>)<a onclick=\"remover('"+nome+"')\">X</a></span><br>"," ");
      
      }}
    total = total - preco;
    qtd = qtd - 1;
    
    
  }
  

  document.getElementById(qtdid).innerHTML = qtd;

  document.getElementById("total").innerHTML = floatParaTexto(total);
}


// Converte   [valor texto com vírgula para  centavos]    para    [float]

function textoParaFloat(texto) {
  // Retira pontos que separam milhar se existirem. Ex: 1.000,25 vira 1000,25
  texto = texto.replace(".", "");

  // Substitui vírgula separando a casa decimal por ponto ex: 1000,25 vira 1000.25
  texto = texto.replace(",", "."); // isso é necessário para converter para float corretamente

  // Converte de texto para número real
  numero = parseFloat(texto);

  return numero; // Retorna um número float para ser usado para fazer cálculos    
}



// Converte   [valor float com ponto para casa decimal]  para  [texto com vírgula para separar centavos]

function floatParaTexto(numero) {
  numero = numero.toFixed(2); // Duas casas decimais

  texto = numero.toString();
  texto = texto.replace(".", ","); // substitui a vírgula por ponto 

  return texto;
}

function remover(nome){
  alert(nome);
  var x = document.getElementById(nome);
var produtosListados =	document.getElementsByClassName("nomeprod");
 for(var i =0; i<produtosListados.length; i++){
     if(produtosListados.item(i).innerHTML==nome){
         var itemEx=(produtosListados.item(i).parentNode);
         var el=itemEx.parentElement.children[1];
         var valor=parseFloat(itemEx.parentElement.children[0].children[1].innerHTML);
         var quantidade=parseInt(el.children[1].innerHTML);
         el.children[1].innerHTML=0;
         retirarTotal=(parseFloat(document.getElementById("total").innerHTML))-(parseFloat(quantidade*valor));
    alert(parseFloat(quantidade*valor));
          document.getElementById("total").innerHTML = floatParaTexto(retirarTotal);
         }
     }
x.remove(0);


}

// Apenas prevenção para pessoas que digitam ponto de milhar por costume
function removePonto(x) {
  x.value = x.value.replace('.', '');
}