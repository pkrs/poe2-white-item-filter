import { load } from "npm:cheerio@1.0.0-rc.12";
import { Item, ItemData } from "./types.ts";

const ITEM_URLS = {
  Gloves: "https://poe2db.tw/us/Gloves#GlovesItem",
  BodyArmour: "https://poe2db.tw/us/Body_Armours#BodyArmoursItem",
  Helmets: "https://poe2db.tw/us/Helmets#HelmetsItem",
  Boots: "https://poe2db.tw/us/Boots#BootsItem",
};

async function scrapeItems(url: string, itemType: string): Promise<Item[]> {
  const response = await fetch(url);
  const html = await response.text();
  const $ = load(html);
  const items: Item[] = [];

  // Select each item container
  $("div.d-flex.border.rounded").each((_index: number, element: any) => {
    const $container = $(element);

    // Extract item name from the white item link
    const itemName = $container.find("a.whiteitem").text().trim();

    // Extract requirements
    const requirementsText = $container.find("div.requirements").text();
    const levelMatch = requirementsText.match(/Level (\d+)/);
    const strMatch = requirementsText.match(/(\d+) Str/);

    // Extract defense values
    const propertyText = $container.find("div.property").text();
    const armorMatch = propertyText.match(/Armour: (\d+)/);
    const evasionMatch = propertyText.match(/Evasion Rating: (\d+)/);
    const energyShieldMatch = propertyText.match(/Energy Shield: (\d+)/);

    if (itemName) {
      items.push({
        itemName,
        type: itemType,
        levelRequired: levelMatch ? parseInt(levelMatch[1]) : undefined,
        strRequired: strMatch ? parseInt(strMatch[1]) : undefined,
        armor: armorMatch ? parseInt(armorMatch[1]) : undefined,
        evasion: evasionMatch ? parseInt(evasionMatch[1]) : undefined,
        energyShield: energyShieldMatch
          ? parseInt(energyShieldMatch[1])
          : undefined,
      });
    }
  });

  return items;
}

// Main execution
async function main() {
  try {
    const itemsByType: Record<string, Item[]> = {};

    // Iterate over each item type and URL
    for (const [itemType, url] of Object.entries(ITEM_URLS)) {
      const items = await scrapeItems(url, itemType);
      itemsByType[itemType] = items;
      console.log(`Successfully scraped ${items.length} ${itemType} items`);
    }

    const data: ItemData = { itemsByType };
    const jsonString = JSON.stringify(data, null, 2);
    await Deno.writeTextFile("./data/equipment.json", jsonString);

    const totalItems = Object.values(itemsByType).reduce(
      (sum, items) => sum + items.length,
      0
    );
    console.log(`Total items scraped: ${totalItems}`);

    // Log first item of each type as example
    for (const [type, items] of Object.entries(itemsByType)) {
      if (items.length > 0) {
        console.log(`Example ${type} item:`, items[0]);
      }
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

if (import.meta.main) {
  main();
}
