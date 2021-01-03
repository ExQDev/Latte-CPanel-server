// @flow
import dotenv from 'dotenv'
import { MongoClient } from 'mongodb'

dotenv.config();

const uri = `mongodb+srv://${process.env.atlasuser}:${process.env.atlaspass}@cluster0-zvexx.mongodb.net/latte?retryWrites=true&w=majority&appName=${process.env.atlasAppId}:mongodb-atlas:api-key`;

export default new MongoClient(uri, { 
  useNewUrlParser: true,
  useUnifiedTopology: true
 }); 
