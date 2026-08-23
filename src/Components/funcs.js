
export const getInitials = (str) =>{
    
    if (!str) return "";
    return str
		.trim()
		.split(/\s+/)
		.map((word) => word[0])
		.join("")
		.toUpperCase();
    
	
    
};