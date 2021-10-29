import React from 'react'
import { Space, Typography } from 'antd'

const { Text } = Typography;

const AntdText = ({ title, subtitle }) => {
  return (
    <Space direction="vertical">
      <Text strong>{title}</Text>
      {subtitle && <Text type="secondary">{subtitle}</Text>}
    </Space>
  )
}

export default AntdText