import React, { Component } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, ImageBackground, Image, ScrollView, FlatList } from 'react-native';
import { SearchBar } from 'react-native-elements';

import db from '../config';
import StoryComponent from '../Components/StoryComponent'

export default class ReadStoryScreen extends Component {

    constructor() {
        super()
        this.state = {
            search: '',
            stories: [],
            allData:[],
            dataSource:[],            
        }
    }

    
  componentDidMount(){
    this.retrieveStories()
  }

  updateSearch = search => {
    this.setState({ search });
  };


  retrieveStories=()=>{
    try {
      var allData= []
      var stories = db.collection("stories")
        .get().then((querySnapshot)=> {
          querySnapshot.forEach((doc)=> {
              // doc.data() is never undefined for query doc snapshots
             
              allData.push(doc.data())
             
          })
          this.setState({allData})
          console.log(this.state.allData)
        })
    }
    catch (error) {
      console.log(error);
    }
  };


  SearchFilterFunction(text) {
    //passing the inserted text in textinput
    const newData = this.state.allData.filter((item)=> {
      //applying filter for the inserted text in search bar
     const itemData = item.title ? item.title.toUpperCase() : ''.toUpperCase();
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    this.setState({
      //setting the filtered newData on datasource
      //After setting the data it will automatically re-render the view
      dataSource: newData,
      search: text,
    });
  }

    renderItemComponent = (data) => {

        console.log(data)

        return (
            <View>
                <StoryComponent story={data.item} />
            </View>
        )

    }

    ItemSeparator = () => <View style={{
        height: 2,
        backgroundColor: "pink",
        borderColor:"pink",        
        marginLeft: 10,
        marginRight: 10,
    }}
    />

    render() {
        return (
            <View>
                <Text style={styles.heading}>ReadStoryScreen</Text>
                <SearchBar
                    placeholder="Type Here..."                                        
                    containerStyle={styles.searchBox}
                    inputContainerStyle={styles.searchBoxIn}
                    onChangeText={text => this.SearchFilterFunction(text)}
                    onClear={text => this.SearchFilterFunction('')}
                    value={this.state.search}
                />


                <FlatList
                    data={this.state.search === "" ?  this.state.allData: this.state.dataSource}
                    renderItem={item => this.renderItemComponent(item)}
                    keyExtractor={item => item.title}
                    ItemSeparatorComponent={this.ItemSeparator}                    
                />



            </View >
        )
    }
}


const styles = StyleSheet.create({

    touchableOpacity: {

        alignSelf: 'center',
        backgroundColor: "pink",
        width: 100,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 50,
        borderRadius: 50

    },

    heading: {

        color: "pink",
        alignSelf: "center",
        fontSize: 40,
        marginTop: 30,

    },

    textInput: {

        borderWidth: 3,
        borderRadius: 20,
        borderColor: "#99FF99",
        width: 200,
        marginTop: 50,
        alignSelf: "center",
        textAlign: "center",

    },
    searchBox: {

        marginTop: 20,
        backgroundColor: "pink"

    },

    searchBoxIn: {

        backgroundColor: "pink"

    },

    bg: {

        flex: 1,
        resizeMode: 'cover'
    },

    text: {

        color: "#000000",
        fontSize: 20,
        textAlign: 'center',
        justifyContent: 'center'
    }
})
