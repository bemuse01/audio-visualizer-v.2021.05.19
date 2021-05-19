import * as THREE from '../../lib/three.module.js'

export default {
    createAudioBuffer(sample, size){
        sample = sample.map((e, i, a) => this.map(e, a))
        const merge = [...sample, ...sample]

        // const median = METHOD.median(merge)
        
        // const temp = sample.map(e => Math.max(1, e - median))
        // for(let i = 0; i < sample.length; i++){
        //     sample[i] = Math.max(1, sample[i] - median)
        // }

        // const merge = [...sample, ...sample]
        // const merge = [...temp, ...temp]

        return new THREE.DataTexture(new Float32Array(merge), size, size, THREE.RedFormat, THREE.FloatType)
    },
    map(e, a){
        // const median = METHOD.median(a)
        const avg = a.reduce((x, y) => x + y) / a.length
        return Math.max(1, e - avg)
    }
}