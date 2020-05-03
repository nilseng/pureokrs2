import React, { useState } from "react";
import { useQuery } from "react-apollo";
import gql from "graphql-tag";

import OKRModal from "./OKRModal";
import Loading from "./Loading";
import OkrTree from "./OkrTree";

const OKR_QUERY = gql`
  {
    okrs {
      id
      objective
      company {
        name
      }
    }
  }
`;

const Home = () => {
  const [okr, setOkr] = useState();

  const { loading, error, data } = useQuery(OKR_QUERY);

  return (
    <>
      <OKRModal okr={okr} setOkr={setOkr} />
      {loading && <Loading />}
      {error && <div>error</div>}
      {data && <OkrTree okrs={data.okrs} setOkr={setOkr} />}
    </>
  );
};

export default Home;
