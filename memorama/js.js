let container=document.querySelector('.container-play')
let btn=document.querySelector('#btn-nuevoJuego')

class NuevoJuego{
    constructor(){
        
        this.seleccion=[]
        this.framento=document.createDocumentFragment()
        this.template=document.querySelector('.template').content
        
        this.preTarjeta=[]
        this.generarTablero()
        this.clickBtn()

    }
    generarTablero(){

        let iconos=this.revolverIconos()
        for(let i = 0; i < 24; i++){
            let clon=this.template.cloneNode(true)
            clon.querySelector('.containerTarjeta').classList.add('tarjeta'+i)
            let iconoTj=iconos[0].split(' ')
            clon.querySelector('#icono').classList.add(iconoTj[0],iconoTj[1])
    
            // agrega el clon al array
            this.preTarjeta.push(clon)
            // elimina el 1er item del array 
            iconos.shift()
        }
        
        // Cada item del array lo agrega al framento
        this.preTarjeta.forEach(e=>{
            this.framento.appendChild(e)
        })

        container.appendChild(this.framento)
    }
    revolverIconos(){
        const iconos2 = [
            "fas fa-star",
            "far fa-star",
            "fas fa-star-of-life",
            "fas fa-star-and-crescent",
            "fab fa-old-republic",
            "fab fa-galactic-republic",
            "fas fa-sun",
            "fas fa-stroopwafel",
            "fas fa-dice",
            "fas fa-chess-knight",
            "fas fa-chess",
            "fas fa-dice-d20",
            "fas fa-star",
            "far fa-star",
            "fas fa-star-of-life",
            "fas fa-star-and-crescent",
            "fab fa-old-republic",
            "fab fa-galactic-republic",
            "fas fa-sun",
            "fas fa-stroopwafel",
            "fas fa-dice",
            "fas fa-chess-knight",
            "fas fa-chess",
            "fas fa-dice-d20"
        ]
        iconos2.sort(()=>Math.random()-0.5)
        iconos2.sort(()=>Math.random()-0.5)
        return iconos2

    }
    clickBtn(){
        let tarjeta=document.querySelectorAll('.containerTarjeta')




        tarjeta.forEach(tj => {
            tj.addEventListener('click',()=>{
                let carta=(tj.className.split(' '))[1]
                

                // No selecionar cartas que ya tienen par 
                if(tj.classList.contains("par")){
                    return;
                }



                let tarjetaClassName=document.querySelector('.'+carta)
                let cartaSelec=tarjetaClassName.querySelector('.tarjeta')

                // 1ra carta selecionada 
                if(cartaSelec.style.transform != 'rotateY(18deg)'){
                    cartaSelec.style.transform = 'rotateY(180deg)'
                    this.seleccion.push(tarjetaClassName)
                }


                // Si hay dos Cartas 
                if(this.seleccion.length==2){

                    this.deseleciones(this.seleccion)
                    this.seleccion=[]
                }
            })
        })


    }
    deseleciones(seleciones){
        setTimeout(()=>{
            let carta1=seleciones[0].querySelector('#icono').className
            let carta2=seleciones[1].querySelector('#icono').className
    
            // console.log(carta2)
            if(carta1 != carta2 || seleciones[0]===seleciones[1]){
                // console.log('Cartas diferentes o carta selecionada dos veces')
                let tarjetaSelecionada1=seleciones[0].querySelector('.tarjeta')
                let tarjetaSelecionada2=seleciones[1].querySelector('.tarjeta')

                tarjetaSelecionada1.style.transform='rotateY(0deg)'
                tarjetaSelecionada2.style.transform='rotateY(0deg)'    
            }
            else{
                // console.log('Cartas Iguales')
                seleciones[0].querySelector('.inferior').style.background='red'
                seleciones[1].querySelector('.inferior').style.background='red'
                let tarjetaSelecionada1=seleciones[0].querySelector('.tarjeta')
                let tarjetaSelecionada2=seleciones[1].querySelector('.tarjeta')
                
                let a=tarjetaSelecionada1.parentNode.parentNode
                let b=tarjetaSelecionada2.parentNode.parentNode
                a.classList.add('par')
                b.classList.add('par')

            }
    
        },1000)
    }
    cambiarTarjetas(){

        let arrayIconosJuego=container.querySelectorAll('#icono')
        let iconoReturn=this.revolverIconos()
        console.log('btn presionado nuevo juego')

        for(let i = 0; i < 24; i++){
            let arrayACambiar=arrayIconosJuego[i]
            // Separo las palabras del array icon 
            let icon=iconoReturn[i].split(' ')
            // obtengo el nombre de las clases de la etiqueta y los separo 
            let nombreClases=arrayACambiar.className.split(' ')

            // remplazo la clase vieja por otra 
            arrayACambiar.classList.replace(nombreClases[0],icon[0])
            arrayACambiar.classList.replace(nombreClases[1],icon[1])
        }
        this.mostrarCartasInicio()

    }
    volterarCartas(){
        let tarjetaAll=document.querySelectorAll('.containerTarjeta')
            tarjetaAll.forEach(tj => {

                let background=tj.querySelector('.inferior')
                let cartaAll=tj.querySelector('.tarjeta')

                cartaAll.style.transform = 'rotateY(0deg)'
                background.style.background = 'lightcyan'
            })
            setTimeout(()=>{
                this.cambiarTarjetas()
            },1000)
    }
    mostrarCartasInicio(){
        let tarjetaAll2=document.querySelectorAll('.containerTarjeta')
        tarjetaAll2.forEach(tj=>{
            let cartaAll=tj.querySelector('.tarjeta')

            // Reiniciar clases 
            let a=cartaAll.parentNode.parentNode;
            console.log(a.className)
            if(a.classList.contains("par")){
                a.classList.remove('par')
            }

            cartaAll.style.transform = 'rotateY(180deg)'
        })

        setTimeout(()=>{
            // this.mostrarCartasInicio()
            tarjetaAll2.forEach(tj=>{
                let cartaAll=tj.querySelector('.tarjeta')
                cartaAll.style.transform = 'rotateY(0deg)'
            })

        },2000)


    }
}

let player0=new NuevoJuego()


btn.addEventListener('click',()=>{
    player0.volterarCartas()
})



