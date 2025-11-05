import express from 'express';
import {connectDb, poolDb} from './db-connect.js';
import {homeRouter} from './routes/home.rout.js';
import cors from "cors";

const APP_VERSION = '0.2.0';
const App = express();

App.use(express.json());
App.use(cors());


let currentVersion;
try {
    currentVersion = (await connectDb(process.env.APP_TABLE_NAME).first(process.env.APP_VERSION_COLUMN_NAME))?.version;
} catch (e) {
    currentVersion = null;
}
if (!currentVersion || (currentVersion !== APP_VERSION)) {
    let migrationResultInfo;
    try {
        migrationResultInfo = await connectDb.migrate.latest();
    } catch (e) {
        console.error('Migration failed!');
    }
    if (migrationResultInfo) {
        const [_, appliedMigrationsList] = migrationResultInfo;
        if (appliedMigrationsList?.length) {
            console.warn('Migrations were applied!');
        }
    }
    try {
        await connectDb(process.env.APP_TABLE_NAME).update(process.env.APP_VERSION_COLUMN_NAME, APP_VERSION);
        console.warn(`Version was updated. Current version is: ${APP_VERSION}`);
    } catch (e) {
        console.error('Version was not updated!');
    }
}

App.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, PATCH, PUT, POST, DELETE, OPTIONS");
    next();
});

App.use("/api", homeRouter);

App.listen(3000, () => console.log('hello 3000!!!'));
