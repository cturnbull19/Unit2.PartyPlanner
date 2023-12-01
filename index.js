const API_URL = `https://fsa-crud-2aa9294fe819.herokuapp.com/api/2310-GHP-ET-WEB-FT-SF/events`

const state = {
    events: [],
};

const eventList = document.querySelector('#events');

const addEventForm = document.querySelector('#addEvent');
//addEventForm.addEventListener("submit", addEvent);

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

    //const eventElements = 
    const table = state.events.map((event) => {
        const element = document.createElement("tr")
        const name = document.createElement("td");
        //might need to add name.classList.add('') because this will tag a class to all the elements td so that we can edit them in CSS
        const nameText = document.createTextNode(event.name);
        name.appendChild(nameText);

        const description = document.createElement("td");
        const descriptionText = document.createTextNode(event.description);
        description.appendChild(descriptionText);
        
        
        const date = document.createElement("td");
        const dateText = event.date.split('T');
        const dateString = dateText[0];
        const newDate = new Date(dateString).toLocaleDateString();
        const dateOnly = document.createTextNode(newDate);
        date.appendChild(dateOnly);

        const time = document.createElement("td");
        const timeString = dateText[1];
        const timeOnly = document.createTextNode(timeString)
        time.appendChild(timeOnly);

        const location = document.createElement("td");
        const locationText = document.createTextNode(event.location);
        location.appendChild(locationText);

        const tblButton = document.createElement("td")
        const deleteButton = document.createElement("button")
        deleteButton.textContent = "Delete Event"
        tblButton.appendChild(deleteButton)

       element.appendChild(name);
       element.appendChild(description);
       element.appendChild(date);
       element.appendChild(time);
       element.appendChild(location);
       element.appendChild(tblButton);
       
       //eventContainer.appendChild(element)

    deleteButton.addEventListener("click", () => deleteEvent(event.id))
        return element
    });


    //table.appendChild(element)
    eventContainer.replaceChildren(...table);
}

// async function addEvent(event) {
//     event.preventDefault();

//     try{
//         const response = await fetch(API_URL, {
//             method: "POST",
//             headers: {"Content-Type": "application/json"},
//             body: JSON.stringify({
//                 name: addEventForm.name.value,
//                 description: addEventForm.description.value,
//                 date: addEventForm.date.value,
//                 location: addEventForm.location.value,
//             }),
//         });
//         if (!response.ok) {
//             throw new Error("Failed to add Event");
//         }
//         render();

//     } catch (error) {
//         console.error(error);
//     }
// }

async function deleteEvent(id) {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: "DELETE",
          })
      
          render()
        } catch (error) {
          console.error(error)
        }
      }
