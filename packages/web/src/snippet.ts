import data from "./data.json";

export type BorderColor = "Red" | "Green" | "Blue" | "Yellow" | "Teal";

export type CharacterClass =
  | "Monk"
  | "Warrior"
  | "Witch"
  | "Ranger"
  | "Sorceress"
  | "Mercenary";
export type DefenceType =
  | "Armour"
  | "Evasion"
  | "Energy Shield"
  | "Armour/Evasion"
  | "Evasion/Energy Shield"
  | "Energy Shield/Armour";
export type EquipmentOption =
  | "All equipment"
  | "Highest for my level"
  | "Most and 2nd most highest";

const RGB_COLORS: Record<BorderColor, string> = {
  Red: "255 0 0 255",
  Green: "0 255 0 255",
  Blue: "0 0 255 255",
  Yellow: "255 255 0 255",
  Teal: "0 255 255 255",
};

// Helper function to convert defence type to attribute checks
const getAttributeChecks = (defenceType: DefenceType): string[] => {
  switch (defenceType) {
    case "Armour":
      return ["BaseArmour > 0"];
    case "Evasion":
      return ["BaseEvasion > 0"];
    case "Energy Shield":
      return ["BaseEnergyShield > 0"];
    case "Armour/Evasion":
      return ["BaseArmour > 0", "BaseEvasion > 0"];
    case "Evasion/Energy Shield":
      return ["BaseEvasion > 0", "BaseEnergyShield > 0"];
    case "Energy Shield/Armour":
      return ["BaseEnergyShield > 0", "BaseArmour > 0"];
    default:
      return [];
  }
};

export const generateSnippet = (
  characterClass: CharacterClass,
  defenceTypes: DefenceType[],
  equipmentOption: EquipmentOption,
  level: number,
  borderColor: BorderColor
): string => {
  if (!characterClass || defenceTypes.length === 0) return "";

  const snippets: string[] = ["### BEGIN: White Item Filter"];

  if (equipmentOption === "All equipment") {
    snippets.push(...generateAllEquipmentSnippet(defenceTypes, borderColor));
  } else {
    snippets.push(
      ...generateHighestForLevelSnippet(defenceTypes, borderColor, level)
    );
  }

  snippets.push("### END: White Item Filter");
  return snippets.join("\n\n");
};

// For "All Equipment" option we can generate just one snippet for all Item Types, but one per each defence type
const generateAllEquipmentSnippet = (
  defenceTypes: DefenceType[],
  borderColor: BorderColor
): string[] => {
  const snippets: string[] = [];
  const itemClassesStr = Object.entries(data.itemsByType)
    .map(([itemClass]) => `"${itemClass}"`)
    .join(" ");

  for (const defenceType of defenceTypes) {
    const attributeChecks = getAttributeChecks(defenceType);
    if (attributeChecks.length > 0) {
      snippets.push(
        `Show
Rarity Normal
Quality == 0
Class ${itemClassesStr}
${attributeChecks.join("\n")}
SetBorderColor ${RGB_COLORS[borderColor]}
SetFontSize 35`
      );
    }
  }
  return snippets;
};

const generateHighestForLevelSnippet = (
  defenceTypes: DefenceType[],
  borderColor: BorderColor,
  level: number
): string[] => {
  const snippets: string[] = [];

  // Process each equipment type
  for (const [itemClass, items] of Object.entries(data.itemsByType)) {
    for (const defenceType of defenceTypes) {
      // Find highest values for level that has all defence types
      const relevantItems = items.filter((item) => {
        const hasArmourOrSkip = defenceType.includes("Armour")
          ? item.armour
          : true;
        const hasEvasionOrSkip = defenceType.includes("Evasion")
          ? item.evasion
          : true;
        const hasESOrSkip = defenceType.includes("Energy Shield")
          ? item.energyShield
          : true;
        return (
          hasArmourOrSkip &&
          hasEvasionOrSkip &&
          hasESOrSkip &&
          (!item.levelRequired || item.levelRequired <= level)
        );
      });

      if (relevantItems.length > 0) {
        // Find maximum values for each attribute
        const maxItem = relevantItems.reduce((max, item) => {
          if (
            !max.levelRequired ||
            (item.levelRequired && item.levelRequired > max.levelRequired)
          ) {
            return item;
          }
          return max;
        });

        const maxItemName = maxItem.itemName;

        const conditions: string[] = [];
        if (defenceType.includes("Armour") && maxItem.armour) {
          conditions.push(`BaseArmour >= ${maxItem.armour}`);
        }
        if (defenceType.includes("Evasion") && maxItem.evasion) {
          conditions.push(`BaseEvasion >= ${maxItem.evasion}`);
        }
        if (defenceType.includes("Shield") && maxItem.energyShield) {
          conditions.push(`BaseEnergyShield >= ${maxItem.energyShield}`);
        }

        if (conditions.length > 0) {
          snippets.push(
            `
## "${maxItemName}" and better
Show
Rarity Normal
Quality == 0
Class ${itemClass}
${conditions.join("\n")}
SetBorderColor ${RGB_COLORS[borderColor]}
SetFontSize 35`
          );
        }
      }
    }
  }

  return snippets;
};
