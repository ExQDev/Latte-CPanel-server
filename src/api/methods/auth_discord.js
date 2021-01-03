import btoa from 'btoa';
import fetch from 'node-fetch';

export default async function auth_discord({ db, user, accessToken, tokenType }) {
  console.log('Oauth callback')
  const incomeUser = await (await fetch('https://discord.com/api/users/@me', {
        headers: {
          authorization: `${tokenType} ${accessToken}`
        }
      })).json();
  const updatedUser = (await db.collection('users').findOneAndUpdate({
    id: incomeUser.id
  }, {
    '$set': {
      ...incomeUser,
      accessToken,
      tokenType
    }
  },
  {
    upsert: true,
    returnNewDocument: true
  })).value
  console.log(updatedUser)
  return [ 'user', updatedUser ]
        // .then(response => {
        //   const { username, discriminator } = response
        //   console.log(`${username}#${discriminator}`, response)
        //   this.$socket.client.emit('action', { method: 'incomeUser', incomeUser: response })
        // })
        // .catch(console.error)
  // const redirect_uri = 'http://localhost:8080/'
  // const creds = btoa(`${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`);
  // console.log(creds)
  // const link = `https://discordapp.com/api/oauth2/token?grant_type=authorization_code&code=${code}&redirect_uri=${redirect_uri}`
  // console.log(link)
  // const response = await fetch(link,
  //   {
  //     method: 'POST',
  //     headers: {
  //       Authorization: `Basic ${creds}`,
  //     },
  //   });
  // const json = await response.json();

  // console.log(json)

  // // const user = db.collection('users').find()
  // return ['token', json.access_token ]  
}