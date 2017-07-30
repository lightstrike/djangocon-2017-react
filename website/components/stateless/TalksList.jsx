import React, { Component } from 'react';
import { Link } from 'react-router-dom';

function TalksList({ talks, ...props }) {
  const talkRows = talks.map((talk) => 
    <div>
      <Link to={`${talk.id}`}>
        <h2>{talk.title}</h2>
      </Link>
        <h3>{talk.speaker_name}</h3>
        <h4>{talk.date}</h4>
    </div>
  );

  return (
      <div>
        <h1>Talks List</h1>
        <div>{talkRows}</div>
      </div>
  );
}

export default TalksList;
