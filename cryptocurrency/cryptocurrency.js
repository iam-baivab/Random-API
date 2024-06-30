document.addEventListener('DOMContentLoaded', () => {
    fetchCryptoData();
    setupFilters();
    setInitialTheme();
  });
  
  let allCryptos = [];
  
  function fetchCryptoData() {
    const url = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd';
  
    fetch(url)
      .then(response => response.json())
      .then(data => {
        allCryptos = data;
        displayCryptoData(data);
      })
      .catch(error => console.error('Error fetching crypto data:', error));
  }
  
  function displayCryptoData(cryptos) {
    const container = document.getElementById('crypto-container');
    container.innerHTML = '';
  
    for (const crypto of cryptos) {
      const cryptoCard = document.createElement('div');
      cryptoCard.classList.add('crypto-card');
  
      const cryptoDetails = `
        <img src="${crypto.image}" alt="${crypto.name}">
        <h2>${crypto.name} (${crypto.symbol.toUpperCase()})</h2>
        <p><strong>Current Price:</strong> $${crypto.current_price}</p>
        <p><strong>Market Cap:</strong> $${crypto.market_cap.toLocaleString()}</p>
        <p><strong>24h Change:</strong> ${crypto.price_change_percentage_24h.toFixed(2)}%</p>
      `;
  
      cryptoCard.innerHTML = cryptoDetails;
      container.appendChild(cryptoCard);
    }
  }
  
  function setupFilters() {
    const searchBar = document.getElementById('search-bar');
    searchBar.addEventListener('input', filterCryptos);
  }
  
  function filterCryptos() {
    const searchBarValue = document.getElementById('search-bar').value.toLowerCase();
  
    const filteredCryptos = allCryptos.filter(crypto => {
      return crypto.name.toLowerCase().includes(searchBarValue) || crypto.symbol.toLowerCase().includes(searchBarValue);
    });
  
    displayCryptoData(filteredCryptos);
  }
  
  function setInitialTheme() {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const themeSwitch = document.getElementById('theme-switch');
  
    if (savedTheme === 'light') {
      document.body.classList.add('light');
      themeSwitch.checked = false;
    } else if (savedTheme === 'dark') {
      document.body.classList.add('dark');
      themeSwitch.checked = true;
    } else {
      if (prefersDark) {
        document.body.classList.add('dark');
        themeSwitch.checked = true;
        localStorage.setItem('theme', 'dark');
      } else {
        document.body.classList.add('light');
        themeSwitch.checked = false;
        localStorage.setItem('theme', 'light');
      }
    }
  }
  
  function changeTheme() {
    const themeSwitch = document.getElementById('theme-switch');
    const theme = themeSwitch.checked ? 'dark' : 'light';
    localStorage.setItem('theme', theme);
    document.body.className = theme;
  }
  