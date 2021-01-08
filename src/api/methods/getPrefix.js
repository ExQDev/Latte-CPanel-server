import { ObjectID } from 'mongodb';

export default async function setPrefix({db, user, guild}) {
  if(!guild) return [ 'error', 'No guild provided' ]
  let pref = '>'

  const updatedCb = await db.collection('guilds').findOne({
    id: guild
  })
  
  if(updatedCb)
    console.log(updatedCb.prefix)
  return [ 'prefix', updatedCb.prefix || pref]
}