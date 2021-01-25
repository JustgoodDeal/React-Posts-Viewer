import React, { useCallback, useState, useEffect} from 'react';
import FiltersBlock from '../filters-block';
import FiltersContext from '../filters-context';
import Header from '../header';
import PostsList from '../posts-list';
import Pagination from '../pagination';

import './app.css';


const App = () => {

    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(1);
    const [pages, setPages] = useState(1);
    const [perPage, setPerPage] = useState(25);
    const [filters, setFilters] = useState({
        postCategoryFilter: '',
        postDateFilter: '',
        votesNumberFilter: ''
    });

    const defineURL = useCallback(() => {
        let url = `http://localhost:8087/posts?page=${page}&per_page=${perPage}`;
        const filterNameMap = {
            postCategoryFilter: 'post_category',
            postDateFilter: 'post_date',
            votesNumberFilter: 'votes_number'
        };
        for (let filter in filters) {
            let filterValue = filters[filter]
            if (filterValue) {
                let getParam = `&${filterNameMap[filter]}=${filterValue}`
                url += getParam
            }
        }
        return url
    }, [ page, perPage, filters ]);

    const getPostsList = useCallback(() => {
        const url = defineURL();
        fetch(url)
            .then(res => res.json())
            .then(data => {
                const { posts, page, pages } = data;
                setPosts(posts);
                setPage(page);
                setPages(pages);
            })
            .catch(() => {setPosts([]);
        });
    }, [ defineURL ]);

    useEffect(() => {
        getPostsList();
    }, [ getPostsList ]);

    const changePageFunc = (pageNumber) => {
        setPage(pageNumber);
    };

    const changePerPageFunc = (perPageValue) => {
        setPage(1);
        setPerPage(perPageValue);
    };

    const changeFiltersFunc = ({ postCategoryFilter, postDateFilter, votesNumberFilter }) => {
        setPage(1);
        setFilters({postCategoryFilter, postDateFilter, votesNumberFilter})
    };

    return (
        <div>
            <Header />
            <FiltersContext.Provider value={filters}>
                <FiltersBlock
                    perPage={perPage}
                    changePerPageFunc={changePerPageFunc}
                    changeFiltersFunc={changeFiltersFunc} />
            </FiltersContext.Provider>
            <table className="table table-striped">
                <thead>
                <tr className="table-primary">
                    <th scope="col">Post number</th>
                    <th scope="col">Username</th>
                    <th scope="col">User karma</th>
                    <th scope="col">User cake day</th>
                    <th scope="col">Post karma</th>
                    <th scope="col">Comment karma</th>
                    <th scope="col">Post date</th>
                    <th scope="col">Number of comments</th>
                    <th scope="col">Number of votes</th>
                    <th scope="col">Post category</th>
                </tr>
                </thead>
                <PostsList posts={posts}
                           page={page}
                           perPage={perPage} />
            </table>
            <Pagination pages={pages}
                        page={page}
                        changePageFunc={changePageFunc}/>
        </div>
    )

};

export default App
