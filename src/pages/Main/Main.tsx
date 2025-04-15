import "../../styles.css";
import chefAndButler from "../../assets/Chef cooks Butler serves.png";
import { useRef, useState } from "react";
import { Fab, Link, Button } from "@mui/material";
import MailIcon from "@mui/icons-material/Mail";
import { useTheme } from "@mui/material/styles";
import { TicketsAndUpdates } from "../TicketsAndUpdates/TicketsAndUpdates";
import SpotifyPlaylist from "../SpotifyEmbed/SpotifyEmbed";
import { Analytics } from "@vercel/analytics/react";
import { Link as RouterLink } from "react-router-dom";

export default function Main() {
  const ref = useRef<null | HTMLDivElement>(null);
  const [page, setPage] = useState("priceView");

  const handleScroll = () => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubscribe = () => {
    setPage("subscribe");
    handleScroll();
  };

  const theme = useTheme();

  const style = {
    image: {
      height: "auto",
      width: "100%",
      cursor: "pointer",
    },
    fabStyle: {
      position: "fixed",
      bottom: "2em",
      right: "10%",
    },
    matrixButton: {
      marginTop: "2em",
      marginBottom: "2em",
      backgroundColor: "#1D428A", // Warriors blue
      "&:hover": {
        backgroundColor: "#FFC72C", // Warriors gold
        color: "#1D428A",
      },
    },
  };
  return (
    <div className="App">
      <img
        style={style.image}
        src={chefAndButler}
        alt="cartoon drawing by LuckyMong of Steph Curry as chef handing a W to Jimmy Butler"
        onClick={handleScroll}
      />
      <h1>Warriors 2024-2025! We da Championship!</h1>
      <p className="paragraph">
        Since 2011, I've put up tickets for sale to Warriors fans who want an
        affordable, awesome Warriors experience first at Oracle Arena, and now
        at Chase Center. I've followed the rise of the Warriors dynastic core,
        from when David Lee went down and Draymond got his first chance to
        start, to when Iggy and KD both decided to join the up and coming
        Warriors. What an era.
      </p>
      <p className="paragraph">
        All in all, the Dubs took home the 4th championship out of 6 Finals
        appearances in 8 years. Klay's now in a Mavs uniform, KD on the Suns,
        Iggy onto brighter business ventures. The Warriors with new GM Mike
        Dunleavy have made many underrated moves that is bringing them back to
        the Western Conference! With Steph, Draymond, Loon locked into contracts
        for a few more years, and with the rest of the team, the Warriors are
        now a force to be reckoned with.
      </p>
      <p className="paragraph">
        Email me at{" "}
        <a href="mailto:dieuhhuynh@gmail.com?subject=Warriors%20Tix%20Request%20">
          dieuhhuynh@gmail.com
        </a>
        , or text me directly if you have my number to get your tickets! I have
        3 tickets in section 109, row 10, and I can't make every game, so would
        love for fellow Dubnation fans to go!
      </p>
      <p className="paragraph">
        Feel free to browse the tickets available below, or{" "}
        <button onClick={handleSubscribe} className="button-as-link">
          subscribe
        </button>{" "}
        to my listserv for updates (like when playoffs come around!)
      </p>
      <TicketsAndUpdates ref={ref} page={page} setPage={setPage} />
      <Fab variant="extended" sx={{ ...style.fabStyle }}>
        <MailIcon sx={{ mr: 1 }} />
        <Link href="mailto:dieuhhuynh@gmail.com?subject=Warriors%20Tix%20Request%20">
          Contact Me
        </Link>
      </Fab>
      <SpotifyPlaylist
        playlistUrl={
          "https://open.spotify.com/embed/playlist/4l1yjXTVqzkupTYzt5moUT?utm_source=generator"
        }
      />
      <Button
        component={RouterLink}
        to="/matrix"
        variant="contained"
        sx={style.matrixButton}
      >
        Enter The Matrix
      </Button>
      <Analytics />
    </div>
  );
}
