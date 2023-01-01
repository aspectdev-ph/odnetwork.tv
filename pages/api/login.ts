// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import * as dotenv from "dotenv";
import type { NextApiRequest, NextApiResponse } from "next";
import connection from "./mysql";
import * as bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { json } from "stream/consumers";
import { connect } from "http2";
dotenv.config();
var secret: any = process.env.JWT_KEY;
function login(query: string, email: any) {
  return new Promise((resolve, rejects) => {
    connection.query(query, [email], (err, result, feilds) => {
      if (err) {
        rejects(err);
        connection.end();
      }
      {
        resolve(result);
        connection.end();
      }
    });
  });
}
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.body == null) {
    res.statusCode = 404;
    res.status(404).end("Something went wrong");
    return;
  }

  const email = req.body.email;
  const password = req.body.password;
  const remember_me = req.body.remember_me;
  var query: string =
    "select EMAIL,USERNAME,USER_ID,YOUTUBE_CHANNEL_ID,WALLET_ID,PASSWORD,PROFILE_PIC from users_account where EMAIL=? and IS_EXIST='true'";
  return login(query, email)
    .then((result: any) => {
      if (result.length == 1) {
        bcrypt.compare(password, result[0].PASSWORD, function (err, resu) {
          if (resu) {
            var token = jwt.sign(
              {
                email: email,
                username: result[0].USERNAME,
                user_id: result[0].USER_ID,
                youtube_channel_id: result[0].YOUTUBE_CHANNEL_ID,
                wallet_id: result[0].WALLET_ID,
                profile_pic: result[0].PROFILE_PIC,
              },
              secret
            );
            res.status(200).json({
              code: 200,
              token: token,
              message: "Welcome back " + result[0].USERNAME,
            });
          } else {
            res.status(401).json({
              code: 401,
              message: "Username/Password do not match in our record!",
            });
          }
        });
      } else {
        res.status(401).json({
          code: 401,
          message: "Username/Password do not match in our record!",
        });
      }
    })
    .catch((e) => {
      res.status(500).json({ message: "something went wrong" });
    });
}
