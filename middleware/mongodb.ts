import { Db, MongoClient } from "mongodb";

const MONGODB_URI = process.env.MONGODB_URI;
const MONGODB_DB = process.env.MONGODB_DB;

let cachedClient: MongoClient;
let cachedDb: Db;

export async function connectToDatabase(): Promise<{ client: MongoClient; db: Db; } | { client: typeof MongoClient; db: typeof Db; }> {
   // check the cached.
  if (cachedClient && cachedDb) {
    // load from cache
    return {
      client: cachedClient,
      db: cachedDb,
    };
  }

  // set the connection options
  const opts = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

  // check the MongoDB URI
  if (!MONGODB_URI) {
    throw new Error("Define the MONGODB_URI environmental variable");
  }
  // check the MongoDB DB
  if (!MONGODB_DB) {
    throw new Error("Define the MONGODB_DB environmental variable");
  } 

  // Connect to cluster
  let client = new MongoClient(MONGODB_URI);
  console.log('connecting to MongoDB...')
  await client.connect()
  console.log('connected to MongoDB...')
  let db = await client.db(MONGODB_DB);
  const collection = db.collection('documents');
     // set cache
   cachedClient = client;
   cachedDb = db;
  return {
    client: cachedClient,
    db: cachedDb,
  };
}
