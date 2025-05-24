import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {styles} from './Styles';
import {RadioButton} from 'react-native-paper';
import {useSelector} from 'react-redux';
import {useAppDispatch} from '../customHooks/hooks';
import {SET_TEMP_TYPE} from '../redux/reducers';
import {categories} from '../Theme/constants';

const Settings = () => {
  const {temperatureType} = useSelector((state: any) => state.weather);
  const dispatch = useAppDispatch();

  const renderItem = ({item}: any) => (
    <TouchableOpacity style={styles.categoryItemView}>
      <Text style={styles.category}>{item}</Text>
    </TouchableOpacity>
  );
  return (
    <SafeAreaView style={[styles.container]}>
      <View style={styles.tempSelectView}>
        <Text style={styles.cityName}>Temperature Type</Text>
        <RadioButton.Group
          onValueChange={value => {
            dispatch(SET_TEMP_TYPE(value));
          }}
          value={temperatureType}>
          <RadioButton.Item label="Celsius" value="C" />
          <RadioButton.Item label="Fahrenheit" value="F" />
        </RadioButton.Group>
      </View>
      <View style={styles.tempSelectView}>
        <Text style={styles.cityName}>Categories</Text>
        <FlatList
          data={categories}
          keyExtractor={item => item}
          renderItem={renderItem}
          numColumns={2}
        />
      </View>
    </SafeAreaView>
  );
};

export default Settings;
