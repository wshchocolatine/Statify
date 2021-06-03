import React, { useEffect, useState } from 'react'
import SpotifyWebApi from 'spotify-web-api-js'
const spotify = new SpotifyWebApi();


function ContainerProfile() {
    const [profile, setProfile] = useState(null)

    useEffect(() => {
            (async function getProfile() {
                let token = document.querySelector('#root').dataset.token
                spotify.setAccessToken(token)
                let profil = await spotify.getMe()
                setProfile(profil)
            })()
    }, [])

    if (profile === null) {
        return (
            <>
                <h1>Loading...</h1>
            </>
        )
    }

    else {
        return (
            <>
                <img className="imgProfile" src={profile.images[0].url}></img>
                <p className="nameProfile">{profile.display_name}</p>
                <p className="followersProfile">{profile.followers.total + ' followers'}</p>
            </>
        )
    }
}

export default ContainerProfile;