import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import Layout from '../layout';
import { safeCredentials } from '../utils/fetchHelper';

// Define a functional component Home
const Home = () => {
  // State to store user tweets
  const [tweets, setTweets] = useState([]);
  const [loading, setLoading] = useState(true);
// Function to get the username from the URL
const getUsernameFromURL = () => {
    const path = window.location.pathname;
    const username = path.split('/')[1]; // Assumes the username is the first segment after the root
    return username;
  };

  const username = getUsernameFromURL();

  // Fetch user tweets when the component mounts
  useEffect(() => {
    const fetchTweets = () => {
      fetch(`/api/users/${username}/tweets`, safeCredentials({
        method: 'GET',
        credentials: 'include', // Include cookies for session management
      }))
        .then(response => {
          if (response.ok) {
            return response.json(); // Parse response as JSON
          } else {
            // Handle error
            throw new Error('Error loading tweets:', response.statusText);
          }
        })
        .then(data => {
          const sortedTweets = data.tweets.sort((a, b) => new Date(b.id) - new Date(a.id));
          setTweets(sortedTweets); // Assuming the response contains a 'tweets' array
          console.log(sortedTweets);
          setLoading(false);
        })
        .catch(error => {
          console.error('Error loading tweets:', error);
          setLoading(false); // Set loading to false even if there's an error
        });
    };
    fetchTweets();
  }, [username]); // Include username as a dependency

  // Function to delete a tweet
  const deleteTweet = (id) => {
    fetch(`/api/tweets/${id}`, safeCredentials({
      method: 'DELETE',
      credentials: 'include', // Include cookies for session management
    }))
      .then(response => {
        if (response.ok) {
          setTweets(tweets.filter(tweet => tweet.id !== id));
        } else {
          throw new Error('Error deleting tweet:', response.statusText);
        }
      })
      .catch(error => {
        console.error('Error deleting tweet:', error);
      });
  };

  return (
    <Layout>
      <>
        <h1 className="text-center">User's Page</h1>
        <div className="container mt-4">
          <div className="row">
            {tweets.map(tweet => (
              <div key={tweet.id} className="col-lg-12 mb-4">
                <div className="card">
                  <div className="card-body">
                    <p className="card-text">{tweet.message}</p>
                    <p className="card-text text-muted">- {tweet.username}</p>
                      <button className="btn btn-danger" onClick={() => deleteTweet(tweet.id)}>Delete</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </>
    </Layout>
  );
};

// Render the Home component when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Home />,
    document.body.appendChild(document.createElement('div'))
  );
});
