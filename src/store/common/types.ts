export interface LoadMetadata {
  loadedAt: Number,
  loadStatus: LOAD_STATUS
}

export const SET_LOAD_STATUS = 'SET_LOAD_STATUS';

export interface SetLoadStatus {
  type: typeof SET_LOAD_STATUS,
  payload: LOAD_STATUS
  name?: string,
}

export enum LOAD_STATUS {
  NOT_LOADED = 'NOT_LOADED',
  LOADING = 'LOADING',
  LOADED = 'LOADED',
  FAILED = 'FAILED'
}
