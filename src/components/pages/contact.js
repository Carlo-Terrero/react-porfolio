import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import contactImg from "../../../static/assets/image/auth/contact/login.jpg"

export default function() {
    return (
        <div className="content-wrapper">
            <div 
                className="left-wrapper" 
                style={{ 
                    backgroundImage: `url(${contactImg})`
                }}
            >
            </div>

            <div className="right-wrapper">
                <div className="contact-bullet-points">
                    <div className="bullet-point-group">
                        <div className="icon"> 
                            <FontAwesomeIcon icon="mobile-alt"/> 
                        </div>

                        <div className="text">555-555-555</div>
                    </div>

                    <div className="bullet-point-group">
                        <div className="icon"> 
                            <FontAwesomeIcon icon="envelope"/> 
                        </div>

                        <div className="text">micorreo@gmail.com</div>
                    </div>

                    <div className="bullet-point-group">
                        <div className="icon"> 
                            <FontAwesomeIcon icon="map-marked-alt"/> 
                        </div>

                        <div className="text">Madrid, Spain</div>
                    </div>

                    <a href="https://www.linkedin.com/in/carlos-jos%C3%A9-terrero-mendez-088462111/" target="_blank">
                        Linked In
                    </a>
                </div>                                
            </div>
        </div>
    );
}