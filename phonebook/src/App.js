import React, { useState, useEffect } from 'react'
import Search from './components/Search'
import PersonForm from './components/PersonForm'
import Numbers from './components/Numbers'
import axios from 'axios'

const App = () => {
    const [ persons, setPersons ] = useState([])
    const [ newName, setNewName ] = useState('')
    const [ newNumber, setNewNumber ] = useState('')
    const [ showPeople, setShowPeople ] = useState('') 

    useEffect(() => {
        console.log('effect')
        axios
            .get('http://localhost:3001/persons')
            .then(response => {
                console.log('promise fulfilled')
                setPersons(response.data)
            })
    }, [])
    console.log('render', persons.length, 'people')

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

    const handleFilter = (event) => {
        setShowPeople(event.target.value)
    }

    const peopleToShow = !showPeople
        ? persons
        : persons.filter(person => person.name.toLowerCase().includes(showPeople.toLowerCase()))

    return (
        <div>
            <h2>Phonebook</h2>
            {/* <div>
                Filter: <input
                    value={showPeople} 
                    onChange={handleFilter}
                />
            </div> */}
            <Search 
                showPeople={showPeople} 
                handleFilter={handleFilter} 
            />
            {/* <h2>Add New</h2>
            <form onSubmit={addPerson}>
                <div>
                    name: <input
                        value={newName} 
                        onChange={handleNewPerson}
                    />
                </div>
                <div>
                    number: <input 
                        value={newNumber} 
                        onChange={handleNewNumber}
                    />
                
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form> */}
            <PersonForm 
                newName={newName}
                newNumber={newNumber}
                addPerson={addPerson}
                handleNewPerson={handleNewPerson}
                handleNewNumber={handleNewNumber}
            />
            {/* <h2>Numbers</h2>
            <div>
                {peopleToShow.map( (person) => 
                    <p key={person.name}>{person.name} : {person.number}</p>
                )}
            </div> */}
            <Numbers
                peopleToShow={peopleToShow}
            />
        </div>
    )
}

export default App