/* Esto nos ayuda a que sea mucho mas limpio a la hora de
utilizar varios iconos y que no haya una gran lista de ellos
en app, que es la principal. Solo hay que importarlo y ya. */

//Estos son gratis y no pertenecen a ninguna marca
import { 
    faTrash, 
    faSignOutAlt, 
    faSignInAlt,
    faEdit, 
    faSpinner, 
    faPlusCircle, 
    faMobileAlt, 
    faMapMarkedAlt,
    faEnvelope,
    faLock
    
} from "@fortawesome/free-solid-svg-icons";

//Estos son gratis y si pertenecen a marcas
import{
    faFacebook,
    faLinkedin,
    faGithub

} from "@fortawesome/free-brands-svg-icons"

import { library } from "@fortawesome/fontawesome-svg-core";

const Icons = () => {
    library.add(
        faTrash,   
        faSignOutAlt, 
        faSignInAlt,
        faEdit, 
        faSpinner, 
        faPlusCircle, 
        faMobileAlt,
        faMapMarkedAlt,
        faEnvelope,
        faLock,
        faFacebook,
        faLinkedin,
        faGithub


    );
}

export default Icons;