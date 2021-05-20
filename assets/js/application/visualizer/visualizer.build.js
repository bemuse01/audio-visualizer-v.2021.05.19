import * as THREE from '../../lib/three.module.js'
// import CHILD from './child/visualizer.child.build.js'
import CHILD from './child2/visualizer.child.build.js'

export default class{
    constructor(app){
        this.init()
        this.create(app)
        this.add()
    }


    // init
    init(){
        this.param = {
            fov: 60,
            near: 0.1,
            far: 10000,
            pos: 1000
        }

        this.initGroup()
        this.initRenderObject()
    }
    initGroup(){
        this.group = {
            child: new THREE.Group()
        }

        this.comp = {
            child: null
        }

        this.build = new THREE.Group
    }
    initRenderObject(){
        this.element = document.querySelector('.visualizer-object')

        const {width, height} = this.element.getBoundingClientRect()

        this.scene = new THREE.Scene()

        this.camera = new THREE.PerspectiveCamera(this.param.fov, width / height, this.param.near, this.param.far)
        this.camera.position.z = this.param.pos
        
        this.size = {
            el: {
                w: width,
                h: height
            },
            obj: {
                w: METHOD.getVisibleWidth(this.camera, 0),
                h: METHOD.getVisibleHeight(this.camera, 0)
            }
        }
    }


    // add
    add(){
        for(let i in this.group) this.build.add(this.group[i])
        
        this.scene.add(this.build)
    }


    // create
    create({renderer}){
        this.createChild(renderer)
    }
    createChild(renderer){
        this.comp.child = new CHILD(this.group.child, renderer)
    }


    // animate
    animate({app, audio}){
        this.render(app)
        this.animateObject(audio)
    }
    render(app){
        const rect = this.element.getBoundingClientRect()
        const width = rect.right - rect.left
        const height = rect.bottom - rect.top
        const left = rect.left
        const bottom = app.renderer.domElement.clientHeight - rect.bottom

        app.renderer.setScissor(left, bottom, width, height)
        app.renderer.setViewport(left, bottom, width, height)

        this.camera.lookAt(this.scene.position)
        app.renderer.render(this.scene, this.camera)
    }
    animateObject({buffer}){
        for(let i in this.comp){
            if(!this.comp[i] || !this.comp[i].animate) continue
            this.comp[i].animate(buffer)
        }
    }


    // resize
    resize(){
        const rect = this.element.getBoundingClientRect()
        const width = rect.right - rect.left
        const height = rect.bottom - rect.top

        this.camera.aspect = width / height
        this.camera.updateProjectionMatrix()

        this.size = {
            el: {
                w: width,
                h: height
            },
            obj: {
                w: METHOD.getVisibleWidth(this.camera, 0),
                h: METHOD.getVisibleHeight(this.camera, 0)
            }
        }

        this.resizeObject()
    }
    resizeObject(){
        for(let i in this.comp){
            if(!this.comp[i] || !this.comp[i].resize) continue
            this.comp[i].resize(this.size)
        }
    }
}