import React from 'react'
import {exportToPdf} from '../utils/exportToPdf'

const Export = () => {
  return (
    <div className='px-5 py-4 flex flex-col gap-3'>
        <h6 className='text-xs'>EXPORT</h6>
        <button onClick={exportToPdf} style={{border:'1px solid gray', width:'100%', margin:'auto'}}>Export to PDF</button>
    </div>
  )
}

export default Export
