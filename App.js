import * as React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { createAppContainer,createSwitchNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import WriteStoryScreen from "./Screens/WriteStoryScreen";
import ReadStoryScreen from "./Screens/ReadStoryScreen";
import Login from "./Screens/Login";

export default class App extends React.Component {

  render() {

    return (

      <Container>
      </Container>

    )

  }


}

var routes = createBottomTabNavigator({

  ReadStoryScreen: { screen: ReadStoryScreen },
  WriteStoryScreen: { screen: WriteStoryScreen },

}

,
{
  defaultNavigationOptions: ({navigation})=>({
    tabBarIcon: ()=>{
      const routeName = navigation.state.routeName;
     
      if(routeName === "ReadStoryScreen"){
        return(
          <Image
          source={require("./assets/read.png")}
          style={{width:40, height:40}}
        />
        )
        
      }
      else if(routeName === "WriteStoryScreen"){
        return(
          <Image
          source={require("./assets/write.png")}
          style={{width:40, height:40}}
        />)
        
        
      }
    }
  })
}

);

var routes1 = createSwitchNavigator({ 

  class1:Login,
  class2:routes,
  
  
});
  
  var Container = createAppContainer(routes1);