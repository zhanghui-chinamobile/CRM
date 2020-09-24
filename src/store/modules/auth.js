
import types from "../mutation-types";
import {getCarEnterprise} from "../../api/api";

const state = {
    carEnterprise:{},
};

// getters
const getters = {

};

// actions
const actions = {
    getCarEnterprise ({commit, state}, payload) {
        return getCarEnterprise(payload).then(res => {
            commit(types.GET_CAR_ENTERPRISE, res.data.result)
        })
    },
};

const mutations = {
    [types.GET_CAR_ENTERPRISE] (state, data) {
        if(data.entities.length > 0) {
            state.carEnterprise = data.entities[0];
        }
    }
};

export default {
    state,
    getters,
    actions,
    mutations
}
