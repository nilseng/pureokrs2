import React from "react";
import { useQuery } from "react-apollo";
import gql from "graphql-tag";

import Loading from "./Loading";

import "../styles/About.scss";

const COUNT_QUERY = gql`
  {
    companyCount
    okrCount
    keyResultsCount
  }
`;

const About = () => {
  const { loading, error, data } = useQuery(COUNT_QUERY);

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
          <div className="stat">
            <div className="fact">{data.okrCount}</div>
            <div>OKRs are created at PureOKRs</div>
          </div>
          <div className="stat">
            <div className="fact">{data.keyResultsCount}</div>
            <div>Key Results are being tracked at PureOKRs</div>
          </div>
        </div>
      )}
    </>
  );
};

export default About;
