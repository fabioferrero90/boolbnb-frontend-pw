import { useGlobalContext } from "../../Contexts/GlobalContext";

const OrderResults = () => {
  const { orderedBy, handleOrderByChange } = useGlobalContext();

  return (
    <div className="grow flex items-center space-x-2">
    <span className="whitespace-nowrap">Ordina per:</span>
    <select
      id="countries"
      className="cursor-pointer bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 flex-grow p-2.5"
      value={orderedBy}
      onChange={handleOrderByChange}
    >
      <option value="price-asc">Prezzo Crescente</option>
      <option value="price-desc">Prezzo Decrescente</option>
      <option value="most-liked">Popolarità</option>
    </select>
  </div>
  );
};

export default OrderResults;
