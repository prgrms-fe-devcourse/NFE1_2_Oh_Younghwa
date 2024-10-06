import { Id, toast, ToastOptions } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import './CustomToast.scss';
type ToastProps = {
  text: string;
};

export const Msg = ({ text }: ToastProps) => {
  return (
    <div className="msg-container">
      <p className="msg-description">{text}</p>
    </div>
  );
};
const defaultToastProps: ToastOptions<unknown> = {
  position: 'bottom-right',
  autoClose: 2000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
};
export const toaster = (myProps: ToastProps, toastProps = {}): Id =>
  toast(<Msg {...myProps} />, { ...toastProps, ...defaultToastProps });

toaster.success = (myProps: ToastProps, toastProps = {}): Id =>
  toast.success(<Msg {...myProps} />, { ...toastProps, ...defaultToastProps });
toaster.error = (myProps: ToastProps, toastProps = {}): Id =>
  toast.error(<Msg {...myProps} />, { ...toastProps, ...defaultToastProps });
toaster.info = (myProps: ToastProps, toastProps = {}): Id =>
  toast.info(<Msg {...myProps} />, { ...toastProps, ...defaultToastProps });
toaster.warn = (myProps: ToastProps, toastProps = {}): Id =>
  toast.warn(<Msg {...myProps} />, { ...toastProps, ...defaultToastProps });
