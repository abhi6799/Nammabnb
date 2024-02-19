'use client';

import { useCallback, useState } from 'react';
import { toast } from 'react-hot-toast';
import { signIn } from 'next-auth/react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { FcGoogle } from 'react-icons/fc';
import { AiFillGithub } from 'react-icons/ai';
import { useRouter } from 'next/navigation';

import useRegisterModal from '../hooks/UseRegisterModel';
import useLoginModal from '../hooks/UseLoginModel';

import Modal from './Modal';
import Input from '../inputs/Input';
import Heading from '../Heading';
import Button from '../Button';
import {
	RegisterModalContentField,
	AccountField,
	AccountProvider,
	AccountProviderLabel,
} from '@/app/enum/login-register.enum';
import { ToastMessage } from '@/app/enum/toast-message.enum';

const LoginModal = () => {
	const router = useRouter();
	const loginModal = useLoginModal();
	const registerModal = useRegisterModal();
	const [isLoading, setIsLoading] = useState(false);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FieldValues>({
		defaultValues: {
			email: '',
			password: '',
		},
	});

	const loginHandler: SubmitHandler<FieldValues> = (data) => {
		setIsLoading(true);

		signIn('credentials', {
			...data,
			redirect: false,
		}).then((callback) => {
			setIsLoading(false);

			if (callback?.ok) {
				toast.success(ToastMessage.LOGGED_IN);
				router.refresh();
				loginModal.onClose();
			}

			if (callback?.error) {
				toast.error(callback.error);
			}
		});
	};

	const onToggle = useCallback(() => {
		loginModal.onClose();
		registerModal.onOpen();
	}, [loginModal, registerModal]);

	const bodyContent = (
		<div className='flex flex-col gap-4'>
			<Heading
				title={RegisterModalContentField.TITLE}
				subtitle={RegisterModalContentField.SUBTITLE}
			/>
			<Input
				id={AccountField.EMAIL}
				label='Email'
				disabled={isLoading}
				register={register}
				errors={errors}
				required
			/>
			<Input
				id={AccountField.PASSWORD}
				label='Password'
				type='password'
				disabled={isLoading}
				register={register}
				errors={errors}
				required
			/>
		</div>
	);

	const footerContent = (
		<div className='flex flex-col gap-4 mt-3'>
			<hr />
			<Button
				outline
				label={AccountProviderLabel.GOOGLE}
				icon={FcGoogle}
				onClick={() => signIn(AccountProvider.GOOGLE)}
			/>
			<Button
				outline
				label={AccountProviderLabel.GITHUB}
				icon={AiFillGithub}
				onClick={() => signIn(AccountProvider.GITHUB)}
			/>
			<div
				className='
      text-neutral-500 text-center mt-4 font-light'>
				<p>
					First time using Airbnb?
					<span
						onClick={onToggle}
						className='
              text-neutral-800
              cursor-pointer 
              hover:underline
            '>
						Create an account
					</span>
				</p>
			</div>
		</div>
	);

	return (
		<Modal
			disabled={isLoading}
			isOpen={loginModal.isOpen}
			title='Login'
			actionLabel='Continue'
			onClose={loginModal.onClose}
			onSubmit={handleSubmit(loginHandler)}
			body={bodyContent}
			footer={footerContent}
		/>
	);
};

export default LoginModal;