<template>
<div>
    <el-form :inline="true" :model="add" class="demo-form-inline">
        <el-form-item label="id">
            <el-input v-model="add.id" placeholder="id"></el-input>
        </el-form-item>
        <el-form-item label="code">
            <el-input v-model="add.code" placeholder="code"></el-input>
        </el-form-item>
        <el-form-item label="name">
            <el-input v-model="add.name" placeholder="name"></el-input>
        </el-form-item>
        <el-form-item label="create time">
            <el-date-picker
                    v-model="add.createTime"
                    type="datetime"
                    placeholder="选择日期时间">
            </el-date-picker>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="addRole">添加</el-button>
        </el-form-item>
    </el-form>

    <el-table
            :data="roleList.filter(data => !search || data.code.toLowerCase().includes(search.toLowerCase()))">
        <el-table-column
                label="id"
                prop="id">
        </el-table-column>
        <el-table-column
                label="code"
                prop="code">
        </el-table-column>
        <el-table-column
                label="name"
                prop="name">
        </el-table-column>
        <el-table-column
                label="create time"
                prop="createTime">
        </el-table-column>
        <el-table-column
                align="right">
            <template slot="header" slot-scope="scope">
                <el-input
                        v-model="search"
                        size="mini"
                        placeholder="输入关键字搜索"/>
            </template>
            <template slot-scope="scope">
                <el-popover
                        trigger="click">
                    <el-form :model="scope.row">
                        <el-form-item label="id">
                            <el-input v-model="scope.row.id" placeholder="id"></el-input>
                        </el-form-item>
                        <el-form-item label="code">
                            <el-input v-model="scope.row.code" placeholder="code"></el-input>
                        </el-form-item>
                        <el-form-item label="name">
                            <el-input v-model="scope.row.name" placeholder="name"></el-input>
                        </el-form-item>
                        <el-form-item label="create time">
                            <el-date-picker
                                    v-model="scope.row.createTime"
                                    type="datetime"
                                    placeholder="选择日期时间">
                            </el-date-picker>
                        </el-form-item>
                    </el-form>
                    <el-button size="mini" plain slot="reference">Edit</el-button>
                </el-popover>
                <el-button
                        size="mini"
                        type="danger"
                        @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
            </template>
        </el-table-column>
    </el-table>

    <el-pagination
            background
            layout="prev, pager, next, jumper"
            @size-change="queryByNewSize"
            @current-change="queryByPageNum"
            :page-size.sync="page.size"
            :pager-count="page.count"
            :current-page.sync="page.current"
            :total="allData.length">
    </el-pagination>
</div>
</template>

<script>
    export default {
        name: "mytable",
        data() {
            return {
                roleList: [],
                allData: [
                    {id: 1, code: 'admin', name: '系统管理员', createTime: '2020-11-29 1:00:00'},
                    // 数据自行构造
                ],
                search: '',
                add: {},
                page: {
                    size: 5,
                    //显示页码个数，超过5页折叠，值范围：[5,21]
                    count: 5,
                    current: 1,
                }
            }
        },
        created: function() {
            this.resetRoleList()
        },
        methods: {
            handleEdit(index, row) {
                console.log(index, row);
            },
            handleDelete(index) {
                this.allData.splice(index, 1)
                this.resetRoleList()
            },
            addRole() {
                this.allData.push(this.add)
                this.resetRoleList()
            },
            queryByNewSize(newSize) {
                this.page.size = newSize;
                this.resetRoleList()
            },
            queryByPageNum(newPageNum) {
                this.page.current = newPageNum;
                this.resetRoleList()
            },
            resetRoleList() {
                let start = (this.page.current - 1) * this.page.size;
                let end = this.page.current * this.page.size;
                this.roleList = this.allData.slice(start, end)
            },
        },
    }
</script>

<style scoped>
    .el-form {
        width: 80%;
        margin: 0 10% 0 10%;
    }
    .el-table {
        width: 80%;
        margin: 0 10% 0 10%;
    }
    .el-pagination {
        width: 80%;
        margin: 10px 10% 0 10%;
    }
</style>
