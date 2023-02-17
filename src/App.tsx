import { defineCustomElements } from '@revolist/revogrid/loader'
import { RevoGrid } from '@revolist/revogrid-react'
import { RevoGrid as RevoGridTypes } from '@revolist/revogrid/dist/types/interfaces'
import { useEffect, useState } from 'react'
import './App.css'

defineCustomElements()

function App() {
  const [rows, setRows] = useState<{ [key: string]: string }[]>([])
  const [columns, setColumns] = useState<RevoGridTypes.ColumnRegular[]>([])

  useEffect(() => {
    setColumns([
      { prop: 'column1', name: 'column1' },
      { prop: 'column2', name: 'column2' },
    ])
    setRows([
      { column1: 'value11', column2: 'value12' },
      { column1: 'value21', column2: 'value22' }
    ])
  }, [])

  return (
    <div className="App">
      <RevoGrid
        className='revogrid'
        columns={columns}
        source={rows}
      />
    </div>
  )
}

export default App
