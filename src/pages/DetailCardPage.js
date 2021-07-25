import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function DetailcardPage() {
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
    if (isLoading || card === null || card === undefined) {
      return "Loading...";
    }

    return (
      <div>
        <p>{card[0]?.name}</p>
        <img src={card[0]?.imageUrl} alt={card[0]?.name} />
      </div>
    );
  }

  return renderCard();
}
