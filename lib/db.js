import mysql from "mysql2/promise";
import lodash from 'lodash';

export async function query({query, values = []}) {
  const dbconnection = await mysql.createConnection({
    host: "127.0.0.1",
    database: "devup",
    user: "devup",
    password: "devup"
  })

  try {
    const [results,fields] = await dbconnection.execute(query, values);
    dbconnection.end();

    // 조회결과 항목명 카멜케이스로 변경
    if (results[0]) {
      let colMap = {};
      Object.keys(results[0]).map((key, i) => {
        colMap[key] = lodash.camelCase(key);
      });
  
      results.map((obj, i) => {
        Object.keys(colMap).map((key, i) => {
          obj[colMap[key]] = obj[key];
          delete obj[key];
        });
      });
    }
    return results;
  } catch (error) {
    throw Error(error.message);
    return { error };
  }
}