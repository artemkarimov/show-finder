import type { FunctionComponent } from 'react';

import styles from './styles.module.scss';

interface Props {
  user: string;
  text: string;
}

const CommentItem: FunctionComponent<Props> = ({ user, text }) => {
  return (
    <div className={styles.comment}>
      <p>
        <span>{user}</span> left the comment:
      </p>
      <p className={styles.text}>{text}</p>
    </div>
  );
};

export default CommentItem;
