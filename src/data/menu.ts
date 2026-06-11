export type MenuItem = {
  name: string;
  price: string;
  description: string;
  image?: string;
  tags?: string[];
};

export type MenuCategory = {
  id: string;
  title: string;
  items: MenuItem[];
};

const FOOD_PREFIX = "/images/13001357_ibc  indian biryani company_Food_";

export const menuCategories: MenuCategory[] = [
  {
    id: "biryanis",
    title: "Biryanis",
    items: [
      {
        name: "Veg Biryani",
        price: "€14.99",
        description:
          "Aromatic basmati rice cooked with seasonal vegetables, herbs, and Indian spices for a flavourful vegetarian biryani.",
        image: `${FOOD_PREFIX}veg_biryani.jpg`,
        tags: ["Vegetarian"],
      },
      {
        name: "Chicken Biryani",
        price: "€15.99",
        description:
          "Aromatic basmati rice prepared with tender chicken, fragrant spices, and fresh herbs.",
        image: `${FOOD_PREFIX}chicken_biryani.jpg`,
        tags: ["Non-Veg", "Bestseller"],
      },
      {
        name: "Mutton Biryani",
        price: "€18.99",
        description:
          "Aromatic basmati rice prepared with tender mutton, fragrant spices, and fresh herbs.",
        image: `${FOOD_PREFIX}mutton_biryani.jpg`,
        tags: ["Non-Veg"],
      },
    ],
  },
  {
    id: "appetizers",
    title: "Appetizers",
    items: [
      {
        name: "Chilli Gobi",
        price: "€13.99",
        description:
          "Crispy cauliflower florets tossed in a spicy Indo-Chinese sauce with garlic, onions, and peppers.",
        image: `${FOOD_PREFIX}chilli_gobi.jpg`,
        tags: ["Vegetarian", "Spicy"],
      },
      {
        name: "Chilli Chicken",
        price: "€12.99",
        description:
          "Crispy fried chicken tossed in a home made chilli sauce with garlic, green chilies, onions, and bell peppers.",
        image: `${FOOD_PREFIX}chilli_chicken.jpg`,
        tags: ["Non-Veg", "Spicy"],
      },
      {
        name: "Chicken Majestic",
        price: "€12.99",
        description:
          "Crispy fried chicken tossed in a yoghurt & Pepper sauce with garlic & onions.",
        image: `${FOOD_PREFIX}chicken_majestic.jpg`,
        tags: ["Non-Veg"],
      },
      {
        name: "Chilli Prawns",
        price: "€14.99",
        description:
          "Juicy prawns stir-fried in a spicy, tangy sauce with garlic, green chilies, onions, & bell peppers.",
        image: `${FOOD_PREFIX}chilli_prawns.jpg`,
        tags: ["Non-Veg", "Spicy"],
      },
      {
        name: "Chilli Fish",
        price: "€13.99",
        description:
          "Crispy fish tossed in a home made chilli sauce with garlic, green chilies, onions, and bell peppers.",
        image: `${FOOD_PREFIX}chilli_fish.jpg`,
        tags: ["Non-Veg", "Spicy"],
      },
      {
        name: "Chilli Paneer",
        price: "€13.99",
        description:
          "Spicy symphony of paneer, served hot and smooth for a flavourful explosion.",
        image: `/images/chilli_paneer.png`,
        tags: ["Vegetarian", "Spicy"],
      },
      {
        name: "Paneer Majestic",
        price: "€13.99",
        description:
          "Sweet and peppery symphony of Paneer, served hot and smooth for a flavourful explosion.",
        image: `${FOOD_PREFIX}paneer_majestic.jpg`,
        tags: ["Vegetarian"],
      },
    ],
  },
  {
    id: "curries",
    title: "Curries",
    items: [
      {
        name: "Butter Chicken",
        price: "€14.99",
        description:
          "Indulge in succulent tandoor chicken bathed in rich, buttery tomato curry sauce perfection.",
        image: `${FOOD_PREFIX}butter_chicken.jpg`,
        tags: ["Non-Veg", "Bestseller"],
      },
      {
        name: "Chicken Tikka Masala",
        price: "€14.99",
        description:
          "Grilled chicken pieces cooked in a spicy tomato-based sauce with bell peppers and aromatic spices.",
        image: `${FOOD_PREFIX}chicken_tikka_masala.jpg`,
        tags: ["Non-Veg", "Spicy"],
      },
      {
        name: "Kadai Paneer",
        price: "€13.99",
        description:
          "Paneer cubes cooked in a spiced tomato-based gravy with bell peppers, onions, and aromatic spices.",
        image: `${FOOD_PREFIX}kadai_paneer.jpg`,
        tags: ["Vegetarian", "Spicy"],
      },
      {
        name: "Kadai Chicken",
        price: "€13.99",
        description:
          "Chicken cooked in a spiced tomato-based gravy with bell peppers, onions, and aromatic spices.",
        image: `${FOOD_PREFIX}tikka_masala.jpg`,
        tags: ["Non-Veg", "Spicy"],
      },
      {
        name: "Gobi Masala",
        price: "€13.99",
        description:
          "Cauliflower cooked in a spiced tomato-onion gravy with aromatic herbs and seasonings.",
        image: `${FOOD_PREFIX}gobi_masala.jpg`,
        tags: ["Vegetarian"],
      },
      {
        name: "Dal Paneer",
        price: "€13.99",
        description:
          "A hearty Indian curry made with yellow lentils and soft paneer cubes, simmered with tomatoes and garlic.",
        image: `${FOOD_PREFIX}dhal_paneer.jpg`,
        tags: ["Vegetarian"],
      },
      {
        name: "Paneer Tikka Masala",
        price: "€14.99",
        description:
          "Grilled paneer immersed in a tantalizing masala for a flavour explosion.",
        image: `${FOOD_PREFIX}paneer_tikka_masala.jpg`,
        tags: ["Vegetarian", "Spicy"],
      },
      {
        name: "Paneer Butter Masala",
        price: "€14.99",
        description:
          "Classic curry blending succulent paneer, rich butter, and cashew cream for a rich, indulgent flavour.",
        image: `${FOOD_PREFIX}paneer_butter_masala.jpg`,
        tags: ["Vegetarian", "Bestseller"],
      },
      {
        name: "Palak Paneer",
        price: "€14.99",
        description:
          "Soft paneer cubes in a smooth, spiced spinach gravy with cream. Light, wholesome, and full of flavour.",
        image: `${FOOD_PREFIX}palak_paneer.jpg`,
        tags: ["Vegetarian"],
      },
      {
        name: "Palak Dal",
        price: "€13.99",
        description:
          "A comforting lentil curry made with spinach, ripe tomatoes, garlic, and Indian spices. Light, tangy, and full of flavour.",
        image: `${FOOD_PREFIX}palak_chicken.jpg`,
        tags: ["Vegetarian"],
      },
      {
        name: "Tomato Dal",
        price: "€10.99",
        description:
          "A comforting lentil curry made with ripe tomatoes, garlic, and Indian spices. Light, tangy, and full of flavour.",
        image: `${FOOD_PREFIX}tomato_dhal.jpg`,
        tags: ["Vegetarian"],
      },
      {
        name: "Aloo Gobi",
        price: "€13.99",
        description:
          "A classic North Indian curry made with potatoes and cauliflowers cooked in a mildly spiced tomato-onion gravy. Comforting and flavourful.",
        image: `${FOOD_PREFIX}aloo_gobi.jpg`,
        tags: ["Vegetarian"],
      },
    ],
  },
  {
    id: "south-indian",
    title: "South Indian",
    items: [
      {
        name: "Parota & Chicken Curry",
        price: "€14.99",
        description:
          "Flaky South Indian flatbread served with a rich and spiced chicken curry.",
        image: `${FOOD_PREFIX}parota__chicken_curry.jpg`,
        tags: ["Non-Veg"],
      },
      {
        name: "Andhra Chicken Curry",
        price: "€15.99",
        description:
          "A fiery South Indian chicken curry from Andhra, cooked with onions, tomatoes, chili, and bold spices for a rich, spicy flavour.",
        image: `${FOOD_PREFIX}andhra_chicken_curry.jpg`,
        tags: ["Non-Veg", "Spicy"],
      },
    ],
  },
  {
    id: "street-snacks",
    title: "Street Snacks",
    items: [
      {
        name: "Chicken Pakodi",
        price: "€11.99",
        description:
          "Marinated in garlic, ginger, red chilli, and curry leaves, then deep-fried to crispy perfection.",
        image: `${FOOD_PREFIX}chicken_pakodi.jpg`,
        tags: ["Non-Veg"],
      },
      {
        name: "Royyala Pakodi",
        price: "€14.99",
        description:
          "Marinated prawn in garlic, ginger, red chilli, and curry leaves, then deep-fried to crispy perfection.",
        image: `/images/royyala_pakodi.png`,
        tags: ["Non-Veg"],
      },
      {
        name: "Gobi Pakodi",
        price: "€11.99",
        description:
          "Cauliflower florets marinated with ginger, garlic, chili, and spices, then deep-fried until golden and crispy.",
        image: `${FOOD_PREFIX}gobi_pakodi.jpg`,
        tags: ["Vegetarian"],
      },
      {
        name: "Samosa",
        price: "€5.99",
        description:
          "Crispy pastry filled with spiced potatoes and peas, served with fresh green mint chutney.",
        image: `${FOOD_PREFIX}samosa.jpg`,
        tags: ["Vegetarian"],
      },
      {
        name: "Fish Pakodi",
        price: "€13.99",
        description:
          "Marinated boneless fish fillets in garlic, ginger, red chilli, and curry leaves, then deep-fried to crispy perfection.",
        image: `${FOOD_PREFIX}fish_pakodi.jpg`,
        tags: ["Non-Veg"],
      },
    ],
  },
  {
    id: "breads",
    title: "Breads",
    items: [
      {
        name: "Garlic Naan",
        price: "€3.99",
        description:
          "Tandoor-baked flatbread topped with fresh garlic and butter. Flavourful and aromatic.",
        image: `${FOOD_PREFIX}garlic_naan.jpg`,
        tags: ["Vegetarian"],
      },
      {
        name: "Tawa Roti",
        price: "€3.50",
        description:
          "Traditional Indian whole wheat flatbread, freshly made on a hot iron griddle. Soft, wholesome, and perfect with any curry.",
        image: `${FOOD_PREFIX}tawa_roti.jpg`,
        tags: ["Vegetarian"],
      },
      {
        name: "Malabar Parota",
        price: "€3.50",
        description:
          "Layered and flaky South Indian flatbread, soft inside and crisp outside. Best enjoyed with a rich curry.",
        image: `${FOOD_PREFIX}malabar_parota.jpg`,
        tags: ["Vegetarian"],
      },
      {
        name: "Butter Naan",
        price: "€3.50",
        description:
          "Soft tandoor-baked flatbread brushed with butter. Ideal with curries.",
        image: `${FOOD_PREFIX}butter_naan.jpg`,
        tags: ["Vegetarian"],
      },
      {
        name: "Special Naan",
        price: "€5.00",
        description:
          "Tandoor-baked flatbread topped with fresh paneer and garlic. Flavourful and aromatic.",
        image: `${FOOD_PREFIX}special_naan.jpg`,
        tags: ["Vegetarian"],
      },
    ],
  },
  {
    id: "kids-menu",
    title: "Kids Menu",
    items: [
      {
        name: "Ghee Dal Reis",
        price: "€7.99",
        description:
          "A comforting and wholesome dish of yellow lentils cooked with mild spices, served over steamed basmati rice. Perfect for little ones.",
        image: `${FOOD_PREFIX}tomato_dhal.jpg`,
        tags: ["Vegetarian"],
      },
      {
        name: "Joghurt-Dal Reis",
        price: "€7.99",
        description:
          "A mild lentil curry made with creamy yogurt and gentle Indian spices, served with steamed basmati rice.",
        image: `${FOOD_PREFIX}dhal_paneer.jpg`,
        tags: ["Vegetarian"],
      },
    ],
  },
  {
    id: "desserts",
    title: "Desserts",
    items: [
      {
        name: "Gulab Jamun",
        price: "€4.99",
        description:
          "Soft, deep-fried milk dumplings soaked in fragrant sugar syrup with cardamom.",
        image: `${FOOD_PREFIX}gulab_jamun.jpg`,
        tags: ["Vegetarian", "Sweet"],
      },
      {
        name: "Double-ka-Meetha",
        price: "€4.99",
        description:
          "A rich Indian dessert made with fried bread soaked in milk, sugar, saffron, and garnished with nuts. Sweet and indulgent.",
        image: `${FOOD_PREFIX}doublekameetha.jpg`,
        tags: ["Vegetarian", "Sweet"],
      },
    ],
  },
];

export const menuCategoryOrder = menuCategories.map((category) => ({
  id: category.id,
  title: category.title,
}));

export const menuById = Object.fromEntries(
  menuCategories.map((category) => [category.id, category]),
) as Record<string, MenuCategory>;
