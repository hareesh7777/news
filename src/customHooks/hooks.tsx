import {useDispatch, useSelector} from 'react-redux';
// Update the import path if your store file is located elsewhere, for example:
import type {RootState, AppDispatch} from '../redux/store';
// Or create a 'store.ts' file in the same directory that exports RootState and AppDispatch types.

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
