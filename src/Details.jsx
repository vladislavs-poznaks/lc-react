import React from 'react';
import {useParams} from 'react-router-dom';
import {useQuery} from "react-query";
import axios from "axios";
import {formatDistance} from "date-fns";
import Comments from "./Comments";
import ReactMarkdown from 'react-markdown'

export default function Details() {
    const params = useParams();

    const {isLoading, isSuccess, data: issue} = useQuery(['issue', params.id], () => {
        return axios
            .get(`https://api.github.com/repos/facebook/create-react-app/issues/${params.id}`)
    });

    return (<div className="comments-container">
        {isLoading && (<h2>
            Loading...
        </h2>)}
        {isSuccess && (<>
            <h2>
                {issue.data.title} <span>#{issue.data.number}</span>
            </h2>
            <div className="issue-details">
                <a href={issue.data.user.html_url}>{issue.data.user.login}</a> opened this issue {' '}
                {formatDistance(new Date(issue.data.created_at), new Date(), {
                    addSuffix: true,
                })}{' '}
            </div>
            <div className="comment-container">
                <a href={issue.data.user.html_url}>
                    <img
                        src={issue.data.user.avatar_url}
                        alt="avatar"
                        className="avatar"
                    />
                </a>
                <div className="comment">
                    <div className="comment-heading">
                        <a href={issue.data.user.html_url}>{issue.data.user.login}</a> commented {' '}
                        {formatDistance(new Date(issue.data.created_at), new Date(), {
                            addSuffix: true,
                        })}{' '}
                    </div>
                    <ReactMarkdown className="comment-body markdown-body" children={issue.data.body}/>
                </div>
            </div>
        </>)}

        <div className="border"/>

        {isSuccess && issue.data.comments > 0 && <Comments url={issue.data.comments_url} />}
    </div>)
}
