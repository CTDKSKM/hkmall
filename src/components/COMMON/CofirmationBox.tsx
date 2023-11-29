import React from 'react';

type Props = {
  onConfirm: () => void;
  onCancel: () => void;
  message: string;
};

const CofirmationBox = (props: Props) => {
  return (
    <div className="fixed inset-0 overflow-y-auto flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-black opacity-50"></div>

      <div className="bg-white p-8 rounded shadow-md z-10">
        <p className="text-lg font-semibold mb-4">{props.message}</p>
        <div className="flex justify-end">
          <button onClick={props.onConfirm} className="bg-blue-500 text-white px-4 py-2 rounded mr-2">
            수락
          </button>
          <button onClick={props.onCancel} className="bg-gray-300 text-gray-700 px-4 py-2 rounded">
            취소
          </button>
        </div>
      </div>
    </div>
  );
};

export default CofirmationBox;
