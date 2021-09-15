import React from 'react';
import Descriptions from 'antd/es/descriptions';
import Typography from 'antd/es/typography';
import toBTC from '../../utils/toBTC';

const { Paragraph, Text } = Typography;

export const calculateTotalValue = (outArray) => outArray
  .reduce((acc, current) => acc + current.value, 0);

export const calculateTotalInput = (inArray) => {
  let accumulator = 0;
  inArray.forEach((input) => {
    if (input?.prev_out) {
      accumulator = input?.prev_out.value;
    }
  });
  return accumulator;
};

export const mapOut = (outArray) => outArray.map((out) => (
  <div key={out.n}>
    {out.addr ? <Text copyable>{out.addr}</Text> : 'OP_RETURN'}
    {'    '}
    <Text mark>{toBTC(out.value)}</Text>
    {' BTC'}
  </div>
));

export const mapFullInputs = (inputsArray) => inputsArray.map((input) => (
  <div key={input.index}>
    <Descriptions
      className="box"
      bordered
      column={{
        xxl: 2, xl: 2, lg: 2, md: 2, sm: 2, xs: 1,
      }}
    >
      <Descriptions.Item label="Index"><Paragraph>{input.index}</Paragraph></Descriptions.Item>
      <Descriptions.Item label="Value">
        <Paragraph>
          {toBTC(input?.prev_out?.value || 0)}
          {' '}
          BTC
        </Paragraph>
      </Descriptions.Item>
      <Descriptions.Item label="Address"><Paragraph copyable>{input?.prev_out?.addr}</Paragraph></Descriptions.Item>
      <Descriptions.Item label="Sigscript"><Paragraph>{input?.script}</Paragraph></Descriptions.Item>
      <Descriptions.Item label="Witness"><Paragraph>{input?.witness}</Paragraph></Descriptions.Item>
    </Descriptions>
    <br />
  </div>
));

export const mapFullOutput = (outputArray) => outputArray.map((output) => (
  <div
    key={output.n}
  >
    <Descriptions
      className="box"
      bordered
      column={{
        xxl: 2, xl: 2, lg: 2, md: 2, sm: 2, xs: 1,
      }}
    >
      <Descriptions.Item label="Index"><Paragraph>{output.n}</Paragraph></Descriptions.Item>
      <Descriptions.Item label="Details"><Paragraph>{output?.spent ? 'Spent' : 'Unspent'}</Paragraph></Descriptions.Item>
      <Descriptions.Item label="Address"><Paragraph copyable>{output?.addr}</Paragraph></Descriptions.Item>
      <Descriptions.Item label="Value">
        <Paragraph>
          {toBTC(output?.value || 0)}
          {' '}
          BTC
        </Paragraph>
      </Descriptions.Item>
    </Descriptions>
    <br />
  </div>
));
