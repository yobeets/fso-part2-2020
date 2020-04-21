import React, { useState } from 'react'

const App = () => {
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas', number: '040-123456' },
        { name: 'Ada Lovelace', number: '39-44-5323523' },
        { name: 'Dan Abramov', number: '12-43-234345' },
        { name: 'Mary Poppendieck', number: '39-23-6423122' }
    ])
    const [ newName, setNewName ] = useState('')
    const [ newNumber, setNewNumber ] = useState('')

    const addPerson = (event) => {
        event.preventDefault()
        const personObject = {
            name:newName,
            number:newNumber
        }
        if (persons.filter(e => e.name === personObject.name).length > 0) {
            console.log("already in phonebook")
            window.alert(`${personObject.name} already in phonebook`);
        } else {
            setPersons(persons.concat(personObject))
        }
        setNewName('')
        setNewNumber('')
    }

    const handleNewPerson = (event) => {
        // console.log(event.target.value)
        setNewName(event.target.value)
    }
    const handleNewNumber = (event) => {
        // console.log(event.target.value)
        setNewNumber(event.target.value)
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <div>
                Filter: <input/>
            </div>
            <h2>Add New</h2>
            <form onSubmit={addPerson}>
            <div>
                name: <input
                    value={newName} 
                    onChange={handleNewPerson}
                />
            <div>
                number: <input 
                    value={newNumber} 
                    onChange={handleNewNumber}
                />
            </div>
            </div>
            <div>
                <button type="submit">add</button>
            </div>
            </form>
            <h2>Numbers</h2>
            <div>
                {persons.map( (person) => 
                    <p key={person.name}>{person.name} : {person.number}</p>
                )}
            </div>
            <div>debug: {newName}</div>
        </div>
    )
}

export default App