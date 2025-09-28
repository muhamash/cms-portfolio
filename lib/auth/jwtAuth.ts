import jwt from "jsonwebtoken";

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || "access_token";
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || "refresh_token";

export function generateTokens(user: any) {
  const payload = { id: user.id, email: user.email, name: user.name };

  const accessToken = jwt.sign(payload, ACCESS_TOKEN_SECRET, { expiresIn: "1m" });
  const refreshToken = jwt.sign(payload, REFRESH_TOKEN_SECRET, { expiresIn: "7d" });

  return { accessToken, refreshToken, accessTokenExpires: Date.now() + 1 * 60 * 1000 };
}

export function verifyRefreshToken(token: string) {
  try {
    return jwt.verify(token, REFRESH_TOKEN_SECRET) as jwt.JwtPayload;
  } catch {
    return null;
  }
}
