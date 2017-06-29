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
          title: '店面名称',
          dataIndex: 'sellerName',
          key: 'sellerName',

      }, {
          title: '电话',
          dataIndex: 'mobile',
          key: 'mobile',
      }, {
          title: '地址',
          dataIndex: 'addressInfo',
          key: 'addressInfo',

      }],
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
                const {rows, total} = yield call(Request, 'seller/newServer/order/orders/list', {page: payload.current, rows: payload.pageSize, sellerId:1});
                payload.total = total;
                yield put({ type: 'fetchEnd', payload: { rows, pagination:payload, loading: false}});

            } catch (error) {
                console.log("error")
            }
     },
      *fetchSearch ({payload}, {call, put}){
          try {
              yield put({ type: 'fetchStart', payload: {loading: true}});
              const {rows} = yield call(Request, 'seller/newServer/order/orders/list?sellerId=1', payload);
              yield put({ type: 'fetchEnd', payload: { rows, pagination:payload, loading: false}});

          } catch (error) {
              console.log("error")
          }
      },
      *setPage ({payload}, {call, put}){
            yield put({ type: 'fetchEnd', payload: { pagination: payload }});
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
 //       alert(12321321)
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const {dispatch} = this.props;
                dispatch({type: 'testFormModel/fetchSearch', payload: values});
            }
        });
    }
    componentDidMount() {
        const {pagination, dispatch} = this.props;
        dispatch({type: 'testFormModel/fetch', payload: pagination});
    }
    handleTableChange = (pagination, filters, sorter) => {
        const {dispatch} = this.props;
        dispatch({type: 'testFormModel/fetch', payload: pagination});
        dispatch({type: 'testFormModel/setPage', payload: pagination});

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

  return { ...state.testFormModel };
}
export default connect(mapStateToProps)(Form.create()(BasicTable));