import React, { Component } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import axios from "axios";

class ImageContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images: this.props.images ? this.props.images : [],
    };
  }

  componentDidMount = () => {
    /*
     * Generate 5 images from picsum if it's a newly created component
     * else, we use the images sent in props
     */
    if (this.state.images.length === 0) {
      for (let i = 0; i < 5; i++) {
        const randomInt = new Date().getTime();
        axios
          .get("https://picsum.photos/100", {
            params: {
              random: randomInt,
            },
          })
          .then((response) => {
            //Each image has an id (for our drag and drop) and a url
            this.setState({
              images: [
                ...this.state.images,
                { id: i, url: response.request.responseURL },
              ],
            });
            this.props.onImageOrderChange(this.state.images);
          });
      }
    }
  };

  /*
   * react-beautiful-dnd function, when user is endding an image drag
   */
  onDragEnd = (result) => {
    const { destination, source } = result;
    if (!destination) {
      return;
    }
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }
    // We reorder our state image array
    const newImages = [...this.state.images];
    const sortedImage = newImages.splice(source.index, 1)[0];
    newImages.splice(destination.index, 0, sortedImage);
    this.setState({ images: newImages });
    this.props.onImageOrderChange(newImages);
  };

  render() {
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <Droppable droppableId="droppable" direction="horizontal">
          {(provided) => (
            <div
              className="droppable-zone"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {this.state.images.map((image, index) => (
                <Draggable
                  draggableId={image.id.toString()}
                  index={index}
                  key={image.id}
                >
                  {(provided) => (
                    <div
                      className="draggable-img"
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      ref={provided.innerRef}
                    >
                      <img src={image.url} alt="" />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    );
  }
}

export default ImageContainer;
