<template>
  <div>
    <el-form :inline="true" :model="dataForm" :rules="dataRule" ref="form">
      <el-form-item prop="name">
        <el-input v-model="dataForm.name" placeholder="姓名" maxlength="10" class="input" clearable="clearable" />
      </el-form-item>
      <el-form-item>
        <el-select v-model="dataForm.sex" class="input" placeholder="性别" clearable="clearable">
          <el-option label="男" value="男" />
          <el-option label="女" value="女" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-select v-model="dataForm.role" class="input" placeholder="角色" clearable="clearable">
          <el-option v-for="one in dataForm.roleList" :label="one.roleName" :value="one.roleName" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-select v-model="dataForm.deptId" class="input" placeholder="部门" clearable="clearable">
          <el-option v-for="one in dataForm.deptList" :label="one.deptName" :value="one.id" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-select v-model="dataForm.status" class="input" placeholder="状态" clearable="clearable">
          <el-option label="在职" value="1" />
          <el-option label="离职" value="2" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="searchHandle()">查询</el-button>
        <el-button type="primary" :disabled="!proxy.isAuth(['ROOT', 'USER:INSERT'])" @click="addHandle()">
          新增
        </el-button>
        <el-button type="danger" :disabled="!proxy.isAuth(['ROOT', 'USER:DELETE'])" @click="deleteHandle()">
          批量删除
        </el-button>
      </el-form-item>
    </el-form>
    <el-table :data="data.dataList" :header-cell-style="{ 'background': '#f5f7fa' }" border v-loading="data.loading"
      @selection-change="selectionChangeHandle">
      <el-table-column type="selection" header-align="center" align="center" width="50" />
      <el-table-column type="index" header-align="center" align="center" width="100" label="序号">
        <template #default="scope">
          <span>{{ (data.pageIndex - 1) * data.pageSize + scope.$index + 1 }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="name" header-align="center" align="center" min-width="100" label="姓名" />
      <el-table-column prop="sex" header-align="center" align="center" min-width="60" label="性别" />
      <el-table-column prop="tel" header-align="center" align="center" min-width="130" label="电话" />
      <el-table-column prop="email" header-align="center" align="center" min-width="240" label="邮箱"
        :show-overflow-tooltip="true" />
      <el-table-column prop="hiredate" header-align="center" align="center" min-width="130" label="入职日期" />
      <el-table-column prop="roles" header-align="center" align="center" min-width="150" label="角色"
        :show-overflow-tooltip="true" />
      <el-table-column prop="dept" header-align="center" align="center" min-width="120" label="部门" />
      <el-table-column prop="status" header-align="center" align="center" min-width="100" label="状态" />
      <el-table-column header-align="center" align="center" width="150" label="操作">
        <template #default="scope">
          <el-button type="text" v-if="proxy.isAuth(['ROOT', 'USER:UPDATE'])" @click="updateHandle(scope.row.id)">
            修改
          </el-button>
          <el-button type="text" v-if="proxy.isAuth(['ROOT', 'USER:UPDATE'])"
            :disabled="scope.row.status == '离职' || scope.row.root" @click="dismissHandle(scope.row.id)">
            离职
          </el-button>
          <el-button type="text" :disabled="scope.row.root" v-if="proxy.isAuth(['ROOT', 'USER:DELETE'])"
            @click="deleteHandle(scope.row.id)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination @size-change="sizeChangeHandle" @current-change="currentChangeHandle" :current-page="data.pageIndex"
      :page-sizes="[10, 20, 50]" :page-size="data.pageSize" :total="data.totalCount"
      layout="total, sizes, prev, pager, next, jumper"></el-pagination>
  </div>
</template>

<script lang="ts" setup>
import { reactive, getCurrentInstance, ref, onMounted } from 'vue';
const { proxy } = getCurrentInstance();
import { dayjs } from 'element-plus';

const dataForm = reactive({
  name: '',
  sex: '',
  role: '',
  deptId: '',
  status: '',
  roleList: [],
  deptList: []
});
const dataRule = reactive({
  name: [{ required: false, pattern: '^[\u4e00-\u9fa5]{1,10}$', message: '姓名格式错误' }]
});
const data = reactive({
  dataList: [],
  pageIndex: 1,
  pageSize: 10,
  totalCount: 0,
  loading: false,
  selections: []
});
</script>