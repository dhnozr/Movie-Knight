import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import theater from '../../assets/theater.jpg';
import { supabase } from '../../../supabaseClient';
import { useQuery } from 'react-query';
import { useGetUser } from '../../components/request';
import { useStore } from '../../store/store';
import { useNavigate } from 'react-router-dom';
import { motion as m } from 'framer-motion';
import { AnimatePresence } from 'framer-motion';
import { pageAnimation } from '../../components/animation';

import Lottie from 'lottie-react';
import animation from '../../assets/Animation - 1707574303459.json';

export const Auth = () => {
  const navigate = useNavigate();
  // storedan user bilgisini cektim
  const {} = useGetUser();
  const user = useStore(state => state.user);

  const [showSignIn, setShowSignIn] = useState(false);

  const toggleShowSignIn = () => {
    setShowSignIn(!showSignIn);
  };
  // spinner icin
  const [loading, setLoading] = useState(false);
  const [userObj, setUser] = useState({
    name: '',
    email: '',
    password: '',
  });

  // storadan user set function alıcam
  const setGlobalUser = useStore(state => state.setUser);

  const onChange = e => {
    const { name, value } = e.target;

    setUser({ ...userObj, [name]: value });
  };

  const handleUserSignUp = async e => {
    e.preventDefault();

    setLoading(true);

    await new Promise(resolve => setTimeout(resolve, 1000));
    const { user, error } = await supabase.auth.signUp({
      email: userObj.email,
      password: userObj.password,
      options: {
        data: {
          userName: userObj.name,
        },
      },
    });

    setLoading(false);

    setUser({
      name: '',
      email: '',
      password: '',
    });

    if (error) {
      console.error('Sign in error', error.message);
    } else {
      navigate('/');
    }
  };

  const handleUserSignIn = async e => {
    e.preventDefault();
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));

    const { data, error } = await supabase.auth.signInWithPassword({
      email: userObj.email,
      password: userObj.password,
    });

    setLoading(false);

    setUser({
      name: '',
      email: '',
      password: '',
    });

    if (error) {
      console.error('Sign in error', error.message);
    } else {
      setGlobalUser(user);
      navigate('/');
    }
  };

  const formVariants = {
    hidden: { opacity: 0, x: 50 }, // Start from slightly right and faded out
    visible: { opacity: 1, x: 0, transition: { type: 'spring', stiffness: 150, duration: 1 } }, // End at fully visible and in place
    exit: { opacity: 0, x: -50, transition: { duration: 1 } }, // Exit to the left and fade out
  };

  return (
    <Wrapper variants={pageAnimation} initial='hidden' animate='show' exit='exit'>
      {loading ? (
        <Lottie animationData={animation} />
      ) : (
        <Form>
          <AnimatePresence>
            {showSignIn ? (
              <SignInAccount variants={formVariants} initial='hidden' animate='visible' exit='exit'>
                <h2>Sign in to your account </h2>
                <h4>
                  Watch <br /> your favorite movies
                </h4>
                <form onSubmit={handleUserSignIn}>
                  <label>
                    Email
                    <input value={userObj.email} name='email' onChange={onChange} type='email' />
                  </label>

                  <label>
                    Password
                    <input value={userObj.password} name='password' onChange={onChange} type='password' />
                  </label>

                  <button>Login</button>
                </form>
                <p onClick={toggleShowSignIn}>Click here to Sign up</p>
              </SignInAccount>
            ) : (
              <CreateAccount variants={formVariants} initial='hidden' animate='visible' exit='exit'>
                <h2>Create an account </h2>
                <h4>
                  Join us <br /> and watch <br /> your favorite movies
                </h4>
                <form onSubmit={handleUserSignUp}>
                  <label>
                    Name
                    <input value={userObj.name} name='name' onChange={onChange} type='text' />
                  </label>

                  <label>
                    Email
                    <input value={userObj.email} name='email' onChange={onChange} type='email' />
                  </label>

                  <label>
                    Password
                    <input value={userObj.password} name='password' onChange={onChange} type='password' />
                  </label>

                  <button>Login</button>
                </form>
                <p onClick={toggleShowSignIn}>Click here if you have an account</p>
              </CreateAccount>
            )}
          </AnimatePresence>
        </Form>
      )}
      <RightSide>
        <img src={theater} alt='' />
      </RightSide>
    </Wrapper>
  );
};

const Wrapper = styled(m.div)`
  margin-top: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;

  @media (max-width: 1100px) {
    flex-direction: column;
  }
`;

const Form = styled.div`
  display: flex;
  flex: 0.7;
  flex-direction: column;
  padding: 3rem;

  height: 600px;
  margin-left: 100px;
  background: rgba(0, 0, 0, 0.6);

  border-radius: 1rem;

  @media (max-width: 1100px) {
    margin-left: 0;
    width: 600px;

    h2 {
      font-size: 8px;
    }
  }

  @media (max-width: 600px) {
    margin-left: 0;
    max-width: 300px;
    h2 {
      font-size: 8px;
    }
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-top: 2rem;
    border-radius: 10px;

    button {
      color: black;
      background-color: white;
      border: none;
      padding: 4px 50px;
      width: fit-content;
      align-self: flex-end;
    }

    label {
      display: flex;
      flex-direction: column;
    }

    input {
      padding: 2px;
      background: none;
      border: none;
      border-bottom: 1px solid #ccc;
      color: white;

      &:focus {
        outline: none;
        border-color: white;
      }
    }
  }
`;

const RightSide = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  margin-right: 50px;
  padding-top: 3rem;
  img {
    border-radius: 1rem;
    max-width: 700px;
  }

  @media (max-width: 1100px) {
    img {
      display: none;
    }
  }
`;

const CreateAccount = styled(m.div)`
  h2 {
    font-size: 40px;
  }

  h4 {
    font-size: 20px;
  }

  p {
    margin-top: 2rem;
  }

  @media (max-width: 1200px) {
    h2 {
      font-size: 25px;
    }

    h4 {
      font-size: 18px;
    }
  }

  @media (max-width: 700px) {
    h2 {
      font-size: 20px;
    }

    h4 {
      font-size: 16px;
    }
  }
`;

const SignInAccount = styled(m.div)`
  h2 {
    font-size: 40px;
  }

  h4 {
    font-size: 20px;
  }

  p {
    margin-top: 2rem;
  }

  @media (max-width: 1200px) {
    h2 {
      font-size: 25px;
    }

    h4 {
      font-size: 18px;
    }
  }

  @media (max-width: 700px) {
    h2 {
      font-size: 20px;
    }

    h4 {
      font-size: 16px;
    }
  }
`;
