import React from 'react';

import './filters-page.css';


const FiltersPage = ({ changeFiltersFunc }) => {

    const onFiltersSubmit = () => {
        const postCategoryFilter = document.getElementById('post-category').value;
        const postDateFilter = document.getElementById('post-date').value;
        const votesNumberFilter = document.getElementById('votes-number').value;
        const closeBtn = document.getElementById('close-modal');
        closeBtn.click();
        changeFiltersFunc({postCategoryFilter, postDateFilter, votesNumberFilter})
    };

    return (
        <div className="filters-page">
            <button type="button" className="btn btn-success mr-5" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                Choose filters
            </button>

            <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false"
                 tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header justify-content-center">
                            <h5 className="modal-title text-center" id="staticBackdropLabel">Available filters</h5>
                        </div>
                        <div className="modal-body">

                            <div className="input-group input-group-sm mb-3">
                                <span className="input-group-text">Post category</span>
                                <input type="text" id="post-category" className="form-control" aria-label="Sizing example input"/>
                            </div>
                            <div className="input-group input-group-sm mb-3">
                                <span className="input-group-text">Post date</span>
                                <input type="text" id="post-date" className="form-control" aria-label="Sizing example input"/>
                            </div>
                            <div className="input-group input-group-sm mb-3">
                                <span className="input-group-text">Number of votes</span>
                                <input type="text" id="votes-number" className="form-control" aria-label="Sizing example input"/>
                            </div>

                        </div>
                        <div className="modal-footer">
                            <button type="button" id="close-modal" className="btn btn-danger" data-bs-dismiss="modal">Cancel</button>
                            <button
                                type="button"
                                className="btn btn-success"
                                onClick={onFiltersSubmit} >
                             Apply filters
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

};


export default FiltersPage
