import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { themes } from "./themes";
import {Themes} from './interface'

type ThemeKeys = keyof Themes;

export interface ColorState {
  currentTheme: ThemeKeys;
  themeData: Themes[ThemeKeys];
}

const initialState: ColorState = {
  currentTheme: "oceanicBlue",
  themeData: themes.oceanicBlue,
};

export const colorSlice = createSlice({
  name: "color",
  initialState,
  reducers: {
    updateTheme: (state, action: PayloadAction<ThemeKeys>) => {
      const selectedTheme = themes[action.payload];
      if (selectedTheme) {
        state.currentTheme = action.payload;
        state.themeData = selectedTheme;
      }
    },
  },
});

export const { updateTheme } = colorSlice.actions;
export default colorSlice.reducer;