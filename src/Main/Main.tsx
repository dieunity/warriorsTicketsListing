import { useState, lazy, Suspense, forwardRef } from "react";
import lowerLevelImage from "../assets/Warriors section 109.png";
import upperLevelImage from "../assets/Section 216 row 12 3D.png";
import Loading from "./Loading";

const EmbeddedTable = lazy(() => import("../Ads/EmbeddedTable"));
const ListServeEmbed = lazy(() => import("../ListServe/ListServeEmbed"));

const inlineStyle = {
  adSpace: {
    marginTop: "3em",
  },
  page: {
    margin: "5% 5% 25%",
  },
  pictureAndLink: {
    margin: "2em",
    display: "flex",
    flexDirection: "column",
  },
  buttonsContainer: {
    display: "flex",
    gap: "5%",
    justifyContent: "center",
  },
  imageButton: {
    cursor: "pointer",
    width: "100%",
  },
  image: {
    width: "35vw",
    height: "100%",
  },
  section: {
    display: "flex",
    flexDirection: "column",
  },
};

export const Main = forwardRef<HTMLDivElement>((props, ref) => {
  const [page, setPage] = useState("priceView");

  type renderObject = {
    [key: string]: JSX.Element;
  };

  // <div style={inlineStyle.pictureAndLink}>
  //       <a
  //         href="https://sfbay.craigslist.org/sfc/tix/d/san-francisco-warriors-tickets-celtics/7546536351.html"
  //         target="_blank"
  //         rel="noopener noreferrer"
  //         style={inlineStyle.image}
  //       >
  //         <img
  //           src="https://images.craigslist.org/00T0T_eJ1YN8TQJ3Iz_0CI0mE_1200x900.jpg"
  //           alt="Section 216 3D render"
  //           style={inlineStyle.image}
  //         />
  //       </a>
  //       <a
  //         href="https://sfbay.craigslist.org/sfc/tix/d/san-francisco-warriors-tickets-celtics/7546536351.html"
  //         target="_blank"
  //         rel="noopener noreferrer"
  //       >
  //         Craigslist Section 109, row 10
  //       </a>
  //     </div>

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
        <div style={inlineStyle.adSpace}>{render[page]}</div>
      </Suspense>

      {/* <div style={inlineStyle.adSpace}>
        <SingleAd />
      </div> */}
    </div>
  );
})
