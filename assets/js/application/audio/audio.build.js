import * as THREE from '../../lib/three.module.js'
import METHOD from './audio.method.js'

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
        this.param = {
            fft: 2 ** 14,
            fps: 60,
            display: (18 ** 2) / 2,
            size: 18
        }
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
		this.analyser.fftSize = this.param.fft
        this.analyser.smoothingTimeConstant = 0.9
        
        const bufferLength = this.analyser.frequencyBinCount
        
        this.audioData = new Uint8Array(bufferLength)
    }


    // animate
    animate(){
        this.analyser.getByteFrequencyData(this.audioData)

        const startOffset = Math.floor(1 / this.param.fps * this.context.sampleRate)
        const sample = this.audioData.slice(startOffset, startOffset + this.param.display)

        this.buffer = METHOD.createAudioBuffer(sample, this.param.size)
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