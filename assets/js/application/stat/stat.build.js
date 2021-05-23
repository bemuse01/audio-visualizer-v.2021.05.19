import SHAPE from './shape/stat.shape.build.js'

export default class{
    constructor(){
        this.init()
        this.create()
    }


    // init
    init(){
        this.group = {
            shape: null
        }
    }


    // create
    create(){
        this.createShape()
    }
    createShape(){
        this.group.shape = new SHAPE()
    }
}