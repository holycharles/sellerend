/**
 * Created by hao.cheng on 2017/4/15.
 */
import React, { Component }  from 'react';
import { Form, Input, Tooltip, Icon, Radio,Cascader, Select, Row, Col, Checkbox,DatePicker, Button, AutoComplete } from 'antd';
const FormItem = Form.Item;
import dva, { connect } from 'dva';
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;
let cateId;
import {Request} from "../../../utils"
import Moment from 'moment'
const RadioGroup = Radio.Group;
export const productAddModel = {
    namespace: 'productAddModel',
    state: {

        rows: [],
        catePath:"",
        brandList:[],
        sellList:[],
        valueob: 1,

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
        *getData({payload}, {call, put}){

            const data=yield call(Request, 'seller/newServer/product/add', {seller_id:1,cateId:13},'POST');
            let obj=eval(data.data);
          console.log("AAAAAA"+JSON.stringify(obj))
          /*  console.log("aaaaa"+obj.catePath)*/
/*
    console.log("barnndnddndn"+provinceOptions)*/
            yield put({ type: 'fetchEnd', payload: { "catePath" : obj.catePath,"brandList":obj.brand,"sellList":obj.sellerCate}})

            //   console.log(JSON.stringify(data.data))
          //  console.log("1111"+data)
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
                dispatch({type: 'productAddModel/fetchSearch', payload: values});
            }
        });
    }
    componentDidMount() {
        const {dispatch} = this.props;
        console.log(this.props);

        dispatch({type: 'productAddModel/getData'})
    }

    onChange(value){

        cateId=value[2];

    }
    onggChange(value){

     alert(value)

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


        let children = [];
        let selectObj=  this.props.brandList;
        for (let i = 0; i < selectObj.length; i++) {
            children.push(<Option key={selectObj[i].id}>{selectObj[i].nameFirst}{selectObj[i].name}</Option>);
        }



/*
        let selectSellList=  this.props.sellList;
        for (let i = 0; i < selectSellList.length; i++) {
            cataList.push(<Option key={selectSellList[i].value}>{selectObj[i].nameFirst}{selectObj[i].name}</Option>);
        }*/

        return (
            <Form onSubmit={this.handleSubmit}>

                <FormItem
                    {...formItemLayout}
                    label="商品分类"
                    hasFeedback
                >
                    <Tooltip placement="topLeft" title="Prompt Text" arrowPointAtCenter>
                        {this.props.catePath}
                    </Tooltip>
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="商品品牌"
                    hasFeedback
                >

                    {getFieldDecorator('brandId', {

                        rules: [{  required: true, }],
                    })(

                        <Select   showSearch
                                  placeholder="请选择人员"
                                  optionFilterProp="children"
                                  notFoundContent="无法找到"
                                  searchPlaceholder="输入关键词"  style={{ width: 400 }} onChange={this.handleProvinceChange}>
                            {children}
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

                    })(
                        <DatePicker

                            showTime
                            format="YYYY-MM-DD HH:mm:ss"
                            placeholder="请选择日期"

                        />
                    )}

                </FormItem>


                <FormItem
                    {...formItemLayout}
                    label="商家自有商品分类: "
                    hasFeedback
                >

                    {getFieldDecorator('sellerCate_0', {

                    })(
                        <Cascader   options={this.props.sellList} onChange={this.onChange}  style={{ width: '100%'}} />
                    )}

                </FormItem>


                <FormItem
                    {...formItemLayout}
                    label="是否商家推荐:"
                    hasFeedback
                >

                    {getFieldDecorator('sellerIsTop', {
                        initialValue:1,
                        rules: [{ required: true}],

                    })(
                        <RadioGroup >
                            <Radio value={1}>不推荐</Radio>
                            <Radio value={2}>推荐</Radio>
                        </RadioGroup>
                    )}

                </FormItem>


                <FormItem
                    {...formItemLayout}
                    label="是否启用规格:"
                    hasFeedback
                >

                    {getFieldDecorator('isNorm', {
                        initialValue:1,
                        rules: [{ required: true}],

                    })(
                        <RadioGroup onChange={this.onggChange} >
                            <Radio value={1}>不启用</Radio>
                            <Radio value={2}>启用</Radio>
                        </RadioGroup>
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