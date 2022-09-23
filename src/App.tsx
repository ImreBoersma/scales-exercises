import React, { useEffect, useState } from 'react';
import './App.css';
import { fetchScales, selectScales } from './store/scalesSlice';
import { useAppDispatch, useAppSelector } from './utils/hooks';
import { getRandomItem } from './utils/randomItem';
import { Scale } from './utils/types'

const App = (): any => {
  const [currentScale, setCurrentScale] = useState<Scale>()
  const dispatch = useAppDispatch()
  const scales = useAppSelector(selectScales)

  useEffect(() => {
    (async () => {
      dispatch(fetchScales());
    })();
  }, [dispatch]);

  useEffect(() => {
    document.addEventListener('keydown', function (event) {
      if (process.env.NODE_ENV !== 'development') {
        event.preventDefault()
        event.stopPropagation()
      }
      if (event.code === 'Space') {
        setCurrentScale(getRandomItem(scales.scales))
      }
    })
  }, [scales])

  return (
    <div className='App'>
    <div className="App-header">
      <h1>
        {currentScale?.name}
      </h1>
      <p className="App-link">
        Press 'space' for a new scale.
      </p>
      </div>
      <div style={{display: 'inline-block'}}>
        <input type="checkbox" />
        <label htmlFor="dbgTrace">Trace</label>
 
        <input type="checkbox" />
        <label htmlFor="dbgDebug">Debug</label>
 
        <input type="checkbox" />
        <label htmlFor="dbgInfo">Info</label>

        <input type="checkbox" />
        <label htmlFor="dbgWarn">Warn</label>

        <input type="checkbox" />
        <label htmlFor="dbgErr">Error</label>
    </div>
    </div>
  );
}

export default App;
