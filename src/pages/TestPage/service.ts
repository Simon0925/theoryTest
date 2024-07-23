const getData = async () => {
    try {
        const response = await fetch("http://localhost:8000/api/questions");

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        return data
    } catch (error) {
        console.error("Error fetching data:", error); 
    }
};

export default getData