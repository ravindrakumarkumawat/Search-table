import { Table } from 'antd'
import React from 'react'

const AntdTable = ({
  dataSource,
  columns,
  bordered=false
}) => {
  return (
    <div>
      <Table dataSource={dataSource} columns={columns}/>
    </div>
  )
}

export default AntdTable
