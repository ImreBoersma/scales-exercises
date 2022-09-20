import { useEffect, useState } from 'react';
import './App.css';
import { fetchScales, selectScales } from './store/scalesSlice';
import { useAppDispatch, useAppSelector } from './utils/hooks';
import { getRandomItem } from './utils/randomItem';

const App = (): any => {
  const [currentScale, setCurrentScale] = useState<String>("")
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
        setCurrentScale(getRandomItem(scales))
      }
    })
  }, [scales])

  return (
    <div className="App App-header">
      <h1>
        {currentScale}
      </h1>
      <p className="App-link">
        Press 'space' for a new scale.
      </p>
    </div>
  );
}

export default App;
