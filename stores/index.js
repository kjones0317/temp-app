import Common from "./common";

const stores = {};
stores.common = new Common({ stores });
console.log(stores);
export default stores;
