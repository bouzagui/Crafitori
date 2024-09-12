// src/components/modal/Modal.js
import React, {useRef} from 'react';

const Modal = ({ children, onClose }) => {
    const modalRef = useRef();

    const closModal = (e) => {
        if(modalRef.current === e.target){
            onClose();
        }
    }

  return (
    <div ref={modalRef} onClick={closModal} className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 backdrop-blur-sm">
      <div className="bg-white p-6 rounded-xl shadow-xl relative">
        {children}
      </div>
    </div>
  );
};

export default Modal;
