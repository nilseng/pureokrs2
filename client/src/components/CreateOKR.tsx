import React from "react";
import Button from "react-bootstrap/Button";
import { useMutation } from "react-apollo";
import gql from "graphql-tag";

const CREATE_OKR = gql`
  mutation CreateOkr($objective: String!) {
    createOkr(objective: $objective) {
      _id
      objective
      company
    }
  }
`;

const GET_OKRS = gql`
  {
    okrs {
      _id
      objective
      company
    }
  }
`;

const CreateOKR = ({ setOkr, setEditObjective }: any) => {
  const [createOkr] = useMutation(CREATE_OKR, {
    async update(cache, { data: { createOkr } }) {
      await setOkr((prevOkr: any) => ({
        ...prevOkr,
        ...createOkr,
      }));
      const { okrs } = cache.readQuery({ query: GET_OKRS }) as { okrs: any[] };
      cache.writeQuery({
        query: GET_OKRS,
        data: { okrs: [...okrs, createOkr] },
      });
    },
  });

  const handleNewOkr = async () => {
    const okr = {
      objective: "",
      company: "PLACEHOLDER",
    };
    await createOkr({
      variables: okr,
    });
    setEditObjective(true);
  };
  return (
    <Button variant="outline-primary" onClick={() => handleNewOkr()}>
      New OKR
    </Button>
  );
};

export default CreateOKR;
