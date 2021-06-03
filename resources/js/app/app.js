import React, { useState } from 'react'
import ContainerTracks from './tracks/app.js'
import ContainerArtists from './artists/app.js'
import ContainerProfile from './profile/app.js'


export default function App() {
    const [toggle, setToggle] = useState(1)

    const changeToggle = (index) => {
        setToggle(index)
    }

    return (
        <>
            <header>
                <nav>
                    <ul className="headerUl">
                        <li className={toggle === 1 ? "headerLi headerLiActive" : "headerLi"}
                            onClick={() => changeToggle(1)}>Profile</li>
                        <li className={toggle === 2 ? "headerLi headerLiActive" : "headerLi"}
                            onClick={() => changeToggle(2)}>Fav Tracks</li>
                        <li className={toggle === 3 ? "headerLi headerLiActive" : "headerLi"}
                            onClick={() => changeToggle(3)}>Fav Artists</li>
                    </ul>
                </nav>
            </header>

            <div className={toggle === 2 ? "fatContainerTracks" : "invisible"}>
                <ContainerTracks />
            </div>

            <div className={toggle === 3 ? "fatContainerArtists" : "invisible"}>
                <ContainerArtists />
            </div>

            <div className={toggle === 1 ? "fatContainerProfile" : "invisible"}>
                <ContainerProfile />
            </div>
        </>
    )
}