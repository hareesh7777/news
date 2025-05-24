import Geolocation from '@react-native-community/geolocation';
import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {getNewsKeywords} from '../Theme/Utils';
import {apiKey, NEWSAPI_KEY, weatherURL} from '../Theme/constants';

// Define GeolocationPosition type for React Native
type GeolocationPosition = {
  coords: {
    latitude: number;
    longitude: number;
    altitude?: number | null;
    accuracy: number;
    altitudeAccuracy?: number | null;
    heading?: number | null;
    speed?: number | null;
  };
  timestamp: number;
};

export const fetchCurrentWeather = createAsyncThunk(
  'weather/fetchCurrent',
  async (
    {days = 5, cityName}: {days?: number; cityName?: string},
    {rejectWithValue},
  ) => {
    try {
      const {coords} = await new Promise<GeolocationPosition>(
        (resolve, reject) => {
          Geolocation.getCurrentPosition(resolve, reject);
        },
      );
      const {latitude, longitude} = coords;
      console.log('Location:', coords);

      const response = await axios.get(
        `${weatherURL}forecast.json?q=${
          cityName ? cityName : `${latitude},${longitude}`
        }&days=${days}&alerts=Enable&aqi=Enable&key=${apiKey}`,
      );

      return response.data;
    } catch (error: any) {
      console.error('Failed to fetch weather data:', error);
      return rejectWithValue(error.message);
    }
  },
);

export const fetchDayWeather = createAsyncThunk(
  'weather/fetchDay',
  async (
    {days = 5, cityName, date}: {days?: number; cityName?: string; date: Date},
    {rejectWithValue},
  ) => {
    try {
      const response = await axios.get(
        `${weatherURL}forecast.json?q=${cityName}&days=${days}&dt=${date}&alerts=Enable&aqi=Enable&key=${apiKey}`,
      );

      return response.data;
    } catch (error: any) {
      console.error('Failed to fetch weather data:', error);
      return rejectWithValue(error.message);
    }
  },
);

export const getNews = createAsyncThunk(
  'wether/news',
  async ({
    temp,
    country,
    categories = 'all',
  }: {
    temp: any;
    country: any;
    categories?: any;
  }) => {
    try {
      const response = await axios.get(
        `https://newsapi.org/v2/top-headlines?country=${country}&q=${getNewsKeywords(
          temp,
        )}&categories=${categories}&apiKey=${NEWSAPI_KEY}`,
      );
      console.log('News API response:', response.data);
      return response.data.articles;
    } catch (error) {
      console.error('News API error:', error);
    }
  },
);
