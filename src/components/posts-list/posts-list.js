import React from 'react';

import './posts-list.css';


const PostsList = ({ posts, page, perPage }) => {

    let postNumber =(page - 1) * perPage;

    const postsElements = posts.map((item) => {
        const { unique_id, username, user_karma, user_cake_day, post_karma, comment_karma, post_date, comments_number,
            votes_number, post_category  } = item;

        postNumber++;

        return (
            <tr key={unique_id}>
                <th scope="row">{postNumber}</th>
                <td>{username}</td>
                <td>{user_karma}</td>
                <td>{user_cake_day}</td>
                <td>{post_karma}</td>
                <td>{comment_karma}</td>
                <td>{post_date}</td>
                <td>{comments_number}</td>
                <td>{votes_number}</td>
                <td>{post_category}</td>
            </tr>
        );
    });

    return (
        <tbody>
            {postsElements}
        </tbody>
    )

};

export default PostsList;
