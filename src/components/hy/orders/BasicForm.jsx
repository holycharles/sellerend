/**
 * Created by hao.cheng on 2017/4/15.
 */
import React, { Component }  from 'react';
import { Table, Form, Row, Col, Input, Button, Icon, Card } from 'antd';
import BreadcrumbCustom from '../../BreadcrumbCustom';
import dva, { connect } from 'dva';
import {Request} from "../../../utils"
const FormItem = Form.Item;

export const testFormModel = {
  namespace: 'testFormModel',
  state: {
    columns : [
        {
            title: '订单编号',
            dataIndex: 'orderSn',
            key: 'orderSn',

        },
         {
            title: '买家用户名',
            dataIndex: 'memberName',
            key: 'memberName',

        },
        {
          title: '店铺',
          dataIndex: 'sellerName',
          key: 'sellerName',
      },
        {
            title: '商品金额',
            dataIndex: 'moneyProduct',
            key: 'moneyProduct',
        },
        {
            title: '订单总金额 ',
            dataIndex: 'moneyOrder',
            key: 'moneyOrder',
        },
        {
            title: '付款状态',
            dataIndex: '',
            key: '',
        },
        {
            title: '订单状态',
            dataIndex: 'orderState',
            key: 'orderState',
        },
        {
            title: '发票状态',
            dataIndex: 'invoiceStatus',
            key: 'invoiceStatus',
        },
        {
            title: '发票抬头',
            dataIndex: 'invoiceTitle',
            key: 'invoiceTitle',
        },
        {
            title: '发票类型',
            dataIndex: 'invoiceType',
            key: 'invoiceType',
        },
        {
            title: '支付方式',
            dataIndex: 'paymentName',
            key: 'paymentName',
        },
        {
            title: '物流名称',
            dataIndex: 'logisticsName',
            key: 'logisticsName',
        },
        {
            title: '快递单号 ',
            dataIndex: 'logisticsNumber',
            key: 'logisticsNumber',
        },
          {
              title: '发货时间',
              dataIndex: 'deliverTime',
              key: 'deliverTime',
          },
        {
          title: '创建时间 ',
          dataIndex: 'createTime',
          key: 'createTime',

      },
        {
            title: '修改时间',
            dataIndex: 'updateTime',
            key: 'updateTime',

        }
    ],
      rows: [],
      loading: false,
      pagination: {
           current: 1,
           total: 0,
           pageSize: 10,
      },
  },
  reducers: {
      fetchEnd(state, { payload }) {
          //console.log("payload1" , payload);
          return { ...state, ...payload};
      },
      fetchStart (state, { payload }) {
          //console.log("payload1" , payload);
          return { ...state, ...payload};
      },
  },
  effects: {
    *fetch({payload}, {call, put}){
           try {
                yield put({ type: 'fetchStart', payload: {loading: true}});
                const {memberId, pagination} = payload;
                const {rows, total} = yield call(Request, 'seller/newServer/order/orders/list', {page: pagination.current, rows: pagination.pageSize, sellerId:memberId});
                pagination.total = total;
                yield put({ type: 'fetchEnd', payload: { rows, pagination:pagination, loading: false}});

            } catch (error) {
                console.log(error)
            }
     },
      *fetchSearch ({payload}, {call, put}){
          try {
              yield put({ type: 'fetchStart', payload: {loading: true}});
              console.log("payload", payload);
              const {rows, total} = yield call(Request, 'seller/newServer/order/orders/list?sellerId=1', payload.values);
              payload.values.total = total;
              yield put({ type: 'fetchEnd', payload: { rows, pagination: payload.values, loading: false}});

          } catch (error) {
              console.log("error")
          }
      },
      *setPage ({payload}, {call, put}){
            const {pagination} = payload;
            yield put({ type: 'fetchEnd', payload: {pagination}});
      }
  },
  subscriptions: {
        // setup({dispatch}) {
        //     dispatch({type: 'fetch'});
        // }
  },
}


class BasicTable extends Component {
    handleSearch = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const {dispatch, memberId, pagination} = this.props;
                dispatch({type: 'testFormModel/fetchSearch', payload: {values, memberId}});
                dispatch({type: 'testFormModel/setPage', payload: {pagination}});
            }
        });
    }
    componentDidMount() {
        const {pagination, dispatch, memberId} = this.props;
        console.log(memberId);
        dispatch({type: 'testFormModel/fetch', payload: {pagination, memberId}});
    }
    handleTableChange = (pagination, filters, sorter) => {
        const {dispatch, memberId} = this.props;

        dispatch({type: 'testFormModel/fetch', payload: {pagination, memberId}});
        dispatch({type: 'testFormModel/setPage', payload: {pagination}});

//        // this.setState({
        //     pagination: pager,
        // });
        // this.fetch({
        //     results: pagination.pageSize,
        //     page: pagination.current,
        //     sortField: sorter.field,
        //     sortOrder: sorter.order,
        //     ...filters,
        // });
    }
    render() {
        console.log(this.props)
        const { columns, rows } = this.props;
        const formItemLayout = {
            labelCol: { span: 5 },
            wrapperCol: { span: 19 },
        };
        const { getFieldDecorator } = this.props.form;
         return (
             <div>
                 <BreadcrumbCustom first="卖家" second="卖家" />
                 <Row>
                     <Form onSubmit={this.handleSearch}>
                         <Card title="卖家列表" bordered={false}>
                             <Row type="flex" justify="start" gutter={20}>
                                     <Col span={4}>
                                         {/*<FormItem {...formItemLayout} label={'姓名'}>*/}
                                             {/*<Input placeholder="姓名" />*/}
                                         {/*</FormItem>*/}

                                         <FormItem>
                                             {getFieldDecorator('q_orderSn', {
                                                 rules: [{ required: false, message: '请输入订单号' }],
                                             })(
                                                 <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="请输入订单号" />
                                             )}
                                         </FormItem>
                                     </Col>

                             </Row>
                             <Row>
                                 <Col span={24} style={{ textAlign: 'right', paddingBottom: 20 }}>
                                     <Button type="primary" htmlType="submit">查找</Button>
                                     <Button style={{ marginLeft: 8 }}>
                                         重置
                                     </Button>
                                 </Col>
                             </Row>
                            <Table columns={columns}
                                   dataSource={rows}
                                   pagination={this.props.pagination}
                                   onChange={this.handleTableChange}
                                   loading={this.props.loading}/>
                         </Card>
                     </Form>
                 </Row>

             </div>
        )
    }
}



function mapStateToProps(state) {

  return { ...state.testFormModel, ...state.init };
}
export default connect(mapStateToProps)(Form.create()(BasicTable));