export interface Item {
  itemName: string;
  type: string;
  levelRequired?: number;
  strRequired?: number;
  dexRequired?: number;
  intRequired?: number;
  armour?: number;
  evasion?: number;
  energyShield?: number;
}

export interface ItemData {
  itemsByType: Record<string, Item[]>;
}
