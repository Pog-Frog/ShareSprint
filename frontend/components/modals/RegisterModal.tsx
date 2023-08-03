import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { showSuccess } from "@/redux/reducers/success.reducer";
import { showError } from "@/redux/reducers/error.reducer";

import useLoginModal from "@/hooks/useLoginModal";
import useRegisterModal from "@/hooks/useRegisterModal";

import Input from "../Input";
import Modal from "../Modal";
import { AuthService } from "@/pages/api/services/auth.service";


const RegisterModal = () => {
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');

  const [isLoading, setIsLoading] = useState(false);

  const onToggle = useCallback(() => {
    if (isLoading) {
      return;
    }

    registerModal.onClose();
    loginModal.onOpen();
  }, [loginModal, registerModal, isLoading]);

  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true);

      await AuthService.register({ email, password, username }).then((res) => {
        dispatch(showSuccess('You have successfully registered!'));
        onToggle();
      }).catch((err) => {
        dispatch(showError(err.message));
      });

      setIsLoading(false)

    } catch (error) {
      dispatch(showError(error));
    } finally {
      setIsLoading(false);
    }
  }, [dispatch, email, onToggle, password, username]);

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Input
        disabled={isLoading}
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        disabled={isLoading}
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <Input
        disabled={isLoading}
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
    </div>
  )

  const footerContent = (
    <div className="text-neutral-400 text-center mt-4">
      <p>Already have an account?
        <span
          onClick={onToggle}
          className="
            text-white 
            cursor-pointer 
            hover:underline
          "
        > Sign in</span>
      </p>
    </div>
  )

  return (
    <Modal
      disabled={isLoading}
      isOpen={registerModal.isOpen}
      title="Create an account"
      actionLabel="Register"
      onClose={registerModal.onClose}
      onSubmit={onSubmit}
      body={bodyContent}
      footer={footerContent}
    />
  );
}

export default RegisterModal;
