export interface Item {
  itemName: string;
  type: string;
  levelRequired?: number;
  strRequired?: number;
  armor?: number;
  evasion?: number;
  energyShield?: number;
}

export interface ItemData {
  itemsByType: Record<string, Item[]>;
}
