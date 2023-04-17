/* eslint-disable @typescript-eslint/no-non-null-assertion */
import passport from "passport";
import { Strategy } from "passport-google-oauth20";
import { config } from "../../../config";
import { CreateUserUseCase } from "../../../app/use-cases/user-cases";
import { TypeOrmUserRepository } from "../database/implementations/typeorm-user-repository";

const userRepository = new TypeOrmUserRepository();
const createUserUseCase = new CreateUserUseCase(userRepository);

passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((user: any, done) => {
  done(null, user);
});

passport.use(
  new Strategy(
    {
      clientID: config.GOOGLE_CREDENTIALS.GOOGLE_CLIENT_ID,
      clientSecret: config.GOOGLE_CREDENTIALS.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:4000/api/auth/google/callback",
    },
    async (_accessToken, _refreshToken, profile, done) => {
      const {
        displayName,
        _json: { email },
      } = profile;

      const user = await createUserUseCase.signinEmail({
        fullname: displayName!,
        email: email!,
      });

      return done(null, user);
    }
  )
);
