import React, { useState, useEffect } from "react";
import {Search} from '../Components/Search'

export const Choose: React.FC = () => {
  const [data, setData] = useState<any>();
  let [page, setPage] = useState<number>(0);

  useEffect(() => {
    //fetch("../JSON/data-2.json")
    fetch(`https://jsonplaceholder.typicode.com/users/${page}`)
      .then((response) => response.json())
      .then((json) => setData(json));
  }, [page]);

  const handler = (e: React.MouseEvent) => {
    setPage(page + 1);

    e.preventDefault();
  };

  const reset = (e: React.MouseEvent) => {
    setPage((page = 1));
    e.preventDefault();
  };

  const nextPage = (e: React.MouseEvent) => {
    setPage(page + 1);
    e.preventDefault();
  };

  const previousPage = (e: React.MouseEvent) => {
    setPage(page - 1);
    e.preventDefault();
  };

  const startPage = (e: React.MouseEvent) => {
    setPage((page = 0));
    e.preventDefault();
  };

  const insertHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    let i: number = e.target.value as any;
    setPage(i);

    if (i > 10) {
      setTimeout(() => alert("No User with ID:" + i), 100);
    }
  };

  const Transfer = () => {
    if (page === 0) {
      return (
        <div>
          <h1 className="textChoose">Choose User Data</h1>
          <button
            className="waves-effect waves-light btn-large"
            onClick={handler}
          >
            Get Data
          </button>
          <div>No Data Selected</div>
        </div>
      );
    }
    if (page === 11) {
      return (
        <div>
          <h1 className="textChoose">Choose User Data</h1>
          <button
            className="waves-effect waves-light btn-large"
            onClick={reset}
          >
            Get Data
          </button>
          <div>No More Users in Data Base</div>
        </div>
      );
    } else {
      return (
        <div>
          <h1 className="textChoose">Choose User Data</h1>
          <button
            className="waves-effect waves-teal btn-flat"
            onClick={previousPage}
          >
            Previous Page
          </button>
          <button
            className="waves-effect waves-light btn-large"
            onClick={nextPage}
          >
            Next Page
          </button>
          <button className="waves-effect waves-teal btn-flat" onClick={reset}>
            Reset
          </button>
          <button
            className="waves-effect red-text waves-teal btn-flat"
            onClick={startPage}
          >
            Home
          </button>
          <ul className="textContainer1">
            <p>ID number: {data.id}</p>
            <p>Full Name: {data.name}</p>
            <p>UserName: {data.username}</p>
            <p>Email Adress: {data.email}</p>
            <p>Phone Number: {data.phone}</p>
          </ul>
          <div className="input-field col s6">
            <input
              placeholder="Type here user ID"
              type="number"
              className="validate"
              onChange={insertHandler}
            />
          </div>
          <Search />
        </div>
      );
    }
  };

  return (
    <div>
      <div>{Transfer()}</div>
    </div>
  );
};
