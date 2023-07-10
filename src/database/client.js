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

  static async getUserCollection() {
    const database = await DBClient.connectDB();
    return await database.collection('users');
  }

  static async getBoardCollection() {
    const database = await DBClient.connectDB();
    return await database.collection('boards');
  }

  static async getListCollection() {
    const database = await DBClient.connectDB();
    return await database.collection('lists');
  }
}
