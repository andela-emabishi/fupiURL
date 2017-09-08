import React from 'react';
import LongLinkInput from './LongLinkInput';
import ShortenedLinkDisplay from "./ShortenedLinkDisplay";
import Alert from "./Alert";
import validate from 'validate.js';

class UrlPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      longUrl: "",
      error: ""
    };
  }

  validateLongUrl(url) {
    const response = validate(
      { website: url },
      { website: { url: true, message: "Link entered invalid" } }
    );
    if (response === undefined) {
      // Returns undefined if url is valid
      this.setState({ longUrl: url });
    } else {
      this.setState({ error: response });
    }
  }

  handleLongLinkInput(event) {
    console.log(event.target.value, "input");
    const userInputUrl = event.target.value;
    const validUrl = this.validateLongUrl(userInputUrl);
  }

  handleShortenButtonClick(event) {
    console.log('Button clicked');
  }

  render() {
    return (
      <div>
        <h3>FupiURL../</h3>
        <LongLinkInput
          handleLongLinkInput={this.handleLongLinkInput}
          longUrl={this.state.longUrl}
          handleShortenButtonClick={this.handleShortenButtonClick}
        />
        <ShortenedLinkDisplay />
        <Alert message={this.state.error} />
      </div>
    );
  }
}

export default UrlPage;