import { useState } from "react";
import BxhKyNang from "./BxhKyNang/BxhKyNang";
import Filter from "./Filter/Filter";

export default function FitnessProgram() {
    const [filterName, setFilterName] = useState<string>('');
    const [branch, setBranch] = useState<string[]>([]);

    return (
        <>
            <Filter
                filterName={filterName}
                setFilterName={setFilterName}
                branch={branch}
                setBranch={setBranch}
            />
            <BxhKyNang filterName={filterName} branch={branch} />
        </>
    );
}