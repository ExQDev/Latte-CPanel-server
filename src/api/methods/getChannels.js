import axios from 'axios';

export default async function getChannels({ db, user, guild, userId }) {
  if(!user)
    return [ 'error', 'Not authorized' ]
  
  const body = {
    method: 'getChannels',
    guildId: guild,
    // userId
  };

  // console.log(body)

  const channels = await (await axios.post(`http://localhost:9099/api`, body )).data;

  // const owned = guilds.filter(g => g.owner)

  return ['channels', channels ]  
}