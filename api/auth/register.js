import app from "../../server/app.js";

export default function handler(req, res) {
  req.url = "/api/auth/register";
  return app(req, res);
}
