import { lazy, Suspense, forwardRef, useState } from "react";
import lowerLevelImage from "../../assets/Warriors section 109.png";
import Loading from "../Loading/Loading";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ImageModal from "../Modals/ImageModal";

const EmbeddedTable = lazy(() => import("../Ads/EmbeddedTable"));
const TicketTable = lazy(() => import("../TicketsTable/TicketsTable"));

const SendinblueForm = lazy(() => import("../ListServe/SendinblueEmbedForm"));

const inlineStyle = {
  page: {
    margin: "5% 5%",
  },
  buttonsContainer: {
    display: "flex",
    gap: "5%",
    justifyContent: "center",
  },
  section: {
    display: "flex",
    flexDirection: "column",
  },
  imageButton: {
    cursor: "pointer",
    width: "50vw",
    background: "none",
    border: "none",
    boxShadow: "2px",
  },
  image: {
    padding: 0,
    width: "100%",
    height: "100%",
  },
};

type MainProps = {
  page: string;
  setPage: React.Dispatch<React.SetStateAction<string>>;
};

export const Main = forwardRef<HTMLDivElement, MainProps>(
  ({ page, setPage }, ref) => {
    type renderObject = {
      [key: string]: JSX.Element;
    };

    const [isImageModalOpen, setIsImageModalOpen] = useState(false);

    const render: renderObject = {
      priceView: <TicketTable />,
      subscribe: <SendinblueForm />,
    };

    const handlePageChange = (
      event: React.MouseEvent<HTMLElement>,
      newPage: string
    ) => {
      setPage(newPage);
    };

    return (
      <div style={inlineStyle.page}>
        <ImageModal
          open={isImageModalOpen}
          handleClose={() => setIsImageModalOpen(false)}
          imageSrc={lowerLevelImage}
        />
        <div style={inlineStyle.buttonsContainer}>
          <div style={inlineStyle.section as React.CSSProperties}>
            <h4>View from Section 109, row 10</h4>
            <button
              onClick={() => {
                setPage("priceView");
                setIsImageModalOpen(true);
              }}
              style={inlineStyle.imageButton}
            >
              <img
                src={lowerLevelImage}
                alt="Section 109 3D render"
                style={inlineStyle.image}
              />
            </button>
          </div>
        </div>
        <div>
          <div ref={ref}>
            <ToggleButtonGroup
              value={page}
              exclusive
              onChange={handlePageChange}
              aria-label="subscribeOrPriceView"
              className="toggle-group"
            >
              <ToggleButton
                value="priceView"
                aria-label="see available tickets price table view"
              >
                See available tickets price
              </ToggleButton>
              <ToggleButton
                value="subscribe"
                aria-label="subscribe to email listserv view"
              >
                subscribe to email listserve
              </ToggleButton>
            </ToggleButtonGroup>
          </div>
        </div>
        <Suspense fallback={<Loading />}>
          <div>{render[page]}</div>
        </Suspense>
      </div>
    );
  }
);
