// api.js
import axios from "axios";

const fetchTikTokData = async (url) => {
  const options = {
    method: "GET",
    url: "https://tiktok-download-without-watermark.p.rapidapi.com/analysis",
    params: {
      url: url,
      hd: "0",
    },
    headers: {
      "X-RapidAPI-Key": "7cb05360f8mshca6918f8ea33103p1c4264jsn97b178de78f8",
      "X-RapidAPI-Host": "tiktok-download-without-watermark.p.rapidapi.com",
    },
  };

  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default fetchTikTokData;
