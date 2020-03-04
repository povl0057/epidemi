var photos = ["kirsebaer.gif", "ananas.gif", "bar.gif", "smil.gif", "blomme.gif", "banan.gif", "appelsin.gif"]
//var vaerdier = [20, 40, 200, 30, 25 120, 150]


function figur(nr) {
  return photos[nr]
    switch(nr){
        case 0:
            return 'kirsebaer.gif'
            break
        case 1:
            return 'ananas.gif'
            break;
        case 2:
            return 'bar.gif'
            break
        case 3:
            return 'smil.gif'
            break
        case 4:
            return 'blomme.gif'
            break
        case 5:
            return 'banan.gif'
            break
        case 6:
            return 'appelsin.gif'

    }

   }

//Funktion som gentager at skifte billedet indtil den skal stoppes
/*function spin(hjul, iterator, stop){
    if(!stop){
      var index = iterator % 6

      hjul.src = figur(index)
      return iterator += 1
    }
}*/


   function vaerdi(felt1,felt2, felt3) {
    if(felt1 == felt2 && felt2 == felt3){
      //return værdier[felt1]
        switch(felt1){
            case 0:
                return 20
            case 1:
                return 40
            case 2:
                return 200
            case 3:
                return 30
            case 4:
                return 25
            case 5:
                return 120
            case 6:
                return 150
}
    }else{
        return 0
    }

   }

   console.log(123)
   ok = true
 
 
   function spil() {
            total = 0
        gevinst = 0
        while(confirm('Din gevinst er '+gevinst+' kr\nDin saldo er '+total+
        ' kr\n\nVil du prøve igen?')){

            felt1 = Math.floor(3*Math.random())
            felt2 = Math.floor(3*Math.random())
            felt3 = Math.floor(3*Math.random())
         
            hjul1.src = figur(felt1)
            hjul2.src = figur(felt2)
            hjul3.src = figur(felt3)
         
            gevinst = vaerdi(felt1,felt2, felt3)
            total = total + gevinst - 10



        }



    alert("Du har nu " + total +  " kroner")
   }
