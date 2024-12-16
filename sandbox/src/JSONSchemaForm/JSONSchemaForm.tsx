import Form from "@rjsf/chakra-ui";
import { FormProps } from "@rjsf/core";
import validator from "@rjsf/validator-ajv8";
import { RegistryWidgetsType, RJSFSchema, WidgetProps } from "@rjsf/utils";

import ObjectFieldTemplate from "./rjsf/ObjectFieldTemplate";
import TitleFieldTemplate from "./rjsf/TitleFieldTemplate";
import FieldTemplate from "./rjsf/FieldTemplate";
import BaseInputTemplate from "./rjsf/BaseInputTemplate";
import DescriptionFieldTemplate from "./rjsf/DescriptionFieldTemplate";
import WrapIfAdditionalTemplate from "./rjsf/WrapIfAdditionalTemplate";
import FormatWidget from "./rjsf/FormatWidget";

type JSONSchemaFormProps = {
  schema: RJSFSchema;
  uiSchema: Record<string, string>;
  onSubmit: (formData: FormData) => void;
  onChange?: (formData: FormData) => void;
  children?: JSX.Element;
  formData?: unknown;
};

const JSONSchemaForm = ({
  schema,
  uiSchema,
  onSubmit,
  onChange,
  children,
  formData,
}: JSONSchemaFormProps): JSX.Element => {
  const templateOverrides: FormProps<any, RJSFSchema, any>["templates"] = {
    ObjectFieldTemplate: ObjectFieldTemplate,
    TitleFieldTemplate: TitleFieldTemplate,
    FieldTemplate: FieldTemplate,
    BaseInputTemplate: BaseInputTemplate,
    DescriptionFieldTemplate: DescriptionFieldTemplate,
    WrapIfAdditionalTemplate: WrapIfAdditionalTemplate,
  };

  const CustomCheckbox = function (props: WidgetProps) {
    return (
      <button
        id="custom"
        className={props.value ? "checked" : "unchecked"}
        onClick={() => props.onChange(!props.value)}
      >
        {String(props.value)}
      </button>
    );
  };

  console.log(uiSchema);

  const widgets: RegistryWidgetsType = {
    requestFormat: (props: WidgetProps) => (
      <FormatWidget {...props} formatType="request" />
    ),
    responseFormat: (props: WidgetProps) => (
      <FormatWidget {...props} formatType="response" />
    ),
  };

  return (
    <Form
      uiSchema={uiSchema}
      schema={schema}
      validator={validator}
      templates={templateOverrides}
      widgets={widgets}
      formData={formData}
      onSubmit={({ formData }) => onSubmit(formData)}
      onChange={({ formData }) => onChange?.(formData)}
    >
      {children}
    </Form>
  );
};

export default JSONSchemaForm;
