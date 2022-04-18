const steps = {
    namespaced: true,
    state: {
        userData: {
            firstName: "",
            lastName: "",
            username: "",
            email: "",
        },
        githubProfile: {},
        rules: {
            required: (value) => !!value || "Field is Required.",
            email: (value) => {
                const pattern =
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                return pattern.test(value) || "Invalid e-mail.";
            },
        },
    },
    getters: {
        rules(state) {
            return state.rules
        },
        firstName(state) {
            return state.userData.firstName
        },
        lastName(state) {
            return state.userData.lastName
        },
        email(state) {
            return state.userData.email
        },
        github(state) {
            return state.userData.githubProfile
        }
    },
    mutations: {
        setUserData(state, data) {
            Object.assign(state.userData, {...data})
        }
    },
    actions: {
        setUserData({ commit }, data) {
            commit('setUserData', data)
        }
    },
}

export default steps