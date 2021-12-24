import type { FunctionComponent } from 'react';
import { useSelector } from 'react-redux';
import ClearIcon from '@mui/icons-material/Clear';

import styles from './styles.module.scss';
import { State } from '../../store';

interface Props {
  user: string;
  text: string;
}

const CommentItem: FunctionComponent<Props> = ({ user, text }) => {
  const currentUser = useSelector((state: State) => state.auth.currentUser);
  const canBeRemoved = user === currentUser?.userName;
  return (
    <div className={styles.comment}>
      <div>
        <p>
          <span>{user}</span> left the comment:
        </p>
        {canBeRemoved && (
          <div className={styles['delete-icon']}>
            <ClearIcon />
          </div>
        )}
      </div>
      <p className={styles.text}>{text}</p>
    </div>
  );
};

export default CommentItem;
