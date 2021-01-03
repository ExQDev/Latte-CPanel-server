import { ObjectID } from 'mongodb';

export default async function deleteTrigger({db, user, callback}) {
  console.log(user, callback)
  let updatedCb = null
  if(callback._id) {
    updatedCb = await db.collection('callbacks').deleteOne({
      _id: ObjectID(callback._id)
    })
  } else {
    updatedCb = await db.collection('callbacks').deleteMany({})
  }
  return [ 'deleted-callback', callback._id ]
}