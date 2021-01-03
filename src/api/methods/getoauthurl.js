export default async function logout({db, user}) {
  console.log(process.env.OAUTH)
  return [ process.env.OAUTH ]
}