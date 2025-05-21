import { useSelector } from "react-redux";
import CardComponent from "../components/CardComponent";

function FavouritesPage() {
  const favourites = useSelector(
    (state) => state.favouritesStore.allFavourites
  );

  if (favourites.length === 0) {
    return (
      <div className="container mx-auto p-4">You have no favourites yet.</div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Your Favourites</h1>
      <ul className="flex flex-col items-center md:flex-row gap-5 flex-wrap">
        {favourites.map((product) => (
          <li key={product.id} className="w-full md:w-auto flex justify-center">
            <CardComponent product={product} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FavouritesPage;
