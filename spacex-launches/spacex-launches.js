document.addEventListener('DOMContentLoaded', () => {
  fetchLaunchData();
});

function fetchLaunchData() {
  const url = 'https://api.spacexdata.com/v4/launches';

  fetch(url)
    .then(response => response.json())
    .then(data => displayLaunchData(data))
    .catch(error => console.error('Error fetching launch data:', error));
}

function fetchRocketData(rocketId) {
  const url = `https://api.spacexdata.com/v4/rockets/${rocketId}`;
  
  return fetch(url)
    .then(response => response.json())
    .then(data => data.name)
    .catch(error => 'Unknown');
}

async function displayLaunchData(launches) {
  const container = document.getElementById('launches-container');
  container.innerHTML = '';

  for (const launch of launches) {
    const rocketName = await fetchRocketData(launch.rocket);
    const launchCard = document.createElement('div');
    launchCard.classList.add('launch-card');

    const launchImage = launch.links.patch.small ? `<img src="${launch.links.patch.small}" alt="${launch.name}">` : '';
    const launchDetails = `
      <h2>${launch.name}</h2>
      <p><strong>Date:</strong> ${new Date(launch.date_utc).toLocaleDateString()}</p>
      <p><strong>Rocket:</strong> ${rocketName}</p>
      <p><strong>Launch Site:</strong> ${launch.launchpad}</p>
      <p><strong>Details:</strong> ${launch.details ? launch.details : 'No details available'}</p>
      ${launch.links.webcast ? `<a href="${launch.links.webcast}" target="_blank">Watch Video</a>` : ''}
    `;

    launchCard.innerHTML = launchImage + launchDetails;
    container.appendChild(launchCard);
  }
}
