const url = 'data/members.json';
const container = document.getElementById('member-container')


export async function initSpotlight() {
    try {
        const res = await fetch(url);
        const data = await res.json();
        const members = data.members;


        const eligible = members.filter(m => m.membership === 'Gold' || m.membership === 'Silver');
        const picks = eligible.sort(() => Math.random() - 0.5).slice(0, 3);

        container.innerHTML = '';

        picks.forEach(m => {
            const card = document.createElement('div');
            card.className = 'card';

            const img = document.createElement('img');
            img.src = m.image;
            img.alt = `${m.companyName} image`
            img.loading = 'lazy';
            card.append(img);
            
            const memInfo = document.createElement('div');
            memInfo.classList.toggle('member-info');
            const name = document.createElement('h4');
            name.textContent = m.companyName;
            const address = document.createElement('p');
            address.textContent = m.address;
            const phone = document.createElement('p');
            const membership = document.createElement('p');
            membership.classList.add('badge', m.membership.toLowerCase());
            membership.textContent = m.membership;
            const link = document.createElement('a');
            link.href = m.website;
            link.textContent = 'Visit Site';
            link.target = '_blank';

            memInfo.append(name, address, phone, link);

            card.append(membership, memInfo);
            container.append(card);
        });
    } catch (error) {
        console.error(error);
    }
}