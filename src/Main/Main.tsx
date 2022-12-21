import { useState, lazy, Suspense, forwardRef } from "react";
import lowerLevelImage from "../assets/Warriors section 109.png";
import upperLevelImage from "../assets/Section 216 row 12 3D.png";
import Loading from "./Loading";

const EmbeddedTable = lazy(() => import("../Ads/EmbeddedTable"));
const ListServeEmbed = lazy(() => import("../ListServe/ListServeEmbed"));

const inlineStyle = {
  embeddedAdSpace: {
    marginTop: "3em",
  },
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
    width: "35vw",
  },
  image: {
    width: "100%",
    height: "100%",
  },
};

export const Main = forwardRef<HTMLDivElement>((props, ref) => {
  const [page, setPage] = useState("priceView");

  type renderObject = {
    [key: string]: JSX.Element;
  };

  const render: renderObject = {
    priceView: <EmbeddedTable />,
    subscribe: <ListServeEmbed />,
  };

  return (
    <div style={inlineStyle.page}>
      <div style={inlineStyle.buttonsContainer}>
        <div style={inlineStyle.section as React.CSSProperties}>
          <h4>Section 109, row 10</h4>
          <button
            onClick={() => {
              setPage("priceView");
              // handleScroll();
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
        <div style={inlineStyle.section as React.CSSProperties}>
          <h4>Section 216, row 11</h4>
          <button
            onClick={() => {
              setPage("priceView");
              // handleScroll();
            }}
            style={inlineStyle.imageButton}
          >
            <img
              src={upperLevelImage}
              alt="Section 216 3D render"
              style={inlineStyle.image}
            />
          </button>
        </div>
      </div>
      <div className="selectbar">
        <div ref={ref}>
          <label>I would like to </label>
          <select
            name="actions"
            id="actions"
            onChange={(e) => {
              setPage(e.target.value);
            }}
            value={page}
          >
            <option value="default" disabled>
              Select your option
            </option>
            <option value="priceView">See available tickets price</option>
            <option value="subscribe">subscribe to email listserve</option>
          </select>
        </div>
      </div>
      <Suspense fallback={<Loading />}>
        <div style={inlineStyle.embeddedAdSpace}>{render[page]}</div>
      </Suspense>
    </div>
  );
})
