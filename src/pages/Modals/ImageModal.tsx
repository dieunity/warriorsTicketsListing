import { Box, Modal, Typography } from "@mui/material";
import React from "react";

type Props = {
  open: boolean;
  handleClose: () => void;
  imageSrc: string;
};

const style = {
  modalContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "fixed" as const,
    top: 0,
    left: 0,
    width: "100vw",
    bgcolor: "rgba(0, 0, 0, 0.5)",
  },
  modal: {
    position: "fixed" as const,
    width: "75vw",
    border: "none",
    boxShadow: 24,
    p: 1,
  },
  image: {
    width: "100%",
  },
};

const ImageModal = ({ open, handleClose, imageSrc }: Props) => {
  return (
    <Modal open={open} onClose={handleClose} sx={style.modalContainer}>
      <Box onClick={handleClose} sx={style.modal}>
        <img src={imageSrc} alt="largeImageRender" style={style.image} />
      </Box>
    </Modal>
  );
};

export default ImageModal;
