import React, {useState} from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native'
import { Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useToast } from "react-native-toast-notifications";

import FilterSearchModal from './FilterSearchModal';

const SearchContainer = ({navigation}) => {
  const toast = useToast();

  const [modalVisible, setModalVisible] = useState(false);
  const [missionName, setMissionName] = useState('');

  const onSearch = () => {
    if (missionName.trim() === "")
      toast.show("Please enter something");
    else 
      navigation.navigate('Mission', {
        missionName: missionName
      });

    setMissionName('')
  }

  return (
    <View style={styled.container}>
      
      <FilterSearchModal 
        modalVisible={modalVisible} 
        setModalVisible={setModalVisible} 
        navigation={navigation}
      />
      
      <Text style={styled.titleHeader}>Let's find a rocket for you</Text>
      <View style={styled.inputContainer}>
        <Ionicons name="search-outline" size={20} color="black" />
        <TextInput
          style={styled.input}
          selectionColor={'black'}
          placeholder={'Search past launches here!'}
          onChangeText={missionName => setMissionName(missionName)}
          defaultValue={missionName}
          onSubmitEditing={onSearch}
        />
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Ionicons name="options-outline" size={25} color='black' style={{marginLeft: 30}} />
        </TouchableOpacity>
      </View>

    </View>
  )
}

const styled = StyleSheet.create({
  container: {
    flex: 2,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    width: Dimensions.get('window').width,
    paddingHorizontal: 30,
  },
  titleHeader: {
    fontSize: 35,
    fontWeight: "700"
  },
  inputContainer: {
    width: "100%",
    marginTop: 30,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: 'lightgrey',
  },
  input: {
    height: 40,
    width: "70%",
    fontSize: 15,
    marginLeft: 20,
    fontWeight: "700",
  },
})

export default SearchContainer
