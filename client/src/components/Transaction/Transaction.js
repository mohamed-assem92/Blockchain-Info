import React, { useState, useEffect } from 'react';
import Empty from 'antd/es/empty';
import Skeleton from 'antd/es/skeleton';
import Divider from 'antd/es/divider';
import { useParams } from 'react-router-dom';
import Descriptions from 'antd/es/descriptions';
import Typography from 'antd/es/typography';
import NumberFormat from 'react-number-format';
import { transactionsAPI } from '../../api/transactions';
import toBTC from '../../utils/toBTC';
import './transaction.css';
import {
  calculateTotalValue,
  calculateTotalInput,
  mapOut,
  mapFullInputs,
  mapFullOutput,
} from './helpers';

const { Paragraph, Text, Title } = Typography;

const Transaction = () => {
  const { hash } = useParams();
  const [txData, setTxData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [totalVal, setTotalVal] = useState(0);
  const [totalInputVal, setTotalInputVal] = useState(0);

  useEffect(() => {
    (async () => {
      try {
        const tx = await transactionsAPI.getByHash(hash);
        setTotalVal(calculateTotalValue(tx.data.out));
        setTotalInputVal(calculateTotalInput(tx.data.inputs));
        setTxData(tx.data);
      } catch (err) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [hash]);

  return (
    <>
      {isError && <Empty />}
      {!isError && (
      <>
        <Skeleton active loading={isLoading} paragraph={{ rows: 5 }} />
        {!isLoading && (
        <div style={{ overflowY: 'auto', maxHeight: '70vh' }}>
          <Divider orientation="left">
            <Title level={3}>
              Summery
            </Title>
          </Divider>

          <Paragraph>
            This transaction was first broadcast to the Bitcoin network on
            {' '}
            {new Date(txData.time * 1000).toGMTString()}
            At the time of this transaction,
            {' '}
            <Text mark>{toBTC(totalVal)}</Text>
            {' '}
            BTC was sent.
          </Paragraph>
          <Descriptions
            bordered
            column={{
              xxl: 2, xl: 2, lg: 2, md: 2, sm: 2, xs: 1,
            }}
          >
            <Descriptions.Item label="Hash"><Paragraph copyable>{txData.hash}</Paragraph></Descriptions.Item>
            <Descriptions.Item label="Out"><Paragraph>{mapOut(txData.out)}</Paragraph></Descriptions.Item>
            <Descriptions.Item label="Fee">
              <Paragraph>
                {toBTC(txData.fee)}
                {' '}
                BTC
              </Paragraph>
            </Descriptions.Item>

          </Descriptions>
          <Divider orientation="left">
            <Title level={3}>
              Details
            </Title>
          </Divider>
          <Descriptions
            bordered
            column={{
              xxl: 2, xl: 2, lg: 2, md: 2, sm: 2, xs: 1,
            }}
          >
            <Descriptions.Item label="Hash"><Paragraph>{txData.hash}</Paragraph></Descriptions.Item>
            <Descriptions.Item label="Recived Time"><Paragraph>{new Date(txData.time * 1000).toGMTString()}</Paragraph></Descriptions.Item>
            <Descriptions.Item label="Size">
              <Paragraph>
                <NumberFormat value={txData.size} displayType="text" thousandSeparator />
                {' '}
                bytes
              </Paragraph>
            </Descriptions.Item>
            <Descriptions.Item label="Weight">
              <Paragraph>
                <NumberFormat value={txData.weight} displayType="text" thousandSeparator />
              </Paragraph>
            </Descriptions.Item>
            <Descriptions.Item label="Included In Block"><Paragraph>{txData?.block_height ? txData.block_height : 'Mempool'}</Paragraph></Descriptions.Item>
            <Descriptions.Item label="Total Input">
              <Paragraph>
                {toBTC(totalInputVal)}
                {' '}
                BTC
              </Paragraph>
            </Descriptions.Item>
            <Descriptions.Item label="Total Output">
              <Paragraph>
                {toBTC(totalVal)}
                {' '}
                BTC
              </Paragraph>
            </Descriptions.Item>
            <Descriptions.Item label="Fees">
              <Paragraph>
                {toBTC(txData.fee)}
                {' '}
                BTC
              </Paragraph>
            </Descriptions.Item>
          </Descriptions>
          <Divider orientation="left">
            <Title level={3}>
              Inputs
            </Title>
          </Divider>
          <>
            {mapFullInputs(txData.inputs)}
          </>
          <Divider orientation="left">
            <Title level={3}>
              Outputs
            </Title>
          </Divider>
          <>
            {mapFullOutput(txData.out)}
          </>
        </div>
        )}
      </>
      )}
    </>
  );
};

export default Transaction;
