import { useGlobalContext } from "../Contexts/GlobalContext";

const Results = () => {
  const { results } = useGlobalContext();

  return (
    <div className=" mx-auto max-w-screen-xl">
      {results &&
        results.map((house) => (
          <div key={house.id}>
            <h2>{house.name}</h2>
            <p>{house.abstract}</p>
          </div>
        ))}
    </div>
  );
};

export default Results;
