import React from 'react'

const Numbers = ({ peopleToShow, removePerson }) => {
    // const peopleToShow = !showPeople
    //     ? persons
    //     : persons.filter(person => person.name.toLowerCase().includes(showPeople.toLowerCase()))
    return (
        <div>
            <h2>Numbers</h2>
            <div>
                {peopleToShow.map( (person) => 
                    <p key={person.id}>{person.name} : {person.number} <button onClick={() => removePerson(person.id)}>delete</button></p>
                )}
            </div>
        </div>        
    )
}
export default Numbers