'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Upload, Search, Plus, Edit, Trash2, Eye, Tag, Filter, X } from 'lucide-react'
import NextImage from 'next/image'
import { cn } from '@/lib/utils'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const gallerySchema = z.object({
  title: z.string().min(2, 'Title must be at least 2 characters'),
  description: z.string().optional(),
  mediaType: z.enum(['PHOTO', 'VIDEO', 'BEFORE_AFTER']),
  category: z.string().optional(),
  sortOrder: z.number().min(0).default(0),
  isActive: z.boolean().default(true),
})

const gallery = [
  { id: '1', title: 'Bridal Makeup', mediaUrl: 'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=400&h=500&fit=crop', mediaType: 'PHOTO', category: 'Makeup', sortOrder: 1, isActive: true },
  { id: '2', title: 'Hair Styling', mediaUrl: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400&h=500&fit=crop', mediaType: 'PHOTO', category: 'Hair', sortOrder: 2, isActive: true },
  { id: '3', title: 'Nail Art', mediaUrl: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=400&h=500&fit=crop', mediaType: 'PHOTO', category: 'Nails', sortOrder: 3, isActive: true },
  { id: '4', title: 'Skin Treatment', mediaUrl: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=400&h=500&fit=crop', mediaType: 'PHOTO', category: 'Skin', sortOrder: 4, isActive: true },
  { id: '5', title: 'Salon Interior', mediaUrl: 'https://images.unsplash.com/photo-1595476107717-8c5c9c54a55d?w=400&h=500&fit=crop', mediaType: 'PHOTO', category: 'Salon', sortOrder: 5, isActive: true },
  { id: '6', title: 'Spa Treatment', mediaUrl: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=400&h=500&fit=crop', mediaType: 'PHOTO', category: 'Spa', sortOrder: 6, isActive: true },
  { id: '7', title: 'Bridal Hair', mediaUrl: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400&h=500&fit=crop', mediaType: 'PHOTO', category: 'Bridal', sortOrder: 7, isActive: true },
  { id: '8', title: 'Mehndi Design', mediaUrl: 'https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=400&h=500&fit=crop', mediaType: 'PHOTO', category: 'Bridal', sortOrder: 8, isActive: true },
]

const categories = ['All', 'Hair', 'Skin', 'Makeup', 'Bridal', 'Nails', 'Waxing', 'Spa', 'Salon']
const mediaTypes = ['PHOTO', 'VIDEO', 'BEFORE_AFTER']

export default function AdminGalleryPage() {
  const [search, setSearch] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('All')
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<typeof gallery[0] | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)

  const form = useForm<z.infer<typeof gallerySchema>>({
    resolver: zodResolver(gallerySchema),
    defaultValues: {
      title: '', description: '', mediaType: 'PHOTO', category: '', sortOrder: 0, isActive: true,
    },
  })

const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
    setValue,
    watch,
  } = form

  const onSubmit = (data: z.infer<typeof gallerySchema>) => {
    if (editingItem) {
      const index = gallery.findIndex(i => i.id === editingItem.id)
      if (index > -1) gallery[index] = { ...gallery[index], ...data }
    } else {
      gallery.unshift({ id: Date.now().toString(), ...data, mediaUrl: previewUrl || '', category: data.category || '' })
    }
    setIsDialogOpen(false)
    reset()
    setEditingItem(null)
    setPreviewUrl(null)
  }

  const handleEdit = (item: typeof gallery[0]) => {
    setEditingItem(item)
    setPreviewUrl(item.mediaUrl)
    setIsDialogOpen(true)
  }

  const handleDelete = (id: string) => {
    if (confirm('Delete this gallery item?')) {
      const index = gallery.findIndex(i => i.id === id)
      if (index > -1) gallery.splice(index, 1)
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-heading font-bold text-3xl sm:text-4xl text-foreground">
            Gallery <span className="text-primary">Management</span>
          </h1>
          <p className="text-muted-foreground mt-1">Manage gallery images and videos</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => { setEditingItem(null); reset(); setPreviewUrl(null); setIsDialogOpen(true) }}>
              <Plus className="mr-2 h-4 w-4" />
              Add Media
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg max-h-[85vh] flex flex-col p-0 overflow-hidden">
            <div className="p-6 pb-3 border-b border-border/50">
              <DialogHeader>
                <DialogTitle className="text-xl font-heading font-bold">{editingItem ? 'Edit Media' : 'Add New Media'}</DialogTitle>
              </DialogHeader>
            </div>
            <div className="p-6 pt-4 overflow-y-auto flex-1">
              <Form {...form}>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <FormField control={control} name="title" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl><Input placeholder="Media title" value={field.value as string} onChange={field.onChange} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={control} name="description" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <textarea {...field} value={field.value as string} onChange={field.onChange} className="min-h-[70px] w-full rounded-lg border border-input bg-background px-3 py-2 text-sm" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <div className="grid grid-cols-2 gap-4">
                    <FormField control={control} name="mediaType" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Media Type</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value as string}>
                          <FormControl><SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger></FormControl>
                          <SelectContent>
                            {mediaTypes.map((mt) => (<SelectItem key={mt} value={mt}>{mt}</SelectItem>))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <FormField control={control} name="category" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Category</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value as string}>
                          <FormControl><SelectTrigger><SelectValue placeholder="Select category" /></SelectTrigger></FormControl>
                          <SelectContent>
                            {categories.filter(c => c !== 'All').map((cat) => (<SelectItem key={cat} value={cat}>{cat}</SelectItem>))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )} />
                  </div>
                  <FormField control={control} name="sortOrder" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Sort Order</FormLabel>
                      <FormControl><Input type="number" min="0" step="1" value={field.value as string} onChange={field.onChange} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <div className="space-y-2">
                    <label className="block text-sm font-medium">Upload Media</label>
                    <div className={cn('border-2 border-dashed rounded-xl p-4 text-center', previewUrl ? 'border-primary' : 'border-glam-pink-300')}>
                      {previewUrl ? (
                        <div className="relative">
                          <NextImage src={previewUrl} alt="Preview" width={200} height={150} className="rounded-lg mx-auto" />
                          <Button variant="ghost" size="icon" className="absolute top-2 right-2" onClick={() => { setPreviewUrl(null) }}>
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center gap-2">
                          <Upload className="h-7 w-7 text-muted-foreground" />
                          <p className="text-xs text-muted-foreground">Click to upload or drag and drop</p>
                          <input type="file" accept="image/*,video/*" onChange={handleFileChange} className="sr-only" id="media-upload" />
                          <label htmlFor="media-upload" className="text-primary text-sm hover:underline cursor-pointer font-medium">Choose file</label>
                        </div>
                      )}
                    </div>
                  </div>
                  <FormField control={control} name="isActive" render={({ field }) => (
                    <FormItem className="flex items-center gap-2">
                      <FormControl>
                        <input type="checkbox" checked={field.value as boolean} onChange={field.onChange} className="h-4 w-4 rounded border-glam-pink-300 text-primary focus:ring-primary" />
                      </FormControl>
                      <FormLabel className="!mt-0">Active</FormLabel>
                    </FormItem>
                  )} />
                  <DialogFooter className="pt-2">
                    <Button type="submit" className="w-full sm:w-auto">{editingItem ? 'Update' : 'Add'} Media</Button>
                  </DialogFooter>
                </form>
              </Form>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="card-elevated p-4">
        <div className="flex flex-col sm:flex-row gap-4 mb-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search gallery..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10" />
          </div>
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-[180px]"><SelectValue placeholder="All Categories" /></SelectTrigger>
            <SelectContent>
              {categories.map((cat) => (<SelectItem key={cat} value={cat}>{cat}</SelectItem>))}
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {gallery.filter(i => (categoryFilter === 'All' || i.category === categoryFilter) && i.title.toLowerCase().includes(search.toLowerCase())).map((item) => (
            <div key={item.id} className="relative group">
              <div className="aspect-[4/5] rounded-xl overflow-hidden bg-glam-pink-100">
                <NextImage
                  src={item.mediaUrl}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/70 to-transparent text-white">
                <p className="font-medium truncate">{item.title}</p>
                <p className="text-xs text-white/70">{item.category} • {item.mediaType}</p>
              </div>
              <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button variant="ghost" size="icon" className="h-7 w-7 bg-white/90" onClick={() => handleEdit(item)}>
                  <Edit className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-7 w-7 bg-white/90 text-red-600" onClick={() => handleDelete(item.id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              <span className={cn('absolute top-2 left-2 px-2 py-1 rounded-full text-xs font-medium',
                item.mediaType === 'VIDEO' && 'bg-red-500 text-white',
                item.mediaType === 'BEFORE_AFTER' && 'bg-glam-gold-500 text-white',
                'bg-white/90 text-gray-800'
              )}>
                {item.mediaType}
              </span>
            </div>
          ))}
        </div>

        {gallery.length === 0 && (
          <div className="text-center py-12">
            <Upload className="h-12 w-12 mx-auto text-muted-foreground/30" />
            <p className="text-muted-foreground mt-4">No media found</p>
          </div>
        )}
      </div>
    </div>
  )
}