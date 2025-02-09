import React from 'react';
// import ReactDOM from 'react-dom/client';
import ReactDOM from 'react-dom'
import './index.css';
import 'normalize.css';
import './styles/reset.css'
import './styles/global.css'
import './styles/theme.scss'
import {ThemeProvider} from'./contexts/ThemeContext.js'
import Router from './routes/index.js'
import {BrowserRouter} from 'react-router-dom';
import { AliveScope } from 'react-activation'
import { AppContextProvider } from './contexts/AppContext.js';
import { Provider } from 'react-redux'
import store from './store/store.js';
// import reportWebVitals from './reportWebVitals';

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//     <ThemeProvider><AliveScope><RouterProvider router={router} /></AliveScope></ThemeProvider>
// );
ReactDOM.render(
  <Provider store={store}>
  <ThemeProvider>
    <AppContextProvider>
    <BrowserRouter>
      <AliveScope>
        <Router />
      </AliveScope>
      </BrowserRouter>
      </AppContextProvider>
    </ThemeProvider>
    </Provider>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
