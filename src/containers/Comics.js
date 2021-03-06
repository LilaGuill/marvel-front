import React, { useState, useEffect } from "react";
import axios from "axios";
import SearchBar from "../components/SearchBar";
import Pagination from "../components/Pagination";
import Loading from "../components/Loading";
import url from "../utils/url";
import ItemList from "../components/Comic";

const Comics = () => {
  const [pagination, setPagination] = useState(true);
  const [page, setPage] = useState(1);
  const [comics, setComics] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.post(`${url}/comics`, {
        page
      });
      setComics([...response.data.results]);
      setIsLoading(false);
      setTotal(response.data.total);
    };

    fetchData();
  }, [page]);

  const listComics = comics.map((comic, index) => {
    return <ItemList key={index} {...comic} />;
  });

  return (
    <div className="container">
      <SearchBar
        comics={comics}
        setCollection={setComics}
        setPage={setPage}
        page={page}
        setTotal={setTotal}
        setIsLoading={setIsLoading}
        isLoading={isLoading}
        setPagination={setPagination}
        title={"comics"}
      />
      {total !== 0 && pagination ? (
        <Pagination
          setPage={setPage}
          total={total}
          page={page}
          setIsLoading={setIsLoading}
          itemsPerPage={3000}
          isLoading={isLoading}
        />
      ) : null}
      {isLoading ? (
        <div className="container-loader">
          <Loading />
        </div>
      ) : (
        <div>
          {listComics.length ? (
            listComics
          ) : (
            <div className="not-found">Aucun Résultat trouvé</div>
          )}
        </div>
      )}
    </div>
  );
};

export default Comics;
