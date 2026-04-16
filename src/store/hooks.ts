import { useSelector, useDispatch } from 'react-redux';
import type { AppDispatch, RootState } from './store';

const useAppDispatch = () => useDispatch<AppDispatch>();
const useAppSelector = useSelector.withTypes<RootState>();
export { useAppDispatch, useAppSelector };
