import React from 'react';

const Course = ({ course }) => {
  return (
    <div>
      <Header course={course} />
      <Content course={course} />
      <Total parts={course.parts} />
    </div>
  )
}

const Header = ({ course }) => {
  return (
    <h1>{course.name}</h1>
  )
}

const Total = ({ parts }) => {
  let initialValue = 0
  // const sum = parts.reduce( (s, p) => {
  //   return s + p.exercises
  // }, initialValue)
  const sum = parts.reduce( 
      (s, p) => s + p.exercises
      , initialValue
    ) 
  return(
    <p>Total of {sum} exercises</p>
  ) 
}

const Part = (props) => {
  return (
    <p>
      {props.part.name} {props.part.exercises}
    </p>    
  )
}

const Content = ({ course }) => {
  return (
    <div>
      {course.parts.map(part => 
        <Part key={part.id} part={part} />
      )}
    </div>
  )
}

export default Course