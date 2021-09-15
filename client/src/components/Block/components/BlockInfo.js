import React from 'react';
import Descriptions from 'antd/es/descriptions';
import Typography from 'antd/es/typography';
import NumberFormat from 'react-number-format';
import toBTC from '../../../utils/toBTC';

const { Paragraph, Text, Title } = Typography;

const BlockInfo = ({ hash, blockData }) => (
  <>
    <Title level={3}>
      Block:
      {' '}
      {blockData.height}
    </Title>
    <Paragraph>
      This block was mined on
      {' '}
      {new Date(blockData.receviedTime * 1000).toGMTString()}
    </Paragraph>
    <Paragraph>
      The miner(s) of this block earned a fee of
      {' '}
      <Text mark>{toBTC(blockData.fee)}</Text>
      {' '}
      BTC
    </Paragraph>
    <Descriptions
      bordered
      column={{
        xxl: 2, xl: 2, lg: 2, md: 2, sm: 2, xs: 1,
      }}
    >
      <Descriptions.Item label="Hash"><Paragraph copyable>{hash}</Paragraph></Descriptions.Item>
      <Descriptions.Item label="Timestamp">{new Date(blockData.receviedTime * 1000).toLocaleString()}</Descriptions.Item>
      <Descriptions.Item label="Height">{blockData.height}</Descriptions.Item>
      <Descriptions.Item label="Number of Transactions">{blockData.nTXs}</Descriptions.Item>
      <Descriptions.Item label="Merkle root">{blockData.merkelRoot}</Descriptions.Item>
      <Descriptions.Item label="Previous block"><Paragraph copyable>{blockData.previousHash}</Paragraph></Descriptions.Item>
      <Descriptions.Item label="Version">
        {'0x'}
        {blockData.version.toString(16)}
      </Descriptions.Item>
      <Descriptions.Item label="Bits"><NumberFormat value={blockData.bits} displayType="text" thousandSeparator /></Descriptions.Item>
      <Descriptions.Item label="Weight">
        <NumberFormat value={blockData.weight} displayType="text" thousandSeparator />
        {' '}
        WU
      </Descriptions.Item>
      <Descriptions.Item label="Size">
        <NumberFormat value={blockData.size} displayType="text" thousandSeparator />
        {' '}
        bytes
      </Descriptions.Item>
      <Descriptions.Item label="Nonce"><NumberFormat value={blockData.nonce} displayType="text" thousandSeparator /></Descriptions.Item>
    </Descriptions>
  </>
);

export default BlockInfo;
