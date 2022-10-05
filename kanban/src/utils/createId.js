export const createId = () => {
  return Date.now();
};

export const randomId = () =>
  `kanban-${Math.random().toString(36).slice(2, 11)}`;
