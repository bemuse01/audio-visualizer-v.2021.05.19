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
    }
}