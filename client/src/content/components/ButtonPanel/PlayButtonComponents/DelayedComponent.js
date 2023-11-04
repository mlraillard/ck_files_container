import React, { useState, useEffect } from 'react';

import StopButton2 from './StopButton2';

function DelayedComponent(
    filename,
    dir    
) {
  const [renderComponent, setRenderComponent] = useState(false);

  useEffect(() => {
    // Use setTimeout to delay the rendering of the component for 2000 milliseconds (2 seconds)
    const timer = setTimeout(() => {
      setRenderComponent(true);
    }, 1000);

    // Clear the timer if the component unmounts before the timeout is reached
    return () => clearTimeout(timer);
  }, []);

  return renderComponent ? (
          <StopButton2
            filename = { filename }
            dir = { dir }
          >Stop</StopButton2> 
  ) : <></>;
}

export default DelayedComponent;
