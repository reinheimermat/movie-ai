'use client'

import { CreatePromptDialog } from '@/components/create-prompt-dialog'
import { Button } from '@/components/ui/button'
import { SparkleIcon } from 'lucide-react'
import { useState } from 'react'
import { LogoIcon } from '../../../public/logo'

export function Header() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <header className="flex justify-between items-center">
        <LogoIcon />

        <Button
          size="lg"
          className="py-2 h-auto flex gap-2"
          onClick={() => setIsOpen(true)}
        >
          Nova recomendação
          <div className="p-2 bg-gray-100/20 rounded-full">
            <SparkleIcon className="size-[18px]" />
          </div>
        </Button>
      </header>

      <CreatePromptDialog
        isOpen={isOpen}
        onOpenChange={() => setIsOpen(false)}
      />
    </>
  )
}
