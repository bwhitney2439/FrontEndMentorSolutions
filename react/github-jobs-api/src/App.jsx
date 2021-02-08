import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from "./components/Header";
import JobInfo from "./components/JobInfo";
import { ReactQueryDevtools } from "react-query/devtools";
import JobList from "./components/JobList";

const App = () => {
  return (
    <>
      <Header />
      <Router>
        <Route path="/:jobId">
          <JobInfo />
        </Route>
        <Route exact path="/">
          <JobList />
        </Route>
      </Router>
      <ReactQueryDevtools initialIsOpen={true} />
    </>
  );
};

export default App;
