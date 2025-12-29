'use client'

import type { SiteContent } from '../../stores/config-store'

interface BeianFormProps {
  formData: SiteContent
  setFormData: React.Dispatch<React.SetStateAction<SiteContent>>
}

export function BeianForm({ formData, setFormData }: BeianFormProps) {
  // 通用更新函数
  const updateBeian = (
    type: 'icp' | 'publicSecurity',
    field: 'text' | 'link' | 'icon',
    value: string
  ) => {
    setFormData(prev => ({
      ...prev,
      beian: {
        ...(prev.beian || {}),
        [type]: {
          ...(prev.beian?.[type] || { text: '', link: '', icon: '' }),
          [field]: value,
        },
      },
    }))
  }

  // 兼容旧数据：如果 beian 是字符串或单对象，迁移到新结构
  const icp = formData.beian?.icp || { text: '', link: '', icon: '' }
  const publicSecurity = formData.beian?.publicSecurity || { text: '', link: '', icon: '' }

  return (
    <div className='space-y-6'>
      {/* ICP备案 */}
      <div className='space-y-2'>
        <label className='mb-2 block text-sm font-medium'>ICP备案信息</label>
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-2'>
          <div>
            <label className='mb-1 block text-xs text-gray-600'>备案号</label>
            <input
              type='text'
              value={icp.text}
              onChange={e => updateBeian('icp', 'text', e.target.value)}
              placeholder='鄂ICP备12345678号-1'
              className='bg-secondary/10 w-full rounded-lg border px-4 py-2 text-base'
            />
          </div>
          <div>
            <label className='mb-1 block text-xs text-gray-600'>备案链接(可选)</label>
            <input
              type='url'
              value={icp.link}
              onChange={e => updateBeian('icp', 'link', e.target.value)}
              placeholder='https://beian.miit.gov.cn/'
              className='bg-secondary/10 w-full rounded-lg border px-4 py-2 text-sm'
            />
          </div>
          <div>
            <label className='mb-1 block text-xs text-gray-600'>图标路径(可选)</label>
            <input
              type='text'
              value={icp.icon}
              onChange={e => updateBeian('icp', 'icon', e.target.value)}
              placeholder='/images/beian/icp.png'
              className='bg-secondary/10 w-full rounded-lg border px-4 py-2 text-sm'
            />
          </div>
        </div>
      </div>

      {/* 公安备案 */}
      <div className='space-y-2'>
        <label className='mb-2 block text-sm font-medium'>公安备案信息</label>
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-2'>
          <div>
            <label className='mb-1 block text-xs text-gray-600'>备案号</label>
            <input
              type='text'
              value={publicSecurity.text}
              onChange={e => updateBeian('publicSecurity', 'text', e.target.value)}
              placeholder='鄂公网安备1234567890123号'
              className='bg-secondary/10 w-full rounded-lg border px-4 py-2 text-base'
            />
          </div>
          <div>
            <label className='mb-1 block text-xs text-gray-600'>备案链接(可选)</label>
            <input
              type='url'
              value={publicSecurity.link}
              onChange={e => updateBeian('publicSecurity', 'link', e.target.value)}
              placeholder='http://www.beian.gov.cn/'
              className='bg-secondary/10 w-full rounded-lg border px-4 py-2 text-sm'
            />
          </div>
          <div>
            <label className='mb-1 block text-xs text-gray-600'>图标路径(可选)</label>
            <input
              type='text'
              value={publicSecurity.icon}
              onChange={e => updateBeian('publicSecurity', 'icon', e.target.value)}
              placeholder='/images/beian/public-security.png'
              className='bg-secondary/10 w-full rounded-lg border px-4 py-2 text-sm'
            />
          </div>
        </div>
      </div>
    </div>
  )
}
