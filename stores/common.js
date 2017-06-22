import { observable, action, computed } from 'mobx';

export default class Common {
  @observable temperature = '0';
  @observable step = 1;

  steps = 3;

  @action addtestMessage(message) {
    this.message = message;
  }

  @computed get progress() {
    return 100 / this.steps * (this.step + 1);
  }
}
