import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './index';

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export function useCalculator() {
  const displayValue = useAppSelector((state) => state.calculator.displayValue);
  const history = useAppSelector((state) => state.calculator.history);
  const dispatch = useAppDispatch();

  return {
    displayValue,
    history,
    setDisplayValue: (value: string) => dispatch({ type: 'calculator/setDisplayValue', payload: value }),
    addToHistory: (item: any) => dispatch({ type: 'calculator/addToHistory', payload: item }),
    clearHistory: () => dispatch({ type: 'calculator/clearHistory' }),
  };
}
