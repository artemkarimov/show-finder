import type { FunctionComponent } from 'react';
import { useSelector } from 'react-redux';
import ClearIcon from '@mui/icons-material/Clear';

import { State } from '../../store';
import { deleteComment } from '../../api/api-helper';
import styles from './styles.module.scss';

interface Props {
  id: number;
  user: string;
  text: string;
  onDelete: () => Promise<void>;
}

const CommentItem: FunctionComponent<Props> = ({ id, user, text, onDelete }) => {
  const currentUser = useSelector((state: State) => state.auth.currentUser);
  const canBeRemoved = user === currentUser?.userName;
  const clickHandler = async (id: number) => {
    await deleteComment(id);
    await onDelete();
  };
  return (
    <div className={styles.comment}>
      <div>
        <p>
          <span>{user}</span> left the comment:
        </p>
        {canBeRemoved && (
          <div className={styles['delete-icon']} onClick={() => clickHandler(id)}>
            <ClearIcon />
          </div>
        )}
      </div>
      <p className={styles.text}>{text}</p>
    </div>
  );
};

export default CommentItem;
