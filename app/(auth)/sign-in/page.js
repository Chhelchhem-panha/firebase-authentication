'use client'
import { useState } from 'react';
import { useSignInWithEmailAndPassword, useSignInWithGoogle, useSignInWithGithub } from 'react-firebase-hooks/auth';
import { auth } from '@/app/firebase/config';
import { useRouter } from 'next/navigation';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signInWithEmailAndPassword, , ,] = useSignInWithEmailAndPassword(auth);
  const [signInWithGoogle, , ,] = useSignInWithGoogle(auth);
  const [signInWithGithub, , ,] = useSignInWithGithub(auth);
  const router = useRouter()

  const handleSignIn = async () => {
    try {
        const res = await signInWithEmailAndPassword(email, password);
        console.log({res});
        sessionStorage.setItem('user', true)
        setEmail('');
        setPassword('');
        router.push('/')
    }catch(e){
        console.error(e)
    }
  };

  const handleGoogleSignIn = async () => {
    try {
        const res = await signInWithGoogle();
        console.log({res});
        sessionStorage.setItem('user', true)
        router.push('/')
    } catch(e) {
        console.error(e);
    }
  };

  const handleGithubSignIn = async () => {
    try {
        const res = await signInWithGithub();
        console.log({res});
        sessionStorage.setItem('user', true)
        router.push('/')
    } catch(e) {
        console.error(e);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-gray-800 p-10 rounded-lg shadow-xl w-96">
        <h1 className="text-white text-2xl mb-5">Sign In</h1>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 mb-4 bg-gray-700 rounded outline-none text-white placeholder-gray-500"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 mb-4 bg-gray-700 rounded outline-none text-white placeholder-gray-500"
        />
        <button
          onClick={handleSignIn}
          className="w-full p-3 bg-indigo-600 rounded text-white hover:bg-indigo-500 mb-3"
        >
          Sign In
        </button>
        <button
          onClick={handleGoogleSignIn}
          className="w-full p-3 bg-red-600 rounded text-white hover:bg-red-500 mb-3"
        >
          Sign in with Google
        </button>
        <button
          onClick={handleGithubSignIn}
          className="w-full p-3 bg-gray-600 rounded text-white hover:bg-gray-500"
        >
          Sign in with GitHub
        </button>
      </div>
    </div>
  );
};

export default SignIn;
