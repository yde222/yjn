import React from 'react'
import { DynamicIcon } from '@pims-frontend/ui/components/ui/dynamic-icon'
import icons from '../_utils/IconUtil.json'

const MenuIconGallery = () => {
  return (
    <div>
      {icons.map((icon, index) => (
        <div key={index}>
          <DynamicIcon name={icon} />
        </div>
      ))}
    </div>
  )
}

export default MenuIconGallery
