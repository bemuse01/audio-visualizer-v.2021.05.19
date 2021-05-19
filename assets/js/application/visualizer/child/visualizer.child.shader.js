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

            uniform sampler2D buffer;
            uniform float uFilter[KERNEL_LEN];
            uniform int kernelSize;
            uniform int center;
            uniform int uSize;

            void main(){
                ivec2 coord = ivec2(gl_FragCoord.xy);

                vec4 aud = texelFetch(audio, coord, 0);

                float value = 0.0;

                for(int i = 0; i < KERNEL_LEN; i++){
                    int x = int(i % kernelSize) - center;
                    int y = int(i / kernelSize) - center;
                    ivec2 pos = coord + ivec2(x, y);
                    
                    // if(pos.x < 0) pos.x = -pos.x;
                    // if(pos.y < 0) pos.y = -pos.y;
                    
                    // if(pos.x > uSize) pos.x = uSize - (pos.x - uSize);
                    // if(pos.y > uSize) pos.y = uSize - (pos.y - uSize);

                    value += float(texelFetch(buffer, pos, 0)) * uFilter[i];
                }

                aud.x = value;

                gl_FragColor = aud;
            }
        `
    }
}