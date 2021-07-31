import * as React from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';

import firebase from '@firebase/app';
import 'firebase/auth';

export default class App extends React.Component{


constructor(){
super();
this.state = {

password:"",
emailid:[]

}
}

login=async(email, password)=>{
await firebase.auth().signInWithEmailAndPassword(email, password)
  .then((userCredential) => {
    // Signed in
    var user = userCredential.user;
    this.props.navigation.navigate("class2")
    // ...
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
	if(errorCode === "auth/wrong-password"){
		alert("The entered password is wrong!")
		console.log("The entered password is wrong!")
	}
  });



}

render(){

return(

<View>
<Text style = {styles.heading}>Login</Text>
<TextInput placeholder="Enter The Email ID"
	                    onChangeText= {(word)=>{                        
	                        this.setState({
	                            emailid: word
	                        })  
	                    }}
	                    placeholderTextColor=''
	                    value={this.state.emailid}
	                    style={styles.textInput}/>

<TextInput placeholder="Enter The Password"
	                    onChangeText= {(word)=>{                        
	                        this.setState({
	                            password: word
	                        })  
	                    }}
	                    placeholderTextColor=''
	                    value={this.state.password}
	                    style={styles.textInput}/>

<TouchableOpacity onPress = {()=>this.login(this.state.emailid, this.state.password)} style = { styles.button }>
                       
                      <Text style = {[ styles.text, { color:"white" } ]}>Go!</Text>
                      
                      </TouchableOpacity>
</View>

)

}
  

}

const styles = StyleSheet.create({

heading:{

color:"#661111",
alignSelf:"center",
fontSize:40,
fontFamily:"cursive"

},

textInput:{

borderWidth:3,
borderRadius:20,
width:200, 
marginTop:50,
alignSelf:"center",
textAlign:"center",
fontFamily:"cursive"

},

image:{

alignSelf:"center",
marginTop:50

},

text:{

textAlign:"center",
fontFamily:"cursive",
color:"#661111",

},

button:{

marginTop:50,
alignSelf:"center",
backgroundColor:"#661111",
width:100,
height:30,
borderRadius:50,
justifyContent:"center"

}

})
