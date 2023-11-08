

const createMonster = document.getElementById('create-monster')
const monsterContainer = document.getElementById('monster-container')
const monstersUrl = "http://127.0.0.1:3000/monsters"

//Create the monster form inside of the create-monster id
const monsterForm = document.createElement('form');
monsterForm.id = 'monster-form'

const nameofMonster = document.createElement("input")
nameofMonster.setAttribute("type", "text");
nameofMonster.setAttribute("name", "name");
nameofMonster.setAttribute("placeholder", "Name of Monster");

const ageofMonster = document.createElement("input")
ageofMonster.setAttribute("type", "number");
ageofMonster.setAttribute("name", "age");
ageofMonster.setAttribute("placeholder", "Age of Monster");

const descofMonster = document.createElement("input")
descofMonster.setAttribute("type", "text");
descofMonster.setAttribute("name", "desc");
descofMonster.setAttribute("placeholder", "Description of Monster");

const submit = document.createElement("input");
submit.setAttribute("type", "submit");
submit.setAttribute("value", "Create Monster");


monsterForm.appendChild(nameofMonster)
monsterForm.appendChild(ageofMonster)
monsterForm.appendChild(descofMonster)
monsterForm.append(submit)

createMonster.appendChild(monsterForm)

//Add Event Listener to the form 
const getmonsterForm = document.getElementById('monster-form')

getmonsterForm.addEventListener('submit', (e) => {
    e.preventDefault()
    console.log(e.target.name.value)
    console.log(e.target.age.value)
    console.log(e.target.desc.value)

    let data = {
        name: e.target.name.value,
        age: e.target.age.value,
        description: e.target.desc.value
    }

    fetch(monstersUrl, {
        method: "POST", // or 'PUT'
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    getmonsterForm.reset()


})

fetch(monstersUrl)
    .then(res => res.json())
    .then(data => {
        let monstersSlice = data.slice(0, 49)
        monstersSlice.forEach(monsters => {

            const li = document.createElement('li')
            li.textContent = monsters.name

            const child = document.createElement('ul')
            const childAge = document.createElement('li')
            const childDesc = document.createElement('li')

            childAge.textContent = "Age: " + monsters.age
            childDesc.textContent = "Desc: " + monsters.description

            li.appendChild(child)
            child.appendChild(childAge)
            child.appendChild(childDesc)

            monsterContainer.appendChild(li)
        })
    })

const forwardButton = document.getElementById('forward')
let pageNumber = -1
forwardButton.addEventListener('click', () => {
    let limitVal = 50
    pageNumber += 1

    fetch(`${monstersUrl}?_limit=${limitVal}&_page=${pageNumber}`)
        .then(res => res.json())
        .then(data => {
            data.forEach(monsters => {

                const li = document.createElement('li')
                li.textContent = monsters.name

                const child = document.createElement('ul')
                const childAge = document.createElement('li')
                const childDesc = document.createElement('li')

                childAge.textContent = "Age: " + monsters.age
                childDesc.textContent = "Desc: " + monsters.description

                li.appendChild(child)
                child.appendChild(childAge)
                child.appendChild(childDesc)

                monsterContainer.appendChild(li)

            })
        })
})














