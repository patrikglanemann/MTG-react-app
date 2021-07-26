import { useHistory } from "react-router-dom";

import mtg_logo from "../images/mtg_logo.png";
import "./Home.css";

export default function Home() {
  document.title = "MTG-Card-Search";
  let history = useHistory();

  function handleSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const inputCardName = form.cardNameInput.value;
    const url = `https://api.magicthegathering.io/v1/cards?name=${inputCardName}`;

    try {
      localStorage.setItem("filterUrl", JSON.stringify(url));
    } catch (error) {
      console.log(error);
      alert("There was an error while saving url");
    }

    history.push(`/cards/`);
  }

  return (
    <>
      <h2>Home</h2>
      <img
        className="Home__mtgLogo"
        src={mtg_logo}
        alt="Magic the gathering logo"
      />
      <form className="FilterForm" onSubmit={handleSubmit}>
        <input
          className="FilterForm__input"
          type="text"
          name="cardNameInput"
          id="cardNameInput"
          placeholder="Cardname"
        ></input>
        <button className="FilterForm__btnSubmit">GO</button>
      </form>
    </>
  );
}
