import React from "react";
import { useQuery } from "react-apollo";
import gql from "graphql-tag";

import Loading from "./Loading";

import "../styles/About.scss";

const COMPANY_COUNT_QUERY = gql`
  {
    companyCount
  }
`;

const About = () => {
  const { loading, error, data } = useQuery(COMPANY_COUNT_QUERY);

  if (error) console.log(error);

  return (
    <>
      {loading && <Loading />}
      {error && <div>Something went wrong...</div>}
      {data && (
        <div className="aboutContainer">
          <div className="stat">
            <div className="fact">{data.companyCount}</div>
            <div>Companies are registered at PureOKRs</div>
          </div>
        </div>
      )}
    </>
  );
};

export default About;
