import axios from "axios";
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import styled from "styled-components";
import Card from "./components/Card";
import Filter from "./components/Filter";
import Header from "./components/Header";
import JobInfo from "./components/JobInfo";

const Button = styled.button`
  width: 141px;
  height: 48px;
  margin-left: auto;
  margin-right: auto;
  background: #5964e0;
  border: none;
  outline: none;
  border-radius: 5px;
  color: white;
  display: block;
  margin-bottom: 62px;
`;

const App = () => {
  const [jobs, setJobs] = useState([]);
  const [visible, setVisible] = useState(12);

  useEffect(() => {
    axios.get("/positions.json").then(({ data }) => {
      setJobs(data);
    });
  }, []);

  const handleVisible = () => {
    setVisible((prevState) => prevState + 12);
  };

  return (
    <>
      <Header />
      <Router>
        {jobs.length !== 0 && (
          <Route
            path="/:jobId"
            render={({ match }) => {
              return (
                <JobInfo
                  job={jobs.find((job) => job.id === match.params.jobId)}
                />
              );
            }}
          />
        )}
        <Route exact path="/">
          <div className="App">
            <Filter />
            {jobs.slice(0, visible).map((job, index) => {
              return <Card key={job.id} job={job} index={index} />;
            })}

            {jobs.length !== 0 ? (
              visible >= jobs.length ? null : (
                <Button onClick={handleVisible}>Load More</Button>
              )
            ) : (
              <h1
                style={{
                  textAlign: "center",
                }}
              >
                Loading......
              </h1>
            )}
          </div>
        </Route>
      </Router>
    </>
  );
};

export default App;
