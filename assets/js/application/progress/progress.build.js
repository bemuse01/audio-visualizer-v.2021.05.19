import CHILD from './child/progress.child.build.js'
import BAR from './bar/progress.bar.build.js'

export default class{
    constructor(){
        this.init()
        this.create()
    }


    // init
    init(){
        this.group = {
            bar: null
        }
    }


    // create
    create(){
        this.createChild()
        this.createBar()
    }
    createChild(){
        this.group.child = new CHILD()
    }
    createBar(){
        this.group.bar = new BAR()
    }


    // animate
    animate({audio}){
        this.group.bar.animate(audio)
    }
}