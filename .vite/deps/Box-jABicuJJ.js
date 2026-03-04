import { r as __toESM } from "./chunk-DUEDWNxO.js";
import { t as require_react } from "./react-Df7v5evG.js";
import { n as clsx_default } from "./clsx-BkYFeveK.js";
import { Et as identifier_default, Ot as require_prop_types, at as styleFunctionSx_default, bt as require_jsx_runtime, et as ClassNameGenerator_default, nt as useTheme_default, o as createTheme, yt as styled } from "./styled-CvD7q2Ek.js";
import { t as extendSxProp } from "./extendSxProp-BtlBi6nz.js";
import { t as generateUtilityClasses } from "./generateUtilityClasses-JN_Zuvws.js";

//#region node_modules/@mui/system/esm/createBox/createBox.js
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
function createBox(options = {}) {
	const { themeId, defaultTheme, defaultClassName = "MuiBox-root", generateClassName } = options;
	const BoxRoot = styled("div", { shouldForwardProp: (prop) => prop !== "theme" && prop !== "sx" && prop !== "as" })(styleFunctionSx_default);
	return /* @__PURE__ */ import_react.forwardRef(function Box$1(inProps, ref) {
		const theme = useTheme_default(defaultTheme);
		const { className, component = "div", ...other } = extendSxProp(inProps);
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BoxRoot, {
			as: component,
			ref,
			className: clsx_default(className, generateClassName ? generateClassName(defaultClassName) : defaultClassName),
			theme: themeId ? theme[themeId] || theme : theme,
			...other
		});
	});
}

//#endregion
//#region node_modules/@mui/material/esm/Box/boxClasses.js
var boxClasses = generateUtilityClasses("MuiBox", ["root"]);
var boxClasses_default = boxClasses;

//#endregion
//#region node_modules/@mui/material/esm/Box/Box.js
var import_prop_types = /* @__PURE__ */ __toESM(require_prop_types(), 1);
var Box = createBox({
	themeId: identifier_default,
	defaultTheme: createTheme(),
	defaultClassName: boxClasses_default.root,
	generateClassName: ClassNameGenerator_default.generate
});
Box.propTypes = {
	children: import_prop_types.default.node,
	component: import_prop_types.default.elementType,
	sx: import_prop_types.default.oneOfType([
		import_prop_types.default.arrayOf(import_prop_types.default.oneOfType([
			import_prop_types.default.func,
			import_prop_types.default.object,
			import_prop_types.default.bool
		])),
		import_prop_types.default.func,
		import_prop_types.default.object
	])
};
var Box_default = Box;

//#endregion
export { boxClasses_default as n, Box_default as t };
//# sourceMappingURL=Box-jABicuJJ.js.map