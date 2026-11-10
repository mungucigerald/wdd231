const url = 'https://byui-cse.github.io/cse-ww-program/data/latter-day-prophets.json';

const cards = document.querySelector('#cards');

async function getProphetData() {
    const response = await fetch(url);
    const data = await response.json();
    // console.table(data.prophets);
    displayProphets(data.prophets);
}

getProphetData();

const displayProphets = (prophets) => {
    prophets.forEach((prophet) => {
        // create html elements and store as variables
        const card = document.createElement('section');
        const fullName = document.createElement('h2');
        const potrait = document.createElement('img');
        const birthDate = document.createElement('p');
        const birthPlace = document.createElement('p');

        // populate the fullname h2 element and 'p' elements
        fullName.textContent = `${prophet.name} ${prophet.lastname}`;
        birthDate.textContent = `Date of Birth: ${prophet.birthdate}`;
        birthPlace.textContent = `Place of Birth: ${prophet.birthplace}`;

        // Build the image with relevant attributes
        potrait.setAttribute('src', prophet.imageurl);
        potrait.setAttribute('alt', `Potrait of ${prophet.name}`);
        potrait.setAttribute('loading', 'lazy');
        potrait.setAttribute('width', '340');
        potrait.setAttribute('height', '440');

        // Append the section with the created elements
        card.appendChild(fullName);
        card.appendChild(birthDate);
        card.appendChild(birthPlace);
        card.appendChild(potrait);

        cards.appendChild(card);
    });
}