export function render(data) {
    console.log(data);
    const planetsUrl = data.planets;
    const speciesUrl = data.species;
    const arrPlanets = [];
    const arrSpecies = [];

    async function fetchData(url) {
        const responce = await fetch(url);
        return responce.json();
    }

    async function getFetchData(_url, _array, _ul_Url) {
        for (let url of _url) {
            let object = await fetchData(url);
            _array.push(object);
            const liElement = document.createElement("li");
            const ulElement = document.querySelector(_ul_Url);
            liElement.textContent = object.name;
            ulElement.appendChild(liElement);
        }

        return _array;
    }

    async function getData() {
        await Promise.all([
            getFetchData(planetsUrl, arrPlanets, ".planets-list"),
            getFetchData(speciesUrl, arrSpecies, ".species-list"),
        ]);
    }

    getData();

    const container = document.createElement("div");
    container.classList.add("container", "py-4");

    const { title, opening_crawl } = data;
    container.innerHTML = `
        <h1>Детальная информация о фильме: Звездные войны: "${title}"</h1>
        <p class="lead">${opening_crawl}</p>
        <h2 class="display-3">Planets</h2>
        <ul class="planets-list"></ul>
        <h2 class="display-3">Species</h2>
        <ul class="species-list"></ul>
        `;

    return container;
}
