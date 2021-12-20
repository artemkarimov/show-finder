import type { NextPage, GetServerSideProps } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState, useRef, FormEvent } from 'react';
import { useDispatch } from 'react-redux';

import SubscriptionPrice from '../../../common/interfaces/subscription-price';
import Card from '../../../components/card';
import Button from '../../../components/buttons/button';
import Input from '../../../components/inputs/input';
import CountrySelector from '../../../components/country-selector';
import { authActions } from '../../../store/slices/auth-slice';
import StaticRoutes from '../../../common/enums/static-routes';
import validatePasswords from '../../../helpers/password-validator';
import {
  signUserUp,
  getAllSubscriptionPrices,
  getCurrentUser,
  getUsersByUserName,
} from '../../../api/api-helper';
import User from '../../../common/interfaces/user';
import getArrayUniqueByKey from '../../../helpers/array-unique-by-key';
import styles from '../styles.module.scss';

interface Props {
  currentUser: User | null;
  subscriptionPrices: SubscriptionPrice[];
}

const SignUpPage: NextPage<Props> = ({ currentUser, subscriptionPrices }) => {
  const router = useRouter();
  if (currentUser) router.replace(StaticRoutes.HOME);
  const dispatch = useDispatch();
  const [hasSubmitted, setHasSubmitted] = useState<boolean>(false);
  const [userNameError, setUserNameError] = useState<string | undefined>(undefined);
  const [passwordError, setPasswordError] = useState<string | undefined>(undefined);
  const [passwordConfirmError, setPasswordConfirmError] = useState<string | undefined>(undefined);
  const countries = getArrayUniqueByKey(
    subscriptionPrices.map(value => value.country),
    'id'
  );
  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const countryRef = useRef<HTMLSelectElement>(null);
  const userNameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const checkPasswordsAreValid = (password: string, confirmPassword: string) => {
    try {
      validatePasswords(password, confirmPassword);
      setPasswordError(previousValue => {
        if (previousValue) return undefined;
      });
      setPasswordConfirmError(previousValue => {
        if (previousValue) return undefined;
      });
      return true;
    } catch (error: unknown) {
      if (error instanceof Error) {
        if (error.message === 'Passwords do not match.') {
          setPasswordError(previousValue => {
            if (previousValue) return undefined;
          });
          setPasswordConfirmError(error.message);
        } else setPasswordError(error.message);
      }
      return false;
    }
  };
  const submitHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const enteredFirstName = firstNameRef.current?.value;
    const enteredLastName = lastNameRef.current?.value;
    const selectedCountry = countryRef.current?.value;
    const enteredUserName = userNameRef.current?.value;
    const enteredPassword = passwordRef.current?.value;
    const enteredConfirmPassword = confirmPasswordRef.current?.value;
    if (
      enteredFirstName &&
      enteredLastName &&
      selectedCountry &&
      enteredUserName &&
      enteredPassword &&
      enteredConfirmPassword
    ) {
      const signupData = {
        firstName: enteredFirstName,
        lastName: enteredLastName,
        countryId: +selectedCountry,
        userName: enteredUserName,
        password: enteredPassword,
      };
      const validPasswords = checkPasswordsAreValid(enteredPassword, enteredConfirmPassword);
      if (!validPasswords) return;
      const user = await signUserUp(signupData);
      if (user) {
        dispatch(authActions.signIn(user));
        router.push(StaticRoutes.HOME);
      }
    } else {
      setHasSubmitted(true);
      if (enteredPassword && enteredConfirmPassword) {
        checkPasswordsAreValid(enteredPassword, enteredConfirmPassword);
      }
    }
  };
  const userNameChangeHandler = async () => {
    const enteredUserName = userNameRef.current?.value;
    if (!enteredUserName) return;
    const users = await getUsersByUserName(enteredUserName);
    if (users.length) {
      setUserNameError('This username is already used.');
      return false;
    } else {
      if (userNameError) setUserNameError(undefined);
      return true;
    }
  };
  return (
    <>
      <Head>
        <title>ShowFinder - Sign Up</title>
      </Head>
      <Card>
        <h1 className={styles.heading}>Sign Up</h1>
        <form onSubmit={submitHandler}>
          <Input
            id="firstName"
            type="text"
            label="First Name"
            placeholder="Enter first name"
            reference={firstNameRef}
            hasSubmitted={hasSubmitted}
          />
          <Input
            id="lastName"
            type="text"
            label="Last Name"
            placeholder="Enter last name"
            reference={lastNameRef}
            hasSubmitted={hasSubmitted}
          />
          <CountrySelector options={countries} hasSubmitted={hasSubmitted} reference={countryRef} />
          <Input
            id="userName"
            type="text"
            label="UserName"
            placeholder="Enter user name"
            reference={userNameRef}
            onChange={userNameChangeHandler}
            hasSubmitted={hasSubmitted}
            errorMessage={userNameError}
          />
          <Input
            id="password"
            type="password"
            label="Password"
            placeholder="Enter password"
            reference={passwordRef}
            hasSubmitted={hasSubmitted}
            error={!!passwordConfirmError}
            errorMessage={passwordError}
          />
          <Input
            id="passwordConfirm"
            type="password"
            label="Confirm Password"
            placeholder="Confirm password"
            reference={confirmPasswordRef}
            hasSubmitted={hasSubmitted}
            errorMessage={passwordConfirmError}
          />
          <Button flat={false}>Register</Button>
          <Button flat={true} link={StaticRoutes.SIGNIN}>
            Already have an account? Sign in instead
          </Button>
        </form>
      </Card>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const currentUser = await getCurrentUser();
  const subscriptionPrices = await getAllSubscriptionPrices();
  return {
    props: {
      currentUser,
      subscriptionPrices,
    },
  };
};

export default SignUpPage;
