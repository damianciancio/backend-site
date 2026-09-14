import { SignJWT, jwtVerify } from 'jose';
import { User } from './users/user.entity.js';
import { NextFunction, Request, Response } from 'express';

const secret = new TextEncoder().encode(process.env.JWT_SECRET!);

// Login

export const generateJwtToken = async (user: User) => {
  const token = await new SignJWT({ userId: user.id, email: user.email, role: 'user', name: user.name })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(secret);

  return token;
}

export const middlewareIsLoggedIn = async (req: Request, res: Response, next: NextFunction) => {

  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    return res.status(401).send({ message: "Unauthorized" });
  }

  const token = authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).send({ message: "Unauthorized" });
  }

  try {
    const { payload } = await jwtVerify(token, secret);
    (req as any).user = payload;
    next();
  } catch (error) {
    return res.status(401).send({ message: "Unauthorized" });
  }
}


export const validateRole = (...role: string[]) => (req: Request, res: Response, next: NextFunction) => {
  const userRole = (req as any).user.role;
  if (!role.includes(userRole)) {
    return res.status(403).send({ message: "Forbidden" });
  }
  next();
};


// Middleware