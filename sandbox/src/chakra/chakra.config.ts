import { extendTheme } from "@chakra-ui/react";
import { defaultExtension, switchTheme } from "./chakra-core.config";

const mwTheme = extendTheme(defaultExtension, {
  components: { Switch: switchTheme },
});

export default mwTheme;
