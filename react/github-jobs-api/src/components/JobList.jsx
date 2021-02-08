import React from "react";
import styled from "styled-components";
import Job from "./Job";
import axios from "axios";
import { useState } from "react";
import Filter from "./Filter";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { useInfiniteQuery } from "react-query";
import { theme } from "../theme";

const JobsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-flow: row wrap;
  width: 327px;
  margin-left: auto;
  margin-right: auto;

  @media (min-width: 768px) {
    width: 689px;
  }
  @media (min-width: 1440px) {
    width: 1110px;
  }
`;

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

  &:hover {
    background: #939bf4;
  }
`;

const JobList = () => {
  const [filterOptions, setFilterOptions] = useState({
    description: "",
    fullTime: false,
    location: "",
  });

  const {
    data,
    status,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery(
    ["jobs", { filterOptions }],
    async ({ pageParam = 0 }) => {
      const { data: jobs } = await axios.get(
        `${process.env.REACT_APP_BASEURL}/positions.json`,
        {
          params: {
            page: pageParam,
            description: filterOptions.description,
            full_time: filterOptions.fullTime ? "on" : "off",
            location: filterOptions.location,
          },
        }
      );

      const nextPage = jobs.length === 50 ? pageParam + 1 : null;
      return { data: jobs, nextPage };
    },

    {
      getNextPageParam: (lastPage) => lastPage.nextPage ?? false,
      refetchOnWindowFocus: false,
    }
  );

  return (
    <div className="App">
      <Filter setFilterOptions={setFilterOptions} />
      {status === "loading" ? (
        <h2 style={{ textAlign: "center", color: theme.colors.h2 }}>
          <FontAwesomeIcon
            size="lg"
            icon={faSpinner}
            spin
            color={theme.colors.icon}
          />
          {"   "}
          Loading
        </h2>
      ) : data?.pages[0].data.length > 0 ? (
        <JobsContainer>
          {data.pages.map((page, index) => {
            return (
              <React.Fragment key={index}>
                {page.data.map((job, index) => (
                  <Job key={job.id} job={job} index={index} />
                ))}
              </React.Fragment>
            );
          })}
        </JobsContainer>
      ) : (
        <h2 style={{ textAlign: "center" }}>Nothing returned</h2>
      )}
      {status === "loading" || !hasNextPage ? null : (
        <Button disabled={isFetchingNextPage} onClick={() => fetchNextPage()}>
          {!isFetchingNextPage ? (
            "Load More"
          ) : (
            <>
              <FontAwesomeIcon icon={faSpinner} spin color="white" /> Loading
            </>
          )}
        </Button>
      )}
    </div>
  );
};

export default JobList;
