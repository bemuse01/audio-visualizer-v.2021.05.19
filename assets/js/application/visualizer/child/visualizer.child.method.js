export default {
    createAttribute({array, count, size}){
        const position = []
        const coord = []

        for(let i = 0; i < count; i++){
            const index = i * 3

            const x = array[index]
            const y = array[index + 1] /* + (i < half ? 10 : -10) */
            const z = array[index + 2]

            const u = (i % size)
            const v = Math.floor(i / size)

            coord.push(u, v)
            position.push(x, y, z)
        }

        return {position: new Float32Array(position), coord: new Float32Array(coord)}
    },
    createKernel(temp){
        const arr = []
        let count = 0

        for(let i = 0; i < temp.length; i++){
            for(let j = 0; j < temp.length; j++){
                const value = temp[i] * temp[j]
                count += value
                arr.push(value)
            }
        }

        return arr.map(e => e / count)
    }
}