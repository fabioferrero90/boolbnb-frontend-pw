import { useState } from "react";
import usePlacesAutocomplete, { getGeocode } from "use-places-autocomplete";
import useOnclickOutside from "react-cool-onclickoutside";

const AddressInput = () => {
  const [error, setError] = useState("");
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    callbackName: "GetFullAddress",
    requestOptions: {
      /* Define search scope here */
    },
    debounce: 300,
  });
  const ref = useOnclickOutside(() => {
    // When the user clicks outside of the component, we can dismiss
    // the searched suggestions by calling this method
    clearSuggestions();
  });

  const handleInput = (e) => {
    // Update the keyword of the input element
    setValue(e.target.value);
  };

  const handleSelect =
    ({ description }) =>
    () => {
      // When the user selects a place, we can replace the keyword without request data from API
      // by setting the second parameter to "false"
      setValue(description, false);
      clearSuggestions();

      getGeocode({ address: description }).then((results) => {
        const addressComponents = results[0].address_components;
        const address = {
          Stato: getAddressComponent(addressComponents, "country"),
          Regione: getAddressComponent(addressComponents, "administrative_area_level_1"),
          Provincia: getAddressComponent(addressComponents, "administrative_area_level_2"),
          Città: getAddressComponent(addressComponents, "locality"),
          CAP: getAddressComponent(addressComponents, "postal_code"),
          Via: getAddressComponent(addressComponents, "route"),
          Civico: getAddressComponent(addressComponents, "street_number"),
        };

        if (!address.Civico) {
          setError("Il Numero Civico è obbligatorio.");
        } else {
          setError("");
          console.log("📍 Address: ", address);
        }
      });
    };

  const getAddressComponent = (components, type) => {
    const component = components.find((c) => c.types.includes(type));
    return component ? component.long_name : "";
  };

  const renderSuggestions = () =>
    data.map((suggestion) => {
      const {
        place_id,
        structured_formatting: { main_text, secondary_text },
      } = suggestion;

      return (
        <li key={place_id} onClick={handleSelect(suggestion)}>
          <strong>{main_text}</strong> <small>{secondary_text}</small>
        </li>
      );
    });

  return (
    <div ref={ref}>
      <input
        className="form-input block w-full rounded-xl border border-gray-300 focus:bg-white"
        value={value}
        onChange={handleInput}
        disabled={!ready}
        placeholder=""
      />
      {/* We can use the "status" to decide whether we should display the dropdown or not */}
      {status === "OK" && <ul>{renderSuggestions()}</ul>}
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};

export default AddressInput;