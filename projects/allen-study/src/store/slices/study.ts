import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Course {
  id: string;
  title: string;
  description: string;
  progress: number;
}

interface StudyState {
  courses: Course[];
  activeCourseId: string | null;
}

const initialState: StudyState = {
  courses: [
    { id: '1', title: 'Physics', description: 'Mechanics and Thermodynamics', progress: 65 },
    { id: '2', title: 'Chemistry', description: 'Organic and Inorganic', progress: 40 },
    { id: '3', title: 'Mathematics', description: 'Calculus and Algebra', progress: 80 },
  ],
  activeCourseId: null,
};

const studySlice = createSlice({
  name: 'study',
  initialState,
  reducers: {
    setActiveCourse: (state, action: PayloadAction<string>) => {
      state.activeCourseId = action.payload;
    },
    updateProgress: (state, action: PayloadAction<{ courseId: string; progress: number }>) => {
      const course = state.courses.find(c => c.id === action.payload.courseId);
      if (course) {
        course.progress = action.payload.progress;
      }
    },
  },
});

export const { setActiveCourse, updateProgress } = studySlice.actions;
export default studySlice.reducer;
