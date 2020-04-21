import React from 'react'

const Search = ({ showPeople, handleFilter }) => {
    // const handleFilter = (event) => {
    //     setShowPeople(event.target.value)
    // }
    return (
        <div>
            Filter: <input
                value={showPeople} 
                onChange={handleFilter}
            />
        </div>
    )
}
export default Search
            