window.onload = function(){
    alert("Internal Server Error \nSome features may not work properly")
}

document.addEventListener("DOMContentLoaded", () => {
    const dice = document.getElementById("dice");
    const rollBtn = document.getElementById("rollBtn");

    // Function to fetch random number from API
    function fetchRandomNumber() {
        fetch('https://www.randomnumberapi.com/api/v1.0/random?min=1&max=7&count=1')
            .then(response => response.json())
            .then(data => {
                const randomNumber = data[0]; // Extract the random number from the API response
                updateDiceNumber(randomNumber);
            })
            .catch(error => console.error('Error fetching random number:', error));
    }

    // Call fetchRandomNumber when the page loads
    fetchRandomNumber();

    // Call fetchRandomNumber when rollBtn is clicked
    rollBtn.addEventListener("click", fetchRandomNumber);

    function updateDiceNumber(number) {
        const numberElements = dice.querySelectorAll('.number');
        numberElements.forEach(element => {
            element.textContent = number;
        });
    }
});
