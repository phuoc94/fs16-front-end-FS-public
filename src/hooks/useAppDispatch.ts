import { useDispatch } from 'react-redux';

import { AppDispatch } from '../store/configureStore';

type DispatchFunc = () => AppDispatch;
export const useAppDispatch: DispatchFunc = useDispatch;
