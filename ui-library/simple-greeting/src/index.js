import React from 'react';

import SimpleGreetingComponent from "./SimpleGreetingComponent";


const SimpleGreeting = (props) => {
  return( 
  <div>
  	<SimpleGreetingComponent dataService={props.dataService} />
  </div>);
};

export default SimpleGreeting;