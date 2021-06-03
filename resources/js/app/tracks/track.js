import React, { forwardRef } from 'react'


const Track = forwardRef(
    ({track, id}, ref) => {
        if (track.name) {
            return (
                <div className="track" ref={ref}>
                    <img className="trackImage" src={track.album.images[1].url != undefined ? track.album.images[1].url : '/johndoe.png' }></img>
                    <div className="trackDetails">
                        <p className="nameOfTrack">{id + '. ' + track.name}</p>
                        <p className="nameOfArtistTrack">{track.album.artists[0].name}</p>
                    </div>
                </div>
            )
        }

        else {
            return (
                <div className="track" ref={ref}>
                    <img className="trackImage" src={track.track.album.images[1].url != undefined ? track.track.album.images[1].url : '/johndoe.png'}></img>
                    <div className="trackDetails">
                        <p className="nameOfTrack">{id + '. ' + track.track.name}</p>
                        <p className="nameOfArtistTrack">{track.track.album.artists[0].name}</p>
                    </div>
                </div>
            )
        }
    }
)

export default Track