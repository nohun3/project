import { query } from "@/lib/db";
import bcrypt from 'bcrypt'

export default async function handler(req, res) {
  if (req.method == "POST") {
    try {
      const param = JSON.parse(req.body);
      
      param.password = await bcrypt.hash(param.password, 256);

      let cnt = await getUserEmailCount(param.email);
      if (cnt[0].cnt > 0) {
        res.status(400).json({message:"이메일중복"});
        return;
      }

      const data = await query({
        query: "INSERT INTO TB_USER" +
              " (EMAIL, NICK_NAME, PASSWORD)" +
              " VALUES" +
              " (?, ?, ?)",
        values: [param.email, param.nickName, param.password],
      });
      
      if (data.affectedRows == 1) {
        res.status(200).json({message:"등록완료"});
      } else {
        res.status(400).json({message:"서버오류"});
      }    
    } 
    catch (error) {
      console.log(error);
      res.status(500).json({message:"기타오류"});
    }
  }
}

async function getUserEmailCount(email) {
  const data = await query({
    query: "SELECT COUNT(1) AS CNT" +
          " FROM TB_USER USR" +
          " WHERE USR.EMAIL = ?",
    values: [email],
  });
  return data;
}