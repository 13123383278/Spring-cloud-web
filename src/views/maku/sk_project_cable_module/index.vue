<template>
	<el-card class="layout-query">
		<el-form ref="queryRef" :inline="true" :model="state.queryForm" @keyup.enter="getDataList()">
					<el-form-item prop="moduleId">
			  <el-input v-model="state.queryForm.moduleId" placeholder="模块id"></el-input>
			</el-form-item>
			<el-form-item prop="voltageLevel">
			  <el-input v-model="state.queryForm.voltageLevel" placeholder="电压等级"></el-input>
			</el-form-item>
			<el-form-item prop="coreNumber">
			  <el-input v-model="state.queryForm.coreNumber" placeholder="芯数
"></el-input>
			</el-form-item>
			<el-form-item prop="section">
			  <el-input v-model="state.queryForm.section" placeholder="截面
"></el-input>
			</el-form-item>
			<el-form-item prop="cableOuterDiameter">
			  <el-input v-model="state.queryForm.cableOuterDiameter" placeholder="电缆外径"></el-input>
			</el-form-item>
			<el-form-item prop="minimumTurningRadius">
			  <el-input v-model="state.queryForm.minimumTurningRadius" placeholder="最小转弯半径
"></el-input>
			</el-form-item>
			<el-form-item prop="cableCoilLength">
			  <el-input v-model="state.queryForm.cableCoilLength" placeholder="电缆盘圈长度
"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button icon="Search" type="primary" @click="getDataList()">查询</el-button>
			</el-form-item>
			<el-form-item>
				<el-button icon="RefreshRight" @click="reset(queryRef)">重置</el-button>
			</el-form-item>
		</el-form>
	</el-card>

	<el-card>
		<el-space>
			<el-space>
				<el-button v-auth="'maku:sk_project_cable_module:save'" icon="Plus" type="primary" @click="addOrUpdateHandle()">新增</el-button>
			</el-space>
			<el-space>
				<el-button v-auth="'maku:sk_project_cable_module:delete'" icon="Delete" plain type="danger" @click="deleteBatchHandle()">批量删除</el-button>
			</el-space>
		</el-space>
		<el-table v-loading="state.dataListLoading" :data="state.dataList" border class="layout-table" @selection-change="selectionChangeHandle">
			<el-table-column type="selection" header-align="center" align="center" width="50"></el-table-column>
			<el-table-column prop="id" label="" header-align="center" align="center"></el-table-column>
			<el-table-column prop="moduleId" label="模块id" header-align="center" align="center"></el-table-column>
			<el-table-column prop="voltageLevel" label="电压等级" header-align="center" align="center"></el-table-column>
			<el-table-column prop="coreNumber" label="芯数
" header-align="center" align="center"></el-table-column>
			<el-table-column prop="section" label="截面
" header-align="center" align="center"></el-table-column>
			<el-table-column prop="cableOuterDiameter" label="电缆外径" header-align="center" align="center"></el-table-column>
			<el-table-column prop="minimumTurningRadius" label="最小转弯半径
" header-align="center" align="center"></el-table-column>
			<el-table-column prop="cableCoilLength" label="电缆盘圈长度
" header-align="center" align="center"></el-table-column>
			<el-table-column prop="cableReelCoilQuantity" label="电缆盘圈量（m）
" header-align="center" align="center"></el-table-column>
			<el-table-column prop="version" label="版本号" header-align="center" align="center"></el-table-column>
			<el-table-column prop="deleted" label="删除标识  0：正常   1：已删除" header-align="center" align="center"></el-table-column>
			<el-table-column prop="creator" label="创建者" header-align="center" align="center"></el-table-column>
			<el-table-column prop="createTime" label="创建时间" header-align="center" align="center"></el-table-column>
			<el-table-column prop="updater" label="更新者" header-align="center" align="center"></el-table-column>
			<el-table-column prop="updateTime" label="更新时间" header-align="center" align="center"></el-table-column>
			<el-table-column label="操作" fixed="right" header-align="center" align="center" width="150">
				<template #default="scope">
					<el-button v-auth="'maku:sk_project_cable_module:update'" type="primary" link @click="addOrUpdateHandle(scope.row.id)">修改</el-button>
					<el-button v-auth="'maku:sk_project_cable_module:delete'" type="primary" link @click="deleteBatchHandle(scope.row.id)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
		<el-pagination
			:current-page="state.page"
			:page-sizes="state.pageSizes"
			:page-size="state.limit"
			:total="state.total"
			layout="total, sizes, prev, pager, next, jumper"
			@size-change="sizeChangeHandle"
			@current-change="currentChangeHandle"
		>
		</el-pagination>

		<!-- 弹窗, 新增 / 修改 -->
		<add-or-update ref="addOrUpdateRef" @refreshDataList="getDataList"></add-or-update>
	</el-card>
</template>

<script setup lang="ts" name="MakuSk_project_cable_moduleIndex">
	import {useCrud} from '@/hooks'
	import {reactive, ref} from 'vue'
	import {IHooksOptions} from '@/hooks/interface'
	import AddOrUpdate from './add-or-update.vue'

	const state: IHooksOptions = reactive({
	dataListUrl: '/maku/sk_project_cable_module/page',
	deleteUrl: '/maku/sk_project_cable_module',
	queryForm: {
		moduleId: '', 
		voltageLevel: '', 
		coreNumber: '', 
		section: '', 
		cableOuterDiameter: '', 
		minimumTurningRadius: '', 
		cableCoilLength: ''
	}
})

const queryRef = ref()
const addOrUpdateRef = ref()
const addOrUpdateHandle = (id?: number) => {
	addOrUpdateRef.value.init(id)
}

const { getDataList, selectionChangeHandle, sizeChangeHandle, currentChangeHandle, deleteBatchHandle, reset } = useCrud(state)
</script>
