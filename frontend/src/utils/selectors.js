const knownTitleSlugs = {
  noski: 'Socks',
  futbolka: 'T-Shirt',
  'kruzhevnoy-byustgalter-bez-kostochek': 'Body Top',
  'trusy-s-kruzhevnymi-elementami': 'Underwear',
  'teplye-sherstyanye-noski': 'Wool Socks',
  'teplye-noski': 'Warm Socks',
  'noski-s-printom-morozhenoe': 'Socks With Print',
  'bazovaya-futbolka': 'Basic T-Shirt',
  'bazovaya-hlopkovaya-futbolka': 'Undershirt',
  'bazovaya-futbolka-dlya-sna': 'T-Shirt for sleeping',
  'kruzhevnoy-byustgalter-na-bretelyah': 'bra',
  'muzhskie-domashnie-shorty-dlya-sna': 'Underwear with print',
  'bazovaya-hlopkovaya-mayka': 'Basic cotton t-shirt',
  'detskiy-kombinezon-1-4-mes': 'jumpsuit'
}

export function selectItemTitle(item) {
  return knownTitleSlugs[item.slug] ?? item.slug
}

const knownCategorySlugs = {
  't-shirt': 'T-Shirts',
  'socks': 'Socks',
  'brassiere': 'Bras',
  'trusy': 'Underwear',
  'shorty': 'Shorts',
  'kombinezony': 'Jumpsuits'
}

export function selectCategoryTitle(category) {
  return knownCategorySlugs[category.slug] ?? category.slug
}

const knownDeliveryOptions = {
  1: 'Self Pick-up',
  2: 'Courier'
}

export function selectDeliveryOptionTitle(deliveryOption) {
  return knownDeliveryOptions[deliveryOption.id] ?? deliveryOption.title
}

const knownPaymentOptions = {
  1: 'Card',
  2: 'Cash'
}

export function selectPaymentOptionTitle(paymentOption) {
  return knownPaymentOptions[paymentOption.id] ?? paymentOption.title
}
