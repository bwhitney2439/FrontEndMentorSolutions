import { formatDistanceStrict } from "date-fns";
import React from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { theme } from "../theme";

const CardContainer = styled.div`
  position: relative;
  margin-bottom: 49px;
  width: 100%;
  height: 228px;
  background: ${theme.colors.cardBackground};
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  padding: 49px 32px 32px 32px;
  & ul {
    height: 100%;
    margin: 0;
    padding: 0;
    list-style-type: none;

    li {
      display: flex;
      align-items: center;

      h2 {
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        text-overflow: ellipsis;
        overflow: hidden;
        cursor: pointer;

        &:hover {
          color: #6e8098;
        }
      }
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

  @media (min-width: 768px) {
    width: 339px;
  }
  @media (min-width: 1440px) {
    width: 350px;
  }
`;

const LogoContainer = styled.div`
  position: absolute;
  width: 50px;
  height: 50px;
  background-color: ${({ color }) => color};
  // background-color: white;
  background-image: url("${({ company_logo }) => company_logo}");
  background-repeat: no-repeat;
  background-position: center center;
  background-size: 80%;
  border-radius: 15px;
  top: -25px;
  left: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Dot = styled.div`
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background-color: #6e8098;
  margin: 0 12px;
`;

const Card = ({
  job: { company_logo, created_at, type, title, company, location, id },
  index,
}) => {
  const history = useHistory();
  const colors = [
    "#FFFFFF",
    "#007CFF",
    "#222121",
    "#3D3B94",
    "#3DB3D1",
    "#492A29",
    "#5964E0",
    "#60DCAD",
    "#DF6DAE",
    "#E66D39",
    "#F0B62A",
    "#FF585F",
  ];

  const indexCount = index % colors.length;

  const dateDistance = formatDistanceStrict(new Date(), new Date(created_at));
  const formattedDateDistance = `${dateDistance.split(" ")[0]}${
    dateDistance.split(" ")[1].includes("month")
      ? dateDistance.split(" ")[1].substring(0, 2)
      : dateDistance.split(" ")[1].substring(0, 1)
  } ago`;

  return (
    <CardContainer
      onClick={() => history.push(`/${id}--${colors[indexCount]}`)}
    >
      <LogoContainer
        color={colors[indexCount]}
        company_logo={company_logo}
      ></LogoContainer>
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
    </CardContainer>
  );
};

export default Card;
