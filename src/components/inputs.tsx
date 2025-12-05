import React from 'react';

import type { OptionType } from '@/components/ui';
import {
  Checkbox,
  Input,
  NumberInput,
  Radio,
  Select,
  Switch,
  View,
} from '@/components/ui';

import { Title } from './title';

const options: OptionType[] = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
];

export const Inputs = () => {
  const [value, setValue] = React.useState<string | number | undefined>();
  return (
    <>
      <Title text="Form" />
      <View>
        <Input label="Default" placeholder="Lorem ipsum dolor sit amet" />
        <Input label="Error" error="This is a message error" />
        <Input label="Focused" />

        {/* 基础用法 */}
        <NumberInput label="年龄" placeholder="请输入年龄" min={0} max={120} />

        {/* 支持小数 */}
        <NumberInput
          label="价格"
          placeholder="请输入价格"
          allowDecimals={true}
          min={0}
        />

        {/* 支持负数 */}
        <NumberInput
          label="温度"
          placeholder="请输入温度"
          allowDecimals={true}
          allowNegative={true}
          min={-50}
          max={50}
        />

        {/* 与 react-hook-form 配合使用 */}
        {/* <ControlledNumberInput
          name="quantity"
          control={control}
          label="数量"
          min={1}
          max={100}
        /> */}

        <Select
          label="Select"
          options={options}
          value={value}
          onSelect={(option) => setValue(option)}
        />
        <CheckboxExample />
        <RadioExample />
        <SwitchExample />
      </View>
    </>
  );
};

const CheckboxExample = () => {
  const [checked, setChecked] = React.useState(false);
  return (
    <Checkbox.Root
      checked={checked}
      onChange={setChecked}
      accessibilityLabel="accept terms of condition"
      className="pb-2"
    >
      <Checkbox.Icon checked={checked} />
      <Checkbox.Label text="checkbox" />
    </Checkbox.Root>
  );
};

const RadioExample = () => {
  const [selected, setSelected] = React.useState(false);
  return (
    <Radio.Root
      checked={selected}
      onChange={setSelected}
      accessibilityLabel="radio button"
      className="pb-2"
    >
      <Radio.Icon checked={selected} />
      <Radio.Label text="radio button" />
    </Radio.Root>
  );
};

const SwitchExample = () => {
  const [active, setActive] = React.useState(false);
  return (
    <Switch.Root
      checked={active}
      onChange={setActive}
      accessibilityLabel="switch"
      className="pb-2"
    >
      <Switch.Icon checked={active} />
      <Switch.Label text="switch" />
    </Switch.Root>
  );
};
