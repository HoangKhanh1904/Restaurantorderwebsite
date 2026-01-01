import { useState, useMemo } from 'react';
import { MenuItem, MenuCategory } from '../types';
import { useRestaurant } from '../context/RestaurantContext';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card, CardContent } from './ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Search, Star, Clock, ShoppingCart, Plus } from 'lucide-react';
import { MenuItemDetail } from './MenuItemDetail';

type SortOption = 'name' | 'price-asc' | 'price-desc' | 'rating' | 'popular';

const categories: { value: MenuCategory | 'all'; labelVi: string; labelEn: string }[] = [
  { value: 'all', labelVi: 'Tất cả', labelEn: 'All' },
  { value: 'appetizer', labelVi: 'Khai vị', labelEn: 'Appetizer' },
  { value: 'main-course', labelVi: 'Món chính', labelEn: 'Main Course' },
  { value: 'dessert', labelVi: 'Tráng miệng', labelEn: 'Dessert' },
  { value: 'beverage', labelVi: 'Đồ uống', labelEn: 'Beverage' },
  { value: 'vietnamese', labelVi: 'Món Việt', labelEn: 'Vietnamese' },
  { value: 'western', labelVi: 'Món Âu', labelEn: 'Western' },
  { value: 'vegetarian', labelVi: 'Món chay', labelEn: 'Vegetarian' }
];

export function MenuList() {
  const { menuItems, language, cart } = useRestaurant();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<MenuCategory | 'all'>('all');
  const [sortBy, setSortBy] = useState<SortOption>('name');
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);

  const filteredAndSortedItems = useMemo(() => {
    let filtered = menuItems.filter((item) => {
      const matchesSearch = language === 'vi'
        ? item.name.toLowerCase().includes(searchQuery.toLowerCase())
        : item.nameEn.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = selectedCategory === 'all' || item.categories.includes(selectedCategory);
      
      return matchesSearch && matchesCategory;
    });

    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'popular':
          return b.reviewCount - a.reviewCount;
        case 'name':
        default:
          return language === 'vi' 
            ? a.name.localeCompare(b.name, 'vi')
            : a.nameEn.localeCompare(b.nameEn, 'en');
      }
    });

    return filtered;
  }, [menuItems, searchQuery, selectedCategory, sortBy, language]);

  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <div className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <Input
            placeholder={language === 'vi' ? 'Tìm kiếm món ăn...' : 'Search dishes...'}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <Button
              key={cat.value}
              variant={selectedCategory === cat.value ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedCategory(cat.value)}
              className={selectedCategory === cat.value ? 'bg-orange-500 hover:bg-orange-600' : ''}
            >
              {language === 'vi' ? cat.labelVi : cat.labelEn}
            </Button>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <Select value={sortBy} onValueChange={(value) => setSortBy(value as SortOption)}>
            <SelectTrigger className="w-[200px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name">
                {language === 'vi' ? 'Tên món' : 'Name'}
              </SelectItem>
              <SelectItem value="price-asc">
                {language === 'vi' ? 'Giá: Thấp → Cao' : 'Price: Low → High'}
              </SelectItem>
              <SelectItem value="price-desc">
                {language === 'vi' ? 'Giá: Cao → Thấp' : 'Price: High → Low'}
              </SelectItem>
              <SelectItem value="rating">
                {language === 'vi' ? 'Đánh giá' : 'Rating'}
              </SelectItem>
              <SelectItem value="popular">
                {language === 'vi' ? 'Phổ biến' : 'Popular'}
              </SelectItem>
            </SelectContent>
          </Select>

          <div className="ml-auto text-sm text-muted-foreground">
            {filteredAndSortedItems.length} {language === 'vi' ? 'món' : 'items'}
          </div>
        </div>
      </div>

      {/* Menu Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredAndSortedItems.map((item) => (
          <Card 
            key={item.id} 
            className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => setSelectedItem(item)}
          >
            <div className="relative h-48 overflow-hidden">
              <img
                src={item.image}
                alt={language === 'vi' ? item.name : item.nameEn}
                className="w-full h-full object-cover"
              />
              {!item.available && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <Badge variant="destructive">
                    {language === 'vi' ? 'Hết món' : 'Sold Out'}
                  </Badge>
                </div>
              )}
            </div>
            <CardContent className="p-4 space-y-3">
              <div>
                <h3 className="font-semibold line-clamp-1">
                  {language === 'vi' ? item.name : item.nameEn}
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {language === 'vi' ? item.description : item.descriptionEn}
                </p>
              </div>

              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <Star className="size-4 fill-yellow-400 text-yellow-400" />
                  <span>{item.rating}</span>
                  <span className="text-muted-foreground">({item.reviewCount})</span>
                </div>
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Clock className="size-4" />
                  <span>{item.prepTime}{language === 'vi' ? 'p' : 'm'}</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t">
                <span className="font-semibold text-orange-600">
                  {item.price.toLocaleString('vi-VN')}đ
                </span>
                <Button
                  size="sm"
                  disabled={!item.available}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedItem(item);
                  }}
                  className="bg-orange-500 hover:bg-orange-600"
                >
                  <Plus className="size-4 mr-1" />
                  {language === 'vi' ? 'Thêm' : 'Add'}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredAndSortedItems.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          {language === 'vi' ? 'Không tìm thấy món ăn' : 'No dishes found'}
        </div>
      )}

      {/* Menu Item Detail Dialog */}
      {selectedItem && (
        <MenuItemDetail
          item={selectedItem}
          open={!!selectedItem}
          onClose={() => setSelectedItem(null)}
        />
      )}

      {/* Cart Badge */}
      {cartItemCount > 0 && (
        <div className="fixed bottom-6 right-6 z-50">
          <Button
            size="lg"
            className="rounded-full shadow-lg bg-orange-500 hover:bg-orange-600"
          >
            <ShoppingCart className="size-5 mr-2" />
            {language === 'vi' ? 'Giỏ hàng' : 'Cart'} ({cartItemCount})
          </Button>
        </div>
      )}
    </div>
  );
}
