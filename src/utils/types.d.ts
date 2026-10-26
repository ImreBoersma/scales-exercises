export type Scale = {
	id: string;
	level: number;
	name: string;
	// biome-ignore lint/suspicious/noExplicitAny: XMLDocument is not a valid type in TypeScript, so we use any here
	notation: any;
};
