import React, { useState, useEffect } from 'react';

import StopButton from './StopButton';

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
          <StopButton
            filename = { filename }
            dir = { dir }
          >Stop</StopButton> 
  ) : <></>;
}

export default DelayedComponent;
