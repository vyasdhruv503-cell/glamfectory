'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { User, Mail, Phone, Calendar, Shield, Camera, Save, Loader2, Eye, EyeOff } from 'lucide-react'
import { cn, formatDate, formatPhone } from '@/lib/utils'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { toast } from 'react-hot-toast'

const profileSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone must be at least 10 digits'),
  dateOfBirth: z.string().optional(),
  gender: z.enum(['MALE', 'FEMALE', 'OTHER']).optional(),
  address: z.string().optional(),
  emergencyContactName: z.string().optional(),
  emergencyContactPhone: z.string().optional(),
})

type ProfileFormData = z.infer<typeof profileSchema>

const initialFormData: ProfileFormData = {
  name: 'Priya Sharma',
  email: 'priya.sharma@email.com',
  phone: '+91 98765 43210',
  dateOfBirth: '1995-03-15',
  gender: 'FEMALE',
  address: 'A-42, Surya Apartments, Race Course Road, Vadodara - 390007',
  emergencyContactName: 'Rajesh Sharma',
  emergencyContactPhone: '+91 98765 43211',
}

const initialDisplayData = {
  avatarUrl: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=400&h=400&fit=crop',
  memberSince: '2022-03-15',
  loyaltyTier: 'Gold',
  totalVisits: 24,
  totalSpent: 45600,
  referralCode: 'PRIYA2024',
}

