import React from 'react';

export default function(props) {
    return (
        <div> {/* En esta parte acedamos al elemeneto slug seleccionado */}
            <h2>Portfolio Detail for {props.match.params.slug}</h2>
        </div>
    );
}