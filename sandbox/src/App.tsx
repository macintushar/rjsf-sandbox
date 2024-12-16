import JSONSchemaForm from "./JSONSchemaForm";
import schema from "./assets/schema.json";
import { generateUiSchema } from "./generateUiSchema";
import { RJSFSchema } from "@rjsf/utils";
import { Box, ChakraProvider } from "@chakra-ui/react";
import mwTheme from "./chakra/chakra.config";
import { useState } from "react";

function App() {
  const [formData, setFormData] = useState<unknown>(null);

  const uiSchema = generateUiSchema(
    schema.connector_spec.connection_specification
  );
  return (
    <>
      <ChakraProvider theme={mwTheme}>
        <Box backgroundColor="gray.200" padding="24px" borderRadius="8px">
          <JSONSchemaForm
            schema={
              schema.connector_spec.connection_specification as RJSFSchema
            }
            uiSchema={uiSchema}
            onSubmit={() => {}}
            formData={formData}
            onChange={(formData: FormData) => setFormData(formData)}
          />
        </Box>
      </ChakraProvider>
    </>
  );
}

export default App;
