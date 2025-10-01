import AsyncStorage from '@react-native-async-storage/async-storage';

export const setkeyArrayValues = async (key = 'lineItems', setValue = {}) => {
 try {
  setTimeout(() => {
    AsyncStorage.getItem(key).then(values => {
      if (values) {

        let items = JSON.parse(values);
        let count = items.length;
        setValue['id'] = count+1;
        items.push(setValue);
         AsyncStorage.setItem(key, JSON.stringify(items));
      } else {
        setValue['id'] = 1;
        let data = [];
        data.push(setValue);
        AsyncStorage.setItem(key, JSON.stringify(data));
      }
    });
  }, 300);
 }catch (e) {
   console.error('Saving error', e);
 }
};
export const removekeyArrayValues = async (key = 'lineItems', id) => {
  try {
    setTimeout(() => {
      AsyncStorage.getItem(key).then(values => {
        if (values) {
          let items = JSON.parse(values);
          let newdata = items.filter(data => data.id !== id);
          AsyncStorage.setItem(key, JSON.stringify(newdata));
        }
      });
    }, 300);
  } catch (e) {
    console.error('Reading error', e);
  }
};
export const getValuesById = async (key = 'lineItems', id) => {
  try {
    let values = await AsyncStorage.getItem(key);
    if (values) {
      let list = JSON.parse(values);
      let newdata = list.filter(data => data.id === 2);
      return newdata;
    }
  } catch (e) {
    console.log(e);
    return false;
  }
  return;
};
