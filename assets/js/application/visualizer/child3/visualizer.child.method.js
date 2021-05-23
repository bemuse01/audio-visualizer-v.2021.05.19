import * as THREE from '../../../lib/three.module.js'
import Spline from '../../../lib/cubic-spline.js'

export default {
    createAttribute({array, count, size}){
        const position = []
        const coord = []

        for(let i = 0; i < count; i++){
            const index = i * 3

            const x = array[index]
            const y = array[index + 1] /* + (i < half ? 10 : -10) */
            const z = array[index + 2]

            position.push(x, y, z)
        }

        for(let i = 0; i < count; i++){
            const u = (i % size)
            const v = Math.floor(i / size)

            coord.push(u, v)
        }

        return {position: new Float32Array(position), coord: new Float32Array(coord)}
    },
    createStepAudioBuffer(sample, {display, step}){
        const temp = []

        for(let i = 0; i < display; i++){
            temp.push(sample[i * step])
        }

        return temp
    },
    createAudioBuffer(sample, index, {size, smooth}){
        const len = sample.length
        let temp = []

        const xs = index
        const ys = sample
        ys[0] = 0
        // ys[1] = 0
        ys[Math.floor((len - 1) * smooth)] = 0
        ys[Math.floor((len - 1) * smooth) + 1] = 0
        const spline = new Spline(xs, ys)
        
        for(let i = 0; i < len; i++){
            temp.push(spline.at(i * smooth))
        }

        const avg = temp.reduce((x, y) => x + y) / len
        // temp = temp.map(e => Math.max(1, e - avg))
        temp = temp.map(e => METHOD.normalize(Math.max(1, e - avg), 1, 3, 0, 255))

        return new THREE.DataTexture(new Float32Array([...temp.map(_ => 1), ...temp]), size, size, THREE.RedFormat, THREE.FloatType)
    }
}