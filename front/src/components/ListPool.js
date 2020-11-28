import React, { useEffect } from "react";
import SinglePool from "./SinglePool";

function ListPool({ queryResults }) {
  const pools = queryResults.pools;

  return (
    <>
      {queryResults.totalCount == 0 ? (
        <div>검색 결과가 없습니다. </div>
      ) : (
        <div>
          {pools ? (
            pools.map((pool) => <SinglePool key={pool.poolId} pool={pool} />)
          ) : (
            <p>Loading...</p>
          )}
        </div>
      )}
    </>
  );
}

export default ListPool;
