'use client'

import { useState } from 'react'
import clsx from 'clsx'

const defaultValues = {
  // Section 1: DNS Contact
  contactName: '',
  contactEmail: '',
  dnsProvider: '',

  // Section 2: Basic Setup
  consoleHostname: 'storage.yourdomain.com',
  gatewayHostname: 'gateway.yourdomain.com',

  // Section 3: Branding
  displayName: '',
  logoEmailLight: '',
  logoFullDark: '',
  logoFullLight: '',
  logoSmallDark: '',
  logoSmallLight: '',
  favicon16: '',
  favicon32: '',
  faviconApple: '',

  // Section 4: Colors
  primaryLight: '#0066FF',
  primaryDark: '#0066FF',
  onPrimaryLight: '#FFFFFF',
  onPrimaryDark: '#FFFFFF',
  secondaryLight: '#0066FF',
  secondaryDark: '#0066FF',
  onSecondaryLight: '#000000',
  onSecondaryDark: '#000000',
  backgroundLight: '#F0F0F0',
  backgroundDark: '#0B0B0B',

  // Section 5: Links
  supportUrl: '',
  docsUrl: '',
  homepageUrl: '',
  getInTouchUrl: '',
  blogUrl: '',
  privacyPolicyUrl: '',
  termsOfServiceUrl: '',
  termsOfUseUrl: '',

  // Section 6: Legal & Email
  legalCompanyName: '',
  addressLine1: '',
  addressLine2: '',
  fromEmailAddress: '',

  // Section 7: Defaults
  projectsPerUser: '1',
  storagePerProject: '25',
  bandwidthPerProject: '25',
  segmentsPerProject: '10000',
  bucketsPerProject: '100',
  regionGlobal: true,
  regionUS: false,
  regionArchive: false,

  // Section 8: Optional
  githubUrl: '',
  twitterUrl: '',
}

function FormSection({ title, children }) {
  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-4 pb-2 border-b border-slate-200 dark:border-slate-700">
        {title}
      </h2>
      <div className="space-y-4">
        {children}
      </div>
    </div>
  )
}

function FormField({ label, name, value, onChange, type = 'text', placeholder, required, hint }) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={clsx(
          'block w-full rounded-md border-slate-300 dark:border-slate-600',
          'bg-white dark:bg-slate-800',
          'text-slate-900 dark:text-white',
          'shadow-sm focus:border-sky-500 focus:ring-sky-500',
          'px-3 py-2 text-sm',
          'placeholder:text-slate-400 dark:placeholder:text-slate-500'
        )}
      />
      {hint && <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{hint}</p>}
    </div>
  )
}

function ColorField({ label, name, value, onChange }) {
  return (
    <div className="flex items-center gap-3">
      <input
        type="color"
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        className="h-10 w-14 rounded border border-slate-300 dark:border-slate-600 cursor-pointer"
      />
      <div className="flex-1">
        <label htmlFor={name} className="block text-sm font-medium text-slate-700 dark:text-slate-300">
          {label}
        </label>
        <input
          type="text"
          value={value}
          onChange={onChange}
          name={name}
          className={clsx(
            'mt-1 block w-full rounded-md border-slate-300 dark:border-slate-600',
            'bg-white dark:bg-slate-800',
            'text-slate-900 dark:text-white',
            'shadow-sm focus:border-sky-500 focus:ring-sky-500',
            'px-3 py-1.5 text-sm font-mono'
          )}
        />
      </div>
    </div>
  )
}

function CheckboxField({ label, name, checked, onChange, description }) {
  return (
    <div className="flex items-start gap-3">
      <input
        type="checkbox"
        id={name}
        name={name}
        checked={checked}
        onChange={onChange}
        className="mt-1 h-4 w-4 rounded border-slate-300 text-sky-600 focus:ring-sky-500"
      />
      <div>
        <label htmlFor={name} className="block text-sm font-medium text-slate-700 dark:text-slate-300">
          {label}
        </label>
        {description && <p className="text-xs text-slate-500 dark:text-slate-400">{description}</p>}
      </div>
    </div>
  )
}

