import React from "react";
import SinglePool from "./SinglePool";

function ListPool({ show, queryResults, id, page }) {
  const pools = queryResults.pools;

  return (
    <>
      {queryResults.totalCount === 0 ? (
        <div className={show ? "" : "displayNone"} id={id}>
          검색 결과가 없습니다.{" "}
        </div>
      ) : (
        <div className={show ? "" : "displayNone"} id={id}>
          {pools ? (
            pools.map((pool) => (
              <SinglePool
                key={pool.poolId}
                pool={pool}
                page={page}
                id={pool.poolId}
              />
            ))
          ) : (
            <p>Loading...</p>
          )}
        </div>
      )}
    </>
  );
}

export default ListPool;
