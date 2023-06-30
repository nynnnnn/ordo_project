'use client'

import { toast } from 'react-hot-toast';
import { useState } from 'react';

function CommonPaging(props: any) {
   const [limit, setLimit] = useState(props.limit);
   const [page, setPage] = useState(props.page + 1);

   const numPages = Math.ceil(props.totalPosts / limit);
   const arrayNumPages = Array(numPages).fill(0);
   const groupSize = 5;
   const currGroup = Math.ceil(page / groupSize);
   const startPage = (currGroup - 1) * groupSize + 1;
   const endPage = Math.min(startPage + groupSize - 1, numPages);

   return (
      <>
         <div className=''>
            <a
               className="btn_com first"
               onClick={(e) => {
                  if (page === 1) {
                     e.preventDefault();
                     toast.success("첫번째 페이지입니다.");
                  } else {
                     setPage(1);
                  }
               }}
            />
            <a
               className="btn_com prev"
               onClick={(e) => {
                  if (page === 1) {
                     e.preventDefault();
                     toast.success("첫번째 페이지입니다.");
                  } else {
                     setPage(page - 1);
                  }
               }}
            />
            {arrayNumPages.slice(startPage - 1, endPage).map((data, index) => {
               const pageNum = startPage + index;
               return (
                  <a
                     className={page === pageNum ? "active" : ""}
                     key={pageNum}
                     onClick={() => { setPage(pageNum); debugger; }}
                     style={{
                        fontWeight: page === pageNum ? 'bold' : '',
                        fontSize: page === pageNum ? '17px' : ''
                     }}
                  >
                     {pageNum}
                  </a>
               );
            })}
            <a
               className="btn_com next"
               onClick={(e) => {
                  if (page === numPages) {
                     e.preventDefault();
                     toast.success("마지막 페이지입니다.");
                  } else {
                     setPage(page + 1);
                  }
               }}
            />
            <a
               className="btn_com last"
               onClick={(e) => {
                  if (page === numPages) {
                     toast.success("마지막 페이지입니다.");
                     e.preventDefault();
                  } else {
                     setPage(numPages);
                  }
               }}
            />
         </div>
      </>
   );
}

export default CommonPaging;