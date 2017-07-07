    /**
     * Created by hao.cheng on 2017/4/15.
     */
    import React, { Component }  from 'react';
    import { Table, Form, Row, Col, Input, Button, Icon, Card,notification} from 'antd';
    import BreadcrumbCustom from '../../BreadcrumbCustom';
    import dva, { connect } from 'dva';
    import {Request} from "../../../utils"
    const FormItem = Form.Item;

    export const productListModel = {
        namespace: 'productListModel',
        state: {
            columns : [
                {
                    title: '商品名称',
                    dataIndex: 'name1',
                    key: 'name1',
                },
                {
                    title: '商品分类',
                    dataIndex: 'productCateName',
                    key: 'productCateName',

                }, {
                    title: '商品品牌',
                    dataIndex: 'productBrandName',
                    key: 'productBrandName',
                }, {
                    title: '成本价',
                    dataIndex: 'costPrice',
                    key: 'costPrice',

                },
                {
                    title: '保护价',
                    dataIndex: 'protectedPrice',
                    key: 'protectedPrice',

                },
                {
                    title: '库存',
                    dataIndex: 'productStock',
                    key: 'productStock',

                },{
                    title: '销量',
                    dataIndex: 'actualSales',
                    key: 'actualSales',

                },
                {
                    title: '创建时间',
                    dataIndex: 'createTime',
                    key: 'createTime',

                },{
                    title: '上架时间',
                    dataIndex: 'upTime',
                    key: 'upTime',

                },
                {
                    title: '店铺分类',
                    dataIndex: 'sellerCateName',
                    key: 'sellerCateName',

                },
                {
                    title: '是否店铺推荐',
                    dataIndex: 'sellerIsTop',
                    key: 'sellerIsTop',
                    render: function(text, record, index) {
                        if (text == 1) {
                            return "不推荐"
                        }else{
                            return "推荐"
                        }
                    }
                },
                {
                    title: '状态',
                    dataIndex: 'state',
                    key: 'state',
                    render: function(text, record, index) {
                        if(text==1)
                        {
                            return "刚创建"
                        }
                        else if(text==2)
                        {
                            return "提交审核"
                        }
                        else if(text==3)
                        {
                            return "审核通过"
                        }
                        else if(text==4)
                        {
                            return "申请驳回"
                        }
                        else if(text==5)
                        {
                            return "商品删除"
                        }
                        else if(text==6)
                        {
                            return "上架"
                        }
                        else if(text==7)
                        {
                            return "下架"
                        }
                    }
                }
                ],
            rows: [],
            loading: false,
            selectId:{
                message:"",
                pro_id:"",
                success:"",
                pro_state:"",
                result:"",
            },
            pagination: {
                current: 1,
                total: 0,
                pageSize: 10,
            },
        },
        reducers: {
            fetchEnd(state, { payload }) {
                return { ...state, ...payload};
            },
            fetchStart (state, { payload }) {
                return { ...state, ...payload};
            },
            saveId (state, { payload }) {
                console.log("payload1" , payload);
                return { ...state, ...payload};
            },
            savecommit(state, { payload }) {
                console.log("payload1" , payload);
                return { ...state, ...payload};
            },
        },
        effects: {
            *fetch({payload}, {call, put}){
            try {
                    yield put({ type: 'fetchStart', payload: {loading: true}});
                    const {rows, total} = yield call(Request, 'seller/newServer/product/list', {page: payload.current, rows: payload.pageSize, sellerId:1});//,state:7
                    console.log(rows);
                    payload.total = total;
                    yield put({ type: 'fetchEnd', payload: { rows, pagination:payload, loading: false}});
                } catch (error) {
                     console.log("error")
                }

            },
            *godel({payload}, {call, put})
            {
                debugger;
                const {message,success} = yield call(Request, 'seller/newServer/product/del', {id:payload.pro_id});
                yield put({ type: 'saveId', payload: { message, success, loading: false}});
                payload.message=message;
                payload.success=success;
                notification.config({
                    placement: 'topLeft',
                    top: 300 ,
                    duration: 3,
                });
                if(payload.success){
                    notification.open({
                        message: "删除成功!",
                        style: {
                            width: 600,
                            marginLeft: 500,
                        },
                    });
                }else{
                    notification.open({
                        message: payload.message,
                        style: {
                            width: 600,
                            marginLeft: 500,
                        },
                    });
                }
            },
            *gocommit({payload}, {call, put})
            {
                debugger;
                const {message,success} = yield call(Request, 'seller/newServer/product/commit', {ids:payload.pro_id});
                yield put({ type: 'savecommit', payload: { message, success, loading: false}});
                payload.message=message;
                payload.success=success;
                notification.config({
                    placement: 'topLeft',
                    top: 300 ,
                    duration: 3,
                });
                if(payload.success){
                    notification.open({
                        message: "提交成功!",
                        style: {
                            width: 600,
                            marginLeft: 500,
                        },
                    });
                }else{
                    notification.open({
                        message: payload.message,
                        style: {
                            width: 600,
                            marginLeft: 500,
                        },
                    });
                }
            },
            *goUpdown({payload}, {call, put})
            {
                debugger;
                const {message,success} = yield call(Request, 'seller/newServer/product/handler', {ids:payload.pro_id ,type:payload.pro_state});
                yield put({ type: 'savecommit', payload: { message, success, loading: false}});
                payload.message=message;
                payload.success=success;
                notification.config({
                    placement: 'topLeft',
                    top: 300 ,
                    duration: 3,
                });
                if(payload.success){
                    notification.open({
                        message: "操作成功!",
                        style: {
                            width: 600,
                            marginLeft: 500,
                        },
                    });
                }else{
                    notification.open({
                        message: payload.message,
                        style: {
                            width: 600,
                            marginLeft: 500,
                        },
                    });
                }
            },

            *fetchSearch ({payload}, {call, put}){
                try {
                    alert("2");
                    yield put({ type: 'fetchStart', payload: {loading: true}});
                    const {rows} = yield call(Request, 'seller/newServer/product/list?sellerId=1', payload);
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

        state = {
            selectedRowKeys: [], // Check here to configure the default column
            loading: false,
            pro_id:"",

        }
        onSelectChange = (selectedRowKeys,rowSelection) => {
            if(rowSelection[0]!=null){
                debugger;
                this.props.selectId.pro_id=rowSelection[0].id;
                this.props.selectId.pro_state=rowSelection[0].state;
                console.log(this.props.selectId.pro_id);
            }
            this.setState({ selectedRowKeys:selectedRowKeys});
        }
        handleSearch = (e) => {
            e.preventDefault();
            this.props.form.validateFields((err, values) => {
                if (!err) {
                    const {dispatch} = this.props;
                    dispatch({type: 'productListModel/fetchSearch', payload: values});
                }
            });
        }
        componentDidMount() {
            const {pagination, dispatch} = this.props;
            dispatch({type: 'productListModel/fetch', payload: pagination});

        }

        handleClick = (e) => {
            debugger;
            const {selectId,pagination,dispatch} = this.props;
            dispatch({type: 'productListModel/godel', payload: selectId});
            dispatch({type: 'productListModel/fetch', payload: pagination});
        }

        handleCheck=(e)=>{
        debugger;
            if(this.props.selectId.pro_state!=""){
                if(this.props.selectId.pro_state==1){

                    const {selectId,pagination,dispatch} = this.props;
                    dispatch({type: 'productListModel/gocommit', payload: selectId});
                    dispatch({type: 'productListModel/fetch', payload: pagination});

                }else{
                    notification.open({
                        message: "该商品已通过审核!",
                        style: {
                            width: 600,
                            marginLeft: 500,
                        },
                    });
                }

            }else{
                notification.open({
                    message: "请选择一件商品!",
                    style: {
                        width: 600,
                        marginLeft: 500,
                    },
                });
            }
        }

        handleupdawn=(e)=>{
            debugger;
            let state=e;
            if(state==6){
                this.props.selectId.pro_state="6"
                const {selectId,pagination,dispatch} = this.props;
                dispatch({type: 'productListModel/goUpdown', payload: selectId});
                dispatch({type: 'productListModel/fetch', payload: pagination});
            }else{
                this.props.selectId.pro_state="7"
                const {selectId,pagination,dispatch} = this.props;
                dispatch({type: 'productListModel/goUpdown', payload: selectId});
                dispatch({type: 'productListModel/fetch', payload: pagination});
            }
        }

        handleTableChange = (pagination, filters, sorter) => {
            const {dispatch} = this.props;
            dispatch({type: 'productListModel/fetch', payload: pagination});
            dispatch({type: 'productListModel/setPage', payload: pagination});
        }

        render() {
            const { loading, selectedRowKeys } = this.state;
            const rowSelection = {
                selectedRowKeys,
                onChange: this.onSelectChange,
                type:"radio",
            };
            const hasSelected = selectedRowKeys.length > 0;
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
                            <Card title="商品列表" bordered={false}>
                                <Row type="flex" justify="start" gutter={20}>
                                    <Col span={4}>
                                        <FormItem>
                                            {getFieldDecorator('q_name1', {
                                                rules: [{ required: false, message: '请输入商品名称' }],
                                            })(
                                                <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="请输入商品名称" />
                                            )}
                                        </FormItem>
                                    </Col>

                                </Row>
                                <Row>
                                    <Col span={24} style={{ textAlign:'left', paddingBottom: 20 }}>
                                        <Button type="primary" htmlType="submit">查找</Button>
                                        <Button style={{ marginLeft: 8 }}>
                                            重置
                                        </Button>
                                    </Col>
                                </Row>
                                <Row>
                                    <div>
                                        <Col span={24} style={{ textAlign: 'left', paddingBottom: 20 }}>
                                        <Button type="primary" onClick={this.handleClick} >删除商品</Button>
                                        <Button onClick={this.handleCheck} >提交审核</Button>
                                        <Button type="primary"  onClick={()=>{this.handleupdawn(6);}}>上架</Button>
                                        <Button onClick={()=>{this.handleupdawn(7);}}>下架</Button>
                                        </Col>
                                    </div>
                                </Row>
                                <span style={{ marginLeft: 8 }}>
                                    {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
                                </span>
                                <Table columns={columns}
                                       rowKey={record => record.id}
                                       rowSelection={rowSelection}
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

        return { ...state.productListModel };
    }
    export default connect(mapStateToProps)(Form.create()(BasicTable));