import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from './index';
export const useAppSelector = useSelector;
export const useAppDispatch = () => useDispatch<AppDispatch>();