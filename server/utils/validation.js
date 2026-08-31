export const isValidId = (value) => {
	return Number.isInteger(Number(value)) && Number(value) > 0;
};

export const isNonEmptyString = (value) => {
	return typeof value === "string" && value.trim().length > 0;
};


export const isValidEmail = (value) => {
    if (typeof value !== "string") {
        return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return emailRegex.test(value.trim());
};

export const isValidPassword = (value) => {
    return typeof value === "string" && value.length >= 8;
}