import mtg_logo from "../images/mtg_logo.png";
import "./Home.css";

export default function Home() {
  document.title = "MTG-Card-Search";
  return (
    <>
      <h2>Home</h2>
      <img
        className="Home__mtgLogo"
        src={mtg_logo}
        alt="Magic the gathering logo"
      />
    </>
  );
}
