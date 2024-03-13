export const  pick = (arr: number[], index: number) => {
  if (index < arr.length && index >= 0) return arr[index];

  return 0;
}
