import React, { useState, useEffect } from 'react'
import Search from './components/Search'
import PersonForm from './components/PersonForm'
import Numbers from './components/Numbers'
//import axios from 'axios'
import personService from './services/persons'
import Notification from './components/Notification'

const App = () => {
    const [ persons, setPersons ] = useState([])
    const [ newName, setNewName ] = useState('')
    const [ newNumber, setNewNumber ] = useState('')
    const [ showPeople, setShowPeople ] = useState('') 
    const [ notifMessage, setNotifMessage ] = useState(null)

    useEffect(() => {
        personService
            .getAll()
            .then(initialPeople => {
                setPersons(initialPeople)
            })
    }, [])
    console.log('render', persons.length, 'people')

    const handleNotify = (message, type) => {
        setNotifMessage({ message, type })
        setTimeout(() => {
            setNotifMessage(null)
        }, 5000)
    }

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
                            handleNotify(`'${returnedPerson.name}' was updated`, 'success')
                        })
                        .catch(error => {
                            handleNotify(`'${changedPerson.name}' has already been removed`, 'error')
                            setPersons(persons.filter(n => n.id !== toUpdate.id))
                        })
            }
        } else {
            personService
                .create(personObject)
                .then(returnedPerson => {
                    setPersons(persons.concat(returnedPerson))
                    handleNotify(`'${returnedPerson.name}' was added to the phonebook`, 'success')
                })
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
                    handleNotify(`'${toDelete.name}' was removed`, 'success')
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
            <Notification
                message={notifMessage}
            />
            <Search 
                showPeople={showPeople} 
                handleFilter={handleFilter} 
            />
            <PersonForm 
                newName={newName}
                newNumber={newNumber}
                addPerson={addPerson}
                handleNewPerson={handleNewPerson}
                handleNewNumber={handleNewNumber}
            />
            <Numbers
                peopleToShow={peopleToShow}
                removePerson={removePerson}
            />
        </div>
    )
}

export default App