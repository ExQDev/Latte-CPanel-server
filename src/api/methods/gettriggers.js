import fetch from 'node-fetch';

export default async function gettriggers({ db, user, guild }) {
  if(!user)
    return [ 'error', 'Not authorized' ]
  
  // console.log('triggers', guild)
  const triggers = await (await db.collection('callbacks').find({
    guild: guild
  })).toArray()
  // console.log('triggers', triggers)
  // console.log(`${user.tokenType} ${user.accessToken}`)
  // const guilds = await (await fetch('https://discord.com/api/users/@me/guilds', {
  //   headers: {
  //     authorization: `${user.tokenType} ${user.accessToken}`
  //   }
  // })).json();

  // const owned = guilds.filter(g => g.owner)

  return ['triggers', triggers ]  
}