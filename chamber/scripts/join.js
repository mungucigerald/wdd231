const select = document.querySelector('#membership');
const form = document.querySelector('#application');

document.querySelectorAll('.level-button').forEach(link => {
    link.addEventListener('click', (event) => {
        event.preventDefault();
        const level = new URL(link.href).searchParams.get('level');
        if (level && select) select.value = level;
        form.scrollIntoView({ behavior: 'smooth' });
    })
});


const level = new URLSearchParams(window.location.search).get('level');
if (level && select) {
    select.value = level
}

form.addEventListener('submit', () => {
    document.querySelector('#timestamp').value = new Date().toLocaleString()
});

const levelDetails = document.querySelector('#level-details')

const levels = {
    np: {
        name: 'Non-Profit Membership',
        price: 'FREE',
        benefits: ['Listing in online business directory', 'Invitations to public networking events']
    },
    bronze: {
        name: 'Bronze Membership',
        price: 'UGX 250,000 per year',
        benefits: ['All Non-Profit Benfits', 'Directory Listing with logo and contact details', 'Discounted rates at chamber events and trade fairs', 'Access to member-only business workshops']
    },
    silver: {
        name: 'Silver Membership',
        price: 'UGX 750,000 per year',
        benefits: ['All bronze benefits', 'Featured placement in the directory', 'One free ticket per quater', "Promotion on the chamber's social media", 'Business matchmaking with other members']
    },
    gold: {
        name: 'Gold Membership',
        price: 'UGX 1,500,000 per year',
        benefits: ['All silver benefits', 'Spotlight and banner on the homepage', 'Free exhibition stand at the Annual Trade Expo', 'Speaking slot at chamber events', 'Priority support with export documentation, licensing and URA and UIA guidance', 'Invitation to delegations and government engagement events']
    }
};

function showDetails(key) {
    const level = levels[key];
    if (!level) return;

    levelDetails.innerHTML = `
        <button id="closeModal" aria-label="Close">❌</button>
        <h2>${level.name}</h2>
        <p class="level-price">${level.price}</p>
        <h3>Benefits include:<h3>
        <ul>${level.benefits.map(b => `<li>${b}</li>`).join('')}</ul>
        <button id="modalApply">Apply Now</button>`;
    
    levelDetails.showModal();

    levelDetails.querySelector('#closeModal').addEventListener('click', () => levelDetails.close());

    levelDetails.querySelector('#modalApply').addEventListener('click', () => {
        select.value = key;
        levelDetails.close();
        form.scrollIntoView({ behavior: 'smooth' });
    })
}

document.querySelectorAll('.more').forEach(btn => {
    btn.addEventListener('click', () => showDetails(btn.dataset.level));
})

levelDetails.addEventListener('click', (e) => {
    if (e.target === levelDetails) levelDetails.close();
})

const timestamp = document.querySelector('#timestamp');
if (timestamp) {
    timestamp.value = new Date().toLocaleString();
}
