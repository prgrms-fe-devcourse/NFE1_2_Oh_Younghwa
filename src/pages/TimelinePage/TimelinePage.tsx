import React from 'react';

import Postlist from './components/Postlist';

import './scss/timeline.scss';

const TimelinePage = () => {
  return (
    <div>
      <div className="blockSample"></div>
      <Postlist/>
    </div>
  );
};

export default TimelinePage;