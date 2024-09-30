import './PostDetail.css';

import { useCallback, useEffect, useState } from 'react';

import type { Comment, Detail, State } from './Types';

function PostDetail({ state }: postDetailProp) {
  const [detail, setDetail] = useState<Detail>({
    comments: [],
  });

  const fetchDetails = useCallback(async () => {
    try {
      const url = 'https://jsonplaceholder.typicode.com/posts/';
      const response = await fetch(
        url + state.selectedPostId.toString() + '/comments',
      );
      const data = (await response.json()) as Comment[];
      return data;
    } catch (error) {
      console.error('Error: ', error);
      return [];
    }
  }, [state.selectedPostId]);

  useEffect(() => {
    let ignore = false;
    fetchDetails()
      .then((data) => {
        if (!ignore) setDetail({ comments: data });
      })
      .catch((error: unknown) => {
        console.error('Error: ', error);
      });
    return () => {
      ignore = true;
    };
  }, [fetchDetails]);

  return (
    <div className="post-detail">
      <div className="post-detail-header">Content</div>
      <ul className="post-detail-ul">
        <li className="post-detail-li">
          {state.posts[state.selectedPostId - 1]?.body}
        </li>
      </ul>
      <div className="post-detail-header">Comments</div>
      <ul className="post-detail-ul">
        {detail.comments.map((val) => (
          <li className="post-detail-li" key={val.id}>
            <div className="post-detail-li-author">Author: {val.email}</div>
            <br />
            {val.body}
          </li>
        ))}
      </ul>
    </div>
  );
}

type postDetailProp = {
  state: State;
};

export default PostDetail;
