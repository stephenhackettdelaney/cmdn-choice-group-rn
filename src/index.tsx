import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';

import { Pressable } from 'react-native';

const ChoiceContext = createContext({});

export function ChoiceGroup({
  initialValues = [],
  onChange,
  multiple = false,
  children,
}: {
  // TODO: fix any
  initialValues: any;
  onChange: any;
  multiple: boolean;
  children: any;
}) {
  const [values, setValues] = useState(initialValues);

  const handleOnPress = useCallback(
    (value, evt) => {
      // TODO: fix any
      setValues((v: any) => {
        // toggle values depending if
        // - multiple value (checkbox style)
        // - or one and only one value (radio button style)
        let output = v;
        if (multiple) {
          if (v.includes(value)) {
            // TODO: fix any
            output = v.filter((item: any) => item !== value);
          } else {
            output = [...v, value];
          }
        } else {
          output = [value];
        }
        if (onChange) {
          onChange(output, evt);
        }
        return output;
      });
    },
    [setValues, multiple, onChange]
  );

  const value = useMemo(
    () => ({
      handleOnPress,
      values,
    }),
    [handleOnPress, values]
  );

  return (
    <ChoiceContext.Provider value={value}>{children}</ChoiceContext.Provider>
  );
}

export function ChoiceButton({
  value,
  children,
  disabled = false,
  onPress,
  style,
}: {
  // TODO: fix any
  value: any;
  children: any;
  disabled: boolean;
  onPress: any;
  style: any;
}) {
  const context = useContext(ChoiceContext);
  if (!context) {
    throw new Error('ChoiceButton must be inside a ChoiceGroup');
  }

  const { handleOnPress, values } = context as {
    handleOnPress: any;
    values: any;
  };

  const _onPress = (evt: any) => {
    if (disabled === false) {
      if (onPress) {
        onPress(value, evt);
      }
      handleOnPress(value, evt);
    }
  };

  return (
    <Pressable style={style} onPress={_onPress}>
      {children({ values, disabled, selected: values.includes(value) })}
    </Pressable>
  );
}

// TODO: FIX ALL ANY TYPES

// helpers component with more understanding names
export function RadioGroup(props: any) {
  return <ChoiceGroup {...props} multiple={false} />;
}

export function RadioButton(props: any) {
  return <ChoiceButton {...props} />;
}

export function CheckboxGroup(props: any) {
  return <ChoiceGroup {...props} multiple={true} />;
}

export function CheckboxButton(props: any) {
  return <ChoiceButton {...props} />;
}
