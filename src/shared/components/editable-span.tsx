
import React, { ChangeEvent, useState } from 'react';
import { Input } from './ui/input';
type Props = {
  className?: string
  value: string
  onChange: (title: string) => void
  disabled?: boolean
}
export const EditableSpan = ({ value, onChange, disabled, className }: Props) => {
  const [title, setTitle] = useState(value)
  const [isEditMode, setIsEditMode] = useState(false)

  const turnOnEditMode = () => {
    if (disabled) return
    setIsEditMode(true)
  }

  const turnOffEditMode = () => {
    setIsEditMode(false)
    onChange(title)
  }

  const changeTitle = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.currentTarget.value)
  }
  return (
    <>
      {isEditMode && <Input
        value={title}
        onChange={changeTitle}
        onBlur={turnOffEditMode}
        autoFocus
        type="text" />}
      <span className={className} onDoubleClick={turnOnEditMode}>{value}</span>
    </>
  );
};