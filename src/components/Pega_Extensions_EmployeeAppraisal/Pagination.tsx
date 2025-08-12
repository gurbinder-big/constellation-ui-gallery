import React from 'react';
import type { PaginationProps } from './interfaces';

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const prevDisabled = currentPage <= 1;
  const nextDisabled = currentPage >= totalPages;

  return (
    <div style={{ display: 'flex', alignItems: 'center', margin: '10px 0' }}>
      <button onClick={() => onPageChange(currentPage - 1)} disabled={prevDisabled} type='button'>
        Prev
      </button>
      <button onClick={() => onPageChange(currentPage + 1)} disabled={nextDisabled} type='button'>
        Next
      </button>
    </div>
  );
};

export default Pagination;
