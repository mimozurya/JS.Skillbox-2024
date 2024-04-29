export function render(data) {
    const newData = data.results;
    console.log(newData);

    const container = document.createElement("div");
    container.classList.add("container", "d-flex", "justify-content-between", "flex-wrap", "py-4");

    for (let i = 0; i < newData.length; i++) {
        const filmCard = document.createElement("div");
        const cardBody = document.createElement("div");
        const titleBody = document.createElement("h5");
        const directorBody = document.createElement("p");
        const detailsButton = document.createElement("a");

        filmCard.style.width = "30%";
        filmCard.classList.add("card", "my-2");
        cardBody.classList.add("card-body");
        titleBody.classList.add("card-title");
        directorBody.classList.add("card-text");
        detailsButton.classList.add("btn", "btn-primary");

        filmCard.append(cardBody);
        cardBody.append(titleBody);
        cardBody.append(directorBody);
        cardBody.append(detailsButton);

        const { episode_id, title, release_date, director } = newData[i];

        titleBody.textContent = `Эпизод ${episode_id}. ${title} (дата выхода - ${
            release_date.split("-")[0]
        } год)`;
        directorBody.textContent = `Режиссер фильма - ${director}`;
        detailsButton.textContent = "О фильме";
        detailsButton.href = `?filmId=${i + 1}`;

        container.append(filmCard);
    }

    return container;
}
