import React from 'react';
import { safeCredentials, handleErrors } from '../utils/fetchHelper';

class CreateTweet extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tweet: '',
        };
    }

    handleChange = (event) => {
        this.setState({ tweet: event.target.value });
    }

    handleSubmit = (event) => {
        event.preventDefault();

        fetch('/api/tweets', safeCredentials({
            method: 'POST',
            body: JSON.stringify({ 
                tweet: {
                    message: this.state.tweet
                } }),
        }))
        .then(handleErrors)
        .then(response => {
            // Handle success, maybe show a success message
            console.log('Tweet created successfully');
            // Clear the input field
            this.setState({ tweet: '' });
        })
        .catch(error => {
            // Handle error
            console.error('Error creating tweet:', error);
        });
    }

    render() {
        return (
            <div>
                <h3>What's on your mind?</h3>
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <textarea
                            value={this.state.tweet}
                            onChange={this.handleChange}
                            placeholder="Write your tweet..."
                            rows="4"
                            cols="50"
                            required
                        />
                    </div>
                    <button type="submit">Tweet</button>
                </form>
            </div>
        );
    }
}

export default CreateTweet;
