import * as THREE from '../../lib/three.module.js'
import METHOD from './audio.method.js'
import PARAM from './audio.param.js'

export default class{
    constructor(){
        this.init()
        this.create()
        window.addEventListener('click', () => this.play(), false)
    }


    // init 
    init(){
        this.src = 'assets/src/Rapid as Wildfires.mp3'
        this.start = true
        this.buffer = null
    }


    // create
    create(){
        this.createAudio()
        this.createContext()
    }
    createAudio(){
        this.audio = new Audio()
        this.audio.loop = true
        this.audio.src = this.src
        this.audio.volume = 0.6
    }
    createContext(){
        this.context = new AudioContext()
        
		const source = this.context.createMediaElementSource(this.audio)
        
        this.analyser = this.context.createAnalyser()
		source.connect(this.analyser)
		this.analyser.connect(this.context.destination)
		this.analyser.fftSize = PARAM.fft
        this.analyser.smoothingTimeConstant = 0.8
        
        const bufferLength = this.analyser.frequencyBinCount
        
        this.audioData = new Uint8Array(bufferLength)
    }


    // animate
    animate(){
        this.analyser.getByteFrequencyData(this.audioData)

        const startOffset = Math.floor(1 / PARAM.fps * this.context.sampleRate)
        const sample = this.audioData.slice(startOffset, startOffset + PARAM.display)

        this.buffer = METHOD.createAudioBuffer(sample, PARAM.size)
    }


    // play
    play(){
        if(this.start){
            this.audio.play()
            this.context.resume()
            this.start = false
        }
    }
}