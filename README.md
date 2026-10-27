# Smart Kirana React Starter

React + Vite frontend, Express API, MongoDB Atlas user registration/login, and a responsive billing/cart UI.

## Current scope
- Register/login connected to MongoDB Atlas.
- Passwords are hashed with bcrypt.
- Product catalogue and cart are demo data held in browser memory.
- Billing exports a text cash memo.
- This starter does **not** yet implement persistent login sessions, inventory persistence, or saved sales. Add these before using it for real customer data.

## Run locally
1. Install a current Node.js LTS release.
2. Copy `.env.example` to `.env`, then set `MONGODB_URI` to your own MongoDB Atlas connection string. Never commit `.env`.
3. Install packages: `npm install`
4. Terminal 1: `npm start` (Express API on port 3000).
5. Terminal 2: `npm run dev` (Vite frontend, normally http://localhost:5173).
6. The Vite proxy forwards `/api` requests to Express on port 3000.

## Deploy to Vercel
1. Push this new project to a separate GitHub repository first, or use a separate folder/branch. Do not delete the existing project until this version is tested.
2. Import that repository in Vercel. Set the project root to the folder containing this `package.json`.
3. Set `MONGODB_URI` in Vercel Project Settings → Environment Variables for Preview and Production. Do not upload `.env`.
4. Deploy and test `/api/health`, registration, login, product search, cart, and bill download.

## Important security/production notes
- This is a starter, not yet a production-ready point-of-sale system.
- Login currently returns a user object but does not create a persistent session/token. Do not rely on the client-side logged-in state to protect sensitive APIs.
- Products/cart are demo data and sales are not saved to MongoDB.
- Before real use, add secure session/JWT handling, rate limiting, CSRF protections if using cookies, validation, persistent products/sales, and suitable MongoDB access controls.
