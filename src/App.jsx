import React from 'react'
import { generateQuotation } from './utils/wordExporter'

function App() {
  return (
    <div style={{ padding: '2rem' }}>
      <h1>Quotation Generator</h1>
      <button onClick={generateQuotation}>Generate Word</button>
    </div>
  )
}

export default App