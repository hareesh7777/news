import {Platform, Alert} from 'react-native';
import {PERMISSIONS, RESULTS, check, request} from 'react-native-permissions';
import Toast from 'react-native-simple-toast';

const requestLocation = async () => {
  const permissionType =
    Platform.OS === 'ios'
      ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
      : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION;

  try {
    const result = await check(permissionType);

    if (result === RESULTS.DENIED) {
      const permissionRequestResult = await request(permissionType);

      if (permissionRequestResult === RESULTS.GRANTED) {
        // Location permission granted
        return true;
      } else {
        // Location permission denied
        Toast.show(
          'Location permission is required to access this feature.',
          2000,
        );
        return false;
      }
    } else {
      // Location permission already granted
    }
  } catch (error) {
    console.error('Error checking or requesting location permission:', error);
  }
};

export default requestLocation;
