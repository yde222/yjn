// components/TreeGridComponent.tsx
'use client'
import clsx from 'clsx'
import React from 'react'

interface TreeGridComponentProps {
  uuid: string
  size?: number
}

const CommonTable: React.FC<TreeGridComponentProps> = ({ uuid, size }) => {
  return (
    <div
      id={uuid}
      className={clsx({ 'h-[600px]': !size })}
      style={size ? { height: `${size}px` } : undefined}
    ></div>
  )
}

export default CommonTable
