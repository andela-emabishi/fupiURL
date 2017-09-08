import React from 'react';
import LongLinkInput from './LongLinkInput';
import ShortenedLinkDisplay from "./ShortenedLinkDisplay";
import Alert from "./Alert";
import { checkStatus, parseJSON } from '../utils';
import { isWebUri } from "valid-url";

class UrlPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      longUrl: '',
      error: '',
      shortUrl: 'Your shortened link will appear here',
    };

    this.handleShortenButtonClick = this.handleShortenButtonClick.bind(this);
    this.handleLongLinkInput = this.handleLongLinkInput.bind(this);
  }

  validateLongUrl(url) {
    const response = isWebUri(url);
    if (response !== undefined) {
      // Returns undefined if url is valid
      this.setState({ longUrl: url });
    } else {
      this.setState({ error: response });
    }
  }

  handleLongLinkInput(event) {
    console.log(event.target.value, "input");
    const userInputUrl = event.target.value;
    this.validateLongUrl(userInputUrl);
  }

  handleShortenButtonClick(event) {
    // TODO: Call api to get shortened url
    const longUrl = this.state.longUrl;
    return fetch(`/api/url/save?long=${longUrl}`, { accept: "application/json" })
      .then(checkStatus)
      .then(parseJSON)
      .then(url => {
        const shortUrl = url.url.short;
        this.setState({ shortUrl: shortUrl });
      });
  }

  render() {
    console.log('short', this.state.shortUrl)
    return (
      <div>
        <h3>FupiURL../</h3>
        <LongLinkInput
          handleLongLinkInput={this.handleLongLinkInput}
          longUrl={this.state.longUrl}
          handleShortenButtonClick={this.handleShortenButtonClick}
        />
        <ShortenedLinkDisplay url={this.state.shortUrl} />
        <Alert message={this.state.error} />
      </div>
    );
  }
}

export default UrlPage;