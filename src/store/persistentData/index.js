export default {
    namespaced: true,
    state: {
        testData: {}
    },
    mutations: {
        SET_TEST_DATA_ON_STORE: (state, testData) => state.testData = testData
    }
}
