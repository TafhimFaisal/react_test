import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import Dashboard from "./pages/Dashboard";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import InvitationsList from './pages/Invitations/InvitationsList';
import SendInvitations from './pages/Invitations/SendInvitations';
import store from './redux/store';
import Login from './pages/Login';
import Auth from './auth/Auth';
import Master from './layouts/Master'

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="login" element={<Login />} />
          <Route path="/" element={<Auth children={<Master />} />}>

            <Route index element={<SendInvitations />} />
            <Route path=":type/invitations" element={<InvitationsList />} />
            <Route path="send/invite" element={<SendInvitations />} />
            
          </Route>
          <Route> 404 Not Found </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
