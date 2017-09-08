import React from "react";
import './Input.css';
import './button.css';

class LongLinkInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleLongLinkInput = this.handleLongLinkInput.bind(this);
    this.handleShortenButtonClick = this.handleShortenButtonClick.bind(this);
  }

  handleLongLinkInput(event) {
    this.props.handleLongLinkInput(event);
  }

  handleShortenButtonClick(event) {
    this.props.handleShortenButtonClick(event);
  }

  render() {
    return (
      <div>
        <div className="ui action input">
          <input
            type="text"
            placeholder="Paste your URL here"
            style={{ fontSize: "20px" }}
            onChange={this.handleLongLinkInput}
          />
          <button
            className="massive ui button"
            onClick={this.handleShortenButtonClick}
          >
            Shorten
          </button>
        </div>
      </div>
    );
  }
}

export default LongLinkInput;
