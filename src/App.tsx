import "./styles.css";
import { Main } from "./Main/Main";
import warriorsBanner from "./assets/Warriors championship banner.jpeg";
import { useRef } from "react";
import { Fab } from "@mui/material";
import NavigationIcon from "@mui/icons-material/Navigation";

export default function App() {
  const ref = useRef(null);
  const handleScroll = () => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  const style = {
    image: {
      height: "auto",
      width: "100%",
      cursor: "pointer"
    },
    fabStyle: {
      position: "fixed",
      bottom: "2em",
      right: "10%",
      color: "blue"
    }
  };
  return (
    <div className="App">
      {/* <h1>Warriors tickets</h1> */}
      <img
        style={style.image}
        src={warriorsBanner}
        alt="Warriors championship banner"
        onClick={handleScroll}
      />
      <h2>Catch the 2022-2023 Warriors Championship run!</h2>
      <p className="paragraph">
        For 11 years, I've put up tickets for sale to Warriors fans who want an
        affordable, awesome Warriors experience first at Oracle Arena, and now
        at Chase Center. I've followed the rise of the Warriors dynastic core,
        from when David Lee went down and Draymond got his first chance to
        start, to when Iggy and KD both decided to join the up and coming
        Warriors.
      </p>
      <p className="paragraph">
        This year, the Warriors are at the top again after a defiant 2021-2022
        run and winning the 4th championship out of 6 Finals appearances in 8
        years. It'll be Andre Iguodala's last year. Potentially the final year
        of the Curry/Klay/Draymond era. It is also potentially the first year of
        All-Star Poole, DPOY Andrew Wiggins, and a full season for James Wiseman
        & Kuminga playing alongside each other.
      </p>
      <p className="paragraph">
        Email me at{" "}
        <a href="mailto:dieuhhuynh@gmail.com?subject=Warriors%20Tix%20Request%20">
          dieuhhuynh@gmail.com
        </a>
        , or text me directly if you have my number to get your tickets!
      </p>
      <p className="paragraph">
        Feel free to browse the tickets available below, or subscribe to my
        listserv for updates (like when playoffs come around!)
      </p>
      <Main forwardRef={ref} handleScroll={handleScroll} />
      <Fab variant="extended" style={style.fabStyle}>
        <NavigationIcon sx={{ mr: 1 }} />
        <a href="mailto:dieuhhuynh@gmail.com?subject=Warriors%20Tix%20Request%20">
          Contact Me
        </a>
      </Fab>
    </div>
  );
}
