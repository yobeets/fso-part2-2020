import React from 'react'
import ReactDOM from 'react-dom'
import Course from './components/Course'

// const Course = ({ course }) => {
//   return (
//     <div>
//       <Header course={course} />
//       <Content course={course} />
//       <Total parts={course.parts} />
//     </div>
//   )
// }

// const Header = ({ course }) => {
//   return (
//     <h1>{course.name}</h1>
//   )
// }

// const Total = ({ parts }) => {
//   let initialValue = 0
//   // const sum = parts.reduce( (s, p) => {
//   //   return s + p.exercises
//   // }, initialValue)
//   const sum = parts.reduce( 
//       (s, p) => s + p.exercises
//       , initialValue
//     ) 
//   return(
//     <p>Total of {sum} exercises</p>
//   ) 
// }

// const Part = (props) => {
//   return (
//     <p>
//       {props.part.name} {props.part.exercises}
//     </p>    
//   )
// }

// const Content = ({ course }) => {
//   return (
//     <div>
//       {course.parts.map(part => 
//         <Part key={part.id} part={part} />
//       )}
//     </div>
//   )
// }

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <div>
      {/* <Course course={course} /> */}
      {courses.map(course => 
        <Course key={course.id} course={course} />
      )}
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))