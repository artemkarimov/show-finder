import type { FunctionComponent } from 'react';
import Link from 'next/link';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PersonIcon from '@mui/icons-material/Person';

import { State } from '@store';
import { authActions } from '@store/slices/auth-slice';
import Dialog from '@components/dialog';
import Button from '@components/buttons/button';
import StaticRoutes from '@common/enums/static-routes';
import { signUserOut } from '@api/api-helper';
import styles from './styles.module.scss';

const Header: FunctionComponent = () => {
  const [confirmDialogOpened, setConfirmDialogOpened] = useState<boolean>(false);
  const isAuthenticated = useSelector((state: State) => state.auth.isAuthenticated);
  const currentUser = useSelector((state: State) => state.auth.currentUser);
  const dispatch = useDispatch();
  const signoutHandler = async () => {
    await signUserOut();
    setConfirmDialogOpened(false);
    dispatch(authActions.signOut());
  };
  return (
    <>
      <header className={styles.header}>
        <div className={styles.logo}>
          <Link href={StaticRoutes.HOME}>ShowFinder</Link>
        </div>
        <nav>
          <ul>
            {!isAuthenticated && (
              <>
                <li>
                  <Link href={StaticRoutes.SIGNIN}>Sign in</Link>
                </li>
                <li>
                  <Link href={StaticRoutes.SIGNUP}>Sign up</Link>
                </li>
              </>
            )}
            {isAuthenticated && (
              <>
                <li className={styles['current-user']}>
                  <PersonIcon htmlColor="white" fontSize="large" className={styles.icon} />
                  <p>{currentUser?.userName}</p>
                </li>
                <li style={{ marginLeft: '3rem' }} onClick={() => setConfirmDialogOpened(true)}>
                  Sign out
                </li>
              </>
            )}
          </ul>
        </nav>
      </header>
      {confirmDialogOpened && (
        <Dialog title="Confirm Logging Out">
          <p>You will be logged out</p>
          <div>
            <Button flat={true} clickHandler={() => setConfirmDialogOpened(false)}>
              Cancel
            </Button>
            <Button flat={false} clickHandler={signoutHandler}>
              Okay
            </Button>
          </div>
        </Dialog>
      )}
    </>
  );
};

export default Header;
