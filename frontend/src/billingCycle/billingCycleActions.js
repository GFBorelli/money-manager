import axios from 'axios'
import { toastr } from 'react-redux-toastr'
import { initialize } from 'redux-form'
import { showTabs, selectTab} from '../common/tabs/tabsActions'

const BASE_URL = 'http://localhost:3003/api'
const INITIAL_VALUES = {credits: [{}], debits:[{}]}

export function init() {
    return [
        showTabs('list', 'add'),
        selectTab('list'),
        getList(),
        initialize('billingCycleForm', INITIAL_VALUES)
    ]
}

export function getList() {
    const request = axios.get(`${BASE_URL}/billingCycles`)
    return {
        type: 'BILLING_CYCLE_FETCHED',
        payload: request
    }
}

export function create(values) {
    return submit(values, 'post')
}

export function update(values) {
    return submit(values, 'put')
}

export function remove(values) {
    return submit(values, 'delete')
}

export function submit(values, method) {
    return dispatch => {
        const id = values._id ? values._id : ''
        axios[method](`${BASE_URL}/billingCycles/${id}`, values)
            .then(resp => {
                toastr.success('Sucesso', 'Operação realizada com sucesso.')
                dispatch(init())
            })
            .catch(e => {
                e.response.data.errors.forEach(error => toastr.error('Erro', error))
            })
    }
}

export function showUpdate(billingCycle) {
    return [
        showTabs('edit'),
        selectTab('edit'),
        initialize('billingCycleForm', billingCycle)
    ]
}

export function showRemove(billingCycle) {
    return [
        showTabs('remove'),
        selectTab('remove'),
        initialize('billingCycleForm', billingCycle)
    ]
}
