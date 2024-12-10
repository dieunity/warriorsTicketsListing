import React, { useState } from "react";

interface SpotifyPlaylistProps {
  playlistUrl: string;
  width?: string;
  height?: string;
}

const SpotifyPlaylist = ({
  playlistUrl,
  width = "100%",
  height = "300px",
}: SpotifyPlaylistProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const togglePlayer = () => {
    setIsExpanded(!isExpanded);
  };

  const iframeStyle = {
    border: "none",
    width,
    height,
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          position: "fixed",
          height: "20vh",
          width: "360px",
          top: "20%",
          right: isExpanded ? "0" : "-380px", //slide out when expanded
          transition: "right 0.3s ease", // smooth sliding
          zIndex: 1000,
        }}
      >
        <iframe
          style={iframeStyle}
          src={playlistUrl}
          allowFullScreen={true}
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
        />
      </div>
      {/* Toggle Icon */}
      <div
        onClick={togglePlayer}
        style={{
          position: "fixed",
          top: "20%",
          right: isExpanded ? "360px" : "0",
          transform: "translateY(-30%)",
          backgroundColor: "#1DB954",
          width: "50px",
          height: "50px",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 0 10px rgba(0,0,0,0.2)",
          cursor: "pointer",
          zIndex: "1001", // Ensure it's above other elements
          transition: "right 0.3s ease",
        }}
      >
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/8/84/Spotify_icon.svg"
          alt="Spotify Icon"
          style={{ width: "24px", height: "24px" }}
        />
      </div>
    </>
  );
};

export default SpotifyPlaylist;
