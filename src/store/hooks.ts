import { useSelector, useDispatch } from 'react-redux';
import type { AppDispatch, RootState } from './index';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector = useSelector.withRootState<RootState>();