import React, { Component } from "react";
import EditZone from "./EditZone";
import SingleZone from "./SingleZone";

class ZoneList extends Component {
  state = {
    zones: [
      {
        editing: false,
        canSubmit: true,
        images: [
          { id: 1, url: "https://i.picsum.photos/id/498/100/100.jpg" },
          { id: 3, url: "https://i.picsum.photos/id/896/100/100.jpg" },
          { id: 2, url: "https://i.picsum.photos/id/846/100/100.jpg" },
          { id: 4, url: "https://i.picsum.photos/id/856/100/100.jpg" },
          { id: 5, url: "https://i.picsum.photos/id/898/100/100.jpg" },
        ],
        selectedCities: ["Grenoble", "Lans-en-Vercors"],
        zoneName: "Fromagers",
      },
    ],
    isEditing: false,
  };
  onAddClick = () => {
    this.setState({
      zones: [
        ...this.state.zones,
        {
          editing: true,
          selectedCities: [],
          canSubmit: false,
          zoneName: "",
          images: [],
        },
      ],
      isEditing: true,
    });
  };
  onSaveZone = (zone, index) => {
    const newZones = [...this.state.zones];
    newZones.splice(index, 1, zone);
    this.setState({ zones: newZones, isEditing: false });
  };
  onEditZone = (zone, index) => {
    if (this.state.isEditing === true) {
      return;
    }
    const newZones = [...this.state.zones];
    const editedZone = { ...zone, editing: true };
    newZones.splice(index, 1, editedZone);
    this.setState({ zones: newZones, isEditing: true });
  };
  onDeleteZone = (index) => {
    const newZones = [...this.state.zones];
    newZones.splice(index, 1);
    this.setState({ zones: newZones });
  };
  render() {
    let zonesList;
    if (this.state.zones.length > 0) {
      zonesList = this.state.zones.map((zone, index) => {
        if (zone.editing === true) {
          return (
            <EditZone
              zone={zone}
              key={index}
              index={index}
              onSave={this.onSaveZone}
            />
          );
        } else {
          return (
            <SingleZone
              zone={zone}
              key={index}
              index={index}
              onEdit={this.onEditZone}
              onDelete={this.onDeleteZone}
            />
          );
        }
      });
    }
    return (
      <div>
        {zonesList}
        <button
          type="button"
          onClick={this.onAddClick}
          disabled={this.state.isEditing}
          className="btn btn-add"
        >
          Ajouter une zone
        </button>
      </div>
    );
  }
}

export default ZoneList;
