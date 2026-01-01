import { useState } from 'react';
import { useRestaurant } from '../context/RestaurantContext';
import { MenuList } from './MenuList';
import { Cart } from './Cart';
import { OrderManagement } from './OrderManagement';
import { TableManagement } from './TableManagement';
import { TableSelection } from './TableSelection';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  UtensilsCrossed, 
  ShoppingCart, 
  ClipboardList, 
  LayoutGrid,
  LogOut,
  Globe,
  User,
  BarChart3
} from 'lucide-react';
import { toast } from 'sonner';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

export function Dashboard() {
  const { 
    currentUser, 
    logout, 
    cart, 
    createOrder, 
    selectedTable, 
    setSelectedTable,
    language,
    setLanguage,
    orders,
    tables
  } = useRestaurant();
  
  const [activeTab, setActiveTab] = useState('menu');
  const [showTableSelection, setShowTableSelection] = useState(false);

  const handleCheckout = () => {
    if (cart.length === 0) {
      toast.error(language === 'vi' ? 'Giỏ hàng trống' : 'Cart is empty');
      return;
    }
    setShowTableSelection(true);
  };

  const handleConfirmOrder = (tableNumber: number) => {
    createOrder(tableNumber, cart);
    setSelectedTable(tableNumber);
    setShowTableSelection(false);
    setActiveTab('orders');
    toast.success(
      language === 'vi' 
        ? `Đã đặt món cho bàn ${tableNumber}`
        : `Order placed for table ${tableNumber}`
    );
  };

  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const getRoleLabel = (role: string) => {
    const roles = {
      'server': { vi: 'Nhân viên phục vụ', en: 'Server' },
      'kitchen': { vi: 'Nhân viên bếp', en: 'Kitchen Staff' },
      'manager': { vi: 'Quản lý', en: 'Manager' },
      'cashier': { vi: 'Thu ngân', en: 'Cashier' }
    };
    return language === 'vi' ? roles[role]?.vi : roles[role]?.en;
  };

  // Statistics
  const totalOrders = orders.length;
  const activeOrders = orders.filter(o => o.status !== 'completed' && o.status !== 'cancelled').length;
  const occupiedTables = tables.filter(t => t.status === 'occupied').length;
  const todayRevenue = orders
    .filter(o => o.status === 'completed')
    .reduce((sum, o) => sum + o.total, 0);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-orange-500 p-2 rounded-lg">
                <UtensilsCrossed className="size-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-semibold">
                  {language === 'vi' ? 'Hệ Thống Đặt Món' : 'Restaurant Order System'}
                </h1>
                <p className="text-sm text-muted-foreground">
                  {currentUser?.name} - {getRoleLabel(currentUser?.role || '')}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {/* Language Switcher */}
              <Button
                variant="outline"
                size="icon"
                onClick={() => setLanguage(language === 'vi' ? 'en' : 'vi')}
              >
                <Globe className="size-4" />
              </Button>

              {/* User Menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon">
                    <User className="size-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>
                    {currentUser?.name}
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout}>
                    <LogOut className="size-4 mr-2" />
                    {language === 'vi' ? 'Đăng xuất' : 'Logout'}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </header>

      {/* Quick Stats */}
      {currentUser?.role === 'manager' && (
        <div className="container mx-auto px-4 py-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-card border rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">
                    {language === 'vi' ? 'Tổng đơn' : 'Total Orders'}
                  </p>
                  <p className="text-2xl font-semibold">{totalOrders}</p>
                </div>
                <ClipboardList className="size-8 text-muted-foreground" />
              </div>
            </div>

            <div className="bg-card border rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">
                    {language === 'vi' ? 'Đơn đang xử lý' : 'Active Orders'}
                  </p>
                  <p className="text-2xl font-semibold">{activeOrders}</p>
                </div>
                <BarChart3 className="size-8 text-muted-foreground" />
              </div>
            </div>

            <div className="bg-card border rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">
                    {language === 'vi' ? 'Bàn đang dùng' : 'Occupied Tables'}
                  </p>
                  <p className="text-2xl font-semibold">{occupiedTables}/{tables.length}</p>
                </div>
                <LayoutGrid className="size-8 text-muted-foreground" />
              </div>
            </div>

            <div className="bg-card border rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">
                    {language === 'vi' ? 'Doanh thu hôm nay' : "Today's Revenue"}
                  </p>
                  <p className="text-2xl font-semibold text-orange-600">
                    {todayRevenue.toLocaleString('vi-VN')}đ
                  </p>
                </div>
                <BarChart3 className="size-8 text-muted-foreground" />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="menu" className="flex items-center gap-2">
              <UtensilsCrossed className="size-4" />
              {language === 'vi' ? 'Thực đơn' : 'Menu'}
            </TabsTrigger>
            <TabsTrigger value="cart" className="flex items-center gap-2">
              <ShoppingCart className="size-4" />
              {language === 'vi' ? 'Giỏ hàng' : 'Cart'}
              {cartItemCount > 0 && (
                <span className="ml-1 bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </TabsTrigger>
            <TabsTrigger value="orders" className="flex items-center gap-2">
              <ClipboardList className="size-4" />
              {language === 'vi' ? 'Đơn hàng' : 'Orders'}
              {activeOrders > 0 && (
                <span className="ml-1 bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {activeOrders}
                </span>
              )}
            </TabsTrigger>
            <TabsTrigger value="tables" className="flex items-center gap-2">
              <LayoutGrid className="size-4" />
              {language === 'vi' ? 'Bàn ăn' : 'Tables'}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="menu" className="mt-0">
            <MenuList />
          </TabsContent>

          <TabsContent value="cart" className="mt-0">
            <div className="max-w-4xl mx-auto">
              <Cart onCheckout={handleCheckout} />
            </div>
          </TabsContent>

          <TabsContent value="orders" className="mt-0">
            <OrderManagement />
          </TabsContent>

          <TabsContent value="tables" className="mt-0">
            <TableManagement />
          </TabsContent>
        </Tabs>
      </div>

      {/* Table Selection Dialog */}
      <TableSelection
        open={showTableSelection}
        onClose={() => setShowTableSelection(false)}
        onConfirm={handleConfirmOrder}
      />
    </div>
  );
}
