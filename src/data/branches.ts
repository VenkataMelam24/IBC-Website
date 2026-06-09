export type Branch = {
  id: string;
  name: string;
  displayTitle: string;
  city: string;
  address: string;
  phone: string;
  openingHours: string;
  imageUrl?: string;
  mapUrl?: string;
  mapLabel?: string;
  isFlagship: boolean;
};

export const branches: Branch[] = [
  {
    id: "ibc-charlottenburg",
    name: "Indian Biryani Company",
    displayTitle: "IBC Charlottenburg",
    city: "Berlin",
    address: "Hektorstraße 11, 10711 Berlin, Germany",
    phone: "+49 179 9676142",
    openingHours: "Tue–Thu 16:00–22:00 · Fri–Sun 12:00–22:00",
    imageUrl: "/images/hero-biryani.png",
    mapUrl:
      "https://www.google.com/maps/search/?api=1&query=Hektorstra%C3%9Fe%2011%2C%2010711%20Berlin%2C%20Germany",
    mapLabel: "City West District",
    isFlagship: true,
  },
];
