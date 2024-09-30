import './App.css';

import { useEffect, useState } from 'react';

import PostDetail from './components/PostDetail';
import PostList from './components/PostList';
import type { Post, State } from './components/Types';

const fetchPosts = async () => {
  try {
    const url = 'https://jsonplaceholder.typicode.com/posts';
    const response = await fetch(url);
    const data = (await response.json()) as Post[];
    return data;
  } catch (error) {
    console.error('Error: ', error);
    return [];
  }
};

function App() {
  useEffect(() => {
    let ignore = false;
    fetchPosts()
      .then((data) => {
        if (!ignore) setState({ posts: data, selectedPostId: 1 });
      })
      .catch((error: unknown) => {
        console.error('Error: ', error);
      });
    return () => {
      ignore = true;
    };
  }, []);

  const [state, setState] = useState<State>({
    posts: [],
    selectedPostId: 0,
  });

  return (
    <>
      <PostList state={state} setState={setState} />
      <PostDetail state={state} />
    </>
  );
}

export default App;
