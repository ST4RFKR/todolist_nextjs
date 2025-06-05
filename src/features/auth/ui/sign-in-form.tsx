'use client';
import { Button } from '@/shared/components/ui';
import { Alert, AlertDescription } from '@/shared/components/ui/alert';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card';
import { Input } from '@/shared/components/ui/input';
import { Label } from '@/shared/components/ui/label';
import { Info } from 'lucide-react';
import React from 'react';
import { useTranslations } from 'next-intl';
import { Checkbox } from '@/shared/components/ui/checkbox';
import { Controller, useForm } from 'react-hook-form';

import { useRouter } from 'next/navigation';
import { useLoginMutation } from '../api/auth-api';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from '../sign-in-schema';
import toast from 'react-hot-toast';
import { BaseResponse } from '@/shared/types/types';

type Inputs = {
  email: string;
  password: string;
  rememberMe?: boolean;
  captcha?: string;
};

export const SignInForm = () => {
  const t = useTranslations('logIn');

  const router = useRouter();
  const [login] = useLoginMutation();

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '', rememberMe: false },
  });

  const onSubmit = async (data: Inputs) => {
    try {
      const result = (await login(data).unwrap()) as BaseResponse<{
        userId: number;
        token: string;
      }>;

      if (result.resultCode !== 0) {
        toast.error(result.messages?.[0] || 'Ошибка авторизации');
        return;
      }

      toast.success('Вы успешно залогинились');
      router.push('/');
      reset();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center background">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">{t('title')}</CardTitle>
          <CardDescription className="text-center">{t('description')}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert>
            <Info className="h-4 w-4" />
            <AlertDescription>
              <strong>{t('testData.title')}</strong>
              <br />
              {t('testData.login')}
              <br />
              {t('testData.password')}
            </AlertDescription>
          </Alert>

          <form className="space-y-4" onSubmit={handleSubmit((data) => onSubmit(data))}>
            <div className="space-y-2">
              <Label htmlFor="email">{t('emailLabel')}</Label>
              <Input
                id="email"
                type="email"
                placeholder={t('emailPlaceholder')}
                defaultValue="free@samuraijs.com"
                {...register('email')}
              />
              {errors.email && <span className="text-red-500 text-xs">{errors.email.message}</span>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">{t('passwordLabel')}</Label>
              <Input
                id="password"
                type="password"
                placeholder={t('passwordPlaceholder')}
                defaultValue="free"
                {...register('password')}
              />
              {errors.password && <span className="text-red-500">{errors.password.message}</span>}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <Controller
                  name="rememberMe"
                  control={control}
                  render={({ field }) => (
                    <Checkbox
                      className="mr-2"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  )}
                />
                <Label className="text-stone-400">{t('rememberMe')}</Label>
              </div>
            </div>
            <Button type="submit" className="w-full">
              {t('submit')}
            </Button>
          </form>

          <div className="text-center text-sm text-muted-foreground">
            {t('noAccount')}{' '}
            <a href="#" className="text-primary hover:underline">
              {t('register')}
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
