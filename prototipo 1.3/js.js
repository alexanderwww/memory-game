// VERSION EN FORMA DE CLASSE

container=document.querySelector('.container')
let btn=document.querySelector('#btn-nuevoJuego')

class NuevoJuego{
    constructor(){
        this.iconos = [
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
        this.seleccion=[]

        
        this.framento=document.createDocumentFragment()
        this.template=document.querySelector('.template').content
        
        this.preTarjeta=[]
        this.generarTablero()
        this.clickBtn()
    }
    
    generarTablero(){
        for(let i = 0; i < 24; i++){
            let clon=this.template.cloneNode(true)
            clon.querySelector('.containerTarjeta').classList.add('tarjeta'+i)
            // clon.querySelector('.inferior').classList.add('tarjeta'+i)
            clon.querySelector('.inferior').setAttribute('id','tarjeta'+i)
    
            let iconoTj=this.iconos[0].split(' ')
            clon.querySelector('#icono').classList.add(iconoTj[0],iconoTj[1])
    
            // agrega el clon al array
            this.preTarjeta.push(clon)
            
            // permite que solo esten 2 iconos iguales 
            if(i%2==1){
                this.iconos.splice(0,1)
                this.iconos.sort(()=>Math.random()-0.5)
            }
    
        }
        
        // Pone en un lugar aletorio las tarjetas
        this.preTarjeta.sort(()=>Math.random()-0.5)
        
        // Cada item del array lo agrega al framento
        this.preTarjeta.forEach(e=>{
            this.framento.appendChild(e)
        })

        container.appendChild(this.framento)
    }

    clickBtn(){
        let tarjeta=document.querySelectorAll('.containerTarjeta')

        tarjeta.forEach(tj => {
            tj.addEventListener('click',()=>{
                
                let carta=(tj.className.split(' '))[1]
                let tarjetaClassName=document.querySelector('.'+carta)
                let cartaSelec=tarjetaClassName.querySelector('.tarjeta')

                // Si no son pares 
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
    
            // console.log(carta1)
            // console.log(carta2)
    
            if(carta1 != carta2){
                let tarjetaSelecionada1=seleciones[0].querySelector('.tarjeta')
                let tarjetaSelecionada2=seleciones[1].querySelector('.tarjeta')
    
                tarjetaSelecionada1.style.transform='rotateY(0deg)'
                tarjetaSelecionada2.style.transform='rotateY(0deg)'
    
                // console.log(tarjetaSelecionada1)
    
            }
            else{
                console.log('Iguales')
                seleciones[0].querySelector('.inferior').style.background='red'
                seleciones[1].querySelector('.inferior').style.background='red'
    
            }
    
        },1000)

    }


}

let player0=new NuevoJuego()


// console.log(container.children)


btn.addEventListener('click',()=>{
    console.log('reiniciar')

})

