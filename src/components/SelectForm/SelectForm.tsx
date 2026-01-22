import { useStore } from "@/hooks/dataStore";
import { useState, useEffect } from "react";
import type { Appliance } from "@/types/appliance.types";
import type { Recipe } from "@/types/recipe.types";

//Styles
import "@/components/SelectForm/SelectForm.scss";

interface SelectFormProps {
    item?: Appliance;
    type: "appliances";
}

const SelectForm = ({ item, type }: SelectFormProps) => {

    const { recipes } = useStore();

    // États locaux
    const [displayedDatas, setDisplayedDatas] = useState<Appliance[]>([]);
    const [selectedItemId, setSelectedItemId] = useState<string>(item?.id || "");
    const [selectedItemName, setSelectedItemName] = useState<string>(item?.name || "");

    const getListDatas = (): Appliance[] => {
        if (type === 'appliances') {
            const appliancesList = recipes.flatMap((recipe: Recipe) => recipe.appliances);

            const uniqueMap = new Map();
            appliancesList.forEach((app: Appliance) => {
                if (app.name) uniqueMap.set(app.name.toLowerCase(), app);
            });

            return Array.from(uniqueMap.values())
                .sort((a, b) => a.name.localeCompare(b.name));
        }
        return [];
    };

    // Gestion du changement de sélection
    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedId = e.target.value;
        const selectedObj = displayedDatas.find((data) => data.id === selectedId);

        if (selectedObj) {
            setSelectedItemName(selectedObj.name);
            setSelectedItemId(selectedId);
        }
    };

    useEffect(() => {
        const newList = getListDatas();
        setDisplayedDatas(newList);

        if (newList.length > 0 && item) {
            setSelectedItemName(item.name || "");
            setSelectedItemId(item.id || "");
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [recipes, item]);

    if (!displayedDatas || displayedDatas.length === 0) {
        return <p className="text-sm text-gray-500">Aucun appareil disponible</p>;
    }

    return (
        <label className="select-form-label">
            Appareil Principal

            {/* Champs cachés pour le FormData du parent */}
            <input type="hidden" name={`${type}-0`} value={selectedItemName} />

            <select
                name={`${type}-id-0`}
                id={`${type}-id-0`}
                value={selectedItemId}
                className="select-form search-results"
                onChange={handleSelectChange}
            >
                <option value={selectedItemId} className="debeug select-form__item">
                    {selectedItemName || "-- Sélectionner --"}
                </option>

                {displayedDatas.map((data) => (
                    <option key={data.id} value={data.id} className="option">
                        {data.name}
                    </option>
                ))}
            </select>
        </label>
    );
};

export default SelectForm;