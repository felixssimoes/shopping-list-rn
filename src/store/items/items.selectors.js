export const getAllItems = state =>
  state.items.all.map(id => state.items.byId[id]);

export const getAllCheckedItems = state =>
  state.items.all.map(id => state.items.byId[id]).filter(i => i.checked);

export const getAllUncheckedItems = state =>
  state.items.all.map(id => state.items.byId[id]).filter(i => !i.checked);
