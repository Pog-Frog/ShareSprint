import { DB_URL, DB_NAME } from "../config";

export const dbConnection = {
    url: `${DB_URL}/${DB_NAME}`,
    options: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    },
}