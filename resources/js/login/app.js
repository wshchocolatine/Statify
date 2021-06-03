import React from 'react'

export default function Login() {
    let scopes = [
        'user-top-read',
        'user-read-recently-played',
        'user-read-private',
        'user-read-email'
    ]

    let redirectUri = 'http://localhost:3000/code'
    let clientId = 'dc1e94d625444f0bbc38e5f572fa03b5'

    var generateRandomString = function(length) {
        var text = '';
        var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      
        for (var i = 0; i < length; i++) {
          text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text;
    };
    let state = generateRandomString(16)

    const buttonClick = () => {
        window.open(`https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=code&redirect_uri=${redirectUri}&scope=${scopes}&state=${state}`)
    }

    return (
        <div id="bigContainer">
            <p className="heading">Statify</p>
            <button className="button"
                    onClick={buttonClick}>LOGIN</button>
        </div>
    )
}
