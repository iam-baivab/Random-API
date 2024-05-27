window.onload = function(){
    showErrorToast('Internal Server Error 500');
}

const showErrorToast = (message) => {
    const toastContent = document.createElement('div');
    toastContent.classList.add('toast-content');

    const icon = document.createElement('i');
    icon.classList.add('fas', 'fa-exclamation-circle', 'toast-icon');
    icon.style.paddingLeft = '10px';
    toastContent.appendChild(icon);

    const messageElement = document.createElement('span');
    messageElement.textContent = message;
    toastContent.appendChild(messageElement);

    const toast = Toastify({
        node: toastContent,
        duration: 3000,
        gravity: 'top',
        position: 'center',
        backgroundColor: 'red',
        progressBar: true,
        style: {
            padding: '20px 2px',
            borderRadius: '8px',
        }
    });

    const setToastWidth = () => {
        const messageWidth = message.length * 10;
        toast.options.style.maxWidth = `${messageWidth}px`;

        if (window.innerWidth <= 768) {
            toast.options.style.margin = '0 15px';
        }
    };

    setToastWidth();

    window.addEventListener('resize', setToastWidth);

    toast.showToast();
};

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
    rollBtn.addEventListener("click", fetchRandomNumber => {
        showErrorToast('Internal Server Error 500');
    });

    function updateDiceNumber(number) {
        const numberElements = dice.querySelectorAll('.number');
        numberElements.forEach(element => {
            element.textContent = number;
        });
    }
});
