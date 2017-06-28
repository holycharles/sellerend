/**
 * Created by hao.cheng on 2017/4/15.
 */
import React, { Component, PropTypes }  from 'react';
import { Table, Form, Row, Col, Input, Button, Icon, Card,Cascader } from 'antd';
import BreadcrumbCustom from '../../BreadcrumbCustom';
import dva, { connect } from 'dva';
import {Request} from "../../../utils"
import { routerRedux } from 'dva/router'
import { browserHistory } from 'react-router'
const FormItem = Form.Item;
let cateId;
export const cateSelectModel = {
  namespace: 'cateSelectModel',
    state: {

        rows: [],

    },

  reducers: {
      fetchEnd(state, { payload }) {
          //console.log("payload1" , payload);
          console.log(payload);

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
            console.log(yield call(Request, 'seller/newServer/product/chooseCate', {sellerId:1},'POST'));
           // const {rows} = yield call(Request, 'seller/newServer/product/chooseCate.html', {sellerId:1});
            //payload.total = total;
            const {data}=yield call(Request, 'seller/newServer/product/chooseCate', {sellerId:1},'POST');
            console.log(data);
            yield put({ type: 'fetchEnd', payload: { "rows" : data}})
           // yield put({ type: 'fetchEnd', payload: { rows, pagination:payload, loading: false}});

        } catch (error) {
            console.log("error")
        }
     },
      *fetchSearch ({payload}, {call, put}){

      },
      *go ({payload}, {call, put}){
          yield put(routerRedux.push('/#/hy/orders/form'));
      }
  },
  subscriptions: {
        // setup({dispatch}) {
        //     dispatch({type: 'fetch'});
        // }
  },
}


class BasicTables extends Component {


    handleSearch = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const {dispatch} = this.props;
                dispatch({type: 'testFormModel/fetchSearch', payload: values});
            }
        });
    }
    componentDidMount() {
        const {dispatch} = this.props;
        console.log(this.props);
        dispatch({type: 'cateSelectModel/fetch'})
    }

    onChange(value){

        cateId=value[2];

    }
    goNext = (e) => {
        const {dispatch} = this.props;
        dispatch({type: 'cateSelectModel/go'})
    }

    render() {
        console.log(PropTypes);
        const { columns, rows } = this.props;
        const formItemLayout = {
            labelCol: { span: 5 },
            wrapperCol: { span: 19 },
        };
        const { getFieldDecorator } = this.props.form;
         return (
             <div>
             <BreadcrumbCustom first="商品管理" second="发布商品" />
                 <Row>
                     <Form onSubmit={this.goNext}>
                         <Card title="选择分类" bordered={false}>
                             <Row type="flex" justify="start" gutter={20}>
                                 <Col span={4}>
                                     {/*<FormItem {...formItemLayout} label={'姓名'}>*/}
                                     {/*<Input placeholder="姓名" />*/}
                                     {/*</FormItem>*/}

                                     <FormItem>
                                         <Cascader   options={rows} onChange={this.onChange}  style={{ width: '100%'}} />
                                     </FormItem>
                                 </Col>

                             </Row>
                             <Row>
                                 <Col span={24} style={{ textAlign: 'right', paddingBottom: 20 }}>
                                     <Button type="primary"  htmlType="submit" >确定</Button>
                                 </Col>
                             </Row>

                         </Card>
                     </Form>
                 </Row>

             </div>
        )
    }
}



function mapStateToProps(state) {

  return { ...state.cateSelectModel };
}
export default connect(mapStateToProps)(Form.create()(BasicTables));