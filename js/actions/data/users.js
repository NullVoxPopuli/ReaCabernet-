import _ from 'lodash';

export const IMPORT_USER = 'data/users/IMPORT_USER';
export const EXPORT_USER = 'data/users/EXPORT_USER';

export const importUser = json => ({ type: IMPORT_USER, json });
export const exportUser = json => ({ type: EXPORT_USER, json });

export function getUserForUid(uid) {
  return (dispatch, getState) => {
    const state = getState();
    const userData = state.data.users;
    const users = userData.records;
    const user = users.find(u => u.uid === uid);

    return user;
  };
}

export function isUserIdentityValid(identityObject) {
  const config = identityObject || {};
  const result = !(
    _.isEmpty(config.alias) ||
    _.isEmpty(config.uid) ||
    _.isEmpty(config.publickey)
  );

  return result;
}
