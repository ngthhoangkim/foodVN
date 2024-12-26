import mysql from "mysql";

let connection;

export const connetToDb = async () => {
  try {
    if (!connection) {
      connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
      });
    }
    return connection;
  } catch (error) {
    console.log("Kết nối database thất bại!", error);
  }
};
