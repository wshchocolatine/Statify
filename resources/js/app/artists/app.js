import React, { useEffect, useState, forwardRef } from 'react'
import Artist from './artist.js'
import SpotifyWebApi from 'spotify-web-api-js'
const spotify = new SpotifyWebApi();


function ContainerArtists() {
    const [toggle, setToggle] = useState(1)
    const [artists, setArtists] = useState(null)

    const getArtists = async (term) => {
        let artists = await spotify.getMyTopArtists({
            time_range: term,
            limit: 50,
        })
        return artists.items
    }

    useEffect(() => {
        if(artists === null) {
            (async function get() {
                setToggle(1)
                let token = document.querySelector('#root').dataset.token
                spotify.setAccessToken(token)
                setArtists(await getArtists('short_term'))
            })()
        }
    })

    const changeToggle = async (index) => {
        setToggle(index)

        switch (index) {
            case 1:
                setArtists(await getArtists('short_term'))
                break;
            case 2:
                setArtists(await getArtists('medium_term'))
                break;
            case 3:
                setArtists(await getArtists('long_term'))
                break;
            default:
                console.log("L'argument ne peut être compris que entre 1 et 3")
        }
    }

    if (artists === null) {
        return (
            <>
            <h1>Loading...</h1>
            </>
        )
    }

    else {
        return (
            <>
                <div className="containerHeadingArtists">
                    <p className="artists">Artists</p>
                    <ul className="optionsForArtistsUl">
                        <li className={toggle === 1 ? "optionsForArtists optionsForArtistsActive" : "optionsForArtists"}
                            onClick={() => changeToggle(1)}>Past Month </li>
                        <li className={toggle === 2 ? "optionsForArtists optionsForArtistsActive" : "optionsForArtists"}
                            onClick={() => changeToggle(2)}>Last 6 Months</li>
                        <li className={toggle === 3 ? "optionsForArtists optionsForArtistsActive" : "optionsForArtists"}
                            onClick={() => changeToggle(3)}>All Time</li>
                    </ul>
                </div>
    
                <hr className="separationArtists"></hr>
    
                <div className="favArtists">
                    {artists.map(artist => (
                        <Artist
                            key={artists.indexOf(artist) + 1}
                            id={artists.indexOf(artist) + 1}
                            imgHref={artist.images[2].url != undefined ? artist.images[2].url : '/johndoe.png'}
                            name={artist.name} />
                    ))}
                </div>
            </>
        )
    }
}

export default ContainerArtists