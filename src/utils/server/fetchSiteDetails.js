// src/utils/server/fetchSiteDetails.js
import axios from "axios";

export async function fetchSiteDetailsSSR() {
  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URI}/fetch-site-details`);
    return res.data.siteDetails;
  } catch (err) {
    return null;
  }
}
