<template>
	<el-dialog v-model="visible" :title="!dataForm.id ? '新增' : '修改'" :close-on-click-modal="false">
		<el-form ref="dataFormRef" :model="dataForm" :rules="dataRules" label-width="100px" @keyup.enter="submitHandle()">
	    				<el-form-item label="" prop="id">
					<el-input v-model="dataForm.id" placeholder=""></el-input>
				</el-form-item>
				<el-form-item label="模块id" prop="moduleId">
					<el-input v-model="dataForm.moduleId" placeholder="模块id"></el-input>
				</el-form-item>
				<el-form-item label="电压等级" prop="voltageLevel">
					<el-input v-model="dataForm.voltageLevel" placeholder="电压等级"></el-input>
				</el-form-item>
				<el-form-item label="芯数
" prop="coreNumber">
					<el-input v-model="dataForm.coreNumber" placeholder="芯数
"></el-input>
				</el-form-item>
				<el-form-item label="截面
" prop="section">
					<el-input v-model="dataForm.section" placeholder="截面
"></el-input>
				</el-form-item>
				<el-form-item label="电缆外径" prop="cableOuterDiameter">
					<el-input v-model="dataForm.cableOuterDiameter" placeholder="电缆外径"></el-input>
				</el-form-item>
				<el-form-item label="最小转弯半径
" prop="minimumTurningRadius">
					<el-input v-model="dataForm.minimumTurningRadius" placeholder="最小转弯半径
"></el-input>
				</el-form-item>
				<el-form-item label="电缆盘圈长度
" prop="cableCoilLength">
					<el-input v-model="dataForm.cableCoilLength" placeholder="电缆盘圈长度
"></el-input>
				</el-form-item>
				<el-form-item label="电缆盘圈量（m）
" prop="cableReelCoilQuantity">
					<el-input v-model="dataForm.cableReelCoilQuantity" placeholder="电缆盘圈量（m）
"></el-input>
				</el-form-item>
				<el-form-item label="版本号" prop="version">
					<el-input v-model="dataForm.version" placeholder="版本号"></el-input>
				</el-form-item>
				<el-form-item label="删除标识  0：正常   1：已删除" prop="deleted">
					<el-input v-model="dataForm.deleted" placeholder="删除标识  0：正常   1：已删除"></el-input>
				</el-form-item>
				<el-form-item label="创建者" prop="creator">
					<el-input v-model="dataForm.creator" placeholder="创建者"></el-input>
				</el-form-item>
				<el-form-item label="创建时间" prop="createTime">
					<el-input v-model="dataForm.createTime" placeholder="创建时间"></el-input>
				</el-form-item>
				<el-form-item label="更新者" prop="updater">
					<el-input v-model="dataForm.updater" placeholder="更新者"></el-input>
				</el-form-item>
				<el-form-item label="更新时间" prop="updateTime">
					<el-input v-model="dataForm.updateTime" placeholder="更新时间"></el-input>
				</el-form-item>
		</el-form>
		<template #footer>
			<el-button @click="visible = false">取消</el-button>
			<el-button type="primary" @click="submitHandle()">确定</el-button>
		</template>
	</el-dialog>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { ElMessage } from 'element-plus/es'
import { useSk_project_cable_moduleApi, useSk_project_cable_moduleSubmitApi } from '@/api/maku/sk_project_cable_module'

const emit = defineEmits(['refreshDataList'])

const visible = ref(false)
const dataFormRef = ref()

const dataForm = reactive({
	id: '',
	moduleId: '',
	voltageLevel: '',
	coreNumber: '',
	section: '',
	cableOuterDiameter: '',
	minimumTurningRadius: '',
	cableCoilLength: '',
	cableReelCoilQuantity: '',
	version: '',
	deleted: '',
	creator: '',
	createTime: '',
	updater: '',
	updateTime: ''})

const init = (id?: number) => {
	visible.value = true
	dataForm.id = ''

	// 重置表单数据
	if (dataFormRef.value) {
		dataFormRef.value.resetFields()
	}

	if (id) {
		getSk_project_cable_module(id)
	}
}

const getSk_project_cable_module = (id: number) => {
	useSk_project_cable_moduleApi(id).then(res => {
		Object.assign(dataForm, res.data)
	})
}

const dataRules = ref({
})

// 表单提交
const submitHandle = () => {
	dataFormRef.value.validate((valid: boolean) => {
		if (!valid) {
			return false
		}

		useSk_project_cable_moduleSubmitApi(dataForm).then(() => {
			ElMessage.success({
				message: '操作成功',
				duration: 500,
				onClose: () => {
					visible.value = false
					emit('refreshDataList')
				}
			})
		})
	})
}

defineExpose({
	init
})
</script>
