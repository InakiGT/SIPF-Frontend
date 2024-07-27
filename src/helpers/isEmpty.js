const isEmpty = (value) => {
    if (value == null) return true; // Check for null or undefined
    if (typeof value === "string" && value.trim() === "") return true; // Check for empty string
    if (Array.isArray(value) && value.length === 0) return true; // Check for empty array
    if (typeof value === "object" && Object.keys(value).length === 0) return true; // Check for empty object
    return false;
}

export default isEmpty;