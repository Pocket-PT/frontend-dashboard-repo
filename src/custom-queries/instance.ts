'use client';

import axios from 'axios';
import useTokenStore from '../stores/token';
import { SERVER_URL } from '@/constants/global';
import { redirect } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';

const serverInstance = axios.create({
  baseURL: SERVER_URL,
  timeout: Infinity,
  headers: {
    Authorization: '',
    'Content-Type': 'application/json',
  },
});

export const getServerInstance = () => {
  const { token } = useTokenStore();
  const queryClient = useQueryClient();
  serverInstance.defaults.headers.Authorization = `Bearer ${token}`;
  serverInstance.defaults.headers['Access-Control-Allow-Origin'] = '*';
  serverInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response.status === 401) {
        queryClient.invalidateQueries();
        console.log('axios catch 401');
        redirect('/login');
      }
      return Promise.reject(error);
    },
  );

  return serverInstance;
};
