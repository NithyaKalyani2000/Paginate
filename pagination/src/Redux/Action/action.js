export function next() {
  return {
    type: "INCREMENT",
  };
}

export function prev() {
  return {
    type: "DECREMENT",
  };
}
