import type { NextPage, GetServerSideProps, GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';
import { useState, useRef, FormEvent, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AxiosError } from 'axios';

import { State } from '../../../store';
import { authActions } from '../../../store/slices/auth-slice';
import Card from '../../../components/card';
import Button from '../../../components/buttons/button';
import Input from '../../../components/inputs/input';
import StaticRoutes from '../../../common/enums/static-routes';
import { signUserIn } from '../../../api/api-helper';
import { getUser } from '../../../store/slices/auth-slice';
import styles from '../styles.module.scss';

interface Props {
  previousPageUrl: string | undefined;
}

const SigninPage: NextPage<Props> = ({ previousPageUrl }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUser());
  }, []);
  const [userNameError, setUserNameError] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');
  const isAthenticated = useSelector((state: State) => state.auth.isAuthenticated);
  if (isAthenticated) router.replace(StaticRoutes.HOME);
  const [hasSubmitted, setHasSubmitted] = useState<boolean>(false);
  const userNameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const userNameInputHandler = () => {
    setUserNameError('');
    return true;
  };
  const passwordInputHandler = () => {
    setPasswordError('');
    return true;
  };
  const submitHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const enteredUserName = userNameRef.current?.value;
    const enteredPassword = passwordRef.current?.value;
    if (enteredUserName && enteredPassword) {
      const signinData = {
        userName: enteredUserName,
        password: enteredPassword,
      };
      try {
        const user = await signUserIn(signinData);
        if (user) {
          dispatch(authActions.signIn(user));
          if (previousPageUrl) router.push(previousPageUrl);
          else router.push(StaticRoutes.HOME);
        }
      } catch (err: unknown) {
        const error = err as AxiosError;
        if (error.response?.status === 404)
          setUserNameError('There is no user with this user name');
        if (error.response?.status === 400) setPasswordError('Password is incorrect');
        console.log();
      }
    } else setHasSubmitted(true);
  };
  return (
    <Card>
      <h1 className={styles.heading}>Sign In</h1>
      <form onSubmit={submitHandler}>
        <Input
          id="login"
          type="text"
          label="Username"
          placeholder="Enter username"
          reference={userNameRef}
          errorMessage={userNameError}
          hasSubmitted={hasSubmitted}
          onInput={userNameInputHandler}
        />
        <Input
          id="password"
          type="password"
          label="Password"
          placeholder="Enter password"
          reference={passwordRef}
          hasSubmitted={hasSubmitted}
          errorMessage={passwordError}
          onInput={passwordInputHandler}
        />
        <Button flat={false}>Sign in</Button>
        <Button flat={true} link={StaticRoutes.SIGNUP}>
          Dont have an account? Sign up instead
        </Button>
      </form>
    </Card>
  );
};

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const previousPageUrl = context.req.headers.referer;
  return {
    props: {
      previousPageUrl,
    },
  };
};

export default SigninPage;
