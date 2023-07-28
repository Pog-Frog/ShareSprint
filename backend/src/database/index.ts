import {DB_NAME, DB_PORT, DB_HOST} from "../config";

export const dbConnection = {
    url: `mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`,
    options: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    },
}