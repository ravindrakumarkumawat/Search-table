import React from 'react'
import { Col } from 'antd';

const AntdCol = ({
  span,
  paddingTop="0",
  paddingBottom="0",
  paddingLeft="0",
  paddingRight="0",
  children
}) => {
  return (
    <Col span={span} style={{ paddingLeft, paddingRight, paddingTop, paddingBottom }}>
      {children}
    </Col>
  )
}

export default AntdCol
