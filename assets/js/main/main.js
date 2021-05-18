import APP from '../application/app/app.build.js'
import AUDIO from '../application/audio/audio.build.js'
import VISUALIZER from '../application/visualizer/visualizer.build.js'

new Vue({
    el: '#wrap',
    data(){
        return{
        }
    },
    mounted(){
        this.init()
    },
    methods: {
        init(){
            this.initThree()
            this.animate()

            window.addEventListener('resize', this.onWindowResize, false)
        },


        // three
        initThree(){
            OBJECT.app = new APP()

            this.createObject(OBJECT.app)
        },
        resizeThree(){
            const {app} = OBJECT

            for(let i in OBJECT){
                if(!OBJECT[i].resize) continue
                OBJECT[i].resize({app})
            }
        },
        renderThree(){
            const {app, audio} = OBJECT
            
            for(let i in OBJECT){
                if(!OBJECT[i].animate) continue
                OBJECT[i].animate({app, audio})
            }
        },
        createObject(app){
            this.createAudio()
            this.createVisualizer(app)
        },
        createAudio(){
            OBJECT.audio = new AUDIO()
        },
        createVisualizer(app){
            OBJECT.visualizer = new VISUALIZER(app)
        },


        // event
        onWindowResize(){
            this.resizeThree()
        },


        // render
        render(){
            this.renderThree()
        },
        animate(){
            this.render()
            requestAnimationFrame(this.animate)
        }
    }
})