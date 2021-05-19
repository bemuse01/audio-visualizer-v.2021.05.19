import AUDIO_PARAM from '../../audio/audio.param.js'

export default {
    width: 500,
    height: 5,
    seg: AUDIO_PARAM.display - 1,
    size: AUDIO_PARAM.size,
    color: 0xffffff,
    filter: [1, 4, 10, 4, 1]
}