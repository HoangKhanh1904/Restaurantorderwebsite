import { MenuItem, Table, User } from '../types';

export const menuItems: MenuItem[] = [
  {
    id: '1',
    name: 'Phở Bò',
    nameEn: 'Beef Pho',
    description: 'Phở bò truyền thống với nước dùng thơm ngon, thịt bò tươi và rau thơm',
    descriptionEn: 'Traditional beef pho with aromatic broth, fresh beef and herbs',
    price: 65000,
    image: 'https://images.unsplash.com/photo-1591814468924-caf88d1232e1?w=800',
    categories: ['main-course', 'vietnamese'],
    available: true,
    rating: 4.8,
    reviewCount: 156,
    prepTime: 15,
    ingredients: 'Bánh phở, thịt bò, hành, ngò, giá đỗ, chanh, ớt'
  },
  {
    id: '2',
    name: 'Bún Chả Hà Nội',
    nameEn: 'Hanoi Grilled Pork with Noodles',
    description: 'Bún chả truyền thống Hà Nội với thịt nướng thơm lừng',
    descriptionEn: 'Traditional Hanoi grilled pork with rice noodles',
    price: 55000,
    image: 'https://images.unsplash.com/photo-1559847844-5315695dadae?w=800',
    categories: ['main-course', 'vietnamese'],
    available: true,
    rating: 4.7,
    reviewCount: 143,
    prepTime: 20,
    ingredients: 'Bún, thịt nướng, chả, nước mắm chua ngọt, rau sống'
  },
  {
    id: '3',
    name: 'Gỏi Cuốn',
    nameEn: 'Fresh Spring Rolls',
    description: 'Gỏi cuốn tươi với tôm, thịt, bún và rau sống, kèm nước chấm',
    descriptionEn: 'Fresh spring rolls with shrimp, pork, noodles and vegetables',
    price: 35000,
    image: 'https://images.unsplash.com/photo-1594756202469-9ff9799b2e4e?w=800',
    categories: ['appetizer', 'vietnamese'],
    available: true,
    rating: 4.6,
    reviewCount: 98,
    prepTime: 10,
    ingredients: 'Bánh tráng, tôm, thịt heo, bún, rau sống, đậu phộng'
  },
  {
    id: '4',
    name: 'Steak Bò Úc',
    nameEn: 'Australian Beef Steak',
    description: 'Thịt bò Úc nhập khẩu, nướng chín vừa, kèm khoai tây chiên',
    descriptionEn: 'Imported Australian beef steak, medium rare, with french fries',
    price: 250000,
    image: 'https://images.unsplash.com/photo-1600891964092-4316c288032e?w=800',
    categories: ['main-course', 'western'],
    available: true,
    rating: 4.9,
    reviewCount: 234,
    prepTime: 25,
    ingredients: 'Thịt bò Úc, khoai tây, bơ, tỏi, tiêu, muối'
  },
  {
    id: '5',
    name: 'Spaghetti Carbonara',
    nameEn: 'Spaghetti Carbonara',
    description: 'Mì Ý sốt kem trứng và bacon, phô mai Parmesan',
    descriptionEn: 'Italian pasta with creamy egg sauce and bacon, Parmesan cheese',
    price: 95000,
    image: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?w=800',
    categories: ['main-course', 'western'],
    available: true,
    rating: 4.5,
    reviewCount: 187,
    prepTime: 18,
    ingredients: 'Spaghetti, bacon, trứng, phô mai Parmesan, kem'
  },
  {
    id: '6',
    name: 'Salad Caesar',
    nameEn: 'Caesar Salad',
    description: 'Salad xà lách với sốt Caesar, gà nướng, phô mai và bánh mì nướng',
    descriptionEn: 'Lettuce salad with Caesar dressing, grilled chicken, cheese and croutons',
    price: 75000,
    image: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=800',
    categories: ['appetizer', 'western', 'vegetarian'],
    available: true,
    rating: 4.4,
    reviewCount: 112,
    prepTime: 12,
    ingredients: 'Xà lách, gà nướng, phô mai Parmesan, sốt Caesar, bánh mì nướng'
  },
  {
    id: '7',
    name: 'Chè Ba Màu',
    nameEn: 'Three Color Dessert',
    description: 'Chè ba màu truyền thống với đậu đỏ, đậu xanh, thạch và nước cốt dừa',
    descriptionEn: 'Traditional Vietnamese three-color dessert with beans and coconut milk',
    price: 25000,
    image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800',
    categories: ['dessert', 'vietnamese'],
    available: true,
    rating: 4.3,
    reviewCount: 89,
    prepTime: 5,
    ingredients: 'Đậu đỏ, đậu xanh, thạch, nước cốt dừa, đá bào'
  },
  {
    id: '8',
    name: 'Tiramisu',
    nameEn: 'Tiramisu',
    description: 'Bánh Tiramisu Ý truyền thống với cà phê espresso và mascarpone',
    descriptionEn: 'Traditional Italian Tiramisu with espresso and mascarpone',
    price: 65000,
    image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=800',
    categories: ['dessert', 'western'],
    available: true,
    rating: 4.7,
    reviewCount: 156,
    prepTime: 5,
    ingredients: 'Bánh ladyfinger, cà phê espresso, mascarpone, cacao'
  },
  {
    id: '9',
    name: 'Cà Phê Sữa Đá',
    nameEn: 'Iced Vietnamese Coffee',
    description: 'Cà phê phin truyền thống với sữa đặc, đá',
    descriptionEn: 'Traditional Vietnamese drip coffee with condensed milk and ice',
    price: 30000,
    image: 'https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?w=800',
    categories: ['beverage', 'vietnamese'],
    available: true,
    rating: 4.8,
    reviewCount: 267,
    prepTime: 8,
    ingredients: 'Cà phê phin, sữa đặc, đá'
  },
  {
    id: '10',
    name: 'Trà Sữa Trân Châu',
    nameEn: 'Bubble Milk Tea',
    description: 'Trà sữa đài loan với trân châu đen mềm dẻo',
    descriptionEn: 'Taiwanese bubble milk tea with chewy tapioca pearls',
    price: 40000,
    image: 'https://images.unsplash.com/photo-1525385133512-2f3bdd039054?w=800',
    categories: ['beverage'],
    available: true,
    rating: 4.6,
    reviewCount: 198,
    prepTime: 10,
    ingredients: 'Trà, sữa, trân châu, đường, đá'
  },
  {
    id: '11',
    name: 'Nước Ép Cam Tươi',
    nameEn: 'Fresh Orange Juice',
    description: 'Nước cam vắt tươi 100% không đường',
    descriptionEn: '100% fresh squeezed orange juice, no sugar added',
    price: 35000,
    image: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=800',
    categories: ['beverage'],
    available: true,
    rating: 4.5,
    reviewCount: 145,
    prepTime: 5,
    ingredients: 'Cam tươi'
  },
  {
    id: '12',
    name: 'Cơm Chiên Dương Châu',
    nameEn: 'Yang Chow Fried Rice',
    description: 'Cơm chiên với tôm, thịt, trứng và rau củ',
    descriptionEn: 'Fried rice with shrimp, meat, eggs and vegetables',
    price: 70000,
    image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=800',
    categories: ['main-course'],
    available: true,
    rating: 4.4,
    reviewCount: 176,
    prepTime: 15,
    ingredients: 'Cơm, tôm, thịt, trứng, đậu hà lan, cà rốt'
  }
];

export const tables: Table[] = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  number: i + 1,
  capacity: i % 3 === 0 ? 8 : i % 2 === 0 ? 6 : 4,
  status: i === 0 ? 'occupied' : i === 1 ? 'reserved' : 'empty'
}));

export const users: User[] = [
  {
    id: '1',
    username: 'server01',
    name: 'Nguyễn Văn A',
    role: 'server'
  },
  {
    id: '2',
    username: 'kitchen01',
    name: 'Trần Thị B',
    role: 'kitchen'
  },
  {
    id: '3',
    username: 'manager01',
    name: 'Lê Văn C',
    role: 'manager'
  },
  {
    id: '4',
    username: 'cashier01',
    name: 'Phạm Thị D',
    role: 'cashier'
  }
];
