import { observable, action } from 'mobx';

export default class Common {
  @observable message = 'qweqwe';
  @action addtestMessage(message) {
    this.message = message;
  }
}
