import React from 'react'
import TableComponent from '../../Components/TableComponent'

function Outstanding(props) {
    return (
        <>
            {props.Outstanding.length>0 &&<TableComponent Data ={props.Outstanding}/>}
        </>
    )
}

export default Outstanding