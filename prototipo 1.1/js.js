const btn=document.querySelector('#btn-nuevoJuego')
const container=document.querySelector('.container')

let template=document.querySelector('.template').content
let framento=document.createDocumentFragment()

let iconos = [
    '<i class="fas fa-star"></i>',
    '<i class="far fa-star"></i>',
    '<i class="fas fa-star-of-life"></i>',
    '<i class="fas fa-star-and-crescent"></i>',
    '<i class="fab fa-old-republic"></i>',
    '<i class="fab fa-galactic-republic"></i>',
    '<i class="fas fa-sun"></i>',
    '<i class="fas fa-stroopwafel"></i>',
    '<i class="fas fa-dice"></i>',
    '<i class="fas fa-chess-knight"></i>',
    '<i class="fas fa-chess"></i>',
    '<i class="fas fa-dice-d20"></i>'
]



class Juego{
    constructor(name){
        this.nombre=name;
    }
    cargarIconos(){
        console.log('Iconos Cargados')
    }

    generarTablero(){
        for(let i = 0; i < 24; i++){
            let clon=template.cloneNode(true)
            clon.querySelector('.containerTarjeta').classList.add('tarjeta'+i)
            clon.querySelector('.inferior').innerHTML=iconos[0]
            framento.appendChild(clon)
            if(i%2==1){
                iconos.splice(0,1)
                iconos.sort(()=>Math.random()-0.5)
            }
        }

    }
}


let player1=new Juego('Kevin')



btn.addEventListener('click',()=>{
    console.log('Btn')
})


player1.generarTablero()

container.appendChild(framento)

