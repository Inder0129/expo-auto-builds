import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from './index';

export const useAppSelector = <T>(selector: (state: RootState) => T) => {
  return useSelector(selector);
};

export const useAppDispatch = () => {
  return useDispatch<AppDispatch>();
};