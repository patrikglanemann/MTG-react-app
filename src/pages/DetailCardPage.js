import { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import "./DetailCardPage.css";

export default function DetailcardPage() {
  let history = useHistory();
  const cardId = useParams();
  const [card, setCard] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const url = `https://api.magicthegathering.io/v1/cards?id=${cardId.id}`;
    setIsLoading(true);
    fetch(url)
      .then((resp) => resp.json())
      .then((data) => {
        setCard(data.cards);
        setIsLoading(false);
      });
  }, [cardId.id]);

  function renderCard() {
    document.title = `MTG-Card-Search ${card[0]?.name}`;
    if (isLoading || card === null || card === undefined) {
      return "Loading...";
    }

    function handleNextCard() {
      //Get array of Ids of cards from previous list
      let cardsIds = JSON.parse(localStorage.getItem("cardIds"));
      if (cardsIds === null) {
        cardsIds = [];
      }
      //Find the current card Id in the array(cardsIds) and display Id from next index
      let currentCardId = cardsIds.indexOf(cardId.id);
      history.push(`/cards/${cardsIds[currentCardId + 1]}`);
    }

    function handleBackCLick() {
      history.goBack();
    }

    return (
      <div className="Content__wrapper">
        <p>{card[0]?.name}</p>
        <img src={card[0]?.imageUrl} alt={card[0]?.name} />
        <div className="Content__wrapper__btnWrapper">
          <button className="Content__wrapper__btn" onClick={handleBackCLick}>
            Back
          </button>
          <button className="Content__wrapper__btn" onClick={handleNextCard}>
            Next
          </button>
        </div>
      </div>
    );
  }

  return renderCard();
}
