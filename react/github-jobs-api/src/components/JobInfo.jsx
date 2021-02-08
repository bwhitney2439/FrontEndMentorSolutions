import axios from "axios";
import { formatDistanceStrict } from "date-fns";
import parse from "html-react-parser";
import React from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import BgPatternFooterMobile from "../assets/mobile/bg-pattern-detail-footer.svg";
import { useMedia } from "../hooks/useMedia";
import { theme } from "../theme";

const JobInfoHeader = styled.div`
  position: relative;
  width: 327px;
  margin: 57px auto 0 auto;
  background: ${theme.colors.cardBackground};
  text-align: center;
  border-radius: 6px;
  padding-top: 49px;
  padding-bottom: 32px;

  @media (min-width: 768px) {
    display: flex;
    align-items: center;
    width: 689px;
    padding-top: unset;
    padding-bottom: unset;
    text-align: left;
  }

  @media (min-width: 1440px) {
    width: 730px;
  }
`;

const JobInfoHeaderDetails = styled.div`
  h2 {
    margin-bottom: 12px;
  }
  p {
    margin-bottom: 24px;
  }

  @media (min-width: 768px) {
    margin-left: 40px;
    p {
      margin-bottom: unset;
    }
  }
`;

const LogoContainer = styled.div`
  position: absolute;
  width: 50px;
  height: 50px;
  background-color: ${({ color }) => color};
  background-image: url("${({ company_logo }) => company_logo}");
  background-repeat: no-repeat;
  background-position: center center;
  background-size: 80%;
  border-radius: 15px;
  padding: 16px;
  top: -25px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  justify-content: center;

  @media (min-width: 768px) {
    position: unset;
    top: unset;
    border-radius: unset;
    left: unset;
    transform: unset;
    width: 140px;
    height: 140px;
  }
`;

const Button = styled.button`
  width: 147px;
  height: 48px;
  background: rgba(89, 100, 224, 0.1);
  mix-blend-mode: normal;
  border: none;
  border-radius: 5px;
  color: #5964e0;
  margin-top: auto;
  outline: none;
  font-weight: bold;

  @media (min-width: 768px) {
    margin-top: unset;
    margin-left: auto;
    margin-right: 40px;
    background: rgba(255, 255, 255, 0.1);
    color: #ffffff;

    &:hover {
      background: rgba(255, 255, 255, 0.35);
    }
  }
`;

const JobInfoMain = styled.div`
  width: 327px;
  border-radius: 6px;
  margin: 24px auto 0 auto;
  padding: 40px 24px 32px 24px;
  background: ${theme.colors.cardBackground};

  ul {
    height: 100%;
    margin: 0;
    padding: 0;

    li {
      display: flex;
      align-items: center;
    }

    li:nth-child(1) {
      margin-bottom: 8px;
    }
    li:nth-child(2) {
      margin-bottom: 12px;
    }
  }

  @media (min-width: 768px) {
    width: 689px;
    padding: 48px;
  }

  @media (min-width: 1440px) {
    width: 730px;
  }
`;

const JobTitle = styled.div`
  button {
    background: #5964e0;
    border-radius: 5px;
    height: 48px;
    width: 279px;
    border: none;
    outline: none;
    margin: 32px 0;
    color: white;
    font-weight: bold;

    &:hover {
      background: #939bf4;
    }
  }

  @media (min-width: 768px) {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 40px;
    button {
      margin: 0;
      width: 141px;
      height: 48px;
    }
  }
`;

const JobDescription = styled.div`
  & > p {
    margin-bottom: 32px;
  }

  ul > li,
  ol > li {
    display: list-item;
    color: #6e8098;
    margin-left: 0;
    padding-left: 32px;

    &::marker {
      color: #5964e0;
    }
  }

  ul:not(:first-child),
  ol:not(:first-child) {
    margin-bottom: 32px;
    margin-left: 0;
    padding-left: 16px;
  }

  a {
    color: #5964e0;
  }
`;

const HowToApply = styled.div`
  width: 327px;
  margin: 32px auto 40px auto;
  padding: 32px;
  background: #5964e0 url(${BgPatternFooterMobile}) no-repeat center;
  border-radius: 6px;
  p {
    color: white;
  }

  h3 {
    color: white;
    margin-bottom: 28px;
  }
  a {
    color: white;
  }

  @media (min-width: 768px) {
    width: 689px;
  }

  @media (min-width: 1440px) {
    width: 730px;
  }
`;

