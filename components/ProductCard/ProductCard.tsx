/* /components/MunicipalityCard/MunicipalityCard.tsx */

import React from 'react'
import { Product } from '@/models/interface'

export default function MunicipalityCard
({id, title, image, price, description}: Product) {
   return <div>{title} {image} {price} {description}</div>
}