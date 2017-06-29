/**
 * Created by hao.cheng on 2017/4/15.
 */
import React, { Component }  from 'react';
import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox,DatePicker, Button, AutoComplete } from 'antd';
const FormItem = Form.Item;
import dva, { connect } from 'dva';
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;
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
             /*   console.log(yield call(Request, 'seller/newServer/product/chooseCate', {sellerId:1},'POST'));*/
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



        //    alert(cateId)

    }

    render() {
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 14,
                    offset: 6,
                },
            },
        };
        const { columns, rows } = this.props;
        const formItemLayout = {
            labelCol: { span: 5 },
            wrapperCol: { span: 19 },
        };
        const { getFieldDecorator } = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit}>

                <FormItem
                    {...formItemLayout}
                    label="商品分类"
                    hasFeedback
                >
                    <Tooltip placement="topLeft" title="Prompt Text" arrowPointAtCenter>
                        A/B/C
                    </Tooltip>
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="商品品牌"
                    hasFeedback
                >

                    {getFieldDecorator('brandId', {
                        initialValue: ['use'],
                        rules: [{  required: true, }],
                    })(
                        <Select placeholder="选择品牌">
                            <Option value="china">China</Option>
                            <Option value="use">U.S.A</Option>
                        </Select>
                    )}

                </FormItem>

                <FormItem
                    {...formItemLayout}
                    label={(
                        <span>商品名称&nbsp;
                            <Tooltip title="商品的名称?">
                <Icon type="question-circle-o" />
              </Tooltip>
            </span>
                    )}
                    hasFeedback
                >
                    {getFieldDecorator('name1', {
                        rules: [{ required: true, message: 'Please input your nickname!', whitespace: true }],
                    })(
                        <Input />
                    )}
                </FormItem>

                <FormItem
                    {...formItemLayout}
                    label={(
                        <span>spu&nbsp;

            </span>
                    )}
                    hasFeedback
                >
                    {getFieldDecorator('productCode', {
                        rules: [{ required: true, message: '请输入SPU', whitespace: true }],
                    })(
                        <Input />
                    )}
                </FormItem>

                <FormItem
                    {...formItemLayout}
                    label="关键字"
                    hasFeedback
                >

                    {getFieldDecorator('keyword', {
                        rules: [{ required: true, message: '请输入关键字', whitespace: true }],
                    })(
                        <Input />
                    )}

                </FormItem>


                <FormItem
                    {...formItemLayout}
                    label="成本价"
                    hasFeedback
                >

                    {getFieldDecorator('costPrice', {
                        rules: [{ required: true, message: '请输入成本价', whitespace: true }],
                    })(
                        <Input />
                    )}

                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="市场价"
                    hasFeedback
                >

                    {getFieldDecorator('  marketPrice', {
                        rules: [{ required: true, message: '请输入市场价', whitespace: true }],
                    })(
                        <Input />
                    )}

                </FormItem>


                <FormItem
                    {...formItemLayout}
                    label="商城价"
                    hasFeedback
                >

                    {getFieldDecorator('mallPcPrice', {
                        rules: [{ required: true, message: '请输入商城价', whitespace: true }],
                    })(
                        <Input />
                    )}

                </FormItem>

                <FormItem
                    {...formItemLayout}
                    label="商城价(mobile)"
                    hasFeedback
                >

                    {getFieldDecorator('malMobilePrice', {
                        rules: [{ required: true, message: '请输入商城价(mobile)', whitespace: true }],
                    })(
                        <Input />
                    )}

                </FormItem>


                <FormItem
                    {...formItemLayout}
                    label="保护价"
                    hasFeedback
                >

                    {getFieldDecorator('protectedPrice', {
                        rules: [{ required: true, message: '请输入保护价', whitespace: true }],
                    })(
                        <Input />
                    )}

                </FormItem>

                <FormItem
                    {...formItemLayout}
                    label="虚拟销量"
                    hasFeedback
                >

                    {getFieldDecorator('virtualSales', {
                        rules: [{ required: true, message: '请输入虚拟销量', whitespace: true }],
                    })(
                        <Input />
                    )}

                </FormItem>


                <FormItem
                    {...formItemLayout}
                    label="上架时间"
                    hasFeedback
                >

                    {getFieldDecorator('upTime', {
                        rules: [{ required: true, message: '请选择日期', whitespace: true }],
                    })(
                        <DatePicker

                            showTime
                            format="YYYY-MM-DD HH:mm:ss"
                            placeholder="请选择日期"

                        />
                    )}

                </FormItem>


                <FormItem {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit" size="large">确定</Button>
                </FormItem>
            </Form>
        )
    }
}



function mapStateToProps(state) {

    return { ...state.productAddModel };
}
export default connect(mapStateToProps)(Form.create()(BasicTablesAdd));