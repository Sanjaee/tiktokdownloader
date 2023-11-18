// App.js
import React, { useState } from "react";
import fetchTikTokData from "./assets/api";
import "./index.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram, faLinkedinIn } from "@fortawesome/free-brands-svg-icons";

function App() {
  const [url, setUrl] = useState("");
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const responseData = await fetchTikTokData(url);

      // Memeriksa apakah responseData memiliki data yang valid
      if (responseData && responseData.data && responseData.data.play) {
        setData(responseData);
        setError(null);
      } else {
        setError("Video not available.");
        setData(null);
      }
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status < 500
      ) {
        setError("Invalid URL. Please enter a valid TikTok URL.");
      } else {
        setError("An error occurred while fetching data.");
      }
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <div className="content">
        <h1>TikTok Video Downloader</h1>
        <h3>Tanpa WaterMark</h3>
        <form onSubmit={handleSubmit} className="centered-form">
          <div className="group">
            <svg className="icon" aria-hidden="true" viewBox="0 0 24 24">
              <g>
                <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path>
              </g>
            </svg>
            <input
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Enter TikTok URL"
              type="text"
              className="input"
            />
          </div>
          <button type="submit" className="button" disabled={loading}>
            <span>Download</span>
          </button>
          {loading && <p>Loading...</p>}
          <div className="support-me">
            <label className="icon-container">Support Me :</label>
            <div className="icons">
              <a
                href="https://www.instagram.com/ahmdafriz4/"
                className="icon-instagram fa-2x"
              >
                <FontAwesomeIcon icon={faInstagram} />
              </a>
              <a
                href="https://www.linkedin.com/in/ahmad-afriza-ez4-ab9173276/"
                className="icon-linkedin fa-2x"
              >
                <FontAwesomeIcon icon={faLinkedinIn} />
              </a>
            </div>
          </div>
        </form>
        {error && <p className="error-message">{error}</p>}
        {data && (
          <div className="video-container">
            <video controls width="640" height="360">
              <source src={data.data.play} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
