export const getAllItems = state =>
  state.items.all.map(id => state.items.byId[id]);
