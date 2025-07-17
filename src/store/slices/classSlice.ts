import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Class } from "../../services/classService";

interface ClassState {
  classes: Class[];
  myClasses: Class[];
  enrolledClasses: Class[];
  currentClass: Class | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: ClassState = {
  classes: [],
  myClasses: [],
  enrolledClasses: [],
  currentClass: null,
  isLoading: false,
  error: null,
};

const classSlice = createSlice({
  name: "class",
  initialState,
  reducers: {
    setClasses: (state, action: PayloadAction<Class[]>) => {
      state.classes = action.payload;
    },
    setMyClasses: (state, action: PayloadAction<Class[]>) => {
      state.myClasses = action.payload;
    },
    setEnrolledClasses: (state, action: PayloadAction<Class[]>) => {
      state.enrolledClasses = action.payload;
    },
    setCurrentClass: (state, action: PayloadAction<Class | null>) => {
      state.currentClass = action.payload;
    },
    addClass: (state, action: PayloadAction<Class>) => {
      state.classes.push(action.payload);
      state.myClasses.push(action.payload);
    },
    updateClass: (state, action: PayloadAction<Class>) => {
      const index = state.classes.findIndex(
        (c) => c._id === action.payload._id
      );
      if (index !== -1) {
        state.classes[index] = action.payload;
      }
      const myIndex = state.myClasses.findIndex(
        (c) => c._id === action.payload._id
      );
      if (myIndex !== -1) {
        state.myClasses[myIndex] = action.payload;
      }
    },
    removeClass: (state, action: PayloadAction<string>) => {
      state.classes = state.classes.filter((c) => c._id !== action.payload);
      state.myClasses = state.myClasses.filter((c) => c._id !== action.payload);
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const {
  setClasses,
  setMyClasses,
  setEnrolledClasses,
  setCurrentClass,
  addClass,
  updateClass,
  removeClass,
  setLoading,
  setError,
} = classSlice.actions;
export default classSlice.reducer;
