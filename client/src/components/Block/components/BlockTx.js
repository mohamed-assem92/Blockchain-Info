import React, { useState } from 'react';
import Table from 'antd/es/table';
import { Link } from "react-router-dom";
import toBTC from '../../../utils/toBTC';

const columns = [
  {
    title: 'Tx Hash',
    dataIndex: 'hash',
    render: (text) => <Link to={`/transaction/${text}`}>{text}</Link>,
    width: '50%',
  },
  {
    title: 'Fee',
    dataIndex: 'fee',
    responsive: ['md'],
    render: (number) => (
      <>
        {toBTC(number)}
        {' '}
        BTC
      </>
    ),
  },
  {
    title: 'Time',
    dataIndex: 'time',
    responsive: ['md'],
    render: (number) => <>{new Date(number * 1000).toGMTString()}</>,
  },
];

const BlockTx = ({ tx }) => {
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: tx.length,
  });

  const handleTableChange = (paginator) => {
    setPagination({
      ...pagination,
      current: paginator.current,
      pageSize: paginator.pageSize,
    });
  };

  return (
    <>
      <Table
        scroll={{ y: 'calc(100vh - 25em)' }}
        columns={columns}
        rowKey={(record) => record.hash}
        dataSource={tx}
        pagination={pagination}
        onChange={handleTableChange}
      />
    </>
  );
};

export default BlockTx;
