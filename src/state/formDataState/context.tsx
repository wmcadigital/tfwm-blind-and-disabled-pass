import { createContext, useReducer, useContext } from 'react';
import PropTypes from 'prop-types';

import { TFormDataContext, TFormDataContextProviderProps } from './types';
import reducer from './reducer';
import initialState from './initialState';

// State context
const Context = createContext<Partial<TFormDataContext>>([]);

// Named 'useContext' helper function
export const useFormDataContext = () => useContext(Context) as TFormDataContext;

// Context provider component
export const FormDataContextProvider = ({ children }: TFormDataContextProviderProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return <Context.Provider value={[state, dispatch]}>{children}</Context.Provider>;
};

FormDataContextProvider.propTypes = {
  children: PropTypes.node,
};
