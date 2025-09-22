import React, { Suspense } from "react";
const RemoteAppDatarouter = React.lazy(() => import('remote_app_datarouter/App'))

export const RemoteComponentWrapperDatarouter = () => {
  return (
    <div className="p-4">
      <Suspense fallback={<div>Loading Remote App...</div>}>
        <RemoteAppDatarouter />
      </Suspense>
    </div>
  );
};