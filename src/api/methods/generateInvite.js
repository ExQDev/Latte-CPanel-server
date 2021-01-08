import { ObjectID } from 'mongodb';
import axios from 'axios';

export default async function generateInvite({db, user, guild}) {
  if(!guild) return [ 'error', 'No guild provided' ]

  const body = {
    method: 'generateInvite',
    guildId: guild,
  };
  const link = await (await axios.post(`http://localhost:9099/api`, body )).data;
  console.log(link)
  return [ 'invite', link]
}