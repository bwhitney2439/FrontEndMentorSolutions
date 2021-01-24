import { formatDistanceStrict } from "date-fns";
import parse, { domToReact } from "html-react-parser";
import React from "react";
import styled from "styled-components";
import BgPatternFooterMobile from "../assets/mobile/bg-pattern-detail-footer.svg";

const JobInfoHeader = styled.div`
  position: relative;
  width: 327px;
  margin: 57px auto 0 auto;
  background: #19202d;
  text-align: center;
  border-radius: 6px;
  padding-top: 49px;
  padding-bottom: 32px;

  h2 {
    margin-bottom: 12px;
  }
  p {
    margin-bottom: 24px;
  }
`;

const LogoContainer = styled.div`
  position: absolute;
  width: 50px;
  height: 50px;

  background: ${(props) => props.color};
  border-radius: 15px;
  padding: 16px;
  top: -25px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
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
`;

const JobInfoMain = styled.div`
  width: 327px;
  border-radius: 6px;
  margin: 24px auto 0 auto;
  padding: 40px 24px 32px 24px;
  background: #19202d;

  ul {
    height: 100%;
    margin: 0;
    padding: 0;

    li {
      display: flex;
      align-items: center;
    }

    li:nth-child(1) {
      margin-bottom: 16px;
    }
    li:nth-child(2) {
      margin-bottom: 17px;
    }
  }

  & small {
    text-align: left;
  }

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
  }
`;

const JobDescription = styled.div`
  & > p {
    margin-bottom: 32px;
  }

  //   & > ul ~ p {
  //     color: white;
  //   }

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
  //   height: 372px;
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
`;

const FooterButtonContainer = styled.div`
  width: 100%;
  background: #19202d;
  border-radius: 6px;
  padding: 25px;

  button {
    background: #5964e0;
    border-radius: 5px;
    height: 48px;
    width: 100%;
    border: none;
    outline: none;
    color: white;
    font-weight: bold;
  }
`;

const Dot = styled.div`
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background-color: #6e8098;
  margin: 0 12px;
`;

const JobInfo = ({
  job: {
    company_logo,
    created_at,
    description,
    type,
    company_url,
    how_to_apply,
    title,
    company,
    location,
  },
}) => {
  const dateDistance = formatDistanceStrict(new Date(), new Date(created_at));
  const formattedDateDistance = `${dateDistance.split(" ")[0]}${
    dateDistance.split(" ")[1].includes("month")
      ? dateDistance.split(" ")[1].substring(0, 2)
      : dateDistance.split(" ")[1].substring(0, 1)
  } ago`;

  const formattedCompanyUrl =
    company_url &&
    company_url.replace(/^(?:https?:\/\/)?(?:www\.)?/i, "").split("/")[0];

  const applyAtUrl = how_to_apply.match(/href="([^"]*)/)[1];

  //   const options = {
  //     replace: (domNode) => {
  //       if (domNode.type !== "tag") return;
  //     },
  //   };

  return (
    <>
      <JobInfoHeader>
        <LogoContainer color="#DF6DAE">
          <img src={company_logo} alt="" />
        </LogoContainer>
        <h2>{company}</h2>
        <p>{formattedCompanyUrl}</p>
        <Button onClick={() => window.open(company_url)}>Company Site</Button>
      </JobInfoHeader>
      <JobInfoMain>
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
            <p>{company}</p>
          </li>
        </ul>
        <small>{location}</small>
        <button onClick={() => window.open(applyAtUrl)}>Apply Now</button>
        <JobDescription>{parse(description)}</JobDescription>
      </JobInfoMain>
      <HowToApply>
        <h3>How to Apply</h3>
        {parse(how_to_apply)}
      </HowToApply>
      <FooterButtonContainer>
        <button onClick={() => window.open(applyAtUrl)}>Apply Now</button>
      </FooterButtonContainer>
    </>
  );
};

export default JobInfo;
