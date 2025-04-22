import React from 'react';

function Alert({ type, message }) {
  let alertClass = 'alert';
  if (type === 'success') {
    alertClass += ' alert-success';
  } else if (type === 'error') {
    alertClass += ' alert-error';
  }

  return (

      {message}

  );
}

export default Alert;