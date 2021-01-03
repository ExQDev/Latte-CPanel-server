import fetch from 'node-fetch';

export default async function getguilds({ db, user }) {
  if(!user)
    return [ 'error', 'Not authorized' ]
  
  console.log(`${user.tokenType} ${user.accessToken}`)
  const guilds = await (await fetch('https://discord.com/api/users/@me/guilds', {
    headers: {
      authorization: `${user.tokenType} ${user.accessToken}`
    }
  })).json();

  const owned = guilds.filter(g => g.owner)

  return ['guilds', owned ]  
}