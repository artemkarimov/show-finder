import type { ChangeEvent, FunctionComponent } from 'react';
import { useState } from 'react';

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
  const [commentText, setCommentText] = useState<string>('');
  const getShowComments = async () => {
    const showComments = await getComments(showId);
    setComments(showComments);
  };
  const clickHandler = async () => {
    if (opened) setOpened(false);
    else {
      setOpened(true);
      await getShowComments();
    }
  };
  const changeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setCommentText(event.target.value);
  };
  const createCommentHandler = async () => {
    if (!commentText) return;
    await postComment(commentText, showId, userId);
    await getShowComments();
    setCommentText('');
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
            value={commentText}
            onChange={changeHandler}
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
              <CommentItem
                id={comment.id}
                user={comment.user.userName}
                text={comment.content}
                onDelete={getShowComments}
              />
            </li>
          ))}
        </ul>
      )}
      {opened && !comments.length && <p className={styles['no-comments']}>No comments yet</p>}
    </section>
  );
};

export default CommentSection;
