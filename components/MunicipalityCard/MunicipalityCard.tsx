/* /components/MunicipalityCard/MunicipalityCard.tsx */
import React from 'react'

import { Product } from '@/models/interfaces'

export default function MunicipalityCard
({id, district_name, name}: Product) {
   return <div>{name} ({district_name})</div>
}