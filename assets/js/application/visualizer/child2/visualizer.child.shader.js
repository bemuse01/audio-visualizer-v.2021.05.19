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
            #define KERNEL_LEN ${PARAM.filter.length ** 2}

            uniform sampler2D uBuffer;
            uniform float uKernel[KERNEL_LEN];
            uniform int uKernelSize;
            uniform int uCenter;
            uniform int uSize;

            void main(){
                ivec2 coord = ivec2(gl_FragCoord.xy);

                vec4 aud = texelFetch(audio, coord, 0);

                aud.x = float(texelFetch(uBuffer, coord, 0));

                gl_FragColor = aud;
            }
        `
    }
}