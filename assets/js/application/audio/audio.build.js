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
        this.src = 'assets/src/LiSA - Unlasting.mp3'
        this.start = true
        this.buffer = null
        this.duration = 0
        this.currentTime = 0
        this.index = new Array(PARAM.display).fill(0).map((_, i) => i)
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

        this.updateAudioCurrentTime()
    }
    createContext(){
        this.context = new AudioContext()
        
		const source = this.context.createMediaElementSource(this.audio)
        
        this.analyser = this.context.createAnalyser()
		source.connect(this.analyser)
		this.analyser.connect(this.context.destination)
		this.analyser.fftSize = PARAM.fft
        this.analyser.smoothingTimeConstant = 0.9
        
        const bufferLength = this.analyser.frequencyBinCount
        
        this.audioData = new Uint8Array(bufferLength)
    }


    onReadyAudio(){
        this.audio.addEventListener('load', () => {
        })
    }
    // update audio current time
    updateAudioCurrentTime(){
        this.audio.addEventListener('timeupdate', () => {
            this.currentTime = this.audio.currentTime
        })
    }


    // animate
    animate(){
        this.analyser.getByteFrequencyData(this.audioData)

        const startOffset = Math.floor(1 / PARAM.fps * this.context.sampleRate)
        // const sample = this.audioData.slice(startOffset, startOffset + PARAM.display)
        const sample = METHOD.createStepAudioBuffer(this.audioData.slice(startOffset), PARAM)

        // this.buffer = METHOD.createAudioBuffer(sample, PARAM.size)
        // this.buffer = METHOD.createSmaAduioBuffer(sample, PARAM.size, PARAM.subset)
        this.buffer = METHOD.createCubicSplineAudioBuffer(sample, this.index, PARAM)
    }


    // play
    play(){
        if(this.start){
            this.audio.play()
            this.context.resume()
            this.start = false
            this.duration = this.audio.duration
        }
    }
}