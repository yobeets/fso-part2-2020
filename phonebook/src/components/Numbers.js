import React from 'react'

const Numbers = ({ peopleToShow }) => {
    // const peopleToShow = !showPeople
    //     ? persons
    //     : persons.filter(person => person.name.toLowerCase().includes(showPeople.toLowerCase()))
    return (
        <div>
            <h2>Numbers</h2>
            <div>
                {peopleToShow.map( (person) => 
                    <p key={person.name}>{person.name} : {person.number}</p>
                )}
            </div>
        </div>        
    )
}
export default Numbers