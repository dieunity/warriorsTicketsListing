import { useState, lazy, Suspense, forwardRef } from "react";
import lowerLevelImage from "../assets/Warriors section 109.png";
import Loading from "./Loading";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

const EmbeddedTable = lazy(() => import("../Ads/EmbeddedTable"));
const SendinblueForm = lazy(() => import("../ListServe/SendinblueEmbedForm"));

const inlineStyle = {
  page: {
    margin: "5% 5% 25%",
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
    width: "55vw",
  },
  image: {
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

    const render: renderObject = {
      priceView: <EmbeddedTable />,
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
        <div style={inlineStyle.buttonsContainer}>
          <div style={inlineStyle.section as React.CSSProperties}>
            <button
              onClick={() => {
                setPage("priceView");
              }}
              style={inlineStyle.imageButton}
            >
              <img
                src={lowerLevelImage}
                alt="Section 109 3D render"
                style={inlineStyle.image}
              />
            </button>
            <h4>View from Section 109, row 10</h4>
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
              <ToggleButton value="priceView" aria-label="priceView">
                See available tickets price
              </ToggleButton>
              <ToggleButton value="subscribe" aria-label="subscribe">
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
