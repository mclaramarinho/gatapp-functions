import { getApps, initializeApp } from "firebase-admin/app";
import { Auth, getAuth } from "firebase-admin/auth";
const app =
  getApps().length === 0 ? initializeApp() : getApps()[0];

export const auth : Auth = getAuth(app);
