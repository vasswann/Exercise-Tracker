import React, { Fragment } from 'react';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

const ButtonBack = () => {
  return (
    <Fragment>
      <div>
        <Button color='primary' component={Link} to='/dashboard' size='large'>
          Back to Dashboard
        </Button>
      </div>
    </Fragment>
  );
};

export default ButtonBack;
