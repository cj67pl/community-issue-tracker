

export function getAverageDays(dateArray) {
    if (dateArray.length <=1) return 0;

    let totalDays = 0;
    const msPerDay = 1000 * 60 * 60 * 24; 

    for(let i=1; i< dateArray.length; i++) {
        const diffInMs = dateArray[i] - dateArray[i-1];
        totalDays += diffInMs /msPerDay;
    }

    return totalDays / (dateArray.length - 1);
} 





export function resolutionRate(resolvedIssues, totalIssues) {
    return (resolvedIssues / totalIssues) * 100;
}