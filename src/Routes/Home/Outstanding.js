import React from 'react'
import TableComponent from '../../Components/TableComponent'

function Outstanding(props) {
    return (
        <>
            <TableComponent Data ={props.Outstanding} screenWidth={props.screenWidth}/>
        </>
    )
}

export default Outstanding