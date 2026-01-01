import { useRestaurant } from '../context/RestaurantContext';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ScrollArea } from './ui/scroll-area';
import { Clock, CheckCircle, XCircle, ChefHat, Package } from 'lucide-react';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';

export function OrderManagement() {
  const { orders, updateOrderStatus, language, currentUser } = useRestaurant();

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'new':
        return <Package className="size-4" />;
      case 'preparing':
        return <ChefHat className="size-4" />;
      case 'served':
        return <CheckCircle className="size-4" />;
      case 'completed':
        return <CheckCircle className="size-4" />;
      case 'cancelled':
        return <XCircle className="size-4" />;
      default:
        return <Clock className="size-4" />;
    }
  };

  const getStatusLabel = (status: string) => {
    const labels = {
      'new': { vi: 'Mới đặt', en: 'New' },
      'preparing': { vi: 'Đang chuẩn bị', en: 'Preparing' },
      'served': { vi: 'Đã phục vụ', en: 'Served' },
      'completed': { vi: 'Hoàn thành', en: 'Completed' },
      'cancelled': { vi: 'Đã hủy', en: 'Cancelled' }
    };
    return language === 'vi' ? labels[status]?.vi : labels[status]?.en;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new':
        return 'bg-blue-500';
      case 'preparing':
        return 'bg-yellow-500';
      case 'served':
        return 'bg-green-500';
      case 'completed':
        return 'bg-gray-500';
      case 'cancelled':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const canUpdateStatus = (currentStatus: string, userRole: string) => {
    if (userRole === 'manager') return true;
    if (userRole === 'kitchen' && (currentStatus === 'new' || currentStatus === 'preparing')) return true;
    if (userRole === 'server' && currentStatus === 'preparing') return true;
    return false;
  };

  const getNextStatus = (currentStatus: string) => {
    const statusFlow = {
      'new': 'preparing',
      'preparing': 'served',
      'served': 'completed'
    };
    return statusFlow[currentStatus];
  };

  const filterOrders = (status?: string) => {
    if (!status) return orders;
    return orders.filter(order => order.status === status);
  };

  const renderOrderCard = (order: any) => (
    <Card key={order.id} className="mb-4">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg">
              {language === 'vi' ? 'Đơn hàng' : 'Order'} #{order.id}
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              {language === 'vi' ? 'Bàn' : 'Table'} {order.tableNumber}
            </p>
          </div>
          <Badge className={getStatusColor(order.status)}>
            <div className="flex items-center gap-1">
              {getStatusIcon(order.status)}
              {getStatusLabel(order.status)}
            </div>
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-sm text-muted-foreground">
          {format(order.createdAt, 'PPp', { locale: language === 'vi' ? vi : undefined })}
        </div>

        {/* Order Items */}
        <div className="space-y-2">
          {order.items.map((item: any, idx: number) => (
            <div key={idx} className="flex justify-between items-start text-sm">
              <div className="flex-1">
                <span className="font-medium">
                  {item.quantity}x {language === 'vi' ? item.menuItem.name : item.menuItem.nameEn}
                </span>
                {item.note && (
                  <p className="text-xs text-muted-foreground mt-1">
                    {language === 'vi' ? 'Ghi chú' : 'Note'}: {item.note}
                  </p>
                )}
              </div>
              <span className="text-muted-foreground">
                {item.subtotal.toLocaleString('vi-VN')}đ
              </span>
            </div>
          ))}
        </div>

        {/* Total */}
        <div className="pt-3 border-t space-y-1">
          <div className="flex justify-between text-sm">
            <span>{language === 'vi' ? 'Tạm tính' : 'Subtotal'}:</span>
            <span>{order.subtotal.toLocaleString('vi-VN')}đ</span>
          </div>
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>{language === 'vi' ? 'Phí phục vụ' : 'Service'}:</span>
            <span>{order.serviceCharge.toLocaleString('vi-VN')}đ</span>
          </div>
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>VAT:</span>
            <span>{order.vat.toLocaleString('vi-VN')}đ</span>
          </div>
          <div className="flex justify-between font-semibold pt-2 border-t">
            <span>{language === 'vi' ? 'Tổng' : 'Total'}:</span>
            <span className="text-orange-600">{order.total.toLocaleString('vi-VN')}đ</span>
          </div>
        </div>

        {/* Actions */}
        {canUpdateStatus(order.status, currentUser?.role || '') && (
          <div className="flex gap-2 pt-2">
            {order.status !== 'completed' && order.status !== 'cancelled' && (
              <>
                {getNextStatus(order.status) && (
                  <Button
                    onClick={() => updateOrderStatus(order.id, getNextStatus(order.status))}
                    className="flex-1 bg-orange-500 hover:bg-orange-600"
                  >
                    {language === 'vi' 
                      ? getStatusLabel(getNextStatus(order.status))
                      : getStatusLabel(getNextStatus(order.status))
                    }
                  </Button>
                )}
                {currentUser?.role === 'manager' && order.status === 'new' && (
                  <Button
                    variant="destructive"
                    onClick={() => updateOrderStatus(order.id, 'cancelled')}
                  >
                    {language === 'vi' ? 'Hủy' : 'Cancel'}
                  </Button>
                )}
              </>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">
          {language === 'vi' ? 'Quản lý đơn hàng' : 'Order Management'}
        </h2>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="all">
            {language === 'vi' ? 'Tất cả' : 'All'} ({orders.length})
          </TabsTrigger>
          <TabsTrigger value="new">
            {language === 'vi' ? 'Mới' : 'New'} ({filterOrders('new').length})
          </TabsTrigger>
          <TabsTrigger value="preparing">
            {language === 'vi' ? 'Đang làm' : 'Preparing'} ({filterOrders('preparing').length})
          </TabsTrigger>
          <TabsTrigger value="served">
            {language === 'vi' ? 'Đã phục vụ' : 'Served'} ({filterOrders('served').length})
          </TabsTrigger>
          <TabsTrigger value="completed">
            {language === 'vi' ? 'Hoàn thành' : 'Done'} ({filterOrders('completed').length})
          </TabsTrigger>
        </TabsList>

        <ScrollArea className="h-[calc(100vh-300px)] mt-4">
          <TabsContent value="all" className="mt-0">
            {orders.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                {language === 'vi' ? 'Chưa có đơn hàng nào' : 'No orders yet'}
              </div>
            ) : (
              orders.map(renderOrderCard)
            )}
          </TabsContent>

          <TabsContent value="new" className="mt-0">
            {filterOrders('new').length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                {language === 'vi' ? 'Không có đơn hàng mới' : 'No new orders'}
              </div>
            ) : (
              filterOrders('new').map(renderOrderCard)
            )}
          </TabsContent>

          <TabsContent value="preparing" className="mt-0">
            {filterOrders('preparing').length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                {language === 'vi' ? 'Không có đơn đang chuẩn bị' : 'No orders in preparation'}
              </div>
            ) : (
              filterOrders('preparing').map(renderOrderCard)
            )}
          </TabsContent>

          <TabsContent value="served" className="mt-0">
            {filterOrders('served').length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                {language === 'vi' ? 'Không có đơn đã phục vụ' : 'No served orders'}
              </div>
            ) : (
              filterOrders('served').map(renderOrderCard)
            )}
          </TabsContent>

          <TabsContent value="completed" className="mt-0">
            {filterOrders('completed').length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                {language === 'vi' ? 'Không có đơn hoàn thành' : 'No completed orders'}
              </div>
            ) : (
              filterOrders('completed').map(renderOrderCard)
            )}
          </TabsContent>
        </ScrollArea>
      </Tabs>
    </div>
  );
}
