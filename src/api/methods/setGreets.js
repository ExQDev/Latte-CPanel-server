import { ObjectID } from 'mongodb';

export default async function setGreets({db, user, guild, greets}) {
  if(!guild) return [ 'error', 'No guild provided' ]
  
  const updatedCb = await db.collection('guilds').findOneAndUpdate({
    id: guild
  }, {
    '$set': {
      ...greets
    }
  }, {
    returnOriginal: false
  })
  
  const { greet, bye, greetChannel, byeChannel, ...cGuild } = updatedCb.value
  return [ 'greets', {
    greet, bye, greetChannel, byeChannel
  } ]
}