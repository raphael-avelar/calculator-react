import React, { useState } from 'react'
import './Calculator.css'

import Display from '../components/Display'
import Button from '../components/Button'

export default () => {
  const [displayValue, setDisplayValue] = useState('0')
  const [clearDisplay, setClearDisplay] = useState(false)
  const [operation, setOperation] = useState(null)
  const [values, setValues] = useState([0, 0])
  const [current, setCurrent] = useState(0)

  function clearMemory () {
    setDisplayValue('0')
    setClearDisplay(false)
    setOperation(null)
    setValues([0, 0])
    setCurrent(0)
  }

  function addOperation (op) {
    if (current === 0) {
      setOperation(op)
      setCurrent(1)
      setClearDisplay(true)
    } else {
      const equals = op === '='

      const newValues = [...values]
      newValues[0] = resolveOperation(operation)
      newValues[1] = 0

      setDisplayValue(newValues[0])
      setClearDisplay(!equals)
      setOperation(equals ? null : op)
      setValues(newValues)
      setCurrent(equals ? 0 : 1)
    }
  }

  function resolveOperation (operation) {
    let result = 0

    switch (operation) {
      case '/' :
        result = values[0] / values[1]
        break
      case '*' :
        result = values[0] * values[1]
        break
      case '-' :
        result = values[0] - values[1]
        break
      case '+' :
        result = values[0] + values[1]
        break
      case '=' :
        result = values[0] = values[1]
        break
      default: alert("Operador informado é inválido!")
    }

    return result
  }

  function addDigit (n) {
    if (n === '.' && displayValue.includes('.')) return

    const newClearDisplay = displayValue === '0' || clearDisplay
    const currentValue = newClearDisplay ? '' : displayValue
    const newDisplayValue = currentValue + n

    setDisplayValue(newDisplayValue)
    setClearDisplay(false)

    if (n !== '.') {
      const i = current
      const newValue = parseFloat(newDisplayValue)
      const newValues = [...values]

      newValues[i] = newValue
      setValues([...newValues])
    }
  }

  return (
    <div className="calculator">
      <Display value={displayValue} />
      <Button label="AC" onClick={() => clearMemory()} kind="triple" />
      <Button label="/" onClick={() => addOperation('/')} kind="operation" />
      <Button label="7" onClick={() => addDigit('7')} />
      <Button label="8" onClick={() => addDigit('8')} />
      <Button label="9" onClick={() => addDigit('9')} />
      <Button label="*" onClick={() => addOperation('*')} kind="operation" />
      <Button label="4" onClick={() => addDigit('4')} />
      <Button label="5" onClick={() => addDigit('5')} />
      <Button label="6" onClick={() => addDigit('6')} />
      <Button label="-" onClick={() => addOperation('-')} kind="operation" />
      <Button label="1" onClick={() => addDigit('1')} />
      <Button label="2" onClick={() => addDigit('2')} />
      <Button label="3" onClick={() => addDigit('3')} />
      <Button label="+" onClick={() => addOperation('+')} kind="operation" />
      <Button label="0" onClick={() => addDigit('0')} kind="double" />
      <Button label="." onClick={() => addDigit('.')} />
      <Button label="=" onClick={() => addOperation('=')} kind="operation" />
    </div>
  )
}