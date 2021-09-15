import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Skeleton from 'antd/es/skeleton';
import Tabs from 'antd/es/tabs';
import Empty from 'antd/es/empty';
import { blocksAPI } from '../../api/blocks';
import BlockInfo from './components/BlockInfo';
import BlockTx from './components/BlockTx';

const { TabPane } = Tabs;

const Block = () => {
  const { hash } = useParams();
  const [blockData, setBlockData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  useEffect(() => {
    (async () => {
      try {
        const blocks = await blocksAPI.getByHash(hash);
        setBlockData(blocks.data);
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
        <Tabs tabPosition="left">
          <TabPane tab="Block Info" key="1">
            <BlockInfo hash={hash} blockData={blockData} />
          </TabPane>
          <TabPane tab="Block Transactions" key="2">
            <BlockTx tx={blockData.tx} />
          </TabPane>
        </Tabs>
        )}
      </>
      )}

    </>
  );
};

export default Block;
