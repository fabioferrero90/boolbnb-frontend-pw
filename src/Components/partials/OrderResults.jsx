import { useGlobalContext } from "../../Contexts/GlobalContext";

const OrderResults = () => {
  const { orderedBy, handleOrderByChange } = useGlobalContext();

  return (
    <div className="grow">
      <select
        id="countries"
        className="bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        value={orderedBy}
        onChange={handleOrderByChange}
      >
        <option value="" disabled>
          Ordina Per:
        </option>
        <option value="price-asc">Prezzo Crescente</option>
        <option value="price-desc">Prezzo Decrescente</option>
        <option value="most-liked">Popolarità</option>
      </select>
    </div>
  );
};

export default OrderResults;
