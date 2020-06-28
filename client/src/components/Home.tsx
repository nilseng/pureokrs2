import React from "react";
import { useQuery, useMutation } from "react-apollo";
import gql from "graphql-tag";

import OKRTree from "./OKRTree";
import OKRModal from "./OKRModal";
import Loading from "./Loading";

const GET_OKRS = gql`
  {
    okrs {
      _id
      objective
      company
    }
  }
`;

const DELETE_OKR = gql`
  mutation DeleteOkr($_id: ID!) {
    deleteOkr(_id: $_id)
  }
`;

const UPDATE_OKR = gql`
  mutation UpdateOkr($_id: ID!, $objective: String!) {
    updateOkr(_id: $_id, objective: $objective) {
      _id
      objective
      createdAt
      company
    }
  }
`;

const Home = (props: any) => {
  const [updateOkr] = useMutation(UPDATE_OKR, {
    update(cache, { data: { updateOkr } }) {
      const { okrs } = cache.readQuery({ query: GET_OKRS }) as { okrs: any[] };
      okrs
        .filter((okr) => okr._id === updateOkr._id)
        .map((okr) => (okr = updateOkr));
      cache.writeQuery({
        query: GET_OKRS,
        data: { okrs: okrs },
      });
    },
  });

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
    props.setOkr(null);
    if (!okr._id) return;
    deleteOkr({ variables: { _id: okr._id } });
  };

  const { loading, error, data } = useQuery(GET_OKRS);

  if (error) console.log(error);

  return (
    <>
      <OKRModal
        okr={props.okr}
        setOkr={props.setOkr}
        handleDeleteOkr={handleDeleteOkr}
        editObjective={props.editObjective}
        setEditObjective={props.setEditObjective}
        updateOkr={updateOkr}
      />
      {loading && <Loading />}
      {error && <div>Something went wrong...</div>}
      {data && <OKRTree okrs={data.okrs} setOkr={props.setOkr} />}
    </>
  );
};

export default Home;
