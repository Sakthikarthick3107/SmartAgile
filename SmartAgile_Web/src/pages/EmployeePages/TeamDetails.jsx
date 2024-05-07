import React from 'react';
import { useParams } from 'react-router-dom';

function TeamDetails() {
  const { teamId } = useParams(); // Retrieves the team ID from the URL

  return (
    <div>
      <h1> {teamId}</h1>
    </div>
  );
}

export default TeamDetails;
