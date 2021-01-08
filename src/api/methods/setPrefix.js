import { ObjectID } from 'mongodb';

export default async function setPrefix({db, user, guild, prefix}) {
  if(!guild) return [ 'error', 'No guild provided' ]
  let pref = prefix
  if(!prefix) pref = '>'

  const updatedCb = await db.collection('guilds').findOneAndUpdate({
    id: guild
  }, {
    '$set': {
      prefix: pref
    }
  }, {
    returnOriginal: false
  })
  
  // console.log(updatedCb)
  return [ 'prefix', updatedCb.value.prefix ]
}