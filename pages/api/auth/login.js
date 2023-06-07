import { query } from "@/lib/db";
import bcrypt from 'bcrypt'

export default async function handler(req, res) {
  if (req.method == "GET") {
    try {
      const param = JSON.parse(req.body);
      console.log(param)
      res.status(200).json({message:"성공"});
    } 
    catch (error) {
      console.log(error);
      res.status(500).json({message:"기타오류"});
    }
  }
}
