import React, { useState } from "react";
import { useQuery } from "react-apollo";
import gql from "graphql-tag";

import OKRTree from "./OKRTree";
import OKRModal from "./OKRModal";
import Loading from "./Loading";

const OKR_QUERY = gql`
  {
    okrs {
      _id
      objective
    }
  }
`;

const Home = () => {
  const [okr, setOkr] = useState();

  const { loading, error, data } = useQuery(OKR_QUERY);

  if (error) console.log(error);

  return (
    <>
      <OKRModal okr={okr} setOkr={setOkr} />
      {loading && <Loading />}
      {error && <div>Something went wrong...</div>}
      {data && <OKRTree okrs={data.okrs} setOkr={setOkr} />}
    </>
  );
};

export default Home;
