import * as THREE from '../../lib/three.module.js'
import Spline from '../../lib/cubic-spline.js'

export default {
    createAudioBuffer(sample, size){
        const avg = sample.reduce((x, y) => x + y) / sample.length
        sample = sample.map(e => Math.max(1, e - avg))

        // const merge = [...sample, ...sample]
        const merge = sample

        // const median = METHOD.median(merge)
        
        // const temp = sample.map(e => Math.max(1, e - median))
        // for(let i = 0; i < sample.length; i++){
        //     sample[i] = Math.max(1, sample[i] - median)
        // }

        // const merge = [...sample, ...sample]
        // const merge = [...temp, ...temp]

        return new THREE.DataTexture(new Float32Array(merge), size, size, THREE.RedFormat, THREE.FloatType)
    },
    createStepAudioBuffer(sample, {display, step}){
        const temp = []

        for(let i = 0; i < display; i++){
            temp.push(sample[i * step])
        }

        return temp
    },
    createSmaAduioBuffer(sample, size, subset){
        const len = sample.length 
        
        const avg = sample.reduce((x, y) => x + y) / len
        sample = sample.map(e => Math.max(1, e - avg))

        let temp = []
        
        for(let i = 0; i < len; i++){
            let sum = 0, avg = 0
            for(let j = i; j < (i + subset) % len; j++){
                sum += sample[j] 
            }
            avg = sum / subset
            temp.push(avg)
        }

        return new THREE.DataTexture(new Float32Array(temp), size, size, THREE.RedFormat, THREE.FloatType)
    },
    createCubicSplineAudioBuffer(sample, index, {size, smooth}){
        const len = sample.length 
        let temp = []

        const xs = index
        const ys = sample
        const spline = new Spline(xs, ys)
        
        for(let i = 0; i < len; i++){
            temp.push(spline.at(i * smooth))
        }

        const avg = temp.reduce((x, y) => x + y) / len
        temp = temp.map(e => Math.max(1, e - avg))

        return new THREE.DataTexture(new Float32Array(temp), size, size, THREE.RedFormat, THREE.FloatType)
    }
}