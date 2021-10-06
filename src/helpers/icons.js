/* Esto nos ayuda a que sea mucho mas limpio a la hora de
utilizar varios iconos y que no haya una gran lista de ellos
en app, que es la principal. Solo hay que importarlo y ya. */
//Estos son los gratis y no son marcas
import { 
        faTrash, 
        faSignOutAlt, 
        faEdit, 
        faSpinner, 
        faPlusCircle, 
        faMobileAlt, 
        faMapMarkedAlt,
        faEnvelope
    } from "@fortawesome/free-solid-svg-icons";

import { library } from "@fortawesome/fontawesome-svg-core";

const Icons = () => {
    library.add(
        faTrash,   
        faSignOutAlt, 
        faEdit, 
        faSpinner, 
        faPlusCircle, 
        faMobileAlt,
        faMapMarkedAlt,
        faEnvelope
    );
}

export default Icons;