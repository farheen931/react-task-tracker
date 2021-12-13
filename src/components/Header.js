import PropTypes from 'prop-types'
import { useLocation } from 'react-router'
import Button from './Button'


const Header = ({title, onAdd, showAdd}) => {
    // const onClick = () => {
    //     console.log('Click')
    // }
    const location = useLocation()
    return (
        <header className = 'header'>
            <h1> {title} </h1>
            {location.pathname === '/' && <Button color = {showAdd ? 'red' : 'green'} 
            text = {showAdd ? 'Close' : 'Add'} 
            onClick = {onAdd} /> }
            {/* passing props to button = can reuse them*/}
        </header>
    )
}

Header.defaultProps = {
    title: 'Task Tracker'
}

Header.propTypes = {
    title: PropTypes.string
}

//CSS in JS
// const headingStyle = {
//     color: 'red', 
//     backgroundColor: 'black'
// }


// const Header = (props) => {
//     return (
//         <div>
//             {/* <h1 style = {headingStyle}> Task Tracker </h1> */}
//             <h1> {props.title} </h1>
//             <button> Add </button>
//         </div>
//     )
// }
export default Header


