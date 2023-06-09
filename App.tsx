
import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import RNBootSplash from 'react-native-bootsplash';

function App(): JSX.Element {
 

  const [result, setResult] = useState<string>('0');
  const [expression, setExpression] = useState<string>('');
  const [operator,setOperator] = useState<string>('');
  const [updated,setUpdated] = useState<string>('');

  useEffect(() => {
    let x = setTimeout(() => {
      RNBootSplash.hide({fade: true});
    }, 1000);

    return ()=> clearInterval(x);
  }, []);


  useEffect(()=>{                                                                             //Real Time Expression Handler

    if(expression.length>1){
      let last = expression.charAt(expression.length-1);
      if(last==='+'||last==='-'||last==='*'||last==='.'||last==='/'||last==='%'){
        setOperator(expression.charAt(expression.length-1));
        const value = eval(expression.slice(0,-1));
        setUpdated(value?value:0);
        return;
      }
    }
    const value = eval(expression);
    if(value) {
      setUpdated(value.toString());
    }
    else{
      setUpdated('')
    }
    
  },[result,expression]);


  const handleNumberPress = (num:string) => {

    if(result==='0' && num==='0') return;
    setOperator('');                           //Activate Operator Again

    if (result === '0') {
      setResult(num.toString());
      setExpression(expression + num.toString());

    } else if(result.length<12) {                               //Limiting Length
      setResult(result + num.toString());
      setExpression(expression + num.toString());
    }

  };

  const handleOperatorPress = (value:string) => {

    if(expression==='') return 

    if(operator===''){
      setOperator(value);                         //Disable Operator unless changed
      setExpression((expression)=> expression + value);
      setResult('0');
    }
    else if(value!=='' && value!==operator){              //Replace Operator
      setExpression((k)=> k.slice(0,-1)+value);
      setResult('0');

    }
  };

  const handleEvaluation = ():string =>{
    if(expression.length>1){
      let temp:string='';
      let last = expression.charAt(expression.length-1);

      if(last==='+'||last==='-'||last==='*'||last==='.'||last==='/'||last==='%'){                 //Handling case if expression ended with a symbol
        temp = expression+'0';
      }
      const res = eval(temp!==''?temp:expression);
      return res;       
      }   
      else{
        return '';
      }        

  }

  const handleEqualsPress = () => {
    const finalValue = handleEvaluation();
    setExpression(finalValue.toString());  
  };

 

  const handleDecimalPress = () => {
    if (result.includes('.')) return 
    setResult(result + '.');

    let expressionCheck = expression.split('+' || '-' || '*' || '/' || '%');
    if(expressionCheck.length===1 && expression[0].includes('.')) return;

    setExpression(result==="0" ? expression+'0.' : expression+'.');                   //DEcimal Handler

  };


  const handleClearPress = () => {
    setResult('0');
    setExpression('');
    setUpdated('');
  };


  const handleRemovePress = () =>{
    if(expression.length>0){
      setResult(result.slice(0, -1));
      setExpression(expression.slice(0,-1));
    }

  }


  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.resultContainer} contentContainerStyle={{ flexGrow: 1, justifyContent: 'flex-end', alignItems: 'flex-end',}}>
          <Text style={[styles.resultText]}>{expression===''?0:expression}</Text>
      </ScrollView>

      <View >
          <Text style={[{fontSize:28,color:'gray',alignSelf:'flex-end',margin:30}]}>{updated}</Text>

      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => handleClearPress()}>
          <Text style={[styles.oButtonText,{fontSize:28}]}>C</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => handleRemovePress()}>
          <Text style={[styles.oButtonText,{fontSize:28}]}>R</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => handleOperatorPress('/')}>
          <Text style={styles.oButtonText}>/</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => handleOperatorPress('%')}>
          <Text style={styles.oButtonText}>%</Text>
        </TouchableOpacity>
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
          <Text style={styles.oButtonText}>*</Text>
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
          <Text style={styles.oButtonText}>-</Text>
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
          <Text style={styles.oButtonText}>+</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => handleNumberPress('3.14')}>
          <Text style={styles.buttonText}>π</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => handleNumberPress('0')}>
          <Text style={styles.buttonText}>0</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() =>handleDecimalPress()}>
          <Text style={styles.buttonText}>.</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button,{backgroundColor:'#936CFE'}]} onPress={() => handleEqualsPress()}>
          <Text style={[styles.oButtonText,{color:"white"}]}>=</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
      )
    
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  resultContainer: {
    flex: 1,
    // justifyContent: 'flex-end',
    // alignItems: 'flex-end',
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
    backgroundColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 30,
    padding:10,
    color: 'lightgray',
  },
  oButtonText: {
    fontSize: 30,
    padding:10,
    color: '#936CFE',
  },
  clearButton: {
    backgroundColor: '#EB3B5A',
  },
  clearButtonText: {
    color: 'white',
  },
});



export default App;
