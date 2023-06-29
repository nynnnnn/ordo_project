'use client'

import './Pagination.css'
import React, { useState } from 'react';
import Pagination from 'react-js-pagination';
import { Get } from '../util/CommonCall';

const Paging = () => {
   const [page, setPage] = useState<number>(1);

   const handlePageChange = async(page: number) => {
      // let param: any = new FormData();
      // param.append('page', 3);
      // param.append('size', 5);

      const result: any = await Get(`/api/v2/posts/test/posts?page=3&size=5`, {});

      if(result.status === 200) {
         debugger
      }
      setPage(page);
      console.log(page);
   };

   return (
      <>
      <Pagination 
         activePage={page}                // 현재 페이지
         itemsCountPerPage={10}           // 한 페이지당 보여줄 리스트 아이템의 개수
         totalItemsCount={450}            // 총 아이템의 개수
         pageRangeDisplayed={5}           // Paginator 내에서 보여줄 페이지의 범위
         prevPageText={'<'}               // 이전을 나타냄
         nextPageText={'>'}               // 다음을 나타냄
         onChange={handlePageChange}      // 페이지가 바뀔 때 핸들링해줄 변수
         />
      </>
   )
}
export default Paging;