export const redirect = (destination: string) => {
    const link = document.createElement("a");
    link.referrerPolicy = "no-referrer";
    link.rel = "noreferrer";
    link.href = destination;
    link.target = "_blank"
    link.click();
}