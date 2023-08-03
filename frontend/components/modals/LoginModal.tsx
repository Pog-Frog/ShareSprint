import { useCallback, useState } from "react";

import useLoginModal from "@/hooks/useLoginModal";
import useRegisterModal from "@/hooks/useRegisterModal";

import Input from "../Input";
import Modal from "../Modal";
import { COMPANY_NAME } from "@/config";
import { AuthService } from "@/pages/api/services/auth.service";
import { setToken } from "@/redux/reducers/auth.reducer";
import { useDispatch } from "react-redux";
import { showSuccess } from "@/redux/reducers/success.reducer";
import { showError } from "@/redux/reducers/error.reducer";

const LoginModal = () => {
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true);

      await AuthService.login({ email, password }).then((res) => {
        dispatch(showSuccess('You have successfully logged in!'))
        dispatch(setToken(res.token));
        loginModal.onClose();

      }).catch((err) => {
        dispatch(showError(err.message));

      });

    } catch (error) {
      dispatch(showError(error));

    } finally {
      setIsLoading(false);

    }

  }, [email, password, loginModal, dispatch]);

  const onToggle = useCallback(() => {
    loginModal.onClose();
    registerModal.onOpen();
  }, [loginModal, registerModal])

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Input
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        disabled={isLoading}
      />
      <Input
        placeholder="Password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        disabled={isLoading}
      />
    </div>
  )

  const footerContent = (
    <div className="text-neutral-400 text-center mt-4">
      <p>First time using {COMPANY_NAME}?
        <span
          onClick={onToggle}
          className="
            text-white 
            cursor-pointer 
            hover:underline
          "
        > Create an account</span>
      </p>
    </div>
  )

  return (
    <Modal
      disabled={isLoading}
      isOpen={loginModal.isOpen}
      title="Login"
      actionLabel="Sign in"
      onClose={loginModal.onClose}
      onSubmit={onSubmit}
      body={bodyContent}
      footer={footerContent}
    />
  );
}

export default LoginModal;
