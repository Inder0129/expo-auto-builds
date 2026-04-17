import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SelectionState {
  selectedIds: string[];
  isSelectionMode: boolean;
}

const initialState: SelectionState = {
  selectedIds: ['1', '3'],
  isSelectionMode: false,
};

const selectionSlice = createSlice({
  name: 'selection',
  initialState,
  reducers: {
    toggleSelection: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      if (state.selectedIds.includes(id)) {
        state.selectedIds = state.selectedIds.filter(selectedId => selectedId !== id);
      } else {
        state.selectedIds.push(id);
      }
    },
    clearSelection: (state) => {
      state.selectedIds = [];
    },
    setSelectionMode: (state, action: PayloadAction<boolean>) => {
      state.isSelectionMode = action.payload;
    },
  },
});

export const { toggleSelection, clearSelection, setSelectionMode } = selectionSlice.actions;
export default selectionSlice.reducer;