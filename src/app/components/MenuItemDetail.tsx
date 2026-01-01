import { useState } from 'react';
import { MenuItem } from '../types';
import { useRestaurant } from '../context/RestaurantContext';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { Star, Clock, Minus, Plus } from 'lucide-react';
import { toast } from 'sonner';

interface MenuItemDetailProps {
  item: MenuItem;
  open: boolean;
  onClose: () => void;
}

export function MenuItemDetail({ item, open, onClose }: MenuItemDetailProps) {
  const { addToCart, language } = useRestaurant();
  const [quantity, setQuantity] = useState(1);
  const [note, setNote] = useState('');

  const handleAddToCart = () => {
    addToCart({
      menuItem: item,
      quantity,
      note
    });
    
    toast.success(
      language === 'vi' 
        ? `Đã thêm ${quantity} ${item.name} vào giỏ hàng`
        : `Added ${quantity} ${item.nameEn} to cart`
    );
    
    setQuantity(1);
    setNote('');
    onClose();
  };

  const getCategoryLabel = (category: string) => {
    const cat = {
      'appetizer': { vi: 'Khai vị', en: 'Appetizer' },
      'main-course': { vi: 'Món chính', en: 'Main Course' },
      'dessert': { vi: 'Tráng miệng', en: 'Dessert' },
      'beverage': { vi: 'Đồ uống', en: 'Beverage' },
      'vietnamese': { vi: 'Món Việt', en: 'Vietnamese' },
      'western': { vi: 'Món Âu', en: 'Western' },
      'vegetarian': { vi: 'Món chay', en: 'Vegetarian' }
    }[category];
    
    return language === 'vi' ? cat?.vi : cat?.en;
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {language === 'vi' ? item.name : item.nameEn}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Image */}
          <div className="relative h-64 rounded-lg overflow-hidden">
            <img
              src={item.image}
              alt={language === 'vi' ? item.name : item.nameEn}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <Star className="size-5 fill-yellow-400 text-yellow-400" />
                <span className="font-semibold">{item.rating}</span>
                <span className="text-sm text-muted-foreground">
                  ({item.reviewCount} {language === 'vi' ? 'đánh giá' : 'reviews'})
                </span>
              </div>
              <div className="flex items-center gap-1 text-muted-foreground">
                <Clock className="size-4" />
                <span className="text-sm">
                  {item.prepTime} {language === 'vi' ? 'phút' : 'min'}
                </span>
              </div>
              <Badge variant={item.available ? 'default' : 'destructive'} className={item.available ? 'bg-green-500' : ''}>
                {item.available 
                  ? (language === 'vi' ? 'Còn món' : 'Available')
                  : (language === 'vi' ? 'Hết món' : 'Sold Out')
                }
              </Badge>
            </div>

            <div className="flex flex-wrap gap-2">
              {item.categories.map((cat) => (
                <Badge key={cat} variant="outline">
                  {getCategoryLabel(cat)}
                </Badge>
              ))}
            </div>

            <div>
              <h4 className="font-semibold mb-2">
                {language === 'vi' ? 'Mô tả' : 'Description'}
              </h4>
              <p className="text-muted-foreground">
                {language === 'vi' ? item.description : item.descriptionEn}
              </p>
            </div>

            {item.ingredients && (
              <div>
                <h4 className="font-semibold mb-2">
                  {language === 'vi' ? 'Thành phần' : 'Ingredients'}
                </h4>
                <p className="text-muted-foreground">{item.ingredients}</p>
              </div>
            )}

            <div className="pt-4 border-t">
              <div className="text-2xl font-semibold text-orange-600 mb-6">
                {item.price.toLocaleString('vi-VN')}đ
              </div>

              {/* Quantity */}
              <div className="space-y-2 mb-4">
                <Label>
                  {language === 'vi' ? 'Số lượng' : 'Quantity'}
                </Label>
                <div className="flex items-center gap-3">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    <Minus className="size-4" />
                  </Button>
                  <Input
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-20 text-center"
                  />
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    <Plus className="size-4" />
                  </Button>
                </div>
              </div>

              {/* Note */}
              <div className="space-y-2 mb-4">
                <Label htmlFor="note">
                  {language === 'vi' ? 'Ghi chú đặc biệt' : 'Special Note'}
                </Label>
                <Textarea
                  id="note"
                  placeholder={language === 'vi' 
                    ? 'Ví dụ: không hành, ít cay, thêm rau...'
                    : 'E.g.: no onions, less spicy, extra vegetables...'
                  }
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  rows={3}
                />
              </div>

              {/* Total */}
              <div className="flex items-center justify-between mb-4 p-4 bg-muted rounded-lg">
                <span className="font-semibold">
                  {language === 'vi' ? 'Tổng cộng' : 'Total'}:
                </span>
                <span className="text-xl font-semibold text-orange-600">
                  {(item.price * quantity).toLocaleString('vi-VN')}đ
                </span>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={onClose}
                  className="flex-1"
                >
                  {language === 'vi' ? 'Hủy' : 'Cancel'}
                </Button>
                <Button
                  onClick={handleAddToCart}
                  disabled={!item.available}
                  className="flex-1 bg-orange-500 hover:bg-orange-600"
                >
                  {language === 'vi' ? 'Thêm vào giỏ' : 'Add to Cart'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
