import React from 'react';

import './pagination.css';


const Pagination = ({ pages, page, changePageFunc }) => {

    let prevClassName = page > 1 ? "page-item" : "page-item disabled";
    const previous = <li key={0} className={prevClassName}>
                        <button className="page-link"
                              onClick={() => changePageFunc(page - 1)} >
                            Previous
                        </button>
                    </li>;

    let pagesElements = [previous];

    for (let num = 1; num <= pages; num += 1) {
        let itemClassName = num === page ? "page-item active" : "page-item";
        let item = <li key={num} className={itemClassName}>
                        <button className="page-link"
                                onClick={() => changePageFunc(num)} >
                            {num}
                        </button>
                    </li>;
        pagesElements.push(item)
    }

    let nextClassName = page !== pages ? "page-item" : "page-item disabled";
    const next = <li key={pages + 1} className={nextClassName}>
        <button className="page-link"
                onClick={() => changePageFunc(page + 1)} >
            Next
        </button>
    </li>;

    pagesElements.push(next);

    return (
        <nav className="d-flex justify-content-center" aria-label="...">
            <ul className="pagination">
                {pagesElements}
            </ul>
        </nav>
    )

};

export default Pagination;
