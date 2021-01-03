import { ObjectID } from 'mongodb';

export default async function saveTrigger({db, user, callback}) {
  console.log(user, callback)
  let updatedCb = null
  if(callback._id) {
    const { _id, ...changes } = callback
    updatedCb = await db.collection('callbacks').findOneAndUpdate({
      _id: ObjectID(_id)
    }, {
      '$set': {
        ...changes
      }
    },
    {
      upsert: true,
      returnNewDocument: true
    })
    console.log(updatedCb)
  } else {
    updatedCb = await db.collection('callbacks').insertOne(callback)
  }
  return [ 'callback', updatedCb.value ]
}