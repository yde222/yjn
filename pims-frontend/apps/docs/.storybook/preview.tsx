import React from 'react'
import '@pims-frontend/ui/styles/globals.css'
import type { Preview, StoryFn } from '@storybook/react'
import { Toaster } from '@pims-frontend/ui/components/ui/toaster'

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    (Story: StoryFn) => (
      <div>
        <Story />
        <Toaster />
      </div>
    ),
  ],
}

export default preview
