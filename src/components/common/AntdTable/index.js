import { Table } from 'antd'
import React from 'react'

const AntdTable = ({
  dataSource,
  columns,
  bordered=false, 
  scroll
}) => {
  return (
    <div>
      <Table dataSource={dataSource} columns={columns} scroll={scroll}/>
    </div>
  )
}

export default AntdTable
