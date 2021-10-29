import { Row } from 'antd'
import React from 'react'

const AntdRow = ({
  marginTop="0",
  marginBottom="0",
  marginRight="0",
  marginLeft="0",
  children
}) => {
  return (
    <Row style={{ marginTop, marginRight, marginLeft, marginBottom }}>
      {children}
    </Row>
  )
}

export default AntdRow
