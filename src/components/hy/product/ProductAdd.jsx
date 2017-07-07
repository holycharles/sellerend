/**
 * Created by hao.cheng on 2017/4/15.
 */
import React, { Component }  from 'react';
import { Form, Input, Tooltip, Icon, Radio,Cascader, Select, Row, Col, Table,Checkbox,DatePicker, Button, AutoComplete } from 'antd';
const FormItem = Form.Item;
import dva, { connect } from 'dva';
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;
let cateId;
import {Request} from "../../../utils"
import Moment from 'moment'
const RadioGroup = Radio.Group;
const CheckboxGroup = Checkbox.Group;

export const productAddModel = {
    namespace: 'productAddModel',
    state: {

        rows: [],
        catePath:"",
        brandList:[],
        sellList:[],
        valueob: 1,
        showtable:false,
        dataSource:false,
        showtablenrom:false,
        normList:[],
        checkBoxValue:[],
        normListTabel:[],
        columns :[],


/* columns : [
 {
 title: '规格',
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
 }

 ],*/
    },

    reducers: {
        fetchEnd(state, { payload }) {
            //console.log("payload1" , payload);
            console.log("aaaaaaaaaaaaaaaaaa",payload.aaa);
            if(payload.aaa) {

                console.log(state.columns.indexOf(payload.aaa))

               state.columns.unshift(payload.aaa);

            }
            console.log(state);
            //console.log([...state.columns,...payload.aaa]);
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
            yield put({ type: 'fetchEnd', payload: { "catePath" : obj.catePath,"brandList":obj.brand,"sellList":obj.sellerCate,"normList":obj.normList}})

            //   console.log(JSON.stringify(data.data))
            //  console.log("1111"+data)
        },
        *isNormCk ({payload}, {call, put}){

            if(payload==2)
            {
                yield put({ type: 'fetchEnd', payload: {"showtable":true }})



            }
            else
            {
                yield put({ type: 'fetchEnd', payload: {"showtable":false }})
                yield put({ type: 'fetchEnd', payload: {"showtablenrom":false }})

            }


        },
        *xzChane ({payload}, {call, put}){
/*
 let aaa={
     title: '库存ss',
     dataIndex: 'kcss',

 }*/
            let aaa= [{
                title: 'sku',
                dataIndex: 'sku',
            }, {
                title: '库存',
                dataIndex: 'kc',

            }, {
                title: '住址',
                dataIndex: 'address',

            },
                {
                    title: 'PC价格',
                    dataIndex: 'pcprice',

                },{
                    title: 'mobile价格',
                    dataIndex: 'mobilePric',

                }]

            //console.log(payload.e);
            let obj
            let nonres=payload.e;
            let normlist=payload.norms;
            let  xx
            console.log("ddddddd",normlist)

            for(var i=0;i<normlist.length;i++)
            {
                let obj=normlist[i].attrList;

                for(var b=0;b<obj.length;b++) {

                    for (var j = 0; j < nonres.length; j++) {
                        if(obj[b].value== nonres[j]) {
                              xx={
                                title: normlist[i].name,
                                dataIndex: '1',

                            }

                        }

                    }
                }
            }
            aaa.push(xx)
            yield put({ type: 'fetchEnd', payload: {"showtablenrom":true, "columns":aaa }})
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
    show =() =>  {
        let abc = [];
        if(this.props.showtable) {
            /* alert(this.props.normList)*/
            let objn = this.props.normList;
            for (var i = 0; i < objn.length; i++) {
             //   console.log(objn[i].attrList)

                abc.push(

                    <CheckboxGroup options={objn[i].attrList} onChange={this.xzChane}/>

                )
            }
        }

        return abc;


    }

    showtable =() =>  {
        let abc = [];
        if(this.props.showtablenrom) {
            console.log("sadasdassadsa")
            abc.push(

                <Table dataSource={this.props.dataSource} columns={this.props.columns} />

            )
        }

        return abc;


    }
    componentDidMount() {
        const {dispatch} = this.props;
      //  console.log(this.props);

        dispatch({type: 'productAddModel/getData'})
    }

    onChange(value){

        cateId=value[2];

    }
    onggChange = (e) =>{
      //  console.log("__________________",e.target.value)
        const {dispatch} = this.props;
        //    this.props.form.getFieldValue('isNorm')
        dispatch({type: 'productAddModel/isNormCk',payload: e.target.value})


    }
    xzChane = (e) =>{
   //      console.log("__________________",e)
    //    console.log("ddddddd",this.props.normList)
        const {dispatch} = this.props;
        let norms=this.props.normList;


        dispatch({type: 'productAddModel/xzChane',payload: {e, norms}})

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
                {this.show()}
                </FormItem>
                <FormItem {...tailFormItemLayout}>
                    {this.showtable()}
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