import React from 'react';

const BlogFeaturedImage = props => {
    if (!props.img) {
        return null;
    }

    return (
        <div className="featured-image-wrapper">
            <img src={props.img}/>
        </div> 
    );
};

export default BlogFeaturedImage;

/* -------------------Buscar la diferencias------------------------------- */
/* import React from 'react';

export default function() {
    return (
        <div>
            
        </div>
    );
} */