import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect, useMemo} from 'react';
import { StyleSheet, SafeAreaView, Text, View, TouchableOpacity } from 'react-native'
import { useQuery } from 'react-apollo';
import Spinner from 'react-native-loading-spinner-overlay';
import { Ionicons } from '@expo/vector-icons';

import MissionList from './components/MissionList';
import EmptyScreen from '../EmptyScreen/EmptyScreen';
import { GET_MISSION_INFO } from '../../utils/graphql';
import FilterSearchModal from './components/FilterSearchModal';
import { Launch } from '../../interface/launchInterface';
import ErrorScreen from '../ErrorScreen/ErrorScreen';

const MissionScreen = ({route}) => {
  const { missionName } = route.params;
  const [page, setPage] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [launches, setLaunches] = useState([]);

  const nextPage = () => {
    if (data.launchesPast.length !== 0)
      setPage(page + 3);
    else 
      return
  }

  const backPage = () => {
    if (page < 1)
      return
    else
      setPage(page - 3);
  }

  const { data, loading, error } = useQuery(GET_MISSION_INFO, {
    variables: { missionName, page },
    onCompleted: setLaunches
  });

  if (loading) 
    return <Spinner
      visible={loading}
      textContent={'Loading...'}  
    />

  if (error) 
    return <ErrorScreen />

  const filteredData = (rocket, year) => {
    data.launchesPast = launches.filter(
      (launch) => launch.rocket.rocket_name === rocket && launch.launch_year === year
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />

      <FilterSearchModal
        modalVisible={modalVisible} 
        setModalVisible={setModalVisible}
        filteredData={filteredData}
      />

      <View style={styles.titleRow}>
        <TouchableOpacity onPress={backPage}>
          <Ionicons name="chevron-back-outline" size={30} color="black"/>
        </TouchableOpacity>

        <Text style={styles.titleHeader}>Missions</Text>

        <TouchableOpacity onPress={nextPage}>
          <Ionicons name="chevron-forward-outline" size={30} color="black"/>
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Text style={styles.filterText}>Filter</Text>
      </TouchableOpacity>

      {
        data.launchesPast.length !== 0 
        ? <MissionList launches={data.launchesPast} />
        : <EmptyScreen />
      }
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    paddingHorizontal: 30,
    paddingTop: 50,
  },
  titleHeader: {
    fontSize: 35,
    fontWeight: "700",
  },
  filterText: {
    color: 'black',
    fontSize: 17.5,
    fontWeight: 'bold',
    marginLeft: 20,
  },
  titleRow: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30
  }
});



export default MissionScreen
