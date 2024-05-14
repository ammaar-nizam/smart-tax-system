export const formatDate = (dateString) => {
    const date = new Date(dateString);
    // Extract date components
    const year = date.getFullYear();
    let month = date.getMonth() + 1; // Month is zero-based, so we add 1
    let day = date.getDate();
  
    // Pad single-digit month/day with leading zero if needed
    month = month < 10 ? `0${month}` : month;
    day = day < 10 ? `0${day}` : day;
  
    // Construct formatted date string
    const formattedDate = `${year}-${month}-${day}T00:00:00Z`;
  
    return formattedDate;
  };