import type { Meta, StoryObj } from '@storybook/react';
import { InputField } from './InputField';

const meta: Meta<typeof InputField> = {
  title: 'Components/InputField',
  component: InputField,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof InputField>;

export const Default: Story = {
  args: {
    label: 'Default Input',
    placeholder: 'Enter text here...',
    helperText: 'This is some helper text.',
  },
};

export const States: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
      <InputField label="Disabled" placeholder="You can't type here" disabled />
      <InputField label="Invalid" placeholder="Invalid value" invalid errorMessage="This field has an error." value="invalid-input" />
      <InputField label="Loading" placeholder="Loading..." loading />
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
      <InputField label="Outlined (Default)" variant="outlined" placeholder="Outlined style" />
      <InputField label="Filled" variant="filled" placeholder="Filled style" />
      <InputField label="Ghost" variant="ghost" placeholder="Ghost style" />
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '40px', alignItems: 'start' }}>
      <InputField label="Small" size="sm" placeholder="Small size" />
      <InputField label="Medium (Default)" size="md" placeholder="Medium size" />
      <InputField label="Large" size="lg" placeholder="Large size" />
    </div>
  ),
};