import type { FunctionComponent } from 'react';
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import PersonIcon from '@mui/icons-material/Person';

import { State } from '../../store';
import StaticRoutes from '../../common/enums/static-routes';
import { signUserOut } from '../../api/api-helper';
import styles from './styles.module.scss';
import { authActions } from '../../store/slices/auth-slice';

const Header: FunctionComponent = () => {
  const isAuthenticated = useSelector((state: State) => state.auth.isAuthenticated);
  const currentUser = useSelector((state: State) => state.auth.currentUser);
  const dispatch = useDispatch();
  const signoutHandler = async () => {
    await signUserOut();
    dispatch(authActions.signOut());
  };
  return (
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
                <PersonIcon htmlColor="white" />
                <p>{currentUser?.userName}</p>
              </li>
              <li style={{ marginLeft: '3rem' }} onClick={signoutHandler}>
                Sign out
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
