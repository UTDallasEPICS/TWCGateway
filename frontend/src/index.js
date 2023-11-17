import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { CreateNewTask, UpdateTask, DeleteTask, GetTask } from './components/Tasks.js';
import "./assets/scss/style.scss";
import { Auth0Provider } from "@auth0/auth0-react";
import { useAuth0 } from "@auth0/auth0-react";

ReactDOM.render(
  <React.StrictMode>
    <Auth0Provider
      domain="the-warren-center.us.auth0.com"
      clientId="hvsbhpQc5ImpK85Gpoo3Mrlebbfs1ogZ"
      redirectUri={window.location.origin + "/home"} // add a function to check role
    >
      <App />
    </Auth0Provider>
    {/*     
    <GetTask TaskID={200} />
    <CreateNewTask TaskID={100} Name={'Review Job Description'} Category={'PreHire'} Assignee={'Sarah Little, Hiring Manager'} Timeline={'2+ Weeks'}
      TaskDescription={'Completes Requisition Form'} TaskStatus={'Incomplete'} Location={'Common/HR/Job Description'} Form={'Requisition Form URL'}
      Comments={null}/>
    <UpdateTask TaskID={120} AttributeName={'AttributeName'} UpdatedValue={'UpdatedValue'}/>
    <DeleteTask TaskID={200}/>
    */}
  </React.StrictMode>,

  document.getElementById('root')
);