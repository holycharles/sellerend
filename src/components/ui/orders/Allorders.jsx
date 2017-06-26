/**
 * Created by hao.cheng on 2017/4/16.
 */
import React from 'react';
import { Table, Button,Input, Row,Icon, Col, Card,Form } from 'antd';
import { getOrders } from '../../../axios';
import BreadcrumbCustom from '../../BreadcrumbCustom';
import reqwest from 'reqwest';

const columns = [{
    title: '订单号',
    dataIndex: 'orderSn',
    width: 100,
    render: (text, record) => <a href={record.url} target="_blank">{text}</a>
}, {
    title: '店铺',
    dataIndex: 'sellerName',
    width: 80
}, {
    title: '买家用户名',
    dataIndex: 'memberName',
    width: 80
}, {
    title: '付款信息',
    dataIndex: 'paymentStatus',
    width: 200,
    render: function(text, record, index) {
        if(text==0)
        {
            return "买家未付款"
        }
        else
        {
            return "买家已付款"
        }
    }
},
    {
        title: '商品总额',
        dataIndex: 'moneyProduct',
        width: 200
    },
    {
        title: '订单总额',
        dataIndex: 'moneyOrder',
        width: 200
    }];

class AsynchronousTable extends React.Component {
    state = {
        selectedRowKeys: [],  // Check here to configure the default column
        loading: false,
        data: []
    };
    fetch = (params = {}) => {
        console.log('params:', params);
        this.setState({ loading: true });
        reqwest({
            url: 'http://localhost:8890/seller/newServer/order/orders/list',
            method: 'get',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            data: {
                rows:10,
                sellerId: 1,
                ...params,
            },
            type: 'json',
        }).then((data) => {
            const pagination = { ...this.state.pagination };
            // Read total count from server
            // pagination.total = data.totalCount;
            console.log(data.total)
            pagination.total = data.total;
            this.setState({
                loading: false,
                data: data.rows,
                pagination,
            });
        });
    };
    componentDidMount() {
        this.start();
    }
    start = () => {
        const pagination = { ...this.state.pagination };
        this.setState({ loading: true, pagination: {}, pagination: true });

   /*     getOrders().then(res => {
            pagination.total = res.total;
            this.setState({
                data: [...res.rows.map(val => {
                    val.key = val.id;
                    return val;
                })],
                loading: false,
                pagination
            });

        });*/

    };
    handleTableChange = (pagination, filters, sorter) => {

        const pager = { ...this.state.pagination };
        pager.current = pagination.current;
        this.setState({
            pagination: pager,
        });
        this.fetch({
         /*   results: pagination.pageSize,*/
            rows:10,
            page: pagination.current,

          /*  sortField: sorter.field,
            sortOrder: sorter.order,
            ...filters,*/
        });
    }
    onSelectChange = (selectedRowKeys) => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({ selectedRowKeys });
    };
    componentDidMount() {
        this.fetch();
    }
    render() {
        const { loading, selectedRowKeys } = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,

        };

        const hasSelected = selectedRowKeys.length > 0;
        return (
            <div className="gutter-example">
                <BreadcrumbCustom first="订单" second="全部订单" />
                <Row gutter={16}>
                    <Col className="gutter-row" span={24}>
                        <div className="gutter-box">
                            <Card title="全部订单" bordered={false}>
                                <div style={{ marginBottom: 16 }}>
                                  {/*  <Button type="primary" onClick={this.start}
                                            disabled={loading} loading={loading}
                                    >Reload</Button>*/}
                                    <Form
                                        className="ant-advanced-search-form"
                                        onSubmit={this.handleSearch}
                                    >
                                    <Row gutter={40}>
                                        <Col span={8}>

                                                    <Input placeholder="placeholder" />
                                            <Input placeholder="placeholder" />
                                            <Input placeholder="placeholder" />
                                            <Input placeholder="placeholder" />
                                            <Input placeholder="placeholder" />
                                            <Input placeholder="placeholder" />
                                            <Input placeholder="placeholder" />
                                            <Input placeholder="placeholder" />
                                            <Input placeholder="placeholder" /><Input placeholder="placeholder" />
                                            <Input placeholder="placeholder" /><Input placeholder="placeholder" />




                                        </Col>

                                    </Row>
                                    <Col span={24} style={{ textAlign: 'right' }}>
                                        <Button type="primary" htmlType="submit">Search</Button>
                                        <Button style={{ marginLeft: 8 }} onClick={this.handleReset}>
                                            Clear
                                        </Button>
                                        <a style={{ marginLeft: 8, fontSize: 12 }} onClick={this.toggle}>
                                            Collapse <Icon type={this.state.expand ? 'up' : 'down'} />
                                        </a>
                                    </Col>
                                    </Form>
                                    <span style={{ marginLeft: 8 }}>{hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}</span>
                                </div>
                                <Table rowSelection={rowSelection} columns={columns} dataSource={this.state.data}    onChange={this.handleTableChange}  loading={this.state.loading}  pagination={this.state.pagination} />

                            </Card>
                        </div>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default AsynchronousTable;
