import InfoIcon from "@mui/icons-material/Info";
import {
	Box,
	Button,
	IconButton,
	Slider,
	Stack,
	Tooltip,
	Typography,
	useMediaQuery,
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
	const touch = useMediaQuery("(pointer: coarse)");

	const nextScale = () =>
		setCurrentScale((current) => getRandomItem(scales.scales, level, current));

	useEffect(() => {
		(async () => {
			dispatch(fetchScales());
		})();
	}, [dispatch]);

	useEffect(() => {
		const onKeyDown = (event: KeyboardEvent) => {
			if (event.code === "Space") {
				event.preventDefault();
				setCurrentScale((current) =>
					getRandomItem(scales.scales, level, current),
				);
			}
		};
		document.addEventListener("keydown", onKeyDown);
		return () => document.removeEventListener("keydown", onKeyDown);
	}, [scales, level]);

	return (
		<Stack
			spacing={2}
			sx={{ width: "100%", maxWidth: 900, px: 3, boxSizing: "border-box" }}
		>
			<Box className="App-header" onClick={nextScale}>
				<Typography variant="h1" sx={{ fontWeight: 500 }}>
					{currentScale?.name}
				</Typography>
			</Box>
			<Box>
				<Button variant="text" onClick={nextScale}>
					<Typography
						variant="h4"
						className="App-link"
						sx={{ fontSize: { xs: "1.5rem", sm: "2.125rem" } }}
					>
						{touch
							? "Tap here for a new scale"
							: "Click here or press 'space' for a new scale"}
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
					onChange={(_, n) => setLevel(n as number)}
					step={1}
					min={1}
					max={4}
				/>
			</Box>
		</Stack>
	);
};

export default App;
