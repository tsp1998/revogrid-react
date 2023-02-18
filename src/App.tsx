import ReactDOM from 'react-dom'
import { defineCustomElements } from '@revolist/revogrid/loader'
import { RevoGrid } from '@revolist/revogrid-react'
import { RevoGrid as RevoGridTypes } from '@revolist/revogrid/dist/types/interfaces'
import { useEffect, useState } from 'react'
import './App.css'
// import { VNode } from '@revolist/revogrid/dist/types/stencil-public-runtime'

defineCustomElements()

const Select = (props: { handleChange: (value: string) => void }) => {
  const [value, setValue] = useState('value1')

  useEffect(() => {
    props.handleChange(value)
  }, [value])

  return (
    <select value={value} onChange={(event) => {
      setValue(event.target.value)
    }}>
      <option value="value1">Value1</option>
      <option value="value2">Value2</option>
    </select>
  )
}

function adapter(parent: HTMLDivElement, props: RevoGridTypes.ColumnRegular) {
  let wrapper: Element;
  if (parent.childNodes.length) {
    wrapper = parent.children[0];
    ReactDOM.unmountComponentAtNode(wrapper);
  } else {
    wrapper = document.createElement("div");
    parent.appendChild(wrapper);
  }
  
  ReactDOM.render(
    <Select handleChange={value => console.log('Selected Value: ', value)} />, wrapper
  );
}

function App() {
  const [rows, setRows] = useState<{ [key: string]: string }[]>([])
  const [columns, setColumns] = useState<RevoGridTypes.ColumnRegular[]>([])

  // const template: RevoGridTypes.CellTemplateFunc<VNode> = (createElement, props) => {
  //   const vNode = createElement('div', {})

  //   setTimeout(() => {
  //     const contentElement = vNode.$elm$ as HTMLDivElement
  //     contentElement.textContent = props.model[props.prop]
  //   }, 1)

  //   return vNode
  // }

  useEffect(() => {
    setColumns([
      {
        prop: 'column1',
        name: 'column1',
        cellTemplate: (createElement, props) => createElement('div', {ref: (element: HTMLDivElement) => adapter(element, props)})
      },
      { prop: 'column2', name: 'column2'},
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
