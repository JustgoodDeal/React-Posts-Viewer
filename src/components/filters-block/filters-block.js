import React from 'react';
import FiltersPage from '../filters-page';

import './filters-block.css';

const FiltersBlock = ({ perPage, changePerPageFunc, changeFiltersFunc }) => {

    const handleChange = (event) => {
        changePerPageFunc(Number(event.target.value));
    };

    return (
        <div className="mb-3 d-flex justify-content-center">
            <FiltersPage
                changeFiltersFunc={changeFiltersFunc} />
            <div className="per-page d-flex align-items-center">
                <p className="mr-2">Posts per page: </p>
                <select className="form-select"
                        value={String(perPage)}
                        onChange={handleChange}>
                    <option value="10">10</option>
                    <option value="15">15</option>
                    <option value="20">20</option>
                    <option value="25">25</option>
                </select>
            </div>

        </div>
    );
};

export default FiltersBlock
