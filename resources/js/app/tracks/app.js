import React, { useEffect, useState, forwardRef } from 'react'
import Track from './track.js'
import SpotifyWebApi from 'spotify-web-api-js'
const spotify = new SpotifyWebApi();


function ContainerTracks() {
    const [toggle, setToggle] = useState(1)
    const [tracks, setTracks] = useState(null)


    const getTracks = async (term) => {
        let tracks = await spotify.getMyTopTracks({
            time_range: term,
            limit: 50,
        })
        return tracks.items
    }

    const getHistoric = async () => {
        let tracks = await spotify.getMyRecentlyPlayedTracks({
            limit: 50
        })
        return tracks.items
    }

    useEffect(() => {
        if(tracks === null) {
            (async function get() {
                let token = document.querySelector('#root').dataset.token
                spotify.setAccessToken(token)
                setTracks(await getTracks('short_term'))
            })()
        }
    }, [])

    const changeToggle = async (index) => {
        switch (index) {
            case 1:
                setTracks(await getTracks('short_term'))
                setToggle(index)
                break;
            case 2:
                setTracks(await getTracks('medium_term'))
                setToggle(index)
                break;
            case 3:
                setTracks(await getTracks('long_term'))
                setToggle(index)
                break;
            case 4:
                setTracks(await getHistoric())
                setToggle(index)
                break;
            default:
                console.log("L'argument ne peut être compris que entre 1 et 3")
        }
    }

    if (tracks === null) {
        return (
            <>
                <h1>Loading...</h1>
            </>
        )
    }

    /* else if (toggle === 4) {
        return (
            <>
                <div className="containerHeading">
                    <p className="tracks">Tracks</p>
                    <ul className="optionsForTracksUl">
                        <li className={toggle === 1 ? "optionsForTtracks optionsForTracksActive" : "optionsForTracks"}
                            onClick={() => changeToggle(1)}>Past Month </li>
                        <li className={toggle === 2 ? "optionsForTracks optionsForTracksActive" : "optionsForTracks"}
                            onClick={() => changeToggle(2)}>Last 6 Months</li>
                        <li className={toggle === 3 ? "optionsForTracks optionsForTracksActive" : "optionsForTracks"}
                            onClick={() => changeToggle(3)}>All Time</li>
                        <li className={toggle === 4 ? "optionsForTracks optionsForTracksActive" : "optionsForTracks"}
                            onClick={() => changeToggle(4)}>Historic</li>
                    </ul>
                </div>

                <hr className="separationTracks"></hr>

                <div className="favTracks">
                    {tracks.map(track => (
                        console.log(track),
                        <Track
                            key={tracks.indexOf(track) + 1}
                            imgHref={track.track.album.images[1].url != undefined ? track.album.images[1].url : 'https://developer.spotify.com/assets/branding-guidelines/icon3@2x.png'}
                            name={track.track.name}
                            artist={track.track.album.artists[0].name} />
                    ))}
                </div>
            </>
        )
    }  */

    else{
        return (
            <>
                <div className="containerHeading">
                    <p className="tracks">Tracks</p>
                    <ul className="optionsForTracksUl">
                        <li className={toggle === 1 ? "optionsForTracks optionsForTracksActive" : "optionsForTracks"}
                            onClick={() => changeToggle(1)}>Past Month </li>
                        <li className={toggle === 2 ? "optionsForTracks optionsForTracksActive" : "optionsForTracks"}
                            onClick={() => changeToggle(2)}>Last 6 Months</li>
                        <li className={toggle === 3 ? "optionsForTracks optionsForTracksActive" : "optionsForTracks"}
                            onClick={() => changeToggle(3)}>All Time</li>
                        <li className={toggle === 4 ? "optionsForTracks optionsForTracksActive historic" : "optionsForTracks historic"}
                            onClick={() => changeToggle(4)}>Historic</li>
                    </ul>
                </div>

                <hr className="separationTracks"></hr>

                <div className="favTracks">
                    {tracks.map(track => (

                        <Track
                            key={tracks.indexOf(track) + 1}
                            id={tracks.indexOf(track) + 1}
                            track={track} />
                    ))}
                </div>
            </>
        )
    }

}

export default ContainerTracks

/*
                            id={tracks.indexOf(track) + 1}
                            imgHref={track.album.images[1].url != undefined ? track.album.images[1].url : 'https://developer.spotify.com/assets/branding-guidelines/icon3@2x.png'}
                            name={track.name}
                            artist={track.album.artists[0].name} 
                            */