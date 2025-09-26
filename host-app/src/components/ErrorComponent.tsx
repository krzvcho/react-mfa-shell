import React from 'react';
import { useRouteError, isRouteErrorResponse } from 'react-router-dom';

const ErrorComponent: React.FC = () => {
  const error = useRouteError();
  if (isRouteErrorResponse(error)) {
    // Thrown Response
    return (
      <div>
        <h1>Error {error.status}</h1>
        <p>{error.statusText}</p>
      </div>
    );
  }

  if (error instanceof Error) {
    // JS Error
    return (
      <div>
        <h1>Unexpected Error</h1>
        <p>{error.message}</p>
      </div>
    );
  }
};

export default ErrorComponent;
