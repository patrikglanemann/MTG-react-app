import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./CardListPage.css";

export default function CardListPage() {
  const [cards, setCards] = useState([]);
  const [page, setPage] = useState(582);

  useEffect(() => {
    const url = `https://api.magicthegathering.io/v1/cards?page=${page}`;
    fetch(url)
      .then((resp) => resp.json())
      .then((data) => {
        setCards(data.cards);
      });
  }, [page]);

  function renderCards() {
    if (cards.length === 0) {
      return <li>Reached end of list.</li>;
    } else {
      const cardList = cards.map((card) => {
        return (
          <li key={card.id}>
            <Link to={`/cards/${card.id}`}>{card.name}</Link>
          </li>
        );
      });

      console.log(cards);
      return cardList;
    }
  }

  function handleLoadMore() {
    setPage(page + 1);
  }

  return (
    <div>
      <h2>Card List:</h2>
      <ul className="CardList">{renderCards()}</ul>
      <button onClick={handleLoadMore}>Load More</button>
    </div>
  );
}
