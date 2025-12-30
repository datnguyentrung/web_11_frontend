import React from 'react';
import './Filter.scss';

type FilterProps = {
    filterName: string;
    setFilterName: React.Dispatch<React.SetStateAction<string>>;
    branch: string[];
    setBranch: React.Dispatch<React.SetStateAction<string[]>>;
}

export default function Filter({
    filterName,
    setFilterName,
    branch,
    setBranch
}: FilterProps) {
    console.log('Filter Name:', filterName);
    console.log('Selected Branches:', branch);

    const handleChoose = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        const isChecked = event.target.checked;

        setBranch(prevBranch => {
            if (isChecked) {
                if (!prevBranch.includes(value)) {
                    return [...prevBranch, value];
                }
                return prevBranch;
            } else {
                return prevBranch.filter(item => item !== value);
            }
        })
    }

    return (
        <div className="filter">
            <div className="filter__search">
                <input type="text" placeholder="Tìm kiếm..." onChange={(e) => setFilterName(e.target.value)} />
            </div>
            <div className="filter__branches">
                <label htmlFor="1">
                    <input type="checkbox" id="1" name="branch" value="Cơ sở 1" onChange={handleChoose} />
                    <span>Cơ sở 1</span>
                </label>

                <label htmlFor="2">
                    <input type="checkbox" id="2" name="branch" value="Cơ sở 2" onChange={handleChoose} />
                    <span>Cơ sở 2</span>
                </label>

                <label htmlFor="3">
                    <input type="checkbox" id="3" name="branch" value="Cơ sở 3" onChange={handleChoose} />
                    <span>Cơ sở 3</span>
                </label>

                <label htmlFor="4">
                    <input type="checkbox" id="4" name="branch" value="Cơ sở 4" onChange={handleChoose} />
                    <span>Cơ sở 4</span>
                </label>

                <label htmlFor="5">
                    <input type="checkbox" id="5" name="branch" value="Cơ sở 5" onChange={handleChoose} />
                    <span>Cơ sở 5</span>
                </label>

                <label htmlFor="6">
                    <input type="checkbox" id="6" name="branch" value="6" onChange={handleChoose} />
                    <span>Cơ sở 6</span>
                </label>
            </div>
        </div>
    );
}