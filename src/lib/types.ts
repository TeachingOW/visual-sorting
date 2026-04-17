export type SortElement = {
  value: number;
  access: boolean;
  makeSound: boolean;
};

export type ProgressIndicator = {
  access: number[]; // list of processing indexes
  sound?: number; // which bar should play a sound
  comparisons?: number; // delta: comparisons performed in this step
  dataAccesses?: number; // delta: array element accesses (reads + writes) in this step
};
