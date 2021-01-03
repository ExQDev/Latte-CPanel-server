export default async function incomeUser({db, user, incomeUser, token}) {
  console.log(user, incomeUser)
  const updatedUser = await db.collection('users').findOneAndUpdate({
    id: incomeUser.id
  }, {
    '$set': {
      ...incomeUser,
      token
    }
  },
  {
    upsert: true,
    returnNewDocument: true
  })
  console.log(updatedUser)
  return [ 'user', updatedUser ]
}