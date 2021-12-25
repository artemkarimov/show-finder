import { FunctionComponent, useState } from 'react';
import { useSelector } from 'react-redux';
import ClearIcon from '@mui/icons-material/Clear';

import Dialog from '../dialog';
import Button from '../buttons/button';
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
  const [confirmDialogOpened, setConfirmDialogOpened] = useState<boolean>(false);
  const currentUser = useSelector((state: State) => state.auth.currentUser);
  const canBeRemoved = user === currentUser?.userName;
  const clickHandler = async () => {
    await deleteComment(id);
    await onDelete();
    setConfirmDialogOpened(false);
  };
  return (
    <>
      {confirmDialogOpened && (
        <Dialog title="Removing comment" top="18rem">
          <p>This comment will be removed</p>
          <div>
            <Button flat={true} clickHandler={() => setConfirmDialogOpened(false)}>
              Cancel
            </Button>
            <Button flat={false} clickHandler={clickHandler}>
              Okay
            </Button>
          </div>
        </Dialog>
      )}
      <div className={styles.comment}>
        <div>
          <p>
            <span>{user}</span> left the comment:
          </p>
          {canBeRemoved && (
            <div className={styles['delete-icon']} onClick={() => setConfirmDialogOpened(true)}>
              <ClearIcon />
            </div>
          )}
        </div>
        <p className={styles.text}>{text}</p>
      </div>
    </>
  );
};

export default CommentItem;
