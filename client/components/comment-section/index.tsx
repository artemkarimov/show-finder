import type { FunctionComponent } from 'react';
import { useState, useRef } from 'react';

import CommentItem from '../comment-item';
import Button from '../buttons/button';
import { getComments, postComment } from '../../api/api-helper';
import styles from './styles.module.scss';
import Comment from '../../common/interfaces/comment';

interface Props {
  showId: number;
  userId: number;
}

const CommentSection: FunctionComponent<Props> = ({ showId, userId }) => {
  const [opened, setOpened] = useState<boolean>(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const commentRef = useRef<HTMLInputElement>(null);
  const clickHandler = async () => {
    if (opened) setOpened(false);
    else {
      setOpened(true);
      const showComments = await getComments(showId);
      setComments(showComments);
    }
  };
  const createCommentHandler = async () => {
    const enteredComment = commentRef.current?.value;
    if (!enteredComment) return;
    await postComment(enteredComment, showId, userId);
    const showComments = await getComments(showId);
    setComments(showComments);
  };
  return (
    <section className={styles.section}>
      <div className={styles['toggle-button']}>
        <Button flat={true} clickHandler={clickHandler}>
          {opened ? 'Close' : 'Show'} comments
        </Button>
      </div>
      {opened && (
        <div>
          <input
            className={styles.input}
            type="text"
            placeholder="Leave comment"
            ref={commentRef}
          />
          <button className={styles.button} onClick={createCommentHandler}>
            Post
          </button>
        </div>
      )}
      {opened && !!comments.length && (
        <ul>
          {comments.map(comment => (
            <li key={comment.id}>
              <CommentItem user={comment.user.userName} text={comment.content} />
            </li>
          ))}
        </ul>
      )}
      {opened && !comments.length && <p className={styles['no-comments']}>No comments yet</p>}
    </section>
  );
};

export default CommentSection;
