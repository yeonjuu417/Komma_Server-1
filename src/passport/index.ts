import "dotenv/config";
import passport from "passport";
import * as passportLocal from "passport-local";

import { compareSync } from "bcryptjs";
import User from "../entity/User";

const LocalStrategy = passportLocal.Strategy;

passport.use(
    new LocalStrategy(
      { usernameField: "email", passwordField: "password" },
      async (username: string, password: string, done: Function): Promise<Function> => {
        const result = await User.findOne({ email: username });
  
        if (result) {
          if (compareSync(password, result.password)) {
            delete result.password;
            return done(null, result);
          }
          return done(null, false, { message: "비밀번호가 일치하지 않습니다." });
        }
        return done(null, false, {
          message: "일치하는 정보가 존재하지 않습니다."
        });
      }
    )
  );