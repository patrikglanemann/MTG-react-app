import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./CardListPage.css";

export default function CardListPage() {
  const [cards, setCards] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const url = `https://api.magicthegathering.io/v1/cards?page=${page}`;
    setIsLoading(true);
    fetch(url)
      .then((resp) => resp.json())
      .then((data) => {
        setCards((prevCards) => {
          return [...prevCards, ...data.cards];
        });
        setIsLoading(false);
      });
  }, [page]);

  function renderCards() {
    document.title = "MTG-Card-Search Card-List";
    const cardList = cards.map((card) => {
      return (
        <li key={card.id}>
          <Link to={`/cards/${card.id}`}>{card.name}</Link>
        </li>
      );
    });

    if (isLoading || cards === null || cards === undefined) {
      return (
        <>
          {cardList}
          <li>Loading...</li>
        </>
      );
    } else {
      const cardIdArray = cards.map((card) => {
        return card.id;
      });
      try {
        localStorage.setItem("cardIds", JSON.stringify(cardIdArray));
      } catch (error) {
        console.log(error);
        alert("There was an error while saving cardIds");
      }
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