const Footer = styled.div`
  width: 100%;
  background: ${theme.colors.cardBackground};
  border-radius: 6px;
  padding: 25px;
`;

const FooterButtonContainer = styled.div`
  width: 327px;
  display: flex;
  margin-left: auto;
  margin-right: auto;
  justify-content: center;
  align-items: center;

  button {
    background: #5964e0;
    border-radius: 5px;
    height: 48px;
    width: 100%;

    border: none;
    outline: none;
    color: white;
    font-weight: bold;

    &:hover {
      background: #939bf4;
    }
  }
  @media (min-width: 768px) {
    width: 689px;
    justify-content: space-between;

    h2 {
      margin-bottom: 12px;
    }

    button {
      width: 141px;
    }
  }
  @media (min-width: 1440px) {
    width: 730px;
  }
`;

const Dot = styled.div`
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background-color: #6e8098;
  margin: 0 12px;
`;

const JobInfo = () => {
  const { jobId } = useParams();

  console.log(jobId.split("--")[1]);
  const { isLoading, data } = useQuery(["job", { jobId }], () =>
    axios
      .get(`/positions/${jobId}.json`, {
        params: {
          markdown: "on",
        },
      })
      .then(({ data }) => data)
  );

  const { footerInfo } = useMedia(
    // Media queries
    ["(min-width: 1440px)", "(min-width: 768px)"],
    // (relates to above media queries by array index)
    [
      {
        footerInfo: (company, formattedCompanyUrl) => {
          return (
            <div>
              <h2>{company}</h2>
              <p>{formattedCompanyUrl}</p>
            </div>
          );
        },
      },
      {
        footerInfo: (company, formattedCompanyUrl) => {
          return (
            <div>
              <h2>{company}</h2>
              <p>{formattedCompanyUrl}</p>
            </div>
          );
        },
      },
    ],
    // Default object
    {
      footerInfo: () => null,
    }
  );

  if (isLoading) return null;

  const {
    company_logo,
    created_at,
    description,
    type,
    company_url,
    how_to_apply,
    title,
    company,
    location,
    url,
  } = data;

  const dateDistance = formatDistanceStrict(new Date(), new Date(created_at));
  const formattedDateDistance = `${dateDistance.split(" ")[0]}${
    dateDistance.split(" ")[1].includes("month")
      ? dateDistance.split(" ")[1].substring(0, 2)
      : dateDistance.split(" ")[1].substring(0, 1)
  } ago`;

  const formattedCompanyUrl =
    company_url &&
    company_url.replace(/^(?:https?:\/\/)?(?:www\.)?/i, "").split("/")[0];

  const applyAtUrl = how_to_apply.match(/href="([^"]*)/);

  return (
    <>
      <JobInfoHeader>
        <LogoContainer
          color="transparent"
          company_logo={company_logo}
        ></LogoContainer>
        <JobInfoHeaderDetails>
          <h2>{company}</h2>
          <p>{formattedCompanyUrl}</p>
        </JobInfoHeaderDetails>
        <Button onClick={() => window.open(company_url)}>Company Site</Button>
      </JobInfoHeader>
      <JobInfoMain>
        <JobTitle>
          <ul>
            <li>
              <p>{formattedDateDistance}</p>
              <Dot></Dot>
              <p>{type}</p>
            </li>
            <li>
              <h2>{title}</h2>
            </li>
            <li>
              <small>{location}</small>
            </li>
          </ul>
          <button
            onClick={() =>
              window.open(
                applyAtUrl === null
                  ? formattedCompanyUrl
                    ? formattedCompanyUrl
                    : url
                  : applyAtUrl[1]
              )
            }
          >
            Apply Now
          </button>
        </JobTitle>
        <JobDescription>{parse(description)}</JobDescription>
      </JobInfoMain>
      <HowToApply>
        <h3>How to Apply</h3>
        {parse(how_to_apply)}
      </HowToApply>
      <Footer>
        <FooterButtonContainer>
          {footerInfo(company, formattedCompanyUrl)}
          <button
            onClick={() =>
              window.open(
                applyAtUrl === null
                  ? formattedCompanyUrl
                    ? formattedCompanyUrl
                    : url
                  : applyAtUrl[1]
              )
            }
          >
            Apply Now
          </button>
        </FooterButtonContainer>
      </Footer>
    </>
  );
};

export default JobInfo;
