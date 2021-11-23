import React from 'react'
import { View, StyleSheet, Text, Image } from 'react-native'

const RocketContainer = ({rocket}) => {
  return (
    <View style={styled.container}>
      <Image source={require("../../../assets/falcon1.jpeg")} style={styled.imageContainer}/>
      <View style={styled.rocketDetailsColumn}>
        <Text style={styled.rocketName}>{rocket.name}</Text>
        <Text style={{marginTop: 20}}>{rocket.country}</Text>
        <Text>Current Status: {rocket.active ? 'Active' : 'Inactive'}</Text>
      </View>
    </View>
  )
}

const styled = StyleSheet.create({
  container: {
    backgroundColor: "white",
    width: "100%",  
    borderRadius: 15,
    height: 150,
    display: 'flex',
    flexDirection: 'row',
    marginTop: 30,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  imageContainer: {
    width: "40%",
    height: "100%",
    resizeMode: 'cover',
    backgroundColor: 'lightgrey',
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,
  },
  rocketDetailsColumn: {
    display: 'flex',
    width: "55%",
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  rocketName: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#202c67',
  },
})


export default RocketContainer
