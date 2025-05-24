import {createSlice} from '@reduxjs/toolkit';
import {fetchCurrentWeather, fetchDayWeather, getNews} from './weatherApi';

const weatherSlice = createSlice({
  name: 'Weather',
  initialState: {
    country: null,
    temperatureType: 'C',
    city: null,
    data: null,
    forecast: null,
    loading: false,
    error: null,
    dayForecast: null,
    dayCurrent: null,
    dayError: null,
    dayLoading: false,
    newsLoading: false,
    newsError: null,
    news: null,
    newsCategories: [],
  },
  reducers: {
    SET_NEWS_CATEGIRIES: (state, action) => {
      state.newsCategories = action.payload;
    },
    SET_COUNTRY: (state, action) => {
      state.country = action.payload;
    },
    SET_TEMP_TYPE: (state, action) => {
      state.temperatureType = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchCurrentWeather.pending, state => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchCurrentWeather.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.forecast = action.payload.forecast.forecastday;
      state.city = action.payload.location.name;
    });
    builder.addCase(fetchCurrentWeather.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error
        ? action.error.message
        : 'An error occurred while fetching weather data.';
    });
    builder.addCase(fetchDayWeather.pending, state => {
      state.dayLoading = true;
      state.dayError = null;
    });
    builder.addCase(fetchDayWeather.fulfilled, (state, action) => {
      state.dayLoading = false;
      state.dayCurrent = action.payload.current;
      state.dayForecast = action.payload.forecast.forecastday;
      state.dayError = null;
    });
    builder.addCase(fetchDayWeather.rejected, (state, action) => {
      state.dayLoading = false;
      state.dayError = action.error
        ? action.error.message
        : 'An error occurred while fetching day weather data.';
    });
    builder.addCase(getNews.pending, state => {
      state.newsLoading = true;
      state.newsError = null;
    });
    builder.addCase(getNews.fulfilled, (state, action) => {
      state.newsLoading = false;
      state.news = action.payload;
      state.newsError = null;
    });
    builder.addCase(getNews.rejected, (state, action) => {
      state.newsLoading = false;
      state.newsError = action.error
        ? action.error.message
        : 'An error occurred while fetching news data.';
    });
  },
});

export default weatherSlice.reducer;
export const {SET_NEWS_CATEGIRIES, SET_TEMP_TYPE} = weatherSlice.actions;
