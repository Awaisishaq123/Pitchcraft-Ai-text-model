import axios from "axios";
import { auth } from "../config/firebase";

const FUNCTIONS_BASE = import.meta.env.VITE_FUNCTIONS_BASE;

async function getToken() {
  const user = auth.currentUser;
  if (!user) throw new Error("User not logged in");
  return await user.getIdToken();
}

export const generatePitchAPI = async (title, description) => {
  const token = await getToken();
  const res = await axios.post(
    `${FUNCTIONS_BASE}/generatePitch`,
    { title, description },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return res.data;
};
