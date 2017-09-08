import React from 'react';
import LongLinkInput from './LongLinkInput';
import ShortenedLinkDisplay from "./ShortenedLinkDisplay";

class UrlPage extends React.Component {
  render() {
    return (
      <div>
        <LongLinkInput />
        <ShortenedLinkDisplay />
      </div>
    )
  }
}

export default UrlPage;