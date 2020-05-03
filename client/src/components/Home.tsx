import React, { useState } from "react";
import { useQuery } from "react-apollo";
import gql from "graphql-tag";

import OKRTree from "./OKRTree";
import OKRModal from "./OKRModal";
import Loading from "./Loading";

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
      {data && <OKRTree okrs={data.okrs} setOkr={setOkr} />}
    </>
  );
};

export default Home;
