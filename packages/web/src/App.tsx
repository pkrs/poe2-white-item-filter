import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Copy } from "lucide-react";
import { useEffect, useState } from "react";
import "./App.css";

type CharacterClass =
  | "Monk"
  | "Warrior"
  | "Witch"
  | "Ranger"
  | "Sorceress"
  | "Mercenary";
type DefenceType =
  | "Armour"
  | "Evasion"
  | "Energy Shield"
  | "Armour/Evasion"
  | "Evasion/Energy Shield"
  | "Energy Shield/Armour";
type EquipmentOption =
  | "All equipment"
  | "Highest for my level"
  | "Most and 2nd most highest";
type BorderColor = "Red" | "Green" | "Blue" | "Yellow" | "Teal";

const defaultDefenceTypes: Record<CharacterClass, DefenceType> = {
  Monk: "Evasion/Energy Shield",
  Warrior: "Armour",
  Witch: "Energy Shield",
  Ranger: "Evasion",
  Sorceress: "Energy Shield",
  Mercenary: "Armour/Evasion",
};

function App() {
  const [characterClass, setCharacterClass] = useState<CharacterClass | null>(
    null
  );
  const [defenceTypes, setDefenceTypes] = useState<DefenceType[]>([]);
  const [equipmentOption, setEquipmentOption] =
    useState<EquipmentOption>("All equipment");
  const [borderColor, setBorderColor] = useState<BorderColor>("Red");
  const [level, setLevel] = useState<number>(1);
  const [snippet] = useState<string>("");

  useEffect(() => {
    if (characterClass) {
      setDefenceTypes([defaultDefenceTypes[characterClass]]);
      setEquipmentOption("All equipment");
      setBorderColor(
        ["Red", "Green", "Blue", "Yellow", "Teal"][
          Math.floor(Math.random() * 5)
        ] as BorderColor
      );
    }
  }, [characterClass]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(snippet);
  };

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-gray-200 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-exocet text-center mb-8 text-[#c7b377]">
          Path of Exile 2 Snippet Generator
        </h1>

        <Card className="bg-[#2a2a2a] border-[#3a3a3a]">
          <CardHeader>
            <CardTitle className="text-[#c7b377]">
              Configure Your Build
            </CardTitle>
            <CardDescription>
              Select your preferences to generate a custom snippet
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Character Class Selection */}
            <div className="space-y-2">
              <label className="text-sm font-semibold">Character Class</label>
              <Select
                onValueChange={(value) =>
                  setCharacterClass(value as CharacterClass)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select your class" />
                </SelectTrigger>
                <SelectContent>
                  {[
                    "Monk",
                    "Warrior",
                    "Witch",
                    "Ranger",
                    "Sorceress",
                    "Mercenary",
                  ].map((cls) => (
                    <SelectItem key={cls} value={cls}>
                      {cls}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Defence Types */}
            {characterClass && (
              <div className="space-y-2">
                <label className="text-sm font-semibold">Defence Types</label>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    "Armour",
                    "Evasion",
                    "Energy Shield",
                    "Armour/Evasion",
                    "Evasion/Energy Shield",
                    "Energy Shield/Armour",
                  ].map((type) => (
                    <div key={type} className="flex items-center space-x-2">
                      <Checkbox
                        checked={defenceTypes.includes(type as DefenceType)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setDefenceTypes([
                              ...defenceTypes,
                              type as DefenceType,
                            ]);
                          } else {
                            setDefenceTypes(
                              defenceTypes.filter((t) => t !== type)
                            );
                          }
                        }}
                      />
                      <label>{type}</label>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Equipment Option */}
            {characterClass && (
              <div className="space-y-2">
                <label className="text-sm font-semibold">
                  Equipment Option
                </label>
                <Select
                  value={equipmentOption}
                  onValueChange={(value) =>
                    setEquipmentOption(value as EquipmentOption)
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {[
                      "All equipment",
                      "Highest for my level",
                      "Most and 2nd most highest",
                    ].map((opt) => (
                      <SelectItem key={opt} value={opt}>
                        {opt}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {equipmentOption !== "All equipment" && (
                  <div className="mt-2">
                    <Input
                      type="number"
                      min={1}
                      max={100}
                      value={level}
                      onChange={(e) => setLevel(Number(e.target.value))}
                      className="w-32"
                    />
                  </div>
                )}
              </div>
            )}

            {/* Border Color */}
            {characterClass && (
              <div className="space-y-2">
                <label className="text-sm font-semibold">Border Color</label>
                <Select
                  value={borderColor}
                  onValueChange={(value) =>
                    setBorderColor(value as BorderColor)
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {["Red", "Green", "Blue", "Yellow", "Teal"].map((color) => (
                      <SelectItem key={color} value={color}>
                        {color}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Snippet Display */}
        {characterClass && (
          <Card className="mt-8 bg-[#2a2a2a] border-[#3a3a3a]">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-[#c7b377]">
                Generated Snippet
              </CardTitle>
              <Button variant="outline" size="icon" onClick={copyToClipboard}>
                <Copy className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent>
              <pre className="bg-[#1a1a1a] p-4 rounded-lg overflow-x-auto">
                {"// Snippet will be generated here"}
              </pre>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

export default App;
