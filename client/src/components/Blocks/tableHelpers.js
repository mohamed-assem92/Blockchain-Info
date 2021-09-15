import { Link } from "react-router-dom";

const columns = [
  {
    title: 'Block Hash',
    dataIndex: 'hash',
    render: (text) => <Link to={`/block/${text}`}>{text}</Link>,
    width: '50%',
  },
  {
    title: 'Height',
    dataIndex: 'height',
    responsive: ['md'],
  },
  {
    title: 'Index',
    dataIndex: 'block_index',
    responsive: ['md'],
  },
  {
    title: 'Time',
    dataIndex: 'time',
    responsive: ['md'],
    render: (number) => <>{new Date(number * 1000).toGMTString()}</>,
  },
];

export default columns;
