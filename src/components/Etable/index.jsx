import React, { Component } from 'react'
import { Table } from 'antd' 
import Utils from "./../../utils/utils"
export default class Etable extends Component {
    //点击行
    onRowClick=(record,index)=>{
        let {selectedRowKeys,selectedItem,selectedIds,rowSelection}=this.props;
        if(rowSelection==="checkbox"){
            if(selectedIds){
                const i=selectedIds.indexOf(record.id);
                if(i===-1){
                    selectedIds.push(record.id);
                    selectedRowKeys.push(index);
                    console.log(selectedIds,selectedRowKeys,selectedItem);
                    selectedItem.push(record);
                }else{
                    selectedIds.splice(i,1);
                    selectedRowKeys.splice(i,1);
                    selectedItem.splice(i,1);
                }
            }else{
                selectedIds=[record.id];
                selectedRowKeys=[index];
                selectedItem=[record];
            }
            this.props.updateSelectedItem(selectedRowKeys,selectedItem,selectedIds)
        }else{
            let selectedRowKeys=[index];
            let selectedItem=record;
            this.props.updateSelectedItem(selectedRowKeys,selectedItem);
        }
    }
    tableInit=()=>{
        //获取传入的rowSelection的值
        let row_selection=this.props.rowSelection;
        let {selectedRowKeys}=this.props;
        const rowSelection={
            type:'radio',
            selectedRowKeys
        }
        if(row_selection===false || row_selection===null){
            row_selection=false;
        }else if(row_selection==='checkbox'){
            rowSelection.type="checkbox";
        }else{
            row_selection='radio';
        }
        return <Table  bordered {...this.props}
        rowSelection={row_selection?rowSelection:null}  
        onRow={(record,index) => {
            return {
              onClick: () => {
                  if(!row_selection){
                      return;
                  }
                  this.onRowClick(record,index);
              }, // 点击行
            };
          }} />
    }
    render() {
        return (
            <div>
                {this.tableInit()}
            </div>
        )
    }
}
