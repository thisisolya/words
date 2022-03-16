import React from "react";

interface useFetchArgs {
  endpoint: string;
  method: string;
  body?: BodyInit;
}

const useFetch = ({ endpoint, method, body }: useFetchArgs) => {
  const [result, setResult] = React.useState<any>();
  React.useEffect(() => {
    fetch(endpoint, {
      method,
      mode: "cors",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
      referrer: "no-referrer",
      body,
    })
      .then((response) => response.json())
      .then((data) => setResult(data));
  }, [endpoint, method, body]);

  return result;
};

export default useFetch;
