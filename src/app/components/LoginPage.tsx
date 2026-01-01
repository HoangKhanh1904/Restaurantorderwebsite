import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { users } from '../data/mockData';
import { useRestaurant } from '../context/RestaurantContext';
import { UtensilsCrossed } from 'lucide-react';

export function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login, language } = useRestaurant();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const user = users.find((u) => u.username === username);
    if (user) {
      login(user);
    } else {
      alert(language === 'vi' ? 'Tên đăng nhập không tồn tại' : 'Username not found');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-red-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-4 text-center">
          <div className="flex justify-center">
            <div className="bg-orange-500 p-4 rounded-full">
              <UtensilsCrossed className="size-8 text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl">
            {language === 'vi' ? 'Hệ Thống Đặt Món' : 'Restaurant Order System'}
          </CardTitle>
          <CardDescription>
            {language === 'vi' 
              ? 'Đăng nhập để tiếp tục' 
              : 'Login to continue'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">
                {language === 'vi' ? 'Tên đăng nhập' : 'Username'}
              </Label>
              <Input
                id="username"
                placeholder={language === 'vi' ? 'Nhập tên đăng nhập' : 'Enter username'}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">
                {language === 'vi' ? 'Mật khẩu' : 'Password'}
              </Label>
              <Input
                id="password"
                type="password"
                placeholder={language === 'vi' ? 'Nhập mật khẩu' : 'Enter password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full bg-orange-500 hover:bg-orange-600">
              {language === 'vi' ? 'Đăng nhập' : 'Login'}
            </Button>
          </form>
          
          <div className="mt-6 pt-6 border-t">
            <p className="text-sm text-muted-foreground mb-2">
              {language === 'vi' ? 'Tài khoản demo:' : 'Demo accounts:'}
            </p>
            <div className="space-y-1 text-xs text-muted-foreground">
              <p>• server01 - {language === 'vi' ? 'Nhân viên phục vụ' : 'Server'}</p>
              <p>• kitchen01 - {language === 'vi' ? 'Nhân viên bếp' : 'Kitchen'}</p>
              <p>• manager01 - {language === 'vi' ? 'Quản lý' : 'Manager'}</p>
              <p>• cashier01 - {language === 'vi' ? 'Thu ngân' : 'Cashier'}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
