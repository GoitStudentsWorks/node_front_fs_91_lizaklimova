import { createSlice } from '@reduxjs/toolkit';
import {
  getBackgroundIcons,
  getAllBoards,
  createBoard,
  deleteBoard,
  getOneBoard,
  filterBoard,
  addColumn,
  editColumn,
  deleteColumn,
} from './boardOperations';
import {
  addCard,
  editCard,
  deleteCard,
} from '../../redux/cards/cardsOperations';
import { handlePending, handleRejected } from '../helpers';

const boardsSlice = createSlice({
  name: 'board',
  initialState: {
    boards: [],
    oneBoard: {},
    background: [],
    isLoading: false,
    error: null,
  },
  extraReducers: builder => {
    builder
      .addCase(getBackgroundIcons.pending, handlePending)
      .addCase(getAllBoards.pending, handlePending)
      .addCase(getOneBoard.pending, handlePending)
      .addCase(createBoard.pending, handlePending)
      .addCase(deleteBoard.pending, handlePending)
      .addCase(filterBoard.pending, handlePending)
      .addCase(addColumn.pending, handlePending)
      .addCase(editColumn.pending, handlePending)
      .addCase(deleteColumn.pending, handlePending)
      .addCase(addCard.pending, handlePending)
      .addCase(deleteCard.pending, handlePending)
      .addCase(editCard.pending, handlePending)
      .addCase(getBackgroundIcons.fulfilled, (state, { payload }) => {
        state.background = payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(getAllBoards.fulfilled, (state, { payload }) => {
        state.boards = payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(getOneBoard.fulfilled, (state, { payload }) => {
        state.oneBoard = { ...payload };
        state.isLoading = false;
        state.error = null;
      })
      .addCase(createBoard.fulfilled, (state, { payload }) => {
        state.boards.push(payload);
        state.isLoading = false;
        state.error = null;
      })
      .addCase(deleteBoard.fulfilled, state => {
        state.boards = state.boards.filter(
          board => board._id !== state.oneBoard._id
        );
        state.isLoading = false;
        state.error = null;
      })
      .addCase(filterBoard.fulfilled, (state, { payload }) => {
        state.filterBoard = payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(addColumn.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.error = null;
        state.oneBoard.columns.push(payload.column);
      })
      .addCase(editColumn.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.error = null;
        const editedItemIndex = state.oneBoard.columns.findIndex(
          ({ _id }) => _id === payload.column._id
        );
        state.oneBoard.columns = state.oneBoard.columns.with(
          editedItemIndex,
          payload.column
        );
      })
      .addCase(deleteColumn.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.error = null;
        state.oneBoard.columns = state.oneBoard.columns.filter(
          ({ _id }) => _id !== payload
        );
      })
      .addCase(addCard.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.error = null;
        const column = state.oneBoard.columns.find(
          ({ _id }) => _id === payload.column
        );
        column.cards = [...column.cards, payload];
      })
      .addCase(deleteCard.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.error = null;
        const column = state.oneBoard.columns.find(
          ({ _id }) => _id === payload.columnId
        );
        column.cards = column.cards.filter(({ _id }) => _id !== payload.cardId);
      })
      .addCase(editCard.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.error = null;
        const column = state.oneBoard.columns.find(
          ({ _id }) => _id === payload.columnId
        );

        column.cards = column.cards.map(card => {
          if (card._id === payload.card._id) return payload.card;
          return card;
        });
      })
      .addCase(getBackgroundIcons.rejected, handleRejected)
      .addCase(getAllBoards.rejected, handleRejected)
      .addCase(getOneBoard.rejected, handleRejected)
      .addCase(createBoard.rejected, handleRejected)
      .addCase(deleteBoard.rejected, handleRejected)
      .addCase(filterBoard.rejected, handleRejected)
      .addCase(addColumn.rejected, handleRejected)
      .addCase(editColumn.rejected, handleRejected)
      .addCase(deleteColumn.rejected, handleRejected)
      .addCase(addCard.rejected, handleRejected)
      .addCase(deleteCard.rejected, handleRejected)
      .addCase(editCard.rejected, handleRejected);
  },
});

export const boardsReducer = boardsSlice.reducer;
