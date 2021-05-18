import * as THREE from '../../../lib/three.module.js'
import {GPUComputationRenderer} from '../../../lib/GPUComputationRenderer.js'
import PARAM from './visualizer.child.param.js'
import METHOD from './visualizer.child.method.js'
import SHADER from './visualizer.child.shader.js'

export default class{
    constructor(group, renderer){
        this.init(renderer)
        this.create()
        this.add(group)
    }


    // init
    init(renderer){
        this.initGPGPU(renderer)
    }
    initGPGPU(renderer){
        this.gpuCompute = new GPUComputationRenderer(PARAM.size, PARAM.size, renderer)

        this.createAudioTexture()

        this.gpuCompute.init()
    }
    createAudioTexture(){
        const audio = this.gpuCompute.createTexture()

        // METHOD.fillAudioTexture(audio, this.size.obj)

        this.audioVariable = this.gpuCompute.addVariable('audio', SHADER.audio.fragment, audio)

        this.gpuCompute.setVariableDependencies(this.audioVariable, [this.audioVariable])

        this.audioUniforms = this.audioVariable.material.uniforms

        this.audioUniforms['buffer'] = {value: null}
        this.audioUniforms['col'] = {value: PARAM.size}
        this.audioUniforms['row'] = {value: PARAM.size}
    }


    // add
    add(group){
        group.add(this.mesh)
    }


    // create
    create(){
        this.createMesh()
    }
    createMesh(){
        const geometry = this.createGeometry()
        const material = this.createMaterial()

        this.mesh = new THREE.Mesh(geometry, material)
    }
    createGeometry(){
        const geometry = new THREE.PlaneGeometry(PARAM.width, PARAM.height, PARAM.seg)

        const {position, coord} = METHOD.createAttribute({...geometry.attributes.position, ...PARAM})

        geometry.setAttribute('aPosition', new THREE.BufferAttribute(position, 3))
        geometry.setAttribute('aCoord', new THREE.BufferAttribute(coord, 2))

        console.log(geometry.attributes.position)

        return geometry
    }
    createMaterial(){
        return new THREE.ShaderMaterial({
            vertexShader: SHADER.draw.vertex,
            fragmentShader: SHADER.draw.fragment,
            transparent: true,
            uniforms: {
                uColor: {value: new THREE.Color(PARAM.color)},
                uAudio: {value: null}
            }
        })
    }


    // animate
    animate(buffer){
        this.gpuCompute.compute()

        this.audioUniforms['buffer'].value = buffer

        this.mesh.material.uniforms['uAudio'].value = this.gpuCompute.getCurrentRenderTarget(this.audioVariable).texture
    }
}