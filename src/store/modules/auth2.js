
import types from "../mutation-types";
import {getSingleSimData} from "../../api/api";

const state = {
    SimDateState:{},
};

// getters
const getters = {

};

// actions
const actions = {
    getSingleSimData ({commit, state}, payload) {
        return getSingleSimData(payload).then(res => {
            commit(types.GET_SINGLE_SIM, res.data.result)
        })
    },
};

const mutations = {
    [types.GET_SINGLE_SIM] (state, data) {
        if(data.entities.length > 0) {
            state.SimDateState = data.entities[0];
        }
    }
};

export default {
    state,
    getters,
    actions,
    mutations
}
