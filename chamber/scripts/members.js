const gridButton = document.querySelector("#grid");
const listButton = document.querySelector("#list");
const url = "data/members.json";

const display = document.querySelector("article");

async function getMemberData() {
    const response = await fetch(url)
    const data = await response.json()
    displayMembers(data.members);
}

function displayMembers(members) {
    members.forEach((member) => {
        const card = document.createElement("section");

        const img = document.createElement("img");
        img.src = member.image;
        img.alt = `${member.companyName} logo`;
        img.loading = "lazy";

        const name = document.createElement("h2");
        name.textContent = member.companyName;

        const location = document.createElement("p");
        location.textContent = member.address;

        const site = document.createElement("a")
        site.href = member.website;
        site.textContent = "Visit Website";
        site.target = "_blank";

        card.append(img, name, location, site);
        display.append(card);
    });
}

getMemberData();

gridButton.addEventListener("click", () => {
    display.classList.add("grid");
    display.classList.remove("list");
});

listButton.addEventListener("click", showList);

function showList() {
    display.classList.add("list");
    display.classList.remove("grid");
};