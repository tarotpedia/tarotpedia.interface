import axios from 'axios';

export const drawCards = (payload: any) => axios.post('/api/draw', payload);
export const getTarotReading = (payload: any) => axios.post('/api/tarot', payload);
export const getNumerology = (payload: any) => axios.post('/api/numerology', payload);
