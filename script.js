$(document).ready(function () {
    fetch("pokedex.json")
        .then((rawData) => rawData.json())
        .then(pokedex => {
            let linkid = 0;
            pokedex.forEach(pokemon => {
                let id = pokemon["id"];
                let name = pokemon["name"]["english"];
                let image = pokemon["image"]["hires"];
                let types = pokemon["type"];
                let typesHtml = "";

                types.forEach(type => {
                    typesHtml += `<span class="${type.toLowerCase()}">${type}</span> `;
                });

                $('.pokemon-container').append(
                    `<div class="card">
                        <img src="${image}" alt="${name}">
                        <ul type="none">
                            <li class="pokemon-id">#${id}</li>
                            <li class="pokemon-name">
                                <a href="pokemon.html?id=${linkid++}">${name}</a>
                            </li>
                            <li class="pokemon-type">
                                ${typesHtml}
                            </li>
                        </ul>
                    </div>`
                );
            });

            // Search functionality
            $('#search').on('input', function () {
                const searchTerm = $(this).val().toLowerCase();
                $('.pokemon-container .card').filter(function () {
                    $(this).toggle($(this).text().toLowerCase().indexOf(searchTerm) > -1);
                });
            });
        });
});