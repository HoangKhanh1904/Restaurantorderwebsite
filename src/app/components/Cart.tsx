import { useState } from 'react';
import { useRestaurant } from '../context/RestaurantContext';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Separator } from './ui/separator';
import { Trash2, Minus, Plus, ShoppingCart } from 'lucide-react';
import { toast } from 'sonner';

interface CartProps {
  onCheckout: () => void;
}

export function Cart({ onCheckout }: CartProps) {
  const { cart, updateCartItem, removeFromCart, clearCart, language } = useRestaurant();

  const subtotal = cart.reduce((sum, item) => sum + item.menuItem.price * item.quantity, 0);

  const handleQuantityChange = (index: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    updateCartItem(index, { ...cart[index], quantity: newQuantity });
  };

  const handleNoteChange = (index: number, newNote: string) => {
    updateCartItem(index, { ...cart[index], note: newNote });
  };

  const handleRemove = (index: number) => {
    removeFromCart(index);
    toast.success(
      language === 'vi' ? 'Đã xóa món khỏi giỏ hàng' : 'Item removed from cart'
    );
  };

  const handleClearCart = () => {
    if (confirm(language === 'vi' 
      ? 'Bạn có chắc muốn xóa tất cả món trong giỏ hàng?' 
      : 'Are you sure you want to clear the cart?'
    )) {
      clearCart();
      toast.success(
        language === 'vi' ? 'Đã xóa giỏ hàng' : 'Cart cleared'
      );
    }
  };

  if (cart.length === 0) {
    return (
      <Card>
        <CardContent className="py-12 text-center">
          <ShoppingCart className="size-12 mx-auto mb-4 text-muted-foreground" />
          <p className="text-muted-foreground">
            {language === 'vi' ? 'Giỏ hàng trống' : 'Cart is empty'}
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>
            {language === 'vi' ? 'Giỏ hàng' : 'Cart'} ({cart.length})
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClearCart}
            className="text-destructive"
          >
            {language === 'vi' ? 'Xóa tất cả' : 'Clear all'}
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {cart.map((item, index) => (
          <div key={index} className="space-y-3 pb-4 border-b last:border-0">
            <div className="flex gap-3">
              <img
                src={item.menuItem.image}
                alt={language === 'vi' ? item.menuItem.name : item.menuItem.nameEn}
                className="w-20 h-20 object-cover rounded-lg"
              />
              <div className="flex-1 space-y-2">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-semibold">
                      {language === 'vi' ? item.menuItem.name : item.menuItem.nameEn}
                    </h4>
                    <p className="text-sm text-orange-600">
                      {item.menuItem.price.toLocaleString('vi-VN')}đ
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleRemove(index)}
                    className="text-destructive"
                  >
                    <Trash2 className="size-4" />
                  </Button>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => handleQuantityChange(index, item.quantity - 1)}
                  >
                    <Minus className="size-3" />
                  </Button>
                  <Input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) => handleQuantityChange(index, parseInt(e.target.value) || 1)}
                    className="w-16 h-8 text-center"
                  />
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => handleQuantityChange(index, item.quantity + 1)}
                  >
                    <Plus className="size-3" />
                  </Button>
                  <span className="ml-auto font-semibold">
                    {(item.menuItem.price * item.quantity).toLocaleString('vi-VN')}đ
                  </span>
                </div>

                {item.note && (
                  <div className="text-sm text-muted-foreground bg-muted p-2 rounded">
                    {language === 'vi' ? 'Ghi chú' : 'Note'}: {item.note}
                  </div>
                )}

                <Textarea
                  placeholder={language === 'vi' ? 'Thêm ghi chú...' : 'Add note...'}
                  value={item.note}
                  onChange={(e) => handleNoteChange(index, e.target.value)}
                  rows={2}
                  className="text-sm"
                />
              </div>
            </div>
          </div>
        ))}

        <Separator className="my-4" />

        <div className="space-y-2">
          <div className="flex justify-between">
            <span>{language === 'vi' ? 'Tạm tính' : 'Subtotal'}:</span>
            <span className="font-semibold">{subtotal.toLocaleString('vi-VN')}đ</span>
          </div>
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>{language === 'vi' ? 'Phí phục vụ (5%)' : 'Service charge (5%)'}:</span>
            <span>{(subtotal * 0.05).toLocaleString('vi-VN')}đ</span>
          </div>
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>{language === 'vi' ? 'VAT (8%)' : 'VAT (8%)'}:</span>
            <span>{(subtotal * 0.08).toLocaleString('vi-VN')}đ</span>
          </div>
          
          <Separator />
          
          <div className="flex justify-between text-lg">
            <span className="font-semibold">
              {language === 'vi' ? 'Tổng cộng' : 'Total'}:
            </span>
            <span className="font-semibold text-orange-600">
              {(subtotal * 1.13).toLocaleString('vi-VN')}đ
            </span>
          </div>
        </div>

        <Button
          onClick={onCheckout}
          className="w-full bg-orange-500 hover:bg-orange-600"
        >
          {language === 'vi' ? 'Đặt món' : 'Place Order'}
        </Button>
      </CardContent>
    </Card>
  );
}
