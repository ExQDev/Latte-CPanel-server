import fetch from 'node-fetch';
import axios from 'axios';

export default async function getroles({ db, user, guild, userId }) {
  if(!user)
    return [ 'error', 'Not authorized' ]
  
  console.log(`${user.tokenType} ${user.accessToken}`)
  
  const body = {
    method: 'getRoles',
    guildId: guild,
    // userId
  };

  // console.log(body)

  const roles = await (await axios.post(`http://localhost:9099/api`, body )).data;

  // const owned = guilds.filter(g => g.owner)

  return ['roles', roles ]  
}