import React from 'react';
import { safeCredentials, handleErrors } from '../utils/fetchHelper';
import CreateTweet from './CreateTweet';

class Feed extends React.Component {
    state = {
        tweets: [],
        error: null,
    };

    componentDidMount() {
        this.fetchTweets();
    }

    fetchTweets = () => {
        fetch('api/tweets')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network Response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            console.log('Fetched tweets: ', data);
            this.setState({ tweets: data.tweets });
        })
        .catch(error => {
            console.error('Error fetching tweets:', error);
            this.setState({ error: error.message });
        });
    }

    render() {
        const { tweets, error } = this.state;
        return (
            <>
                <h1 className="text-center">Feed</h1>
                <CreateTweet />
                {error && <p className="text-danger">Error: {error}</p>}
                <div className="container mt-4">
                    <div className="row">
                        {tweets.map(tweet => (
                            <div key={tweet.id} className="col-lg-12 mb-4">
                                <div className="card">
                                    <div className="card-body">
                                        <p className="card-text">{tweet.message}</p>
                                        <p className="card-text text-muted">
                                            - <a href={`/${tweet.username}`}>{tweet.username}</a>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </>
        );
    }
}

export default Feed;