export function WhiteLabelForm() {
  const [values, setValues] = useState(defaultValues)
  const [copied, setCopied] = useState(false)

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setValues(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const generateOutput = () => {
    return `# White Label Configuration

## 1. DNS / Technical Contact
- Name: ${values.contactName || '[Not provided]'}
- Email: ${values.contactEmail || '[Not provided]'}
- DNS Provider: ${values.dnsProvider || '[Not provided]'}

## 2. Basic Setup
- Console Hostname: ${values.consoleHostname}
- S3 Gateway Hostname: ${values.gatewayHostname}

## 3. Branding
- Display Name: ${values.displayName || '[Not provided]'}

### Logos
- Email logo (light background): ${values.logoEmailLight || '[Not provided]'}
- Full logo (dark mode): ${values.logoFullDark || '[Not provided]'}
- Full logo (light mode): ${values.logoFullLight || '[Not provided]'}
- Small logo (dark mode): ${values.logoSmallDark || '[Not provided]'}
- Small logo (light mode): ${values.logoSmallLight || '[Not provided]'}

### Favicons
- Favicon 16x16: ${values.favicon16 || '[Not provided]'}
- Favicon 32x32: ${values.favicon32 || '[Not provided]'}
- Apple Touch Icon: ${values.faviconApple || '[Not provided]'}

## 4. Colors
### Primary & Secondary
- Primary (light): ${values.primaryLight}
- Primary (dark): ${values.primaryDark}
- On-primary (light): ${values.onPrimaryLight}
- On-primary (dark): ${values.onPrimaryDark}
- Secondary (light): ${values.secondaryLight}
- Secondary (dark): ${values.secondaryDark}
- On-secondary (light): ${values.onSecondaryLight}
- On-secondary (dark): ${values.onSecondaryDark}

### Background
- Background (light): ${values.backgroundLight}
- Background (dark): ${values.backgroundDark}

## 5. Links
### Support & Docs
- Support URL: ${values.supportUrl || '[Not provided]'}
- Docs URL: ${values.docsUrl || '[Not provided]'}

### Marketing Links
- Homepage URL: ${values.homepageUrl || '[Not provided]'}
- Get in Touch URL: ${values.getInTouchUrl || '[Not provided]'}
- Blog URL: ${values.blogUrl || '[Not provided]'}

### Legal Links
- Privacy Policy URL: ${values.privacyPolicyUrl || '[Not provided]'}
- Terms of Service URL: ${values.termsOfServiceUrl || '[Not provided]'}
- Terms of Use URL: ${values.termsOfUseUrl || '[Not provided]'}

## 6. Legal & Email Sender
- Legal Company Name: ${values.legalCompanyName || '[Not provided]'}
- Address Line 1: ${values.addressLine1 || '[Not provided]'}
- Address Line 2: ${values.addressLine2 || '[Not provided]'}
- From Email Address: ${values.fromEmailAddress || '[Not provided]'}

## 7. Defaults
### Project Limits
- Projects per user: ${values.projectsPerUser}
- Storage per project: ${values.storagePerProject} GB
- Bandwidth per project: ${values.bandwidthPerProject} GB
- Segments per project: ${values.segmentsPerProject}
- Buckets per project: ${values.bucketsPerProject}

### Regions Enabled
- Global: ${values.regionGlobal ? 'Yes' : 'No'}
- Regional – US: ${values.regionUS ? 'Yes' : 'No'}
- Archive: ${values.regionArchive ? 'Yes' : 'No'}

## 8. Optional
- GitHub URL: ${values.githubUrl || '[Not provided]'}
- X / Twitter URL: ${values.twitterUrl || '[Not provided]'}
`
  }

  const handleCopy = async () => {
    const output = generateOutput()
    await navigator.clipboard.writeText(output)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleDownload = () => {
    const output = generateOutput()
    const blob = new Blob([output], { type: 'text/markdown' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `white-label-config-${values.displayName?.toLowerCase().replace(/\s+/g, '-') || 'unnamed'}.md`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="not-prose">
      <div className="mb-6 p-4 bg-sky-50 dark:bg-slate-800 rounded-lg">
        <p className="text-sm text-sky-800 dark:text-sky-300">
          Fill out this form to configure your white-label deployment. When complete, use the buttons below to copy or download your configuration.
        </p>
      </div>

      <form className="space-y-6">
        <FormSection title="1. DNS / Technical Contact">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              label="Contact Name"
              name="contactName"
              value={values.contactName}
              onChange={handleChange}
              placeholder="Jane Smith"
              required
            />
            <FormField
              label="Contact Email"
              name="contactEmail"
              value={values.contactEmail}
              onChange={handleChange}
              type="email"
              placeholder="jane@example.com"
              required
            />
          </div>
          <FormField
            label="DNS Provider"
            name="dnsProvider"
            value={values.dnsProvider}
            onChange={handleChange}
            placeholder="e.g., Cloudflare, Route 53, GoDaddy"
          />
        </FormSection>

        <FormSection title="2. Basic Setup">
          <FormField
            label="Storage Console Hostname"
            name="consoleHostname"
            value={values.consoleHostname}
            onChange={handleChange}
            placeholder="storage.yourdomain.com"
          />
          <FormField
            label="S3 Gateway Hostname"
            name="gatewayHostname"
            value={values.gatewayHostname}
            onChange={handleChange}
            placeholder="gateway.yourdomain.com"
          />
        </FormSection>

        <FormSection title="3. Branding">
          <FormField
            label="Product Display Name"
            name="displayName"
            value={values.displayName}
            onChange={handleChange}
            placeholder="Your product name as shown in the UI"
            required
          />

          <h3 className="text-lg font-medium text-slate-800 dark:text-slate-200 mt-6 mb-3">Logos</h3>
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">Provide URLs or filenames for your logo assets.</p>

          <div className="grid grid-cols-1 gap-4">
            <FormField
              label="Email Logo (light background)"
              name="logoEmailLight"
              value={values.logoEmailLight}
              onChange={handleChange}
              placeholder="logo-email.png"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                label="Full Logo (dark mode)"
                name="logoFullDark"
                value={values.logoFullDark}
                onChange={handleChange}
                placeholder="logo-full-dark.svg"
              />
              <FormField
                label="Full Logo (light mode)"
                name="logoFullLight"
                value={values.logoFullLight}
                onChange={handleChange}
                placeholder="logo-full-light.svg"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                label="Small Logo (dark mode)"
                name="logoSmallDark"
                value={values.logoSmallDark}
                onChange={handleChange}
                placeholder="logo-small-dark.svg"
              />
              <FormField
                label="Small Logo (light mode)"
                name="logoSmallLight"
                value={values.logoSmallLight}
                onChange={handleChange}
                placeholder="logo-small-light.svg"
              />
            </div>
          </div>

          <h3 className="text-lg font-medium text-slate-800 dark:text-slate-200 mt-6 mb-3">Favicons</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FormField
              label="Favicon 16x16"
              name="favicon16"
              value={values.favicon16}
              onChange={handleChange}
              placeholder="favicon-16x16.png"
            />
            <FormField
              label="Favicon 32x32"
              name="favicon32"
              value={values.favicon32}
              onChange={handleChange}
              placeholder="favicon-32x32.png"
            />
            <FormField
              label="Apple Touch Icon (180x180)"
              name="faviconApple"
              value={values.faviconApple}
              onChange={handleChange}
              placeholder="apple-touch-icon.png"
            />
          </div>
        </FormSection>

        <FormSection title="4. Colors">
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">Click the color swatches or enter HEX values directly.</p>

          <h3 className="text-lg font-medium text-slate-800 dark:text-slate-200 mt-4 mb-3">Primary Colors</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ColorField label="Primary (light mode)" name="primaryLight" value={values.primaryLight} onChange={handleChange} />
            <ColorField label="Primary (dark mode)" name="primaryDark" value={values.primaryDark} onChange={handleChange} />
            <ColorField label="On-primary (light)" name="onPrimaryLight" value={values.onPrimaryLight} onChange={handleChange} />
            <ColorField label="On-primary (dark)" name="onPrimaryDark" value={values.onPrimaryDark} onChange={handleChange} />
          </div>

          <h3 className="text-lg font-medium text-slate-800 dark:text-slate-200 mt-6 mb-3">Secondary Colors</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ColorField label="Secondary (light mode)" name="secondaryLight" value={values.secondaryLight} onChange={handleChange} />
            <ColorField label="Secondary (dark mode)" name="secondaryDark" value={values.secondaryDark} onChange={handleChange} />
            <ColorField label="On-secondary (light)" name="onSecondaryLight" value={values.onSecondaryLight} onChange={handleChange} />
            <ColorField label="On-secondary (dark)" name="onSecondaryDark" value={values.onSecondaryDark} onChange={handleChange} />
          </div>

          <h3 className="text-lg font-medium text-slate-800 dark:text-slate-200 mt-6 mb-3">Background Colors</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ColorField label="Background (light mode)" name="backgroundLight" value={values.backgroundLight} onChange={handleChange} />
            <ColorField label="Background (dark mode)" name="backgroundDark" value={values.backgroundDark} onChange={handleChange} />
          </div>
        </FormSection>

        <FormSection title="5. Links">
          <h3 className="text-lg font-medium text-slate-800 dark:text-slate-200 mb-3">Support & Documentation</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              label="Support URL"
              name="supportUrl"
              value={values.supportUrl}
              onChange={handleChange}
              type="url"
              placeholder="https://yourdomain.com/support"
            />
            <FormField
              label="Documentation URL"
              name="docsUrl"
              value={values.docsUrl}
              onChange={handleChange}
              type="url"
              placeholder="https://docs.yourdomain.com"
            />
          </div>

          <h3 className="text-lg font-medium text-slate-800 dark:text-slate-200 mt-6 mb-3">Marketing Links</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FormField
              label="Homepage URL"
              name="homepageUrl"
              value={values.homepageUrl}
              onChange={handleChange}
              type="url"
              placeholder="https://yourdomain.com"
              hint="Logo click target"
            />
            <FormField
              label="Get in Touch URL"
              name="getInTouchUrl"
              value={values.getInTouchUrl}
              onChange={handleChange}
              type="url"
              placeholder="https://yourdomain.com/contact"
            />
            <FormField
              label="Blog URL"
              name="blogUrl"
              value={values.blogUrl}
              onChange={handleChange}
              type="url"
              placeholder="https://yourdomain.com/blog"
            />
          </div>

          <h3 className="text-lg font-medium text-slate-800 dark:text-slate-200 mt-6 mb-3">Legal Links</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FormField
              label="Privacy Policy URL"
              name="privacyPolicyUrl"
              value={values.privacyPolicyUrl}
              onChange={handleChange}
              type="url"
              placeholder="https://yourdomain.com/privacy"
            />
            <FormField
              label="Terms of Service URL"
              name="termsOfServiceUrl"
              value={values.termsOfServiceUrl}
              onChange={handleChange}
              type="url"
              placeholder="https://yourdomain.com/tos"
            />
            <FormField
              label="Terms of Use URL"
              name="termsOfUseUrl"
              value={values.termsOfUseUrl}
              onChange={handleChange}
              type="url"
              placeholder="https://yourdomain.com/terms"
            />
          </div>
        </FormSection>

        <FormSection title="6. Legal & Email Sender">
          <FormField
            label="Legal Company Name"
            name="legalCompanyName"
            value={values.legalCompanyName}
            onChange={handleChange}
            placeholder="Your Company, Inc."
            required
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              label="Address Line 1"
              name="addressLine1"
              value={values.addressLine1}
              onChange={handleChange}
              placeholder="123 Main Street"
            />
            <FormField
              label="Address Line 2"
              name="addressLine2"
              value={values.addressLine2}
              onChange={handleChange}
              placeholder="City, State 12345"
            />
          </div>
          <FormField
            label="From Email Address"
            name="fromEmailAddress"
            value={values.fromEmailAddress}
            onChange={handleChange}
            type="email"
            placeholder="noreply@yourdomain.com"
            required
          />
        </FormSection>

        <FormSection title="7. Defaults">
          <h3 className="text-lg font-medium text-slate-800 dark:text-slate-200 mb-3">Project Limits</h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <FormField
              label="Projects per user"
              name="projectsPerUser"
              value={values.projectsPerUser}
              onChange={handleChange}
              type="number"
            />
            <FormField
              label="Storage (GB)"
              name="storagePerProject"
              value={values.storagePerProject}
              onChange={handleChange}
              type="number"
            />
            <FormField
              label="Bandwidth (GB)"
              name="bandwidthPerProject"
              value={values.bandwidthPerProject}
              onChange={handleChange}
              type="number"
            />
            <FormField
              label="Segments"
              name="segmentsPerProject"
              value={values.segmentsPerProject}
              onChange={handleChange}
              type="number"
            />
            <FormField
              label="Buckets"
              name="bucketsPerProject"
              value={values.bucketsPerProject}
              onChange={handleChange}
              type="number"
            />
          </div>

          <h3 className="text-lg font-medium text-slate-800 dark:text-slate-200 mt-6 mb-3">Region Selection</h3>
          <div className="space-y-3">
            <CheckboxField
              label="Global"
              name="regionGlobal"
              checked={values.regionGlobal}
              onChange={handleChange}
              description="Multi-region, globally distributed storage (default)"
            />
            <CheckboxField
              label="Regional – US"
              name="regionUS"
              checked={values.regionUS}
              onChange={handleChange}
              description="US-only storage nodes"
            />
            <CheckboxField
              label="Archive"
              name="regionArchive"
              checked={values.regionArchive}
              onChange={handleChange}
              description="Cold storage tier"
            />
          </div>
        </FormSection>

        <FormSection title="8. Optional">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              label="GitHub URL"
              name="githubUrl"
              value={values.githubUrl}
              onChange={handleChange}
              type="url"
              placeholder="https://github.com/yourcompany"
            />
            <FormField
              label="X / Twitter URL"
              name="twitterUrl"
              value={values.twitterUrl}
              onChange={handleChange}
              type="url"
              placeholder="https://x.com/yourcompany"
            />
          </div>
        </FormSection>
      </form>

      <div className="sticky bottom-0 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-700 p-4 -mx-4 mt-8 flex flex-wrap gap-3 justify-center">
        <button
          type="button"
          onClick={handleCopy}
          className={clsx(
            'inline-flex items-center gap-2 px-4 py-2 rounded-md font-medium text-sm',
            'bg-sky-600 text-white hover:bg-sky-700',
            'focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2'
          )}
        >
          {copied ? (
            <>
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
              Copied!
            </>
          ) : (
            <>
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" />
              </svg>
              Copy to Clipboard
            </>
          )}
        </button>
        <button
          type="button"
          onClick={handleDownload}
          className={clsx(
            'inline-flex items-center gap-2 px-4 py-2 rounded-md font-medium text-sm',
            'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300',
            'hover:bg-slate-200 dark:hover:bg-slate-700',
            'focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2'
          )}
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
          </svg>
          Download as Markdown
        </button>
      </div>
    </div>
  )
}
