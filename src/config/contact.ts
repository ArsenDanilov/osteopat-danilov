export const contactDetails = {
  phone: {
    label: 'Позвонить',
    display: '+7 (995) 100-59-59',
    href: 'tel:+79951005959',
  },
  telegram: {
    label: 'Telegram',
    href: 'https://t.me/oste_dr_danilov',
  },
  whatsapp: {
    label: 'WhatsApp',
    href: 'https://wa.me/79951005959',
  },
} as const

export const contactMethods = [
  contactDetails.phone,
  contactDetails.telegram,
  contactDetails.whatsapp,
] as const
