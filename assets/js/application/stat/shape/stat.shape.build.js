export default class{
    constructor(){
        this.init()
        this.create()
    }


    // init
    init(){
        this.shape = [
            'bar',
            'circle'
        ]
    }


    // create
    create(){
        this.element = []

        this.shape.forEach((e, i) => {
            this.element.push({
                key: i,
                _id: `stat-shape-input-${i}`,
                name: e.split('').map((e, i) => i === 0 ? e.toUpperCase() : e).join(''),
                value: e,
                style: {}
            })
        })
    }


    // click
    click(index){

    }


    // get
    get(){
        return this.element
    }
}