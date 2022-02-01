import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Logo, FormRow, Alert } from '../components';
import Wrapper from '../assets/wrappers/RegisterPage';
import { useAppContext } from '../context/appContext';

const initialState = {
  name: '',
  email: '',
  password: '',
  isMember: true,
};

const Register = () => {
  //local state/values
  const navigate = useNavigate();
  const [values, setValues] = useState(initialState);
  //global state
  const { isLoading, showAlert, displayAlert, registerUser, user, loginUser } =
    useAppContext();

  const toggleMember = () => {
    setValues({ ...values, isMember: !values.isMember });
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, password, email, isMember } = values;
    if (!email | !password || (!isMember && !name)) {
      displayAlert();
      return;
    }
    const currentUser = { name, password, email };
    if (isMember) {
      loginUser(currentUser);
    } else {
      registerUser(currentUser);
    }
  };

  useEffect(() => {
    //user pochodzi ze state z appContext
    if (user) {
      setTimeout(() => {
        navigate('/');
      }, 3000);
    }
  }, [user, navigate]);

  return (
    <Wrapper className='full-page'>
      <form className='form' onSubmit={handleSubmit}>
        <Logo />
        <h3>{values.isMember ? 'Login' : 'Register'}</h3>
        {showAlert && <Alert />}
        {/* namefields */}
        {!values.isMember && (
          <FormRow
            type='text'
            name='name'
            value={values.name}
            handleChange={handleChange}
            placeholder='Enter your name...'
          />
        )}

        <FormRow
          type='email'
          name='email'
          value={values.email}
          handleChange={handleChange}
          placeholder='Enter your email...'
        />
        <FormRow
          type='password'
          name='password'
          value={values.password}
          handleChange={handleChange}
          placeholder='Enter your password...'
        />
        <button type='submit' className='btn btn-block' disabled={isLoading}>
          Submit
        </button>
        <p>
          {values.isMember
            ? 'Not a member yet?'
            : 'Are you already registered?'}
          <button type='button' className='member-btn' onClick={toggleMember}>
            {values.isMember ? 'Register' : 'Login'}
          </button>
        </p>
      </form>
    </Wrapper>
  );
};

export default Register;
