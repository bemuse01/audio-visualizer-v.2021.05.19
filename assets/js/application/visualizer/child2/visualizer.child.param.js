import AUDIO_PARAM from '../../audio/audio.param.js'

export default {
    width: 500,
    height: 5,
    seg: AUDIO_PARAM.display - 1,
    size: AUDIO_PARAM.size,
    color: 0xffffff,
    // filter: [1, 4, 6, 12, 18, 36, 48, 64, 96, 128, 96, 64, 48, 36, 18, 12, 6, 4, 1]
    filter: [1, 4, 6, 12, 18, 12, 6, 4, 1]
}