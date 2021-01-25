import React, { Component } from 'react';
import FiltersBlock from '../filters-block';
import Header from '../header';
import PostsList from '../posts-list';
import Pagination from '../pagination';

import './app.css';


export default class App extends Component {

    state = {
        posts: [],
        page: 1,
        pages: 1,
        perPage: 25,
        filters: {
            postCategoryFilter: '',
            postDateFilter: '',
            votesNumberFilter: ''
        }
    };

    defineURL = () => {
        const { page, perPage, filters } = this.state;
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
    };

    getPostsList = () => {
        const url = this.defineURL();
        fetch(url)
            .then(res => res.json())
            .then(data => {
                const { posts, page, pages } = data;
                this.setState({
                    posts,
                    page,
                    pages
                });
            })
            .catch(() => this.setState({posts:[]}))
    };

    componentDidMount() {
        this.getPostsList()
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.page !== this.state.page ||
            prevState.perPage !== this.state.perPage ||
            JSON.stringify(prevState.filters) !== JSON.stringify(this.state.filters)) {
            this.getPostsList()
        }
    }

    changePageFunc = (page) => {
        this.setState({page});
    };

    changePerPageFunc = (perPage) => {
        this.setState({
            page: 1,
            perPage
        });
    };

    changeFiltersFunc = ({ postCategoryFilter, postDateFilter, votesNumberFilter }) => {
        this.setState({
            page: 1,
            filters: {
                postCategoryFilter,
                postDateFilter,
                votesNumberFilter
            }
        });
    };

    render() {
        const { posts, page, pages, perPage } = this.state;

        return (
            <div>
                <Header />
                <FiltersBlock
                    perPage={perPage}
                    changePerPageFunc={this.changePerPageFunc}
                    changeFiltersFunc={this.changeFiltersFunc} />
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
                            changePageFunc={this.changePageFunc}/>
            </div>
        )
    }

}
