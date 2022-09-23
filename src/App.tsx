import InfoIcon from '@mui/icons-material/Info'
import { Button, IconButton, Slider, Tooltip, Typography } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2/Grid2'
import React, { useEffect, useState } from 'react'
import './App.css'
import { fetchScales, selectScales } from './store/scalesSlice'
import { useAppDispatch, useAppSelector } from './utils/hooks'
import { mapLevel } from './utils/mapper'
import { getRandomItem } from './utils/randomItem'
import { redirect } from './utils/redirect'
import { Scale } from './utils/types'

const App = (): any => {
  const [currentScale, setCurrentScale] = useState<Scale>()
  const dispatch = useAppDispatch()
  const scales = useAppSelector(selectScales)
  const [level, setLevel] = useState<number>(1)

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
        setCurrentScale(getRandomItem(scales.scales, level))
      }
    })
  }, [scales, level])

  return (
    <Grid container spacing={2} direction="column">
      <Grid className="App-header">
        <Typography variant="h1" fontWeight={500}>
          {currentScale?.name}
        </Typography>
      </Grid>
      <Grid>
        <Button variant="text" onClick={() => setCurrentScale(getRandomItem(scales.scales, level))}>
        <Typography variant="h4" className="App-link">Click here or press 'space' for a new scale</Typography>
        </Button>
      </Grid>
      <Grid>
      </Grid>
      <Grid>
        <Typography variant="body1">
          Level: {mapLevel(level)}
          <Tooltip title="The level is based on requirements from KNMO. Click to see more" placement="top">
            <IconButton color="inherit" onClick={() => redirect("https://www.knmo.nl/wp-content/uploads/2020/02/LKCA_RAAMLEERPLAN_BLAASINSTRUMENTEN.pdf")}>
              <InfoIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Typography>

        <Slider
          aria-label="Level"
          value={level}
          valueLabelFormat={(level) => mapLevel(level)}
          onChange={(e, n) => setLevel(n[0] || n)}
          step={1}
          min={1}
          max={4}
        />
      </Grid>
    </Grid>
  );
}

export default App;
