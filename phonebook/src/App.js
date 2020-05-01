import React, { useState, useEffect } from 'react'
import Search from './components/Search'
import PersonForm from './components/PersonForm'
import Numbers from './components/Numbers'
//import axios from 'axios'
import personService from './services/persons'

const App = () => {
    const [ persons, setPersons ] = useState([])
    const [ newName, setNewName ] = useState('')
    const [ newNumber, setNewNumber ] = useState('')
    const [ showPeople, setShowPeople ] = useState('') 

    useEffect(() => {
        personService
            .getAll()
            .then(initialPeople => {
                setPersons(initialPeople)
            })
        // console.log('effect')
        // axios
        //     .get('http://localhost:3001/persons')
        //     .then(response => {
        //         console.log('promise fulfilled')
        //         setPersons(response.data)
        //     })
    }, [])
    console.log('render', persons.length, 'people')

    const addPerson = (event) => {
        event.preventDefault()
        const personObject = {
            name:newName,
            number:newNumber
        }
        if (persons.find(e => e.name === personObject.name)) {
            //console.log("already in phonebook")
            const mostDef = window.confirm(`${personObject.name} is already in the phonebook, would you like to update their number?`)
            if (mostDef) {
                const toUpdate = persons.find(p => p.name === personObject.name)
                const changedPerson = { ...toUpdate, number: personObject.number }
                //console.log('Do it! Update ' + toUpdate.name)
                personService
                    .update(toUpdate.id, changedPerson)
                        .then(returnedPerson => {
                        setPersons(persons.map(person => person.id !== toUpdate.id ? person : returnedPerson))
    })
            }
        } else {
            personService
                .create(personObject)
                .then(returnedPerson => {
                    setPersons(persons.concat(returnedPerson))
                })
            // axios
            //     .post('http://localhost:3001/persons', personObject)
            //     .then(response => {
            //         setPersons(persons.concat(response.data))
            //     })
        }
        setNewName('')
        setNewNumber('')
    }

    const removePerson = id => {
        const toDelete = persons.find(p => p.id === id)
        const doIt = window.confirm(`Delete ${toDelete.name}`)
        if (doIt) {
            personService
                .remove(id)
                .then(response => {
                    setPersons(persons.filter(person => person.id !== id))
                })
        }
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
                removePerson={removePerson}
            />
        </div>
    )
}

export default App