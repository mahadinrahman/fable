import { Spinner } from '@heroui/react';
import React from 'react';

const Loading = () => {
    return (
        <div>
      <div className="flex items-center justify-center mt-7 gap-4">
      <Spinner />
    </div>
        </div>
    );
};

export default Loading;