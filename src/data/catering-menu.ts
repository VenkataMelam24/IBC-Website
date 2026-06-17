export type CateringMenuItem = {
  name: string;
  price: number;
  priceLabel: string;
  image: string;
};

export type CateringMenuCategory = {
  category: string;
  servingNote?: string;
  items: CateringMenuItem[];
};

export const cateringMenu: CateringMenuCategory[] = [
  {
    category: "Biryanis",
    servingNote: "Each full tray serves 10–12 people",
    items: [
      { name: "Chicken Biryani",     price: 119, priceLabel: "€119", image: "/images/catering-chicken-biryani.png" },
      { name: "Mutton Biryani",      price: 169, priceLabel: "€169", image: "/images/catering-mutton-biryani.png" },
      { name: "Veg Biryani",         price: 99,  priceLabel: "€99",  image: "/images/catering-veg-biryani.png" },
    ],
  },
  {
    category: "Appetizers",
    servingNote: "Each full tray serves 10–12 people",
    items: [
      { name: "Chilli Chicken", price: 119, priceLabel: "€119", image: "/images/catering-chili-chicken.png" },
      { name: "Chilli Paneer",  price: 99,  priceLabel: "€99",  image: "/images/catering-chilli-paneer.png" },
      { name: "Chilli Gobi",    price: 99,  priceLabel: "€99",  image: "/images/catering-chili-gobi.png" },
      { name: "Chilli Shrimp",  price: 129, priceLabel: "€129", image: "/images/catering-chilli-shrimp.png" },
    ],
  },
  {
    category: "Curries",
    items: [
      { name: "Chicken Tikka Masala",  price: 50, priceLabel: "from €50", image: "/images/catering-chicken-tikka-masala.png" },
      { name: "Chicken Butter Masala", price: 50, priceLabel: "from €50", image: "/images/catering-chicken-butter-masala.png" },
      { name: "Paneer Tikka Masala",   price: 50, priceLabel: "from €50", image: "/images/catering-paneer-tikka-masala.png" },
      { name: "Paneer Butter Masala",  price: 50, priceLabel: "from €50", image: "/images/catering-paneer-butter-masala.png" },
    ],
  },
  {
    category: "Add-ons",
    items: [
      { name: "Mango Lassi (10 Litres)", price: 70, priceLabel: "€70", image: "/images/catering-mango-lassi.png" },
      { name: "Double Ka Meetha",        price: 60, priceLabel: "€60", image: "/images/catering-double-ka-meetha.png" },
    ],
  },
];
