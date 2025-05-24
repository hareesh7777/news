import {
  View,
  Text,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  Image,
  ImageBackground,
  Linking,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  fetchCurrentWeather,
  fetchDayWeather,
  getNews,
} from '../redux/weatherApi';
import {useDispatch, useSelector} from 'react-redux';
import {styles} from './Styles';
import {moderateScale, scale} from '../Theme/scale';
import {useAppDispatch} from '../customHooks/hooks';
import {formattedDate} from '../Theme/Utils';
import Toast from 'react-native-simple-toast';

const Home = ({navigation}: any) => {
  const dispatch = useAppDispatch();
  const {
    data,
    temperatureType: tempType,
    city,
    forecast,
    loading,
    news,
    newsError,
  } = useSelector((state: any) => state.weather);

  useEffect(() => {
    dispatch(
      getNews({temp: data?.current?.temp_c, country: 'us', categories: 'all'}),
    );
  }, [data?.current?.temp_c]);

  const handleDayForecast = (date: any) => {
    dispatch(fetchDayWeather({cityName: city, date: date}));
    navigation.navigate('Details');
  };

  const weatherRender = ({item}: any) => (
    <TouchableOpacity
      style={styles.forecastItem}
      onPress={() => {
        handleDayForecast(item.date);
      }}>
      <ImageBackground
        source={{
          uri: `https:${item?.day?.condition?.icon}`,
        }}
        style={styles.weatherImage}>
        <Text style={styles.date}>{formattedDate(item.date)}</Text>
        <Text style={styles.condition}>{item.day.condition.text}</Text>

        <Text style={styles.temperature}>
          {tempType === 'C'
            ? `${item.day.maxtemp_c}°C`
            : `${item.day.maxtemp_f}°F`}
        </Text>
      </ImageBackground>
    </TouchableOpacity>
  );
  const openURL = async (url: any) => {
    try {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        Toast.show('Invalid URL' + url, 2000);
      }
    } catch (err) {
      Toast.show('Failed to open the link.', 2000);
    }
  };

  const newsRender = ({item}: any) => (
    <View style={styles.newsItem}>
      <Image
        source={{
          uri: item.urlToImage,
        }}
        style={styles.newsImage}
        defaultSource={require('../assets/images/news.png')}
        resizeMode="cover"
        onError={() => <Image source={require('../assets/images/news.png')} />}
      />
      <View style={styles.newsContent}>
        <Text style={styles.newsTitle}>{item.title}</Text>
        <Text>{item.description?.trim()}</Text>
        <Text style={styles.linkText} onPress={() => openURL(item?.url)}>
          See full article....
        </Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {loading && !data && <ActivityIndicator size="large" color="#0000ff" />}
      {/* {error && <Text style={styles.error}>{error}</Text>} */}
      {data && (
        <View style={styles.cityContainer}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text style={styles.cityName}>{city}</Text>
            <ImageBackground
              source={{uri: `https:${data.current.condition.icon}`}}
              style={{
                width: moderateScale(100),
                justifyContent: 'center',
                height: moderateScale(100),
                alignItems: 'center',
              }}>
              <Text style={styles.condition}>
                {data.current.condition.text}
              </Text>
              <Text style={styles.temperature}>
                {tempType === 'C'
                  ? `${data.current.temp_c}°C`
                  : `${data.current.temp_f}°F`}
              </Text>
            </ImageBackground>
          </View>
        </View>
      )}
      {forecast && (
        <View>
          <Text style={styles.forecastTitle}>
            {forecast?.length || 3}-Days Forecast
          </Text>
          {loading && !forecast && (
            <ActivityIndicator size="large" color="#0000ff" />
          )}
          <FlatList
            data={forecast}
            keyExtractor={item => item.date}
            showsVerticalScrollIndicator={false}
            renderItem={weatherRender}
            horizontal
            ItemSeparatorComponent={() => <View style={{width: scale(10)}} />}
          />
        </View>
      )}

      {news && (
        <View>
          <Text style={styles.forecastTitle}>News</Text>
          {/* {newsLoading && <ActivityIndicator size="large" color="#0000ff" />} */}
          <FlatList
            data={news}
            keyExtractor={item => item.publishedAt.toString()}
            showsVerticalScrollIndicator={false}
            renderItem={newsRender}
            contentContainerStyle={{paddingBottom: 100}}
            ListEmptyComponent={() => (
              <Text style={styles.error}>No news available</Text>
            )}
            onEndReachedThreshold={0.5}
            maxToRenderPerBatch={10}
            initialNumToRender={10}
            ListFooterComponent={() => <View style={{height: scale(200)}} />}
            ItemSeparatorComponent={() => <View style={{height: scale(10)}} />}
          />
        </View>
      )}
      {newsError && <Text style={styles.error}>{newsError}</Text>}
    </SafeAreaView>
  );
};

export default Home;
