const characterList = document.querySelector("#characters");

const fetchData = async (url) => {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Error fetching data:", error);
        return null;
    }
};

const renderCharacterList = (data) => {
    data.forEach((character) => {
        const characterCard = document.createElement("div");
        characterCard.classList.add("character-card");

        const characterImage = document.createElement("img");
        characterImage.setAttribute("src", character.image);

        const characterName = document.createElement("p");
        characterName.innerText = character.name;

        const characterAge = document.createElement("span");
        characterAge.innerText = character.age;

        characterCard.append(characterImage);
        characterCard.append(characterName);
        characterCard.append(characterAge);

        characterList.append(characterCard);
    });
};

const loadCharacters = async () => {
    const data = await fetchData("../data/catalog.json");
    if (data) {
        console.log(data);
        renderCharacterList(data);
    }
};

const loadAnyData = async () => {
    const data = await fetchData("../data/any.json");
    if (data) {
        console.log(data);
    }
};

loadCharacters();
loadAnyData();