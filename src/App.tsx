import { useEffect, useState } from 'react'
import './App.css'
import scales from './scales.json'
function App() {
  const [currentScale, setCurrentScale] = useState<String>("")
  const getRandomScale = () => {
    const scales2 = scales.level3.majorScales.concat(scales.level3.minorScales)
    return scales2[~~(Math.random() * scales2.length)]
  }

  

  useEffect(() => {
    document.addEventListener('keydown', function(event){
      event.preventDefault()
      event.stopPropagation()
      if (event.code === 'Space') {
        setCurrentScale(getRandomScale())
      }
    })
  }, [])


  return (
    <div className="App">
      <header className="App-header">
        <h1>
        {currentScale}
        </h1>
        <p className="App-link">
          Press 'space' for a new scale.
        </p>
      </header>
    </div>
  ); 
}

export default App;
