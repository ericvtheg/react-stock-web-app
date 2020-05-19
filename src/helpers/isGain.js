import React from 'react';
import { CaretUpOutlined, CaretDownOutlined } from '@ant-design/icons';

function isGain(change){
    const percentChange = parseFloat(change).toFixed(2);
    if (percentChange > 0){
      return (
        <span className="green">
          <CaretUpOutlined className="green"/> &nbsp; {percentChange}%
        </span> 
      );
    } else if (percentChange < 0) {
      return (
        <span className="red">
          <CaretDownOutlined /> &nbsp; {percentChange}%
        </span>
      )
    } else {
      return <>-</>;
    }
  }

export {isGain};