import { MongoClient, Collection } from 'mongodb';

const connectToMongoDb = async () => {
    const db_uri = process.env.MONGODB_URI
    if (!db_uri) {
        throw Error('MongoDB URI not found')
    }
    const client: MongoClient = await MongoClient.connect(db_uri, { useUnifiedTopology: true })

    console.log(`Mongoclient connected to database server:${client.isConnected()}`)

    const okrs: Collection = client.db().collection('okrs')
    const users: Collection = client.db().collection('users')
    const keyResults: Collection = client.db().collection('keyResults')

    //Connection events
    client.on('connected', () => {
        console.log('Mongoose connected to ' + db_uri);
    });
    client.on('error', (err) => {
        console.log('Mongoose connection error: ' + err);
    });
    client.on('disconnected', () => {
        console.log('Mongoose disconnected');
    });

    //Capture app termination/restart events
    //To be called when process is restarted or terminated
    const gracefulShutdown = (msg: string, callback: any) => {
        client.close(() => {
            console.log('Mongo client disconnected through ' + msg);
            callback();
        });
    };

    //For app termination
    process.on('SIGINT', () => {
        gracefulShutdown('app termination', () => {
            process.exit(0);
        });
    });
    //For Heroku app termination
    process.on('SIGTERM', () => {
        gracefulShutdown('Heroku app termination', () => {
            process.exit(0);
        });
    });

    return [okrs, keyResults, users]
}

export default connectToMongoDb