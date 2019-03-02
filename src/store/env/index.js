export default {
  namespaced: true,
  state: {
    device: {}
  },
  mutations:{
    SET_CORDOVA_DEVICE_INFO
  }
}

function SET_CORDOVA_DEVICE_INFO(state, device) {
  state.device = device;
}
