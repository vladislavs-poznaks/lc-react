import React from 'react';
import {useQuery} from "react-query";
import axios from "axios";
import {formatDistance} from "date-fns";
import ReactMarkdown from "react-markdown";

export default function Comments({url}) {

    const {isLoading, isSuccess, data: comments} = useQuery(['comments', url], () => {
        return axios
            .get(url)
    });

    return (
        <>
            {isLoading && <div>Loading comments...</div>}
            {isSuccess && comments.data.map(comment => (
                <div key={comment.id} className="comment-container">
                    <a href={comment.user.html_url}>
                        <img
                            src={comment.user.avatar_url}
                            alt="avatar"
                            className="avatar"
                        />
                    </a>
                    <div className="comment">
                        <div className="comment-heading">
                            <a href={comment.user.html_url}>{comment.user.login}</a> commented {' '}
                            {formatDistance(new Date(comment.created_at), new Date(), {
                                addSuffix: true,
                            })}{' '}
                        </div>
                        <ReactMarkdown className="comment-body markdown-body" children={comment.body}/>
                    </div>
                </div>
            ))}
        </>
    )
}