export default function ProfilePage() {
  const [showPassword, setShowPassword] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [avatarPreview, setAvatarPreview] = useState<string | null>(initialDisplayData.avatarUrl)

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: initialFormData,
  })

  const onSubmit = async (data: ProfileFormData) => {
    setIsSaving(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsEditing(false)
    setIsSaving(false)
    toast.success('Profile updated successfully!')
  }

  const handleCancel = () => {
    reset()
    setIsEditing(false)
  }

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-heading font-bold text-3xl sm:text-4xl text-foreground">
            My <span className="text-primary">Profile</span>
          </h1>
          <p className="text-muted-foreground mt-1">Manage your personal information and account settings</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleCancel} disabled={!isEditing}>
            Cancel
          </Button>
          <Button onClick={() => setIsEditing(true)} disabled={isEditing}>
            {isEditing ? 'Editing...' : 'Edit Profile'}
          </Button>
        </div>
      </div>

      <div className="grid lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1 space-y-6">
          <div className="card-elevated p-6 text-center">
            <div className="relative mx-auto mb-4">
              <Avatar className="h-24 w-24">
                <AvatarImage src={avatarPreview || initialDisplayData.avatarUrl} alt={initialFormData.name} />
                <AvatarFallback className="text-3xl font-heading font-bold text-primary">
                  {initialFormData.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              {isEditing && (
                <label className="absolute bottom-0 right-0 h-10 w-10 rounded-full bg-primary text-white flex items-center justify-center cursor-pointer hover:bg-primary/90 transition-colors">
                  <Camera className="h-5 w-5" />
                  <input type="file" accept="image/*" onChange={handleAvatarChange} className="sr-only" />
                </label>
              )}
            </div>
            <h3 className="font-heading font-bold text-xl">{initialFormData.name}</h3>
            <p className="text-sm text-muted-foreground">{initialFormData.email}</p>
            <div className="mt-4 pt-4 border-t space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Member Since</span>
                <span className="font-medium">{formatDate(initialDisplayData.memberSince)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Loyalty Tier</span>
                <span className="font-medium text-glam-gold-600">{initialDisplayData.loyaltyTier}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total Visits</span>
                <span className="font-medium">{initialDisplayData.totalVisits}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total Spent</span>
                <span className="font-medium">{initialDisplayData.totalSpent.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Referral Code</span>
                <span className="font-mono font-medium text-primary">{initialDisplayData.referralCode}</span>
              </div>
            </div>
          </div>

          <div className="card-elevated p-6">
            <h3 className="font-heading font-semibold text-lg mb-4 flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              Security
            </h3>
            <div className="space-y-4">
              <Button variant="outline" className="w-full justify-start" asChild>
                <a href="/account/security/change-password">Change Password</a>
              </Button>
              <Button variant="outline" className="w-full justify-start" asChild>
                <a href="/account/security/two-factor">Two-Factor Authentication</a>
              </Button>
              <Button variant="outline" className="w-full justify-start" asChild>
                <a href="/account/security/sessions">Active Sessions</a>
              </Button>
            </div>
          </div>
        </div>

        <div className="lg:col-span-3 space-y-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
            <div className="card-elevated p-6">
              <h3 className="font-heading font-semibold text-lg mb-6 flex items-center gap-2">
                <User className="h-5 w-5 text-primary" />
                Personal Information
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    {...register('name')}
                    disabled={!isEditing}
                    className={cn(errors.name && 'border-destructive focus:ring-destructive')}
                  />
                  {errors.name && <p className="text-sm text-destructive">{errors.name.message}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    {...register('email')}
                    disabled={!isEditing}
                    className={cn(errors.email && 'border-destructive focus:ring-destructive')}
                  />
                  {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    {...register('phone')}
                    disabled={!isEditing}
                    className={cn(errors.phone && 'border-destructive focus:ring-destructive')}
                  />
                  {errors.phone && <p className="text-sm text-destructive">{errors.phone.message}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dateOfBirth">Date of Birth</Label>
                  <Input
                    id="dateOfBirth"
                    type="date"
                    {...register('dateOfBirth')}
                    disabled={!isEditing}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="gender">Gender</Label>
                  <select
                    id="gender"
                    {...register('gender')}
                    disabled={!isEditing}
                    className="input-field"
                  >
                    <option value="">Select</option>
                    <option value="MALE">Male</option>
                    <option value="FEMALE">Female</option>
                    <option value="OTHER">Other</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="card-elevated p-6 mt-6">
              <h3 className="font-heading font-semibold text-lg mb-6 flex items-center gap-2">
                <Mail className="h-5 w-5 text-primary" />
                Address
              </h3>

              <div className="space-y-2">
                <Label htmlFor="address">Full Address</Label>
                <Textarea
                  id="address"
                  {...register('address')}
                  disabled={!isEditing}
                  rows={3}
                  placeholder="House/Flat No., Building, Street, Area, City, State, PIN"
                />
              </div>
            </div>

            <div className="card-elevated p-6 mt-6">
              <h3 className="font-heading font-semibold text-lg mb-6 flex items-center gap-2">
                <Phone className="h-5 w-5 text-primary" />
                Emergency Contact
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="emergencyContactName">Emergency Contact Name</Label>
                  <Input
                    id="emergencyContactName"
                    {...register('emergencyContactName')}
                    disabled={!isEditing}
                    placeholder="Full name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="emergencyContactPhone">Emergency Contact Phone</Label>
                  <Input
                    id="emergencyContactPhone"
                    type="tel"
                    {...register('emergencyContactPhone')}
                    disabled={!isEditing}
                    placeholder="+91 98765 43211"
                  />
                </div>
              </div>
            </div>

            <div className="card-elevated p-6 mt-6">
              <h3 className="font-heading font-semibold text-lg mb-6 flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                Communication Preferences
              </h3>

              <div className="space-y-4">
                {[
                  { key: 'email', label: 'Email Notifications', desc: 'Receive booking confirmations, reminders, and offers via email' },
                  { key: 'whatsapp', label: 'WhatsApp Notifications', desc: 'Receive real-time updates on WhatsApp' },
                  { key: 'sms', label: 'SMS Notifications', desc: 'Receive important alerts via SMS' },
                  { key: 'push', label: 'Push Notifications', desc: 'Receive push notifications on the app' },
                  { key: 'marketing', label: 'Marketing Communications', desc: 'Receive promotional offers and newsletters' },
                ].map((pref) => (
                  <label key={pref.key} className="flex items-center justify-between p-4 rounded-lg bg-glam-pink-50 cursor-pointer">
                    <div>
                      <p className="font-medium text-foreground">{pref.label}</p>
                      <p className="text-sm text-muted-foreground">{pref.desc}</p>
                    </div>
                    <input
                      type="checkbox"
                      defaultChecked
                      className="h-5 w-5 rounded border-glam-pink-300 text-primary focus:ring-primary"
                      disabled={!isEditing}
                    />
                  </label>
                ))}
              </div>
            </div>

            {isEditing && (
              <div className="flex flex-col sm:flex-row gap-4 justify-end">
                <Button variant="outline" type="button" onClick={handleCancel}>
                  Cancel
                </Button>
                <Button type="submit" disabled={isSaving}>
                  {isSaving ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Save Changes
                    </>
                  )}
                </Button>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  )
}