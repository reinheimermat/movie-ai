'use client'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { CreateSuggestionsMutation } from '@/utils/mutations/create-suggestions'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Label } from './ui/label'
import { Textarea } from './ui/textarea'

interface CreatePromptDialogProps {
  onOpenChange: () => void
  isOpen: boolean
}

const formSchema = z.object({
  prompt: z.string().nonempty(),
})

type FormValues = z.infer<typeof formSchema>

export function CreatePromptDialog({
  isOpen,
  onOpenChange,
}: CreatePromptDialogProps) {
  const queryClient = useQueryClient()
  const [isLoading, setIsLoading] = useState(false)

  const { register, handleSubmit } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  })

  const mutation = useMutation({
    mutationFn: (prompt: string) => CreateSuggestionsMutation(prompt),
    onSuccess: data => {
      queryClient.setQueryData(['suggestions', prompt], data)
      setIsLoading(false)
    },
    onError: error => {
      console.error('Error creating suggestions', error)
      setIsLoading(false)
    },
    onMutate: () => {
      setIsLoading(true)
    },
  })

  function handleCreateSuggestions({ prompt }: FormValues) {
    console.log('Prompt dialog', prompt)
    mutation.mutate(prompt)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Informe o prompt</DialogTitle>
          <DialogDescription>
            Adicione um prompt para que possamos te recomendar um filme.
          </DialogDescription>
        </DialogHeader>
        <form
          className="space-y-6"
          onSubmit={handleSubmit(handleCreateSuggestions)}
        >
          <div className="space-y-2">
            <Label htmlFor="prompt">Prompt</Label>
            <Textarea
              id="prompt"
              rows={5}
              placeholder="Filme de ação com ator x..."
              {...register('prompt')}
            />
          </div>

          <DialogFooter>
            <Button type="submit" disabled={isLoading} onClick={onOpenChange}>
              Gerar recomendações
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
