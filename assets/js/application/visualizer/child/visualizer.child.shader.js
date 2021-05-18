import PARAM from './visualizer.child.param.js'

export default {
    draw: {
        vertex: `
            // attribute vec3 aPosition;
            attribute vec2 aCoord;

            uniform sampler2D uAudio;

            void main(){
                ivec2 coord = ivec2(aCoord);

                vec3 newPosition = position;

                vec4 aud = texelFetch(uAudio, coord, 0);

                newPosition.y *= aud.x;

                gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
            }
        `,
        fragment: `
            uniform vec3 uColor;

            void main(){
                gl_FragColor = vec4(uColor, 1.0);
            }
        `
    },
    audio: {
        fragment: `
            uniform sampler2D buffer;

            void main(){
                ivec2 coord = ivec2(gl_FragCoord.xy);

                vec4 aud = texelFetch(audio, coord, 0);
                float buffer = float(texelFetch(buffer, coord, 0));
                // vec4 buffer = texelFetch(buffer, coord, 0);

                aud.x = buffer;
                // aud.x = buffer.x;

                gl_FragColor = aud;
            }
        `
    }
}