import axios from "axios";
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import styled from "styled-components";
import Card from "./components/Card";
import Filter from "./components/Filter";
import Header from "./components/Header";
import JobInfo from "./components/JobInfo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

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
  const [pages, setPages] = useState(1);
  const [isLoading, setIsLoading] = useState("idle");
  const [queryString, setQueryString] = useState("");

  useEffect(() => {
    if (pages === 1) {
      setIsLoading("idle");
    } else {
      setIsLoading("pending");
    }

    axios
      .get(`/positions.json?&page=${pages}${queryString}`)
      .then(({ data }) => {
        setJobs((prev) => [...prev, ...data]);

        if (data.length < 50) {
          setIsLoading("finished");
        } else {
          setIsLoading("resolved");
        }
      });
  }, [pages, queryString]);

  const handlePages = () => {
    setPages((prevState) => prevState + 1);
  };

  const handleDescriptionSearch = (description) => {
    setJobs([]);
    setPages(1);
    setQueryString(`&description=${description}`);
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
            <Filter handleDescriptionSearch={handleDescriptionSearch} />
            {jobs.map((job, index) => {
              return <Card key={job.id} job={job} index={index} />;
            })}

            {isLoading === "idle" ? (
              <h2 style={{ textAlign: "center" }}>
                <FontAwesomeIcon
                  size="lg"
                  icon={faSpinner}
                  spin
                  color="white"
                />
                {"  "}
                Loading
              </h2>
            ) : isLoading === "finished" ? null : (
              <Button disabled={isLoading === "pending"} onClick={handlePages}>
                {isLoading === "resolved" ? (
                  "Load More"
                ) : (
                  <>
                    <FontAwesomeIcon icon={faSpinner} spin color="white" />{" "}
                    Loading
                  </>
                )}
              </Button>
            )}
          </div>
        </Route>
      </Router>
    </>
  );
};

export default App;
