import * as THREE from '../../lib/three.module.js'

export default {
    createAudioBuffer(sample, size){
        const merge = [...sample, ...sample].map(e => METHOD.normalize(e, 1, 100, 0, 255))

        return new THREE.DataTexture(new Float32Array(merge), size, size, THREE.RedFormat, THREE.FloatType)
    }
}