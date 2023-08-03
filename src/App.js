import { useReducer } from 'react';
import './App.css';
import './styles.css'
import DigitButton from './DigitButton';
import OperationButton from './OperationButton';

export const ACTIONS = {
  ADD_DIGIT: 'add-digit',
  CHOOSE_OPERATION: 'choose-operation',
  CLEAR: 'clear',
  DELETE_DIGIT: 'delete-digit',
  EVALUATE: 'evaluate'

};


function reducer(state, {type, payload}) {
  switch(type) {
    case ACTIONS.ADD_DIGIT:
      /* below: if zero is the first number, you cannot add anymore zeros */
      if (payload.digit === '0' && state.currentOperand === '0') return state
      /* below: you cannot add a period if there's already a period in the current operand */
      if (payload.digit === '.' && state.currentOperand.includes(".")) return state


      return {
        ...state, 
        currentOperand: `${state.currentOperand || ""}${payload.digit}`,
      }

    case ACTIONS.CHOOSE_OPERATION:
            /* below: if there's nothing in current or prev operand, operations cannot be ran */
      if (state.currentOperand == null && state.previousOperand == null) { 
        return state
      };

      /* below: if previous operand is empty, and you choose an operation whereas you have a current operand, the current operand will be moved to previous to make room for current operation */
      if (state.previousOperand == null) {
        return {
          ...state,
          operation: payload.operation,
          previousOperand: state.currentOperand,
          currentOperand: null
        }
      }; 

      if (state.currentOperand == null) {
        return {
          ...state,
          operation: payload.operation
        }
      }

      return {
        ...state,
        previousOperand: evaluate(state),
        operation: payload.operation,
        currentOperand: null,
      }

      /* below: clears entire currentoperand */
    case ACTIONS.CLEAR:
      return {}
  };
};

      /* below:  */

      function evaluate({ currentOperand, previousOperand, operation }) {
        const prev = parseFloat(previousOperand)
        const current = parseFloat(currentOperand)
        if (isNaN(prev) || isNaN(current)) return ""
        let computation = ""
        switch (operation) {
          case "+":
            computation = prev + current
            break
          case "-":
            computation = prev - current
            break
          case "*":
            computation = prev * current
            break
          case "÷":
            computation = prev / current
            break
        }
      
        return computation.toString()
      }
       
function App() {
  const [{currentOperand, previousOperand, operation}, dispatch] = useReducer(reducer,
    {})




  return (
    <div className="calculator-grid"> 
      <div className='output'>
        <div className='previous-operand'>
          {previousOperand} {operation}
        </div>
        <div className='current-operand'>
          {currentOperand}
        </div>
      </div>


      <button 
        className='span-two'
        onClick={() => dispatch({ type: ACTIONS.CLEAR })}>
        AC 
      </button>
      <button>
        DEL
      </button>

      <OperationButton operation="÷" dispatch={dispatch} />

      <DigitButton digit="1" dispatch={dispatch}/>
      <DigitButton digit="2" dispatch={dispatch}/>
      <DigitButton digit="3" dispatch={dispatch}/>
      <OperationButton operation="x" dispatch={dispatch} />
      <DigitButton digit="4" dispatch={dispatch}/>
      <DigitButton digit="5" dispatch={dispatch}/>
      <DigitButton digit="6" dispatch={dispatch}/>
      <OperationButton operation="+" dispatch={dispatch} />
      <DigitButton digit="7" dispatch={dispatch}/>
      <DigitButton digit="8" dispatch={dispatch}/>
      <DigitButton digit="9" dispatch={dispatch}/>
      <OperationButton operation="-" dispatch={dispatch} />
      <DigitButton digit="." dispatch={dispatch}/>
      <DigitButton digit="0" dispatch={dispatch}/>
      <button className='span-two'>=</button>

    </div>
    
  );
};

export default App;