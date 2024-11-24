import React, { useState, useEffect } from 'react';

import { Pagination, Form } from 'react-bootstrap';

const PaginationComponent = ({ 
    currentPage, 
    totalPages, 
    onPageChange, 
    itemsPerPage, 
    onItemsPerPageChange 
  }) => {
    const handleClick = (page) => {
      if (page > 0 && page <= totalPages) {
        onPageChange(page);
      }
    };
  
    const renderPaginationItems = () => {
      let items = [];
      for (let page = 1; page <= totalPages; page++) {
        items.push(
          <Pagination.Item
            key={page}
            active={page === currentPage}
            onClick={() => handleClick(page)}
          >
            {page}
          </Pagination.Item>
        );
      }
      return items;
    };
  
    return (
      <div className="d-flex align-items-center">
        <Pagination className="me-3">
          <Pagination.First onClick={() => handleClick(1)} disabled={currentPage === 1} />
          <Pagination.Prev onClick={() => handleClick(currentPage - 1)} disabled={currentPage === 1} />
          {renderPaginationItems()}
          <Pagination.Next onClick={() => handleClick(currentPage + 1)} disabled={currentPage === totalPages} />
          <Pagination.Last onClick={() => handleClick(totalPages)} disabled={currentPage === totalPages} />
       
  
        {/* Items per page selector */}
        <Form.Select
          value={itemsPerPage}
          onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
          style={{ width: '120px', height:'35px', marginLeft:'15px'}}
        >
         
          <option value={10}>10 per page</option>
          <option value={20}>20 per page</option>
          <option value={50}>50 per page</option>
          <option value={100}>100 per page</option>
          <option value={300}>300 per page</option>
          <option value={500}>500 per page</option>
        </Form.Select>
        </Pagination>
      </div>
    );
  };

export default PaginationComponent;