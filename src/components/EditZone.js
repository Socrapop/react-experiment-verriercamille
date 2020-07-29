import React, { Component } from "react";
import axios from "axios";
import SearchSuggestions from "./SearchSuggestions";
import ImageContainer from "./ImageContainer";
import deleteIcon from "../svg/delete.svg";

class EditZone extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cities: [],
      selectedCities: this.props.zone.selectedCities
        ? this.props.zone.selectedCities
        : [],
      canSubmit: this.props.zone.zoneName ? true : false,
      zoneName: this.props.zone.zoneName ? this.props.zone.zoneName : "",
      cityName: "",
      images: this.props.zone.images ? this.props.zone.images : [],
    };
  }
  componentDidUpdate() {
    // Custom "form" validation
    if (
      this.state.selectedCities.length > 0 &&
      this.state.zoneName.length > 0 &&
      this.state.canSubmit === false
    ) {
      this.setState({ canSubmit: true });
    } else if (
      (this.state.selectedCities.length === 0 ||
        this.state.zoneName.length === 0) &&
      this.state.canSubmit === true
    ) {
      this.setState({ canSubmit: false });
    }
  }

  /*
   * On city input change, get cities from Geo API
   * then set state with response array
   */
  onCityInputChange = (e) => {
    const nomCommune = e.target.value;
    this.setState({ cityName: nomCommune });

    axios
      .get("https://geo.api.gouv.fr/communes", {
        params: {
          nom: nomCommune,
          fields: "nom,code,codeDepartement",
          format: "json",
          geometry: "centre",
          boost: "population",
        },
      })
      .then((response) => {
        const firstCities = response.data.slice(0, 5);
        this.setState({ cities: firstCities });
      });
  };
  /*
   * Set state when image order is changed
   */
  onImageOrderChange = (images) => {
    this.setState({ images: images });
  };
  /*
   * Set state when the zone name is changed
   */
  onZoneNameChange = (e) => {
    this.setState({ zoneName: e.target.value });
  };
  /*
   * When user click the suggested cities from Geo API
   * Add a new selected city to the state, and clear the search field
   */
  onSuggestionClick = (city) => {
    const cityname = city.target.dataset.name;
    if (this.state.selectedCities.length <= 2) {
      this.setState({
        selectedCities: [...this.state.selectedCities, cityname],
      });
    }
    this.setState({ cityName: "", cities: [] });
  };

  /*
   * When clicking the delete icon on a selected city,
   * get the index and slice it from our selected cities array,
   * then set state
   */
  onDeleteSelectedCity = (e) => {
    let updatedSelectedCities = [...this.state.selectedCities];
    updatedSelectedCities.splice(e.target.dataset.index, 1);

    this.setState({ selectedCities: updatedSelectedCities });
  };
  /*
   * On form submit, use parent component callback function
   */
  onSave = (e) => {
    e.preventDefault();
    this.props.onSave(this.state, this.props.index);
  };

  render() {
    /*
     * Search Suggestions component template
     */
    let suggestionComponent;
    if (this.state.cities) {
      suggestionComponent = (
        <SearchSuggestions
          cities={this.state.cities}
          onClick={this.onSuggestionClick}
        />
      );
    }
    /*
     * Selected cities with removal buttons template
     */
    let selectedCitiesElements;
    if (this.state.selectedCities) {
      selectedCitiesElements = this.state.selectedCities.map((city, index) => {
        return (
          <div
            className="selected-city"
            key={index}
            onClick={this.onDeleteSelectedCity}
            data-index={index}
          >
            {city}
            <img src={deleteIcon} alt="Supprimer cette ville" />
          </div>
        );
      });
    }

    return (
      <div className="zone is-editing">
        <form onSubmit={this.onSave} className="zone-form">
          <label htmlFor="nom">Nom de la zone <span>(obligatoire)</span></label>
          <input
            name="nom"
            id="nom"
            type="text"
            value={this.state.zoneName}
            onChange={this.onZoneNameChange}
          />
          <label htmlFor="ville">Villes dans la zone <span>(entre 1 et 3)</span></label>
          <input
            name="ville"
            id="ville"
            type="text"
            onChange={this.onCityInputChange}
            value={this.state.cityName}
            disabled={this.state.selectedCities.length >= 3}
          />
          {suggestionComponent}
          <div className="selected-cities-container">
            {this.state.selectedCities.length > 0 ? (
              <label>
                Villes sélectionnées : ({this.state.selectedCities.length} / 3
                maximum)
              </label>
            ) : (
              <span></span>
            )}
            {selectedCitiesElements}
          </div>

          <div className="image-ordering-container">
            <label>Spots touristiques de la zone</label>
            <ImageContainer
              onImageOrderChange={this.onImageOrderChange}
              images={this.state.images}
            />
          </div>
          <button
            type="submit"
            className="btn btn-save btn-default"
            disabled={!this.state.canSubmit}
          >
            Sauvegarder
          </button>
        </form>
      </div>
    );
  }
}

export default EditZone;
