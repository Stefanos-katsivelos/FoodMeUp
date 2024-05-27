export class Food {
  id!: string;
  name!: string;
  price!: number;
  tags!: string[];
  favorite!:boolean;
  stars!: number;
  imageUrl!: string;
  origins!: string[];
  cookTime!: string;
}


export interface EFood {
  id: string;
  name: string;
  price: number;
  tags: string[];
  favorite:boolean;
  stars: number;
  imageUrl: string;
  origins: string[];
  cookTime: string;
}


export const sample_foods: any[] = [
  {
    id: '1',
    name: 'Pizza Margherita',
    price: 9.99,
    tags: ['Italian', 'Vegetarian', 'Pizza'],
    favorite: true,
    stars: 4.1,
    imageUrl: 'assets/pizza-margarita.jpg',
    origins: ['Italy'],
    cookTime: '20 - 25 ',
  },
  {
    id: '2',
    name: 'Sushi Platter',
    price: 25.5,
    tags: ['Japanese', 'Seafood'],
    favorite: false,
    stars: 4.8,
    imageUrl: 'assets/sushi.jpg',
    origins: ['Japan'],
    cookTime: '30 - 40',
  },
  {
    id: '3',
    name: 'Tacos al Pastor',
    price: 12.0,
    tags: ['Mexican', 'Spicy'],
    favorite: true,
    stars: 3,
    imageUrl: 'assets/taco.jpg',
    origins: ['Mexico'],
    cookTime: '15 - 20 ',
  },
  {
    id: '4',
    name: 'Pad Thai',
    price: 14.99,
    tags: ['Thai', 'Noodles'],
    favorite: false,
    stars: 4,
    imageUrl: 'assets/padThai.jpg',
    origins: ['Thailand'],
    cookTime: '25 - 30 ',
  },
  {
    id: '5',
    name: 'Butter Chicken',
    price: 16.5,
    tags: ['Indian', 'Curry'],
    favorite: true,
    stars: 2.5,
    imageUrl: 'assets/butterChicken.jpg',
    origins: ['India'],
    cookTime: '35 - 40 ',
  },
  {
    id: '6',
    name: 'Beef Wellington',
    price: 45.0,
    tags: ['British', 'Gourmet'],
    favorite: false,
    stars: 4.3,
    imageUrl: 'assets/welightonBeef.jpg',
    origins: ['United Kingdom'],
    cookTime: '60 - 65 ',
  },
  {
    id: '7',
    name: 'Falafel',
    price: 8.0,
    tags: ['Middle Eastern', 'Vegetarian'],
    favorite: true,
    stars: 4.4,
    imageUrl: 'assets/falafel.jpg',
    origins: ['Middle East'],
    cookTime: '10 - 15 ',
  },
  {
    id: '8',
    name: 'Peking Duck',
    price: 39.99,
    tags: ['Chinese', 'Duck'],
    favorite: false,
    stars: 4.7,
    imageUrl: 'assets/duck.jpg',
    origins: ['China'],
    cookTime: '90 ',
  },
  {
    id: '9',
    name: 'Spaghetti Carbonara',
    price: 13.5,
    tags: ['Italian', 'Pasta'],
    favorite: true,
    stars: 4.5,
    imageUrl: 'assets/carbonara.jpg',
    origins: ['Italy'],
    cookTime: '20 - 25 ',
  },
  {
    id: '10',
    name: 'Fish and Chips',
    price: 11.99,
    tags: ['British', 'Seafood'],
    favorite: false,
    stars: 4.2,
    imageUrl: 'assets/fish&potato.jpg',
    origins: ['United Kingdom'],
    cookTime: '25 - 30 ',
  },
  {
    id: '11',
    name: 'Pizza Pepperoni',
    price: 11.99,
    tags: ['Italian', 'Meat', 'Pizza'],
    favorite: false,
    stars: 4.7,
    imageUrl: 'assets/pizza-pepperoni.jpg',
    origins: ['Italy'],
    cookTime: '20 - 25 mins',
  },
  {
    id: '12',
    name: 'Cheeseburger',
    price: 8.99,
    tags: ['American', 'Meat', 'Burgers'],
    favorite: true,
    stars: 4.3,
    imageUrl: 'assets/cheeseburger.jpg',
    origins: ['USA'],
    cookTime: '15 - 20 mins',
  },
];

export interface Tag {
  name: string;
  count: number;
}

export const sample_tags: any[] = [
  { name: 'All', count: 6 },
  { name: 'Seafood', count: 4 },
  { name: 'Pizza', count: 2 },
  { name: 'Pasta', count: 3 },
  { name: 'Duck', count: 2 },
  { name: 'Vegetarian', count: 1 },
  { name: 'Curry', count: 1 },
  { name: 'Spicy', count: 1 },
  { name: 'Gourmet', count: 2 },
  { name: 'Burgers', count: 2 },
  { name: 'Rice', count: 0}
];



