import React, { useState } from "react";
import { useQuery } from "react-apollo";
import gql from "graphql-tag";
import { useMutation } from "react-apollo";

import OKRTree from "./OKRTree";
import OKRModal from "./OKRModal";
import Loading from "./Loading";

const GET_OKRS = gql`
  {
    okrs {
      _id
      objective
      keyResults {
        _id
        keyResult
      }
    }
  }
`;

const DELETE_OKR = gql`
  mutation DeleteOkr($_id: ID!) {
    deleteOkr(_id: $_id)
  }
`;

const Home = () => {
  const [okr, setOkr] = useState<any | null>();
  const [deleteOkr] = useMutation(DELETE_OKR, {
    update(cache, { data: { deleteOkr } }) {
      const { okrs } = cache.readQuery({ query: GET_OKRS }) as { okrs: any[] };
      cache.writeQuery({
        query: GET_OKRS,
        data: { okrs: okrs.filter((okr) => okr._id !== deleteOkr) },
      });
    },
  });

  const handleDeleteOkr = (okr: any) => {
    setOkr(null);
    deleteOkr({ variables: { _id: okr._id } });
  };

  const { loading, error, data } = useQuery(GET_OKRS);

  if (error) console.log(error);

  return (
    <>
      <OKRModal okr={okr} setOkr={setOkr} handleDeleteOkr={handleDeleteOkr} />
      {loading && <Loading />}
      {error && <div>Something went wrong...</div>}
      {data && <OKRTree okrs={data.okrs} setOkr={setOkr} />}
    </>
  );
};

export default Home;
