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

                        <div className="text">+34 629 228 654</div>
                    </div>

                    <div className="bullet-point-group">
                        <div className="icon"> 
                            <FontAwesomeIcon icon="envelope"/> 
                        </div>

                        <div className="text">carlosjose2111@gmail.com</div>
                    </div>

                    <div className="bullet-point-group">
                        <div className="icon"> 
                            <FontAwesomeIcon icon="map-marked-alt"/> 
                        </div>

                        <div className="text">Madrid, Spain</div>
                    </div>

                    <div className="bullet-point-group">
                    <a href="https://www.linkedin.com/in/carlos-jos%C3%A9-terrero-mendez-088462111/" target="_blank">
                        <div className="icon"> 
                            <FontAwesomeIcon icon={["fab", "linkedin"]}/>   
                        </div>
                        <div className="text">Linked In</div>
                       {/*  <FontAwesomeIcon icon={["fab", "linkedin"]}/> */}
                    </a>
                    </div>

                    <div className="bullet-point-group">
                        <a href="https://github.com/Carlo-Terrero?tab=repositories" target="_blank">
                            <div className="icon"> 
                                <FontAwesomeIcon icon={["fab", "github"]}/>   
                            </div>
                        
                            <div className="text">GitHab</div>
                        </a>
                   </div>
                </div>                                
            </div>
        </div>
    );
}