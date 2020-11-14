import { createSelector } from "reselect";
// export const selectUser = (state) => state.user;

// export const selectLoadingState = (state) => selectUser(state).loadingState;

// export const selectIsUserLoading = (state) =>
//   selectLoadingState(state) === LoadingState.LOADING;

export const selectDialogs = (state) => state.dialogs;

export const selectDialogPartner = (currentDialodId) => {
  return createSelector(
    selectDialogs,
    (items) => console.log(items, "reselect"),
    console.log(currentDialodId, "reselect is,")
  );
};

// const subtotalSelector = createSelector(
//   expensiveItemSelectorFactory(200),
//   items => items.reduce((acc, item) => acc + item.value, 0)
// );

// export const selectDialogPartner = (state) => state.dialogs;
