import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { CreateNewTask, UpdateTask, DeleteTask, GetTask } from './components/Tasks.js';
import "./assets/scss/style.scss";
import { Auth0Provider } from "@auth0/auth0-react";

ReactDOM.render(
  <React.StrictMode>
    <Auth0Provider
    domain="dev-2xbe25r7p6o4zk8s.us.auth0.com"
    clientId="Allflqc7B98lLAYfRHiLpy6uLH4KMMC3"
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
/*
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import "./assets/scss/style.scss";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { HashRouter } from "react-router-dom";
import Loader from "./layouts/loader/Loader";
import './index.css';

ReactDOM.render(
  <Suspense fallback={<Loader />}>
    <HashRouter>
      <App />
    </HashRouter>
  </Suspense>,

  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();


reportWebVitals();
*/