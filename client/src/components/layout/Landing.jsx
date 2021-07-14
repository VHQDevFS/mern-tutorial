import { Redirect } from 'react-router-dom';

const Landing = () => {
  return (
    <div>
      <Redirect to="/login" />
    </div>
  );
};

export default Landing;
