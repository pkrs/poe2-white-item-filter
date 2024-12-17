import { load } from "npm:cheerio@1.0.0-rc.12";
import { Item, ItemData } from "./types.ts";

const URL = "https://poe2db.tw/us/Gloves#GlovesItem";

async function scrapeItems(): Promise<ItemData> {
  const response = await fetch(URL);
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

    // Extract armor value
    const armorText = $container.find("div.property").text();
    const armorMatch = armorText.match(/Armour: (\d+)/);

    if (itemName) {
      items.push({
        itemName,
        type: "Gloves",
        levelRequired: levelMatch ? parseInt(levelMatch[1]) : undefined,
        strRequired: strMatch ? parseInt(strMatch[1]) : undefined,
        armor: armorMatch ? parseInt(armorMatch[1]) : undefined,
      });
    }
  });

  return { items };
}

// Main execution
async function main() {
  try {
    const data = await scrapeItems();
    const jsonString = JSON.stringify(data, null, 2);
    await Deno.writeTextFile("./data/gloves.json", jsonString);
    console.log(`Successfully scraped ${data.items.length} items`);
    // Log first item as example
    if (data.items.length > 0) {
      console.log("Example item:", data.items[0]);
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

if (import.meta.main) {
  main();
}
