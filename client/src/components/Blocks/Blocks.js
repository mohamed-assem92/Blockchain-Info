import React, { useState, useEffect } from 'react';
import Table from 'antd/es/table';
import Empty from 'antd/es/empty';
import { blocksAPI } from '../../api/blocks';
import columns from './tableHelpers';

const Blocks = () => {
  const [blocksData, setBlocksData] = useState([]);
  const [APIPaginator, setAPIPaginator] = useState({
    limit: 10,
    offset: 0,
  });
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });

  const handleTableChange = (paginator) => {
    setPagination({
      ...pagination,
      current: paginator.current,
      pageSize: paginator.pageSize,
    });
    const newOffset = (paginator.current - 1) * paginator.pageSize;
    const newLimit = paginator.pageSize;
    setAPIPaginator({
      limit: newLimit,
      offset: newOffset,
    });
  };

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const blocks = await blocksAPI.getAll({
          limit: APIPaginator.limit,
          offset: APIPaginator.offset,
        });
        setBlocksData(blocks.data.data);
        setPagination({
          ...pagination,
          total: blocks.data.totalCount,
        });
      } catch (err) {
        // 'Failed to fetch data from server'
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [APIPaginator]);

  return (

    <>
      {isError && <Empty />}
      {!isError && (
      <Table
        scroll={{ y: 'calc(100vh - 25em)' }}
        columns={columns}
        rowKey={(record) => record.hash}
        dataSource={blocksData}
        pagination={pagination}
        loading={isLoading}
        onChange={handleTableChange}
      />
      )}
    </>
  );
};

export default Blocks;
