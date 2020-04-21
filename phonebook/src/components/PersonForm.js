import React from 'react'

const PersonForm = ({ newName, newNumber, addPerson, handleNewPerson, handleNewNumber }) => {
    // const addPerson = (event) => {
    //     event.preventDefault()
    //     const personObject = {
    //         name:newName,
    //         number:newNumber
    //     }
    //     if (persons.filter(e => e.name === personObject.name).length > 0) {
    //         console.log("already in phonebook")
    //         window.alert(`${personObject.name} already in phonebook`);
    //     } else {
    //         setPersons(persons.concat(personObject))
    //     }
    //     setNewName('')
    //     setNewNumber('')
    // }
    // const handleNewPerson = (event) => {
    //     // console.log(event.target.value)
    //     setNewName(event.target.value)
    // }
    // const handleNewNumber = (event) => {
    //     // console.log(event.target.value)
    //     setNewNumber(event.target.value)
    // }
    return (
        <div>
            <h2>Add New</h2>
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
            </form>
        </div>
        
    )
}

export default PersonForm