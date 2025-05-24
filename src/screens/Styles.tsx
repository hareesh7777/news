import {StyleSheet} from 'react-native';
import {colors} from '../Theme/colors';
import {moderateScale, scale, verticalScale} from '../Theme/scale';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: moderateScale(16),
    backgroundColor: colors.bgGrey,
    gap: scale(10),
  },
  input: {
    marginBottom: 10,
    paddingHorizontal: 8,
  },
  cityContainer: {
    backgroundColor: colors.skeletonbg,
    padding: 10,
    borderRadius: 10,
    gap: 10,
  },
  weatherContainer: {
    marginTop: 16,
  },
  cityName: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  temperature: {
    fontSize: 20,
    textAlign: 'right',
  },
  condition: {
    fontSize: 16,
  },
  forecastTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 16,
  },
  forecastItem: {
    marginTop: 8,
    backgroundColor: colors.white,
    padding: 10,
    borderRadius: 10,
    gap: 5,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  date: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  error: {
    color: 'red',
    marginTop: 16,
  },
  weatherImage: {
    width: moderateScale(90),
    height: moderateScale(90),
    alignItems: 'center',
    justifyContent: 'center',
  },
  newsItem: {
    backgroundColor: colors.white,
    padding: 10,
    borderRadius: 10,
    gap: 5,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  newsTitle: {
    fontSize: scale(14),
    fontWeight: 'bold',
    flex: 1,
  },
  newsImage: {
    // flex: 1,
    width: moderateScale(100),
    height: verticalScale(120),
    borderRadius: 10,
    overflow: 'hidden',
  },
  newsContent: {
    width: moderateScale(220),
    justifyContent: 'center',
  },
  linkText: {
    color: colors.blueLight,
    fontSize: scale(12),
    marginTop: 5,
  },
  back: {
    color: colors.black,
    fontSize: 30,
  },
  rowStyle: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  tempSelectView: {
    backgroundColor: colors.skeletonbg,
    padding: moderateScale(10),
    borderRadius: scale(10),
  },
  category: {
    fontSize: scale(16),
    padding: moderateScale(10),
    color: colors.black,
    borderWidth: 1,
    borderRadius: scale(10),
  },
  categoryItemView: {
    flex: 1,
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: moderateScale(5),
  },
});
