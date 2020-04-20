import React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";

const OKR_QUERY = gql`
  {
    okrs {
      id
      objective
    }
  }
`;

const OKRList = () => {
  return (
    <Query query={OKR_QUERY}>
      {({ loading, error, data }: any) => {
        if (loading) return <div>Fetching</div>;
        if (error) return <div>Error</div>;

        const okrs = data.okrs;

        return (
          <div>
            {okrs.map((okr: any) => (
              <div>{okr.objective}</div>
            ))}
          </div>
        );
      }}
    </Query>
  );
};

export default OKRList;
