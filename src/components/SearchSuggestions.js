import React from "react";
/*
 * Returns the suggestion list from Geo API sent by parent component
 */
const SearchSuggestions = (props) => {
  const suggestionList = props.cities.map((city) => {
    return (
      <li
        className="suggestion-item"
        key={city.code}
        onClick={props.onClick}
        data-name={city.nom}
        data-dpt={city.codeDepartement}
      >
        {city.nom} <span className="departement">({city.codeDepartement})</span>
      </li>
    );
  });
  let suggestionListContainer;
  if (props.cities.length) {
    suggestionListContainer = (
      <div className="suggestion-list-container">
        <span className="suggestion-title">Sélectionnez votre ville</span>
        <ul className="suggestion-list">{suggestionList}</ul>
      </div>
    );
  }
  return <React.Fragment>{suggestionListContainer}</React.Fragment>;
};
export default SearchSuggestions;
