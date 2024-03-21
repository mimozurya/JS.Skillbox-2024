export function render(data) {
    const newData = data.results;
    console.log(newData);

    const container = document.createElement("div");
    container.classList.add("container", "d-flex", "justify-content-between", "flex-wrap", "py-4");

    for (let i = 0; i < newData.length; i++) {
        const filmCard = document.createElement("div");
        const cardBody = document.createElement("div");
        const title = document.createElement("h5");
        const director = document.createElement("p");
        const detailsButton = document.createElement("a");

        filmCard.style.width = "30%";
        filmCard.classList.add("card", "my-2");
        cardBody.classList.add("card-body");
        title.classList.add("card-title");
        director.classList.add("card-text");
        detailsButton.classList.add("btn", "btn-primary");

        filmCard.append(cardBody);
        cardBody.append(title);
        cardBody.append(director);
        cardBody.append(detailsButton);

        title.textContent = `Эпизод ${newData[i].episode_id}. ${newData[i].title} (дата выхода - ${
            newData[i].release_date.split("-")[0]
        } год)`;
        director.textContent = `Режиссер фильма - ${newData[i].director}`;
        detailsButton.textContent = "О фильме";
        detailsButton.href = `?filmId=${i + 1}`;

        container.append(filmCard);
    }

    return container;
}
