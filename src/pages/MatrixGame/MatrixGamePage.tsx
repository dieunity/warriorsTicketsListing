import { useState } from "react";
import { MatrixGame } from "thomas-anderson-lib";
import { Link as RouterLink } from "react-router-dom";
import { Button } from "@mui/material";
import "../../styles.css";

const MatrixGamePage = () => {
  const [showExitButton, setShowExitButton] = useState(true);

  // Style for a full-screen, immersive experience
  const style = {
    container: {
      position: "fixed",
      top: 0,
      left: 0,
      width: "100vw",
      height: "100vh",
      backgroundColor: "#000",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 9999,
    },
    gameContainer: {
      width: "100%",
      height: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    },
    exitButton: {
      position: "fixed",
      top: "20px",
      right: "20px",
      backgroundColor: "#1D428A", // Warriors blue
      opacity: showExitButton ? 1 : 0,
      transition: "opacity 0.3s ease-in-out",
      "&:hover": {
        backgroundColor: "#FFC72C", // Warriors gold
        color: "#1D428A",
      },
    },
  };

  // Toggle button visibility when mouse moves
  const handleMouseMove = () => {
    setShowExitButton(true);
    const timer = setTimeout(() => {
      setShowExitButton(false);
    }, 3000);
    return () => clearTimeout(timer);
  };

  return (
    <div
      style={style.container as React.CSSProperties}
      onMouseMove={handleMouseMove}
    >
      <div style={style.gameContainer as React.CSSProperties}>
        <MatrixGame />
      </div>
      <Button
        component={RouterLink}
        to="/"
        variant="contained"
        sx={style.exitButton}
      >
        Exit Matrix
      </Button>
    </div>
  );
};

export default MatrixGamePage;
