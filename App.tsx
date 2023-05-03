
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';


function App(): JSX.Element {
 

  const [result, setResult] = useState('0');
  const [expression, setExpression] = useState('');
  const [operator,setOperator] = useState('');


  useEffect(()=>{
    console.log(expression);
  },[expression]);

  const handleNumberPress = (num) => {
    setOperator('');
    if (result === '0') {
      setResult(num.toString());
    } else {
      setResult(result + num.toString());
    }
    setExpression(expression + num.toString());
  };

  const handleOperatorPress = (val) => {
    if(operator===''){
      setOperator(val);
      setExpression((expression)=> expression + val);
      setResult('0');
    }
    else if(val!=='' && val!==operator){
      setExpression((k)=> k.slice(0,-1)+val);
      setResult('0');

    }
  };

  const handleEqualsPress = () => {
    const res = eval(expression);
    // setResult(res.toString());
    setExpression(res.toString());
  };

  const handleClearPress = () => {
    setResult('0');
    setExpression('');
  };


  const handleDecimalPress = () => {
    if (result.includes('.')) return 
    setResult(result + '.');
    setExpression(expression+'.');

  };

  return (
    <View style={styles.container}>
      <View style={[styles.resultContainer]}>
        <Text style={styles.resultText}>{expression}</Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => handleNumberPress('7')}>
          <Text style={styles.buttonText}>7</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => handleNumberPress('8')}>
          <Text style={styles.buttonText}>8</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => handleNumberPress('9')}>
          <Text style={styles.buttonText}>9</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => handleOperatorPress('*')}>
          <Text style={styles.buttonText}>*</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => handleNumberPress('4')}>
          <Text style={styles.buttonText}>4</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => handleNumberPress('5')}>
          <Text style={styles.buttonText}>5</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => handleNumberPress('6')}>
          <Text style={styles.buttonText}>6</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => handleOperatorPress('-')}>
          <Text style={styles.buttonText}>-</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => handleNumberPress('1')}>
          <Text style={styles.buttonText}>1</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => handleNumberPress('2')}>
          <Text style={styles.buttonText}>2</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => handleNumberPress('3')}>
          <Text style={styles.buttonText}>3</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => handleOperatorPress('+')}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => handleClearPress()}>
          <Text style={styles.buttonText}>C</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => handleNumberPress('0')}>
          <Text style={styles.buttonText}>0</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() =>handleDecimalPress()}>
          <Text style={styles.buttonText}>.</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => handleEqualsPress()}>
          <Text style={styles.buttonText}>=</Text>
        </TouchableOpacity>
      </View>
    </View>
      )
    
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  resultContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    paddingRight: 10,
    paddingBottom: 10,
  },
  resultText: {
    fontSize: 48,
    color: 'white',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingBottom: 20,
    paddingHorizontal: 10,
  },
  button: {
    borderRadius: 50,
    width: 60,
    height: 60,
    backgroundColor: '#41444B',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 32,
    color: 'white',
  },
  clearButton: {
    backgroundColor: '#EB3B5A',
  },
  clearButtonText: {
    color: 'white',
  },
});



export default App;
