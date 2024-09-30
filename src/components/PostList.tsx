import './PostList.css';

import type React from 'react';

import type { State } from './Types';

function PostList({ state, setState }: postListProps) {
  const onClick = (id: number) => {
    setState({
      ...state,
      selectedPostId: id,
    });
  };

  return (
    <div className="post-list">
      <div className="post-list-header">Post List</div>
      <ul className="post-list-ul">
        {state.posts.map((val) => (
          <li
            className={
              val.id === state.selectedPostId
                ? 'post-list-li selected'
                : 'post-list-li'
            }
            key={val.id}
            onClick={() => {
              onClick(val.id);
            }}
          >
            {val.id}. {val.title}
          </li>
        ))}
      </ul>
    </div>
  );
}

type postListProps = {
  state: State;
  setState: React.Dispatch<React.SetStateAction<State>>;
};

export default PostList;
