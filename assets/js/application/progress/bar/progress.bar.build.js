export default class{
    constructor(){
        this.create()
    }


    // init
    init(){
    }


    // create
    create(){
        this.style = {
            width: '0%'
        }
    }


    // animate
    animate({duration, currentTime}){
        const width = (currentTime / duration) * 100
        this.style.width = `${width}%`
    }


    // get
    get(){
        return this.style
    }
}