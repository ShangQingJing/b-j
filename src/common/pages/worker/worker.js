import React, { Component } from 'react';
import './worker.css';
import { Upload, message, Modal } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import left from '../../../img/left.png';
import { get, post } from '../http/http';
import Combtn from '../combtn/combtn.js';
import { add } from '../redux/action/todolist';
import { uploadper, show, Apiurl } from '../api/api.js';
import { connect } from 'react-redux';
import Bottom from '../bottom/bottom.js';
let Apishow = Apiurl + show
let Global = require('../Global/Global.js');
function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}
function beforeUpload(file) {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
        message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
}
@connect((state) => ({
    Specialtype: state.Specialtype,
    companyinformation: state.companyinformation,
    getsucureinformation:state.getsucureinformation
})
)
class Worker extends Component {
    constructor() {
        super();
        this.state = {
            loading: false,
            list: 'aaa',
            perso: ['否', '是'],
            index: 0,
            previewVisible: false,
            previewImage: '',
            fileList: [],
            persex: ['男', '女'],
            sex: 0,
            perdv: ['有', '无'],
            dv: 0,
            PersonnelInfoEntity: {
                personnelOtherInfoEntity: {
                    hallName: '项目部食堂',
                },
                sex: 0
            },
            Personalimg: '',
            Specialtype: ''
        }
    };
    handlePersonal = (info) => {//上传个人照片
        const _self = this;
        const arry = [];
        let file = info.file.originFileObj;
        let type = 1;
        const PersonnelInfoEntity = _self.state.PersonnelInfoEntity;
        arry.push(file);
        let param = new FormData();
        Global.multipartFile = true;
        for (var i = 0; i < arry.length; i++) {
            param.append('files', arry[i]);
        };
        if (info.file.status === 'uploading') {
            this.setState({ loading: true });
            return;
        };
        if (info.file.status === 'done') {
            post(uploadper, param, type).then(res => {
                console.log(res, 666);
                if (res.code == 200) {
                    PersonnelInfoEntity.pictureId = res.data.join('');
                    _self.setState({
                        loading: false,
                        Personalimg: Apishow + res.data.join('')
                    }, () => {
                        console.log(_self.state.PersonnelInfoEntity, _self.state.Personalimg)
                    });
                }
            });
        }
    };
    handleChange = info => {
        if (info.file.status === 'uploading') {
            this.setState({ loading: true });
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj, imageUrl =>
                this.setState({
                    imageUrl,
                    loading: false,
                }),
            );
        }
    };
    getcapture = (i) => {
        const _self = this;
        _self.setState({
            index: i
        });
    };
    getsex = (i) => {
        const _self = this;
        const PersonnelInfoEntity = _self.state.PersonnelInfoEntity;
        PersonnelInfoEntity.sex = i;
        _self.setState({
            sex: i,
            PersonnelInfoEntity: PersonnelInfoEntity
        });
    };
    getdv = (i) => {
        const _self = this;
        _self.setState({
            dv: i
        });
    }
    handleCancel = () => this.setState({ previewVisible: false });

    handlePreview = async file => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }

        this.setState({
            previewImage: file.url || file.preview,
            previewVisible: true,
        });
    };
    componentDidMount() {
        const _self = this;
        const PersonnelInfoEntity = _self.state.PersonnelInfoEntity;
        PersonnelInfoEntity.personTypeId = _self.props.Specialtype.personTypeId === 0 ? '' : _self.props.Specialtype.personTypeId;
        PersonnelInfoEntity.companyId = _self.props.companyinformation.companyId === 0 ? '' : _self.props.companyinformation.companyId
        _self.setState({
            PersonnelInfoEntity: PersonnelInfoEntity,
        });
    };
    Jumpspecial = (item) => {//人员类别跳转
        const _self = this;
        if (item.type === 0) {
            _self.props.history.push('/special');
        };
        if (item.type === 1) {
            _self.props.history.push('/company');
        };
        if (item.type === 2) {
            _self.props.history.push('/securetype');
        };
    };
    Checksex = (i) => {
        const _self = this;
        const { persex, sex, PersonnelInfoEntity } = _self.state;
        PersonnelInfoEntity.sex = i;
        _self.setState({
            sex: i,
            PersonnelInfoEntity: PersonnelInfoEntity
        });
    };
    handleInput = (e) => {
        const _self = this;
        const name = e.target.name;
        const value = e.target.value;
        const PersonnelInfoEntity = _self.state.PersonnelInfoEntity;
        PersonnelInfoEntity[name] = value;
        _self.setState({
            PersonnelInfoEntity: PersonnelInfoEntity
        });
    };
    handledoor = (e) => {
        const _self = this;
        const name = e.target.name;
        const value = e.target.value;
        const { PersonnelInfoEntity } = _self.state;
        PersonnelInfoEntity.personnelOtherInfoEntity[name] = value;
        _self.setState({
            PersonnelInfoEntity: PersonnelInfoEntity
        });
    }
    handleDouble = ({ fileList }) => {
        // console.log(fileList,123)
        // this.setState({ fileList });
    }
    render() {
        const _self = this;
        const { aaa, Personalimg, Specialtype, perso, imageUrl, index, previewVisible, previewImage, fileList, persex, sex, perdv, dv } = _self.state
        const uploadButton = (
            <div>
                {this.state.loading ? <LoadingOutlined /> : <PlusOutlined />}
                <div className="ant-upload-text">Upload</div>
            </div>
        );
        return (
            <div className="container">
                <div className="Personal-work">个人照片:</div>
                <Upload
                    name="avatar"
                    listType="picture-card"
                    className="avatar-uploader"
                    showUploadList={false}
                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                    beforeUpload={beforeUpload}
                    onChange={this.handlePersonal}
                >
                    {Personalimg ? <img src={Personalimg} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                </Upload>
                <div className="Personal-rows">
                    <div className="Personal-txt">食堂:</div>
                    <div className="Personal-cols">
                        <div>项目食堂</div>
                        <img src={left} />
                    </div>
                </div>
                <div className="Personal-rows">
                    <div className="Personal-txt">是否有三级教育:</div>
                    <div className="Personal-cols">
                        {
                            perso.map((item, i) => {
                                return <div className={`Personal-yes ${i == index ? 'active' : ''}`} onClick={() => _self.getcapture(i)}>{item}</div>
                            })
                        }
                    </div>
                </div>
                {
                    index == 1 ? <div className="clearfix">
                        <Upload
                            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                            listType="picture-card"
                            fileList={fileList}
                            onPreview={this.handlePreview}
                            onChange={this.handleChange}
                        >
                            {fileList.length >= 8 ? null : uploadButton}
                        </Upload>
                    </div> : null
                }

                <div className="Personal-rows">
                    <div className="Personal-txt">人员类别:</div>
                    <div className="Personal-cols" onClick={() => _self.Jumpspecial({ type: 0 })}>
                        <div>{_self.props.Specialtype.name}</div>
                        <img src={left} />
                    </div>
                </div>
                <div className="Personal-rows">
                    <div className="Personal-txt">姓名:</div>
                    <div className="Personal-cols">
                        <input placeholder="请输入姓名" name="name" onChange={e => _self.handleInput(e)} />
                    </div>
                </div>
                <div className="Personal-rows">
                    <div className="Personal-txt">性别:</div>
                    <div className="Personal-cols">
                        {

                            persex.map((item, i) => {
                                return <div className={`Personal-yes ${i == sex ? 'active' : ''}`} onClick={_self.Checksex.bind(_self, i)}>{item}</div>
                            })
                        }

                    </div>
                </div>
                <div className="Personal-rows" onClick={() => _self.Jumpspecial({ type: 1 })}>
                    <div className="Personal-txt">公司名称:</div>
                    <div className="Personal-cols">
                        <div>{_self.props.companyinformation.name}</div>
                        <img src={left} />
                    </div>
                </div>
                <div className="Personal-rows">
                    <div className="Personal-txt">身份证:</div>
                    <div className="Personal-cols">
                        <input placeholder="请输入身份证" name="idCardNum" onChange={e => _self.handleInput(e)} />
                    </div>
                </div>
                <div className="Personal-rows">
                    <div className="Personal-txt">门禁:</div>
                    <div className="Personal-cols">
                        <input placeholder="请输入门禁" name="doorControlName" onChange={e => _self.handledoor(e)} />
                    </div>
                </div>
                <div className="Personal-rows">
                    <div className="Personal-txt">特殊工种类别:</div>
                    <div className="Personal-cols" onClick={() => _self.Jumpspecial({ type: 2 })}>
                    <div>{_self.props.getsucureinformation.name}</div>
                        <img src={left} />
                    </div>
                </div>
                <div className="Personal-rows">
                    <div className="Personal-txt">定位功能:</div>
                    <div className="Personal-cols">
                        {

                            perdv.map((item, i) => {
                                return <div className={`Personal-yes ${i == dv ? 'active' : ''}`} onClick={() => _self.getdv(i)}>{item}</div>
                            })
                        }

                    </div>
                </div>
                <div className="Personal-rows">
                    <div className="Personal-txt">人员供应商:</div>
                    <div className="Personal-cols">
                        <div>未知</div>
                        <img src={left} />
                    </div>
                </div>
                <div className="Personal-rows">
                    <div className="Personal-txt">电话:</div>
                    <div className="Personal-cols">
                        <input placeholder="请输入电话" name="cellPhoneNum" onChange={e => _self.handleInput(e)} />
                    </div>
                </div>
                <div className="Personal-work">特殊工种照片:</div>
                <div className="clearfix">
                    <Upload
                        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                        listType="picture-card"
                        fileList={fileList}
                        onPreview={this.handlePreview}
                        onChange={this.handleDouble}
                    >
                        {fileList.length >= 8 ? null : uploadButton}
                    </Upload>
                </div>
                <div className="Personal-work">身份证正面照片（国徽面）:</div>
                <Upload
                    name="avatar"
                    listType="picture-card"
                    className="avatar-uploader"
                    showUploadList={false}
                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                    beforeUpload={beforeUpload}
                    onChange={this.handleChange}
                >
                    {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                </Upload>
                <div className="Personal-work">身份证反面照片:</div>
                <Upload
                    name="avatar"
                    listType="picture-card"
                    className="avatar-uploader"
                    showUploadList={false}
                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                    beforeUpload={beforeUpload}
                    onChange={this.handleChange}
                >
                    {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                </Upload>
                <div className="Personal-rows">
                    <div className="Personal-txt">备注:</div>
                    <div className="Personal-cols">
                        <input placeholder="请输入备注" name="remark" onChange={e => _self.handleInput(e)} />
                    </div>
                </div>
                <Combtn list={_self.state.list} Jumpdetail={_self.Jumpdetail} />
            </div>
        )
    }
}
export default Worker