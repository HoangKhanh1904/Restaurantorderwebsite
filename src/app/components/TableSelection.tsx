import { useRestaurant } from '../context/RestaurantContext';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Users } from 'lucide-react';

interface TableSelectionProps {
  open: boolean;
  onClose: () => void;
  onConfirm: (tableNumber: number) => void;
}

export function TableSelection({ open, onClose, onConfirm }: TableSelectionProps) {
  const { tables, language } = useRestaurant();

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

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {language === 'vi' ? 'Chọn bàn ăn' : 'Select Table'}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Legend */}
          <div className="flex flex-wrap gap-4 p-4 bg-muted rounded-lg">
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

          {/* Tables Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {tables.map((table) => (
              <Button
                key={table.id}
                variant="outline"
                className="h-auto p-4 flex flex-col items-center gap-2 relative"
                disabled={table.status !== 'empty'}
                onClick={() => onConfirm(table.number)}
              >
                <div className={`absolute top-2 right-2 w-3 h-3 rounded-full ${getStatusColor(table.status)}`} />
                
                <div className="text-2xl font-semibold">
                  {table.number}
                </div>
                
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Users className="size-3" />
                  <span>{table.capacity}</span>
                </div>
                
                <Badge 
                  variant={table.status === 'empty' ? 'default' : 'secondary'}
                  className={`text-xs ${table.status === 'empty' ? 'bg-green-500' : ''}`}
                >
                  {getStatusLabel(table.status)}
                </Badge>
              </Button>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
