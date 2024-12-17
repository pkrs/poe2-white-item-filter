export interface Item {
  itemName: string;
  type: string;
  levelRequired?: number;
  strRequired?: number;
  dexRequired?: number;
  intRequired?: number;
  armor?: number;
  evasion?: number;
  es?: number;
}

export interface ItemData {
  items: Item[];
}
