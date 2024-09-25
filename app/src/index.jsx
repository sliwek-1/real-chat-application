import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import { store } from "./store/configureStore.js"
import { persistor } from './store/configureStore.js';
import { PersistGate } from 'redux-persist/integration/react';
import { SocketProvider } from './context/socketContext.jsx';
import { ConvarsationProvider } from './context/conversationsContext.jsx';
import { AuthContextProvider } from './context/authContext.jsx';
import { VideoManagmentProvider } from './context/videoManagmentContext.jsx';

const root = ReactDOM.createRoot(
  document.getElementById('root')
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AuthContextProvider>
          <SocketProvider>
            <VideoManagmentProvider>
              <ConvarsationProvider>
                  <App /> 
              </ConvarsationProvider>
            </VideoManagmentProvider>
          </SocketProvider>
        </AuthContextProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
