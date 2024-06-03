import service from '@/utils/request'

export const useSk_project_cable_moduleApi = (id: number) => {
	return service.get('/maku/sk_project_cable_module/' + id)
}

export const useSk_project_cable_moduleSubmitApi = (dataForm: any) => {
	if (dataForm.id) {
		return service.put('/maku/sk_project_cable_module', dataForm)
	} else {
		return service.post('/maku/sk_project_cable_module', dataForm)
	}
}