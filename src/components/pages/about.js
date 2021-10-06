import React from 'react';
import myImg from "../../../static/assets/image/auth/perfil/devtrunk.jpg"

export default function() {
    return (
        <div className="content-wrapper">
            <div 
                className="left-wrapper" 
                style={{ 
                    backgroundImage: `url(${myImg})`
                }} 
            >
            </div>

            <div className="right-wrapper">
                <h1>Desgloce de habilidades.</h1>

                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sagittis pharetra enim, in sagittis ante interdum sit amet. 
                    Donec feugiat vestibulum ligula porta euismod. Vestibulum interdum faucibus scelerisque. 
                    Suspendisse varius elit ac nibh bibendum lacinia. Aliquam lectus ex, tincidunt imperdiet diam sit amet, convallis egestas nisi. 
                    Aliquam arcu massa, finibus in orci quis, vulputate fringilla sapien. Morbi ac quam tortor.
                </p>

                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sagittis pharetra enim, in sagittis ante interdum sit amet. 
                    Donec feugiat vestibulum ligula porta euismod. Vestibulum interdum faucibus scelerisque. 
                    Suspendisse varius elit ac nibh bibendum lacinia. Aliquam lectus ex, tincidunt imperdiet diam sit amet, convallis egestas nisi. 
                    Aliquam arcu massa, finibus in orci quis, vulputate fringilla sapien. Morbi ac quam tortor.
                </p>

                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sagittis pharetra enim, in sagittis ante interdum sit amet. 
                    Donec feugiat vestibulum ligula porta euismod. Vestibulum interdum faucibus scelerisque. 
                    Suspendisse varius elit ac nibh bibendum lacinia. Aliquam lectus ex, tincidunt imperdiet diam sit amet, convallis egestas nisi. 
                    Aliquam arcu massa, finibus in orci quis, vulputate fringilla sapien. Morbi ac quam tortor.
                </p>


            </div>
        </div>
    )
}