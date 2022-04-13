import React, { FC, useState, useRef } from 'react';
import { List, SearchBar, Button } from 'antd-mobile-v2';
import { query } from '@/services/api';
import LoadMoreListView, { LoadMoreListAttributes } from '@/index';
import Logo from '@/assets/logo.png';

const { Item } = List;
const { Brief } = Item;

const IndexPage: FC = () => {
  const [search, setSearch] = useState();
  const loadMoreList = useRef<LoadMoreListAttributes>(null);
  const row = (rowData: any, sectionID: string | number, rowID: string | number) => (
    <Item
      arrow="horizontal"
      thumb={<img src={Logo} style={{ width: '1.5rem', height: '1.5rem' }} />}
      multipleLine
      onClick={() => {}}
    >
      {rowData.title} <Brief>{rowID}</Brief>
    </Item>
  );
  const req = {
    search,
    abc: '123',
    token: 'alita',
    pagesize: 10,
    page: 1,
  };
  // 下面加了一个div是为了测试正确获取了距离屏幕的高度
  return (
    <>
      <SearchBar onSubmit={setSearch} onClear={setSearch} />
      <Button
        onClick={() => {
          loadMoreList.current.reloadDataSource();
        }}
      >
        重新加载
      </Button>
      <div style={{ position: 'relative' }}>
        <div
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            right: 0,
            bottom: 0,
          }}
        >
          <LoadMoreListView
            // autoFullViewPort
            initialListSize={25}
            ref={loadMoreList}
            requestFunc={query}
            renderRow={row}
            requestParams={req}
            alias={{
              // offset: 'abc',
              pageSize: 'pagesize',
            }}
            noData={<div style={{ height: '100px', backgroundColor: '#f40' }}>123456</div>}
          />
        </div>
      </div>
    </>
  );
};

export default IndexPage;
