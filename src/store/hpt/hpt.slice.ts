import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Video {
    id: string;
    video: string;
    poster: string;
}

interface Time {
    time: string;
}

interface Results {
    id: string;
    flag: Time[];
    poster: string;
}

export interface Hpt {
    videos: Video[];
    results: Results[];
}

const initialState: Hpt = {
    videos: [],
    results: []
};


export const hptSlice = createSlice({
    name: 'hptData',
    initialState,
    reducers: {
        resetVideo: (state) => {
            state.videos = [];
            state.results = []; 
        },
        addVideo: (state, action: PayloadAction<Video>) => {
            state.videos.push(action.payload);
        },
        removeVideo: (state, action: PayloadAction<string>) => {
            state.videos = state.videos.filter((video) => video.id !== action.payload);
        },
        addVideoResult: (state, action: PayloadAction<{ poster: string; id: string; time?: string }>) => {
            const { id, time, poster } = action.payload; 
            const existingResult = state.results.find((result) => result.id === id);
            
            if (existingResult && time) {
                existingResult.flag.push({ time });
            } else if (!existingResult) {
                state.results.push({ id, poster, flag: [] });
            }
        },
    },
});

export const { addVideo, resetVideo, removeVideo, addVideoResult } = hptSlice.actions;
export default hptSlice.reducer;