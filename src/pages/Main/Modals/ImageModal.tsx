import { Box, Modal, Typography } from "@mui/material";
import React from "react";

type Props = {
  open: boolean;
  handleClose: () => void;
  imageSrc: string;
};

const style = {
  modal: {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "70vw",
    height: "72vh",
    border: "none",
    boxShadow: 24,
    p: 1,
  },
  image: {
    maxHeight: "80vh",
    width: "100%",
  },
};

const ImageModal = ({ open, handleClose, imageSrc }: Props) => {
  return (
    <Modal open={open} onClose={handleClose}>
      <Box onClick={handleClose} sx={style.modal}>
        <img src={imageSrc} alt="largeImageRender" style={style.image} />
      </Box>
    </Modal>
  );
};

export default ImageModal;
