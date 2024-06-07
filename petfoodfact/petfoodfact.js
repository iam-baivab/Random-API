document.addEventListener('DOMContentLoaded', function () {
    const searchBtn = document.getElementById('searchBtn');
    const petFoodInput = document.getElementById('petFoodInput');
    const petFoodDisplay = document.getElementById('petFoodDisplay');

    searchBtn.addEventListener('click', function () {
        const petFoodName = petFoodInput.value.trim();
        if (petFoodName === '') {
            alert('Please enter a pet food name.');
            return;
        }

        fetchPetFoodFacts(petFoodName);
    });

    async function fetchPetFoodFacts(petFoodName) {
        const apiUrl = `https://world.openpetfoodfacts.org/api/v0/product/${petFoodName}.json`;

        try {
            const response = await fetch(apiUrl);
            const data = await response.json();
            displayPetFoodFacts(data);
        } catch (error) {
            console.error('Error fetching pet food data:', error);
            petFoodDisplay.innerHTML = '<p>Error fetching pet food data. Please try again later.</p>';
        }
    }

    function displayPetFoodFacts(data) {
        petFoodDisplay.innerHTML = ''; // Clear previous results
        if (data.status === 1) {
            const product = data.product;
            const petFoodHTML = `
                <div class="pet-food-card">
                    <h2>${product.product_name || 'N/A'}</h2>
                    <p><strong>Brand:</strong> ${product.brands || 'N/A'}</p>
                    <p><strong>Ingredients:</strong> ${product.ingredients_text || 'N/A'}</p>
                    <p><strong>Sortkey:</strong> ${product.sortkey || 'N/A'}</p>
                    <p><strong>Last Edit Dates:</strong> ${product.last_edit_dates_tags.join(', ') || 'N/A'}</p>
                    <p><strong>Creator:</strong> ${product.creator || 'N/A'}</p>
                </div>
            `;
            petFoodDisplay.innerHTML = petFoodHTML;
        } else {
            petFoodDisplay.innerHTML = '<p>No results found. Please try a different pet food name.</p>';
        }
    }
});
