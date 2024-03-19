export function render(data) {
    const container = document.createElement("div");
    container.classList.add("container", "py-4");
    container.innerHTML = `
    <h1>Детальная информация о товаре: "${data.title}"</h1>
    <p class="lead">${data.description}</p>
    <p class="display-3">${data.price} денег</p>
    `;
    return container;
}
