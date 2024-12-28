import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Copy } from "lucide-react";
import { useEffect, useState } from "react";
import "./App.css";
import {
  BorderColor,
  CharacterClass,
  DefenceType,
  EquipmentOption,
  generateSnippet,
} from "./snippet";

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
  const [snippet, setSnippet] = useState<string>("");

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

  useEffect(() => {
    if (!characterClass) return;
    const newSnippet = generateSnippet(
      characterClass,
      defenceTypes,
      equipmentOption,
      level,
      borderColor
    );
    setSnippet(newSnippet);
  }, [characterClass, defenceTypes, equipmentOption, level, borderColor]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(snippet);
  };

  return (
    <div className="min-h-screen min-w-[1024px] text-gray-200 py-8 px-4 flex flex-col">
      <div className="mx-auto flex-grow">
        <h1 className="text-4xl text-center mb-8 text-white font-">
          POE2 White Item Filter Generator{" "}
          <img
            src="/transmutation_orb.webp"
            alt="logo"
            className="w-16 h-16 inline-block"
          />
          <img
            src="/augmentation_orb.webp"
            alt="logo"
            className="w-16 h-16 inline-block"
          />
        </h1>

        <Card className="bg-[#1C1C1C] border-[#3B3B3B] pt-4">
          <CardContent className="space-y-6">
            {/* Character Class Selection */}
            <div className="space-y-2">
              <div className="flex flex-wrap gap-2 justify-center">
                {[
                  "Monk",
                  "Warrior",
                  "Witch",
                  "Ranger",
                  "Sorceress",
                  "Mercenary",
                ].map((cls) => (
                  <Button
                    key={cls}
                    variant={characterClass === cls ? "default" : "outline"}
                    onClick={() => setCharacterClass(cls as CharacterClass)}
                    className={`${
                      characterClass === cls
                        ? "bg-[#FFA800] text-black hover:bg-[#FFB824]"
                        : "border-[#3B3B3B] hover:border-[#FFA800] hover:text-[#FFA800]"
                    } whitespace-nowrap`}
                  >
                    {cls}
                  </Button>
                ))}
              </div>
            </div>

            {/* Defence Types */}
            {characterClass && (
              <div className="space-y-2">
                <div className="flex flex-wrap gap-2 justify-center">
                  {[
                    "Armour",
                    "Evasion",
                    "Energy Shield",
                    "Armour/Evasion",
                    "Evasion/Energy Shield",
                    "Energy Shield/Armour",
                  ].map((type) => (
                    <Button
                      key={type}
                      variant={
                        defenceTypes.includes(type as DefenceType)
                          ? "default"
                          : "outline"
                      }
                      onClick={() => {
                        if (defenceTypes.includes(type as DefenceType)) {
                          setDefenceTypes(
                            defenceTypes.filter((t) => t !== type)
                          );
                        } else {
                          setDefenceTypes([
                            ...defenceTypes,
                            type as DefenceType,
                          ]);
                        }
                      }}
                      className={`${
                        defenceTypes.includes(type as DefenceType)
                          ? "bg-[#FFA800] text-black hover:bg-[#FFB824]"
                          : "border-[#3B3B3B] hover:border-[#FFA800] hover:text-[#FFA800]"
                      }`}
                    >
                      {type}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Equipment Option */}
            {characterClass && (
              <div className="space-y-2">
                <div className="flex flex-wrap gap-2 justify-center">
                  {["All equipment", "Highest for my level"].map((opt) => (
                    <Button
                      key={opt}
                      variant={equipmentOption === opt ? "default" : "outline"}
                      onClick={() => setEquipmentOption(opt as EquipmentOption)}
                      className={`${
                        equipmentOption === opt
                          ? "bg-[#FFA800] text-black hover:bg-[#FFB824]"
                          : "border-[#3B3B3B] hover:border-[#FFA800] hover:text-[#FFA800]"
                      }`}
                    >
                      {opt}
                    </Button>
                  ))}
                </div>

                {equipmentOption !== "All equipment" && (
                  <div className="mt-2">
                    <div className="flex items-center justify-center gap-4">
                      <Slider
                        value={[level]}
                        onValueChange={([value]) => setLevel(value)}
                        min={1}
                        max={100}
                        step={1}
                        className="max-w-[640px] "
                      />
                      <span className="min-w-[3ch] text-sm text-gray-400">
                        {level}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Border Color */}
            {characterClass && (
              <div className="space-y-2">
                <label className="text-sm font-semibold text-[#FFA800]">
                  Border Color
                </label>
                <div className="flex flex-wrap gap-2 justify-center">
                  {["Red", "Green", "Blue", "Yellow", "Teal"].map((color) => (
                    <Button
                      key={color}
                      variant={borderColor === color ? "default" : "outline"}
                      onClick={() => setBorderColor(color as BorderColor)}
                      className={`${
                        borderColor === color
                          ? "bg-[#FFA800] text-black hover:bg-[#FFB824]"
                          : "border-[#3B3B3B] hover:border-[#FFA800] hover:text-[#FFA800]"
                      }`}
                    >
                      {color}
                    </Button>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Snippet Display */}
        {characterClass && (
          <Card className="mt-8 bg-[#1C1C1C] border-[#3B3B3B]">
            <CardHeader className="flex flex-row justify-between">
              <CardTitle className="text-[#FFA800]">
                Generated Snippet
              </CardTitle>
              <div className="align-top">
                Copy to Clipboard
                <Button
                  variant="outline"
                  size="icon"
                  onClick={copyToClipboard}
                  className="border-[#3B3B3B] hover:border-[#FFA800] hover:text-[#FFA800] ml-2"
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <pre className="bg-[#0C0C0C] p-4 rounded-lg overflow-x-auto border border-[#3B3B3B] text-left">
                {snippet || "// Select options to generate snippet"}
              </pre>
            </CardContent>
          </Card>
        )}
      </div>

      {/* New footer section */}
      <footer className="text-center text-sm text-gray-500 mt-8">
        <p>Path of Exile 2 is a trademark of Grinding Gear Games.</p>
        <p className="mt-1">
          <a
            href="https://www.exljbris.com/fontin.html"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#FFA800] hover:underline"
          >
            Fontin
          </a>{" "}
          font by Jos Buivenga (exljbris).
        </p>
      </footer>
    </div>
  );
}

export default App;
