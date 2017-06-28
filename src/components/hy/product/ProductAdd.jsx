/**
 * Created by hao.cheng on 2017/4/15.
 */
import React, { Component }  from 'react';
import { Table, Form, Row, Col, Input, Button, Icon, Card,Cascader } from 'antd';
import BreadcrumbCustom from '../../BreadcrumbCustom';
import dva, { connect } from 'dva';
import {Request} from "../../../utils"
import { browserHistory } from 'react-router'
const FormItem = Form.Item;
let cateId;
export const productAddModel = {
    namespace: 'productAddModel',
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
        *setPage ({payload}, {call, put}){

        }
    },
    subscriptions: {
        // setup({dispatch}) {
        //     dispatch({type: 'fetch'});
        // }
    },
}


class BasicTablesAdd extends Component {
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


        browserHistory.push("ad");
        //    alert(cateId)

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
              这是要添加的

            </div>
        )
    }
}



function mapStateToProps(state) {

    return { ...state.productAddModel };
}
export default connect(mapStateToProps)(Form.create()(BasicTablesAdd));