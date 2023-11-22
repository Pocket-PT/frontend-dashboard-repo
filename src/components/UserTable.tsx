'use client';

import React from 'react';
import { Table, Tag } from 'antd';
import type { ColumnsType, TableProps } from 'antd/es/table';
import { MemberData } from '@/custom-queries/useMemberQuery';
import numberWithCommas from '@/utils/numberWithCommas';

interface DataType extends MemberData {
  key: React.Key;
  process: number;
}

const columns: ColumnsType<DataType> = [
  {
    title: '이름',
    dataIndex: 'name',
  },
  {
    title: '연락처',
    dataIndex: 'phoneNumber',
    render: (phoneNumber: string) => {
      const numericString = phoneNumber.replace(/\D/g, '');
      const formattedPhoneNumber = numericString.replace(
        /(\d{3})(\d{4})(\d{4})/,
        '$1-$2-$3',
      );
      return <span>{formattedPhoneNumber}</span>;
    },
  },
  {
    title: '상태',
    dataIndex: 'status',
    render: (status: string) => {
      const generateStatusColor = (status: string) => {
        if (status === 'pending') return 'gold';
        if (status === 'active') return 'geekblue';
        if (status === 'expired') return 'volcano';
        return 'red';
      };
      return <Tag color={generateStatusColor(status)}>{status}</Tag>;
    },
  },
  {
    title: '등록일',
    dataIndex: 'startDate',
    sorter: {
      compare: (a, b) =>
        new Date(a.startDate).getTime() - new Date(b.startDate).getTime(),
      multiple: 2,
    },
  },
  {
    title: '만료일',
    dataIndex: 'expiredDate',
    sorter: {
      compare: (a, b) =>
        new Date(a.expiredDate).getTime() - new Date(b.expiredDate).getTime(),
      multiple: 1,
    },
  },
  {
    title: '진행율',
    dataIndex: 'process',
    sorter: {
      compare: (a, b) => a.process - b.process,
      multiple: 1,
    },
    render: (process: number) => {
      return <span>{process}%</span>;
    },
  },
  {
    title: '금액',
    dataIndex: 'paymentAmount',
    sorter: {
      compare: (a, b) => a.paymentAmount - b.paymentAmount,
      multiple: 1,
    },
    render: (paymentAmount: number) => {
      return <span>{numberWithCommas(paymentAmount)}원</span>;
    },
  },
  {
    title: 'DM',
    render: () => {
      return <span>DM</span>;
    },
  },
];

const onChange: TableProps<DataType>['onChange'] = (
  pagination,
  filters,
  sorter,
  extra,
) => {
  console.log('params', pagination, filters, sorter, extra);
};

interface UserTableProps {
  data: DataType[] | undefined;
  setAccoundId: React.Dispatch<React.SetStateAction<number>>;
  setPtMatchingId: React.Dispatch<React.SetStateAction<number>>;
}

const UserTable: React.FC<UserTableProps> = ({
  data,
  setAccoundId,
  setPtMatchingId,
}) => {
  return (
    <Table
      onRow={(record) => {
        return {
          onClick: () => {
            setAccoundId(record.accountId);
            setPtMatchingId(record.ptMatchingId);
          }, // click row
          // onDoubleClick: (event) => {
          //   console.log('DoubleClickevent: ', event);
          //   redirect(`/${record.accountId}`);
          // },
          // onContextMenu: (event) => {},
          // onMouseEnter: (event) => {}, // mouse enter row
          // onMouseLeave: (event) => {},
        };
      }}
      columns={columns}
      dataSource={data}
      onChange={onChange}
      pagination={{ position: ['bottomCenter'], pageSize: 4 }}
    />
  );
};
export default UserTable;
