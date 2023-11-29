const API_URL = `https://fsa-crud-2aa9294fe819.herokuapp.com/api/2310-GHP-ET-WEB-FT-SF/events`

const state = {
    events: [],
};

const eventList = document.querySelector('#events');

const addEventForm = document.querySelector('#addEvent');

async function render() {
    await getEvents();
    renderEvents();
}
render()

async function getEvents() {
    try {
        const response = await fetch(API_URL);
        const json = await response.json();
        console.log(json)
        state.events = json.data;
    } catch (error) {
        console.error(error);
    }
}


function renderEvents(){
    
    if (!state.events.length){
        const eventList = document.createElement("td")
        eventList.textContent = "No events :( ";
        return;
    }
    const eventContainer = document.querySelector("#events");
    console.log(eventContainer)

    const eventElements = state.events.map((event) => {
        const element = document.createElement("tr")
        const name = document.createElement("td");
        const nameText = document.createTextNode(event.name);
        name.appendChild(nameText);

        const description = document.createElement("td");
        const descriptionText = document.createTextNode(event.description);
        description.appendChild(descriptionText);
        
        const date = document.createElement("td");
        const dateText = document.createTextNode(event.date);
        date.appendChild(dateText);

        const location = document.createElement("td");
        const locationText = document.createTextNode(event.location);
        location.appendChild(locationText);

        element.appendChild(name);
        element.appendChild(description);
        element.appendChild(date);
        element.appendChild(location);

        return element
    });

    eventContainer.replaceChildren(...eventElements);
}