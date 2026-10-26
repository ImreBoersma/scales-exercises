import InfoIcon from "@mui/icons-material/Info";
import {
	Box,
	Button,
	IconButton,
	Slider,
	Stack,
	Tooltip,
	Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import "./App.css";
import { fetchScales, selectScales } from "./store/scalesSlice";
import { useAppDispatch, useAppSelector } from "./utils/hooks";
import { mapLevel } from "./utils/mapper";
import { getRandomItem } from "./utils/randomItem";
import { redirect } from "./utils/redirect";

import type { Scale } from "./utils/types";

const App = () => {
	const [currentScale, setCurrentScale] = useState<Scale>();
	const dispatch = useAppDispatch();
	const scales = useAppSelector(selectScales);
	const [level, setLevel] = useState<number>(1);

	useEffect(() => {
		(async () => {
			dispatch(fetchScales());
		})();
	}, [dispatch]);

	useEffect(() => {
		const onKeyDown = (event: KeyboardEvent) => {
			if (!import.meta.env.DEV) {
				event.preventDefault();
				event.stopPropagation();
			}
			if (event.code === "Space") {
				setCurrentScale((current) =>
					getRandomItem(scales.scales, level, current),
				);
			}
		};
		document.addEventListener("keydown", onKeyDown);
		return () => document.removeEventListener("keydown", onKeyDown);
	}, [scales, level]);

	return (
		<Stack spacing={2}>
			<Box className="App-header">
				<Typography variant="h1" sx={{ fontWeight: 500 }}>
					{currentScale?.name}
				</Typography>
			</Box>
			<Box>
				<Button
					variant="text"
					onClick={() =>
						setCurrentScale((current) =>
							getRandomItem(scales.scales, level, current),
						)
					}
				>
					<Typography variant="h4" className="App-link">
						Click here or press 'space' for a new scale
					</Typography>
				</Button>
			</Box>
			<Box></Box>
			<Box>
				<Typography variant="body1">
					Level: {mapLevel(level)}
					<Tooltip
						title="The level is based on requirements from KNMO. Click to see more"
						placement="top"
					>
						<IconButton
							color="inherit"
							onClick={() =>
								redirect(
									"https://www.knmo.nl/wp-content/uploads/2020/02/LKCA_RAAMLEERPLAN_BLAASINSTRUMENTEN.pdf",
								)
							}
						>
							<InfoIcon fontSize="small" />
						</IconButton>
					</Tooltip>
				</Typography>

				<Slider
					aria-label="Level"
					value={level}
					valueLabelFormat={(level) => mapLevel(level)}
					onChange={(_, n) => setLevel(Array.isArray(n) ? n[0] : n)}
					step={1}
					min={1}
					max={4}
				/>
			</Box>
		</Stack>
	);
};

export default App;
