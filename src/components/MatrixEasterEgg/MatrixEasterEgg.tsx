import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Modal, Box, Typography, Button } from "@mui/material";

/**
 * Matrix Easter Egg Component
 *
 * Listens for the keyboard sequence "rabbit" and shows a Matrix-themed modal
 * allowing the user to "take the red pill" and enter the Matrix game.
 */
export const MatrixEasterEgg = () => {
  const navigate = useNavigate();
  const [keySequence, setKeySequence] = useState<string[]>([]);
  const [showMatrixModal, setShowMatrixModal] = useState(false);
  const targetSequence = ["r", "a", "b", "b", "i", "t"];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const newSequence = [...keySequence, e.key.toLowerCase()];
      // Keep only the last N keys (where N is the target sequence length)
      setKeySequence(newSequence.slice(-targetSequence.length));

      // Check if the sequence matches our target
      if (
        newSequence.slice(-targetSequence.length).join("") ===
        targetSequence.join("")
      ) {
        setShowMatrixModal(true);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [keySequence]);

  const handleFollowRabbit = () => {
    setShowMatrixModal(false);
    navigate("/matrix");
  };

  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "black",
    border: "1px solid #00FF00",
    boxShadow: "0 0 24px rgba(0, 255, 0, 0.5)",
    p: 4,
    color: "#00FF00",
    fontFamily: "monospace",
  };

  return (
    <Modal
      open={showMatrixModal}
      onClose={() => setShowMatrixModal(false)}
      aria-labelledby="matrix-modal-title"
    >
      <Box sx={modalStyle}>
        <Typography
          id="matrix-modal-title"
          variant="h6"
          component="h2"
          sx={{ fontFamily: "monospace" }}
        >
          Wake up, Neo...
        </Typography>
        <Typography sx={{ mt: 2, fontFamily: "monospace" }}>
          Follow the white rabbit?
        </Typography>
        <Box sx={{ mt: 3, display: "flex", justifyContent: "space-between" }}>
          <Button
            onClick={() => setShowMatrixModal(false)}
            sx={{ color: "white", border: "1px solid white" }}
          >
            Take the blue pill
          </Button>
          <Button
            onClick={handleFollowRabbit}
            sx={{ color: "#00FF00", border: "1px solid #00FF00" }}
          >
            Take the red pill
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};
