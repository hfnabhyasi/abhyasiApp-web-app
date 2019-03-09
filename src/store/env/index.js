export default {
  namespaced: true,
  state: {
    device: {},
    file: {}
  },
  mutations:{
    SET_CORDOVA_DEVICE_INFO:(state, device) => state.device = device,
    SET_CORDOVA_FILE_INFO:(state, file) => state.file = file
  }
}
//
// function SET_CORDOVA_DEVICE_INFO(state, device) {
//   state.device = device;
// }
//
// function SET_CORDOVA_FILE_INFO(state, file) {
//   state.
// }
