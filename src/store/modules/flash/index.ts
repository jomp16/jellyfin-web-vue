import { FlashState } from "@/store/modules/flash/state";

export default {
  state: new FlashState(),
  getters: {
    flashMessage: (state: FlashState) => {
      return state.flashMessage;
    }
  },
  mutations: {
    setFlashMessage(state: FlashState, flashMessage: string|null) {
      state.flashMessage = flashMessage;
    }
  }
};
