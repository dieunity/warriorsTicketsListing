import "../styles.css";
import { mockDataLowerLevel } from "../../assets/mockData/mockData";

export const LowerLevelAd = () => {
  const Listings = mockDataLowerLevel.map((game, idx) => {
    return (
      <p className="paragraph" key={idx}>
        {game.data}
      </p>
    );
  });

  return (
    <div>
      <p className="paragraph">
        This is the listing for my lower level tickets at section 109, row 10!
        Some may say close enough to affect free throws :)
      </p>
      <p className="paragraph">
        Note: Prices are per ticket (starting at $199/ticket). Will not sell
        individual tickets.
      </p>
      <p className="paragraph">
        **PRICES ARE SUBJECT TO CHANGE DUE TO RESALE VALUE (PLEASE REFRESH AD TO
        GET LATEST PRICES)** (game with an asterisk * means the opposing team
        only comes that one time this year) 2022 For playoffs tickets, let me
        know!
      </p>
      {Listings}
      <p className="paragraph">
        Want to make an offer? Text me! Don't have my number? Email me{" "}
        <a href="mailto:dieuhhuynh@gmail.com?subject=Warriors%20Tix%20Request%20">
          dieuhhuynh@gmail.com
        </a>{" "}
        :)
      </p>
    </div>
  );
};
