import { FC } from 'react';
import { ToastContainer as ToastifyContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ToastContainer: FC = () => (
  <ToastifyContainer
    position="bottom-right"
    autoClose={1000}
    hideProgressBar={false}
    newestOnTop={false}
    closeOnClick
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover
  />
);

export default ToastContainer;
