import {ActivityIndicator, Image, Text, View} from 'react-native';
import React from 'react';
import {useSelector} from 'react-redux';
import {SafeAreaView} from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {styles} from './Styles';
import RowItem from '../components/RowItem';
import {formattedDate} from '../Theme/Utils';

const Details = ({navigation}: any) => {
  const {dayLoading, dayForecast, dayCurrent, dayError, city} = useSelector(
    (state: any) => state.weather,
  );
  const [weatherJSON = {}] = dayForecast || [];
  const {astro, date} = weatherJSON;
  return (
    <SafeAreaView style={styles.container}>
      <View style={{flexDirection: 'row', alignItems: 'center', gap: 30}}>
        <Ionicons
          name="arrow-back"
          size={42}
          style={styles.back}
          onPress={() => navigation.navigate('HomeTab')}
        />
        <Text style={styles.cityName}>Details</Text>
      </View>
      {dayLoading && <ActivityIndicator size="large" color="#0000ff" />}
      {astro && (
        <View style={styles.cityContainer}>
          <View style={styles.rowStyle}>
            <Text style={styles.date}>{formattedDate(date)}</Text>
            <Text style={styles.cityName}>{city}</Text>
            <Image
              source={{uri: `https:${dayCurrent.condition.icon}`}}
              width={50}
              height={50}
              style={{alignSelf: 'flex-end'}}
            />
          </View>
          <RowItem leftText="Condition" rightText={dayCurrent.condition.text} />
          <RowItem
            leftText={'Temperature: °C/°F'}
            rightText={`${dayCurrent.temp_c}/${dayCurrent.temp_f}`}
          />
          <RowItem leftText={'Sun rise:'} rightText={astro.sunrise} />
          <RowItem leftText={'Sun set:'} rightText={astro.sunset} />
          <RowItem leftText={'Moon rise:'} rightText={astro.moonrise} />
          <RowItem leftText={'Moon set:'} rightText={astro.moonset} />
        </View>
      )}
    </SafeAreaView>
  );
};

export default Details;
