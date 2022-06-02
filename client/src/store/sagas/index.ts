/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  put, call, takeEvery, select,
} from '@redux-saga/core/effects';
import axios from 'axios';
import { isEmpty } from 'lodash';
import { User, UserModelFromServer } from '../../types';

import { selectedLanguagesSelector } from '../selectors/cards';
import { selectedUserSelector } from '../selectors/user';
import {
  getAllCards,
  initCardCreation, initCardDeletion, initCardEditing, setAllCards, setSelectedCards,
} from '../slices/card-slice';
import {
  getAllUsersInfo, setAllUsersInfo, setSelectedUserId, setSelectedUserInfo,
} from '../slices/user-slice';
import { setAlert, setIsLoading } from '../slices/utility-slice';

interface TestInterface {
  method?: string,
  endpoint: string,
  body?: Record<string, string>
}

const basicFetchUrl = process.env.REACT_APP_FETCH_BASE_URL || '';

function fetchData(
  { method, endpoint, body } : TestInterface,
) {
  return axios({
    method: method || 'post',
    url: `${basicFetchUrl}/${endpoint}`,
    data: body && body,
  });
}

function* fetchAllUsersSaga(): any {
  yield put(setIsLoading(true));
  const { data: allUsers } = yield call(() => fetchData({ method: 'get', endpoint: '' }));
  yield put(
    setAllUsersInfo(
      allUsers.map((user: UserModelFromServer) => ({
        firstName: user.first_name,
        lastName: user.last_name,
        id: user._id,
      })),

    ),
  );
  yield put(setIsLoading(false));
}

function* fetchSelectedUserSaga(action: any): any {
  const selectedUser = yield call(() => fetchData({ endpoint: 'user', body: { userId: action.payload.id } }));
  yield put(
    setSelectedUserInfo({
      firstName: selectedUser.data.first_name,
      lastName: selectedUser.data.last_name,
    }),
  );
  yield put(setIsLoading(false));
}

function* fetchAllCardsSaga(): any {
  const { id: userId } = yield select(selectedUserSelector);
  const allCards = yield call(() => fetchData({ endpoint: 'cards', body: { userId } }));
  yield put(setAllCards(allCards.data.map((card: Record<string, string>) => {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const { user_id, _id, ...words } = card;
    return ({
      userId: user_id,
      cardId: _id,
      ...words,
    });
  })));
}

function* fetchSelectedCardsSaga(action?: any): any {
  if (!action || isEmpty(action.payload)) {
    const languages = yield select(selectedLanguagesSelector);
    const { id: userId } = yield select(selectedUserSelector);
    const selectedCards = yield call(() => fetchData({ endpoint: 'cards/selected', body: { userId, languages } }));
    yield put(setSelectedCards(selectedCards.data.map((card: Record<string, string>) => {
    // eslint-disable-next-line @typescript-eslint/naming-convention
      const { user_id, _id, ...words } = card;
      return ({
        userId: user_id,
        cardId: _id,
        ...words,
      });
    })));
  }
}

function* editCardSaga(action: any): any {
  const editedCard = yield call(() => fetchData({ endpoint: 'cards/edit', body: action.payload, method: 'patch' }));
  yield put(setAlert({
    active: true,
    result: editedCard.data.modifiedCount,
    action: 'edit',
    entity: 'card',
  }));
  yield put(setIsLoading(false));
  yield fetchSelectedCardsSaga();
}

function* createCardSaga(action: any): any {
  const newCard = yield call(() => fetchData({ endpoint: 'cards/create', body: action.payload }));
  yield put(setAlert({
    active: true,
    result: newCard.data.insertedId.length,
    action: 'create',
    entity: 'card',
  }));
  yield fetchAllCardsSaga();
}

function* deleteCardSaga(action: any): any {
  const deletedCard = yield call(() => fetchData({
    endpoint: 'cards/delete',
    body: action.payload,
    method: 'delete',
  }));
  yield put(setAlert({
    active: true,
    result: deletedCard.data.deletedCount,
    action: 'delete',
    entity: 'card',
  }));
  yield fetchSelectedCardsSaga();
}

function* watcherSaga() {
  yield takeEvery(getAllUsersInfo, fetchAllUsersSaga);
  yield takeEvery(setSelectedUserId, fetchSelectedUserSaga);
  yield takeEvery(initCardCreation, editCardSaga);
  yield takeEvery(initCardEditing, createCardSaga);
  yield takeEvery(initCardDeletion, deleteCardSaga);
  yield takeEvery(setSelectedCards, fetchSelectedCardsSaga);
  yield takeEvery(getAllCards, fetchAllCardsSaga);
}

function* rootSaga() {
  yield watcherSaga();
}

export default rootSaga;
