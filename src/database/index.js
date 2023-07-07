import 'dotenv/config';
import { MongoClient, ServerApiVersion } from 'mongodb';

const password = encodeURIComponent(process.env.MONGO_PASSWORD);
const uri = `mongodb+srv://lagega:${password}@trellodsw.psfpogo.mongodb.net/?retryWrites=true&w=majority`;

export class DBClient {
  static instance;
  static database;

  static async connectDB() {
    if (!DBClient.instance) {
      DBClient.instance = new MongoClient(uri, {
        serverApi: {
          version: ServerApiVersion.v1,
          strict: true,
          deprecationErrors: true,
        },
      });

      DBClient.database = await DBClient.instance.db('trellodsw');
    }

    await DBClient.instance.connect();

    return DBClient.database;
  }

  static async closeDB() {
    await DBClient.instance.close();
  }
}

export async function createUser(email, password, user) {
  const database = await DBClient.connectDB();
  const collection = await database.collection('users');

  if (await collection.find({ email }).hasNext()) {
    DBClient.closeDB();
    throw new Error('Já existe um usuário registrado com este e-mail.');
  }

  await collection.insertOne({ email, password, user });

  await DBClient.closeDB();
}
