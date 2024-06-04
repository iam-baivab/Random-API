document.addEventListener('DOMContentLoaded', function () {
    const searchBtn = document.getElementById('searchBtn');
    const clearBtn = document.getElementById('clearBtn');
    const helpBtn = document.getElementById('helpBtn');
    const gotoBtn = document.getElementById('gotoBtn');
    const closeHelp = document.getElementById('closeHelp');
    const closeHelpBtn = document.getElementById('closeHelpBtn');
    const nameInput = document.getElementById('nameInput');
    const locationInput = document.getElementById('locationInput');
    const universityDisplay = document.getElementById('universityDisplay');
    const helpBox = document.getElementById('helpBox');

    searchBtn.addEventListener('click', function () {
        const name = nameInput.value.trim();
        const country = locationInput.value.trim();

        if (name === '' && country === '') {
            alert('Please enter a university name, country name, or both.');
            return;
        }

        let apiUrl = 'http://universities.hipolabs.com/search?'; // Using HTTP

        if (name !== '' && country !== '') {
            apiUrl += `name=${encodeURIComponent(name)}&country=${encodeURIComponent(country)}`;
        } else if (name !== '') {
            apiUrl += `name=${encodeURIComponent(name)}`;
        } else if (country !== '') {
            apiUrl += `country=${encodeURIComponent(country)}`;
        }

        // Add the CORS proxy
        const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
        const fetchUrl = proxyUrl + apiUrl;

        universityDisplay.innerHTML = '<p>Loading...</p>'; // Show loading indicator

        fetch(fetchUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                displayUniversities(data);
            })
            .catch(error => {
                console.error('Error fetching university data:', error);
                universityDisplay.innerHTML = '<p>Server is busy. Please try again later.</p>';
            });
    });

    clearBtn.addEventListener('click', function () {
        nameInput.value = '';
        locationInput.value = '';
        universityDisplay.innerHTML = '';
    });

    helpBtn.addEventListener('click', function () {
        helpBox.style.display = 'flex';
    });

    closeHelp.addEventListener('click', function () {
        helpBox.style.display = 'none';
    });

    closeHelpBtn.addEventListener('click', function () {
        helpBox.style.display = 'none';
    });

    gotoBtn.addEventListener('click', function () {
        window.open('https://cors-anywhere.herokuapp.com/corsdemo', '_blank');
    });

    function displayUniversities(universities) {
        if (universities.length === 0) {
            universityDisplay.innerHTML = '<p>No universities found.</p>';
            return;
        }

        let universityHTML = '<h2>Search Results</h2>';
        universityHTML += '<div class="university-grid">';

        universities.forEach(university => {
            const { name, country, state_province, web_pages } = university;
            universityHTML += `
                <div class="university-card">
                    <h3>${name}</h3>
                    <p><strong>Country:</strong> ${country}</p>
                    <p><strong>State/Province:</strong> ${state_province ? state_province : 'N/A'}</p>
                    <p><strong>Website:</strong> <a href="${web_pages[0]}" target="_blank">${web_pages[0]}</a></p>
                </div>
            `;
        });

        universityHTML += '</div>'; // Close university-grid div

        universityDisplay.innerHTML = universityHTML;
    }
});
