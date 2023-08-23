import { SignJWT, jwtVerify } from "jose";
import { con } from "./atlas.js";
import dotenv from "dotenv";
import passport from "passport";
import { Strategy as BearerStrategy } from "passport-http-bearer";

dotenv.config();

// Configurar la estrategia de autenticación Bearer
passport.use(
  new BearerStrategy(async (token, done) => {
    try {
      const encoder = new TextEncoder();
      const { payload } = await jwtVerify(
        token,
        encoder.encode(process.env.JWT_SECRET)
      );

      // Aquí puedes realizar verificaciones adicionales si es necesario

      return done(null, payload);
    } catch (error) {
      return done(error, false);
    }
  })
);

export const requireRole = (role) => {
  return (req, res, next) => {
    passport.authenticate("bearer", { session: false }, (err, user) => {
      if (err) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      if (!user) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      if (user.role !== role) {
        return res.status(403).json({ message: "Forbidden" });
      }
      req.user = user;
      next();
    })(req, res, next);
  };
};

export const validarToken = async (req, res, next) => {
  const conexionDB = await con();
  try {
    const encoder = new TextEncoder();
    const { payload } = await jwtVerify(
      req.headers.authorization.split(" ")[1], // Extract token from "Bearer <token>"
      encoder.encode(process.env.JWT_SECRET)
    );
    if (
      payload.role == "admin" ||
      payload.role == "camper" ||
      payload.role == "trainer"
    ) {
      req.user = payload; // Store the user's payload in the request for later use
      return next();
    } else {
      res
        .status(404)
        .send(JSON.stringify({ status: 404, message: "Not found role" }));
    }
  } catch (error) {
    console.log(error);
    return res.status(401).json({ message: "Unauthorized" });
  }
};

export const crearToken = async (req, res) => {
  const encoder = new TextEncoder();
  if (
    req.body.role == "admin" ||
    req.body.role == "camper" ||
    req.body.role == "trainer"
  ) {
    const jwtConstructor = await new SignJWT(req.body)
      .setProtectedHeader({ alg: "HS256", typ: "JWT" })
      .setIssuedAt()
      .setExpirationTime("1h")
      .sign(encoder.encode(process.env.JWT_SECRET));
    res.send(JSON.stringify({ role: req.body.role, token: jwtConstructor }));
  } else {
    res
      .status(400)
      .send(
        JSON.stringify({ status: 400, message: "Invalid credentials required" })
      );
  }
};
