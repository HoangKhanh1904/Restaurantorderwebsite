import { useRestaurant } from '../context/RestaurantContext';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Users, Eye } from 'lucide-react';
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';

export function TableManagement() {
  const { tables, orders, language } = useRestaurant();
  const [selectedTable, setSelectedTable] = useState<number | null>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'empty':
        return 'bg-green-500';
      case 'occupied':
        return 'bg-red-500';
      case 'reserved':
        return 'bg-yellow-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getStatusLabel = (status: string) => {
    const labels = {
      'empty': { vi: 'Trống', en: 'Empty' },
      'occupied': { vi: 'Đang phục vụ', en: 'Occupied' },
      'reserved': { vi: 'Đã đặt', en: 'Reserved' }
    };
    return language === 'vi' ? labels[status]?.vi : labels[status]?.en;
  };

  const tableOrders = selectedTable 
    ? orders.filter(o => o.tableNumber === selectedTable && o.status !== 'completed' && o.status !== 'cancelled')
    : [];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">
          {language === 'vi' ? 'Quản lý bàn ăn' : 'Table Management'}
        </h2>
        
        {/* Legend */}
        <div className="flex gap-4">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-green-500" />
            <span className="text-sm">{language === 'vi' ? 'Trống' : 'Empty'}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-red-500" />
            <span className="text-sm">{language === 'vi' ? 'Đang phục vụ' : 'Occupied'}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-yellow-500" />
            <span className="text-sm">{language === 'vi' ? 'Đã đặt' : 'Reserved'}</span>
          </div>
        </div>
      </div>

      {/* Table Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {tables.map((table) => (
          <Card 
            key={table.id}
            className={`cursor-pointer hover:shadow-lg transition-shadow ${
              table.status === 'occupied' ? 'border-red-500' : ''
            }`}
            onClick={() => setSelectedTable(table.number)}
          >
            <CardContent className="p-4 space-y-3">
              <div className="flex items-start justify-between">
                <div className="text-2xl font-semibold">
                  {table.number}
                </div>
                <div className={`w-3 h-3 rounded-full ${getStatusColor(table.status)}`} />
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Users className="size-4" />
                  <span>{table.capacity} {language === 'vi' ? 'chỗ' : 'seats'}</span>
                </div>

                <Badge 
                  className={`w-full justify-center ${getStatusColor(table.status)}`}
                >
                  {getStatusLabel(table.status)}
                </Badge>

                {table.status === 'occupied' && (
                  <Button
                    size="sm"
                    variant="outline"
                    className="w-full"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedTable(table.number);
                    }}
                  >
                    <Eye className="size-4 mr-1" />
                    {language === 'vi' ? 'Xem' : 'View'}
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Table Detail Dialog */}
      <Dialog open={selectedTable !== null} onOpenChange={() => setSelectedTable(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {language === 'vi' ? 'Bàn' : 'Table'} {selectedTable}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            {tableOrders.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                {language === 'vi' ? 'Không có đơn hàng' : 'No orders'}
              </div>
            ) : (
              tableOrders.map((order) => (
                <Card key={order.id}>
                  <CardContent className="p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold">
                        {language === 'vi' ? 'Đơn' : 'Order'} #{order.id}
                      </span>
                      <Badge className={
                        order.status === 'new' ? 'bg-blue-500' :
                        order.status === 'preparing' ? 'bg-yellow-500' :
                        order.status === 'served' ? 'bg-green-500' : 'bg-gray-500'
                      }>
                        {order.status === 'new' && (language === 'vi' ? 'Mới' : 'New')}
                        {order.status === 'preparing' && (language === 'vi' ? 'Đang làm' : 'Preparing')}
                        {order.status === 'served' && (language === 'vi' ? 'Đã phục vụ' : 'Served')}
                      </Badge>
                    </div>

                    <div className="space-y-2">
                      {order.items.map((item, idx) => (
                        <div key={idx} className="flex justify-between text-sm">
                          <span>
                            {item.quantity}x {language === 'vi' ? item.menuItem.name : item.menuItem.nameEn}
                          </span>
                          <span className="text-muted-foreground">
                            {item.subtotal.toLocaleString('vi-VN')}đ
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="pt-2 border-t flex justify-between font-semibold">
                      <span>{language === 'vi' ? 'Tổng' : 'Total'}:</span>
                      <span className="text-orange-600">
                        {order.total.toLocaleString('vi-VN')}đ
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
