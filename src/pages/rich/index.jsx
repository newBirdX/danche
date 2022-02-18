import React, { Component } from 'react'
import { Card ,Button,Modal} from 'antd'
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css"
import draftjs from 'draftjs-to-html';
export default class Rich extends Component {
     state={
         showRich:false  //显示文本内容框
     }
     onEditorStateChange=(editorState)=>{
         this.setState({
             editorState
         })
     }
     handdleClearContent=()=>{
        this.setState({
            editorState:""
        })
     }
     handdleGetText=()=>{
        this.setState({
            showRich:true
        })
     }
     onEditorChange=(contentState)=>{
        this.setState({
            contentState
        })
     }
    render() {
        let {editorState,contentState,showRich}=this.state;
        return (
            <div>
                <Card>
                    <Button type="primary" style={{marginRight:"10px"}} onClick={this.handdleClearContent}>清空内容</Button>
                    <Button type="primary" onClick={this.handdleGetText}>获取文本内容</Button>
                </Card>
                <Card title="富文本编辑器">
                    <Editor
                        editorState={editorState}
                        toolbarClassName="toolbarClassName"
                        wrapperClassName="wrapperClassName"
                        editorClassName="editorClassName"
                        onEditorStateChange={this.onEditorStateChange}
                        onContentStateChange={this.onEditorChange}
                    />;
                </Card>
                <Modal title="文本内容" visible={showRich} onCancel={()=>{this.setState({showRich:false})}} footer={null}>
                    {draftjs(contentState)}
                </Modal>
            </div>
        )
    }
}
