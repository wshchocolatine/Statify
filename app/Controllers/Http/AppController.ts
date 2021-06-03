import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
//Packages
let axios = require('axios')
let qs = require('qs')

//Config
let clientId = "dc1e94d625444f0bbc38e5f572fa03b5"
let clientSecret = "19cd8cbbf95d461786da2ed1273f5862"


export default class AppController {
    public async code({request, response, session}: HttpContextContract) {
        let {code} = request.only(['code'])

        let data = qs.stringify({
            "grant_type": "authorization_code",
            "code": code,
            "redirect_uri": "http://localhost:3000/code",
            "client_id": clientId,
            "client_secret": clientSecret
        })

        let config = {
            method: 'post',
            url: 'https://accounts.spotify.com/api/token',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: data
        }

        await axios(config)
           .then(async(reponse) => {
               let access_token = reponse.data.access_token
               console.log(access_token)
               session.put('token', access_token)
           })
           .catch((e: Error) => {
               console.log(e)
               return 404
           }) 

        response.redirect().toPath('/app')
    }

    public async app({session, view}: HttpContextContract) {
        if(session.has('token')) {
            let token = session.get('token')
            return view.render('app', {
                token: token
            })
        }

        else{
            return view.render('app', {
                error: 'Error'
            })
        }
    }
}
