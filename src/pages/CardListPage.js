import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function CardListPage() {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const url = "https://api.magicthegathering.io/v1/cards?set=DDO";
    fetch(url)
      .then((resp) => resp.json())
      .then((data) => {
        setCards(data.cards);
      });
  }, []);

  function renderCards() {
    const cardList = cards.map((card) => {
      return (
        <li key={card.id}>
          <Link to={`/cards/${card.id}`}>{card.name}</Link>
        </li>
      );
    });
    return cardList;
  }

  return (
    <div>
      <h2>Card List:</h2>
      <ul>{renderCards()}</ul>
    </div>
  );
}
