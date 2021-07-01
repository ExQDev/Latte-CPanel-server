import fetch from 'node-fetch';

const ADMIN_PERMS = 2147483647;

export default async function getguilds({ db, user }) {
  if(!user)
    return [ 'error', 'Not authorized' ]
  
  console.log(`${user.tokenType} ${user.accessToken}`)
  const guilds = await (await fetch('https://discord.com/api/users/@me/guilds', {
    headers: {
      authorization: `${user.tokenType} ${user.accessToken}`
    }
  })).json();

  // console.log(guilds)
  // console.log(guilds)
  const owned = guilds.filter(g => g.permissions === ADMIN_PERMS)

  return ['guilds', owned ]  
}