import React, {forwardRef} from 'react'


const Artist = forwardRef(
    ({imgHref, name, id}, ref) => {
        return (
            <div className="artist" ref={ref}>
                <img className="artistImage" src={imgHref}></img>
                <div className="artistDetails">
                    <p className="nameOfArtist">{id + '. ' + name}</p>
                </div>
            </div>
        )
    }
)

export default Artist