import React, { useState } from "react";
import './assets/styles/App.css';


export default function App () {

    let [equation, setEquation] = useState([]);
    let [result, setResult] = useState(0);

    const numButtons = [1,2,3,4,5,6,7,8,9,"+/-",0,","];
    const opButtons = ["/", "x", "+", "-"];

    let handleButton = (e) => { setEquation([...equation, e.target.value]) };

    let parseEquation = () => {
        let arr = [], num = '';

        for (let i = 0; i < equation.length; i++) {
        
            if (!opButtons.includes(equation[i])) {
                if (!(i+1 === equation.length-1)) num = num.concat(equation[i])
                else {
                    num = num.concat(equation[i], equation[i+1]);
                    arr.push(parseInt(num));
                    break;
                }
            } else {
                if (i+1 === equation.length-1) {
                    arr.push(parseInt(num), equation[i], parseInt(equation[i+1]))
                    break;
                } else {
                    arr.push(parseInt(num), equation[i])
                    num = '';
                }
            }
        }
        console.log(arr)
        return arr;
    };

    let handleEquation = (arr) => {
        let result = arr[0]
        for (let i = 0; i < arr.length; i++) {
            if (typeof arr[i] === 'string') {
                if (arr[i] === '+') result += arr[i+1]
                else if (arr[i] === '-') result -= arr[i+1]
                else if (arr[i] === '/') result /= arr[i+1]
                else if (arr[i] === 'x') result *= arr[i+1]
            }
        }

        return result;
    };

    let handleClear = () => { setEquation([]); setResult(0) }

    let submit = () => {
        let res;
        if (equation.length === 0) res = 0;
        else if (equation.length === 1) res = parseInt(equation[0]);
        else {
            let equationArr = parseEquation();
            res = handleEquation(equationArr);    
        }
        setResult(res);
    };

    return (
        <>

            {/* CALCULATOR */}
            <div className="calculator">
                {/* Display Data */}
                <div className="calculatorDisplayData">{result}</div>
                {/* Calculator */}
                <div className="calculatorContent">
                    {/* flex column (numbers) */}
                    <div className="calculatorContentLeft">
                        {
                            numButtons.length && numButtons.map(
                                (number, index) => <button key={index} className={`i${index+1}`} value={typeof number === 'string'? -1 : number} onClick={handleButton}>{number}</button>
                            )
                        }
                    </div>
                    {/* flex column (operators) */}
                    <div className="calculatorContentRight">
                        {
                            opButtons.length && opButtons.map(
                                (op, index) => <button key={index} value={op} onClick={handleButton} disabled={!equation.length? true : false}>
                                    {`${op}`}
                                </button>
                            )
                        }
                    </div>
                </div>
                <button className="submitButton" onClick={submit}>enter</button>
                <button className="submitButton" onClick={handleClear}>clear</button>
            </div>
        </>
    );
};