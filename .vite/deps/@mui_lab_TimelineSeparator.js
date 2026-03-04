import { r as __toESM } from "./chunk-DUEDWNxO.js";
import { t as require_react } from "./react-Df7v5evG.js";
import { n as clsx_default } from "./clsx-BkYFeveK.js";
import { $ as generateUtilityClass, Dt as composeClasses, Ot as require_prop_types, bt as require_jsx_runtime, t as styled_default } from "./styled-CvD7q2Ek.js";
import "./extends-5nBDns8v.js";
import { t as generateUtilityClasses } from "./generateUtilityClasses-JN_Zuvws.js";
import { f as useThemeProps } from "./styles-CMzj7hcf.js";

//#region node_modules/@mui/lab/esm/TimelineSeparator/timelineSeparatorClasses.js
var import_prop_types = /* @__PURE__ */ __toESM(require_prop_types(), 1);
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
function getTimelineSeparatorUtilityClass(slot) {
	return generateUtilityClass("MuiTimelineSeparator", slot);
}
var timelineSeparatorClasses = generateUtilityClasses("MuiTimelineSeparator", ["root"]);
var timelineSeparatorClasses_default = timelineSeparatorClasses;

//#endregion
//#region node_modules/@mui/lab/esm/TimelineSeparator/TimelineSeparator.js
var import_jsx_runtime = require_jsx_runtime();
var useUtilityClasses = (ownerState) => {
	const { classes } = ownerState;
	return composeClasses({ root: ["root"] }, getTimelineSeparatorUtilityClass, classes);
};
var TimelineSeparatorRoot = styled_default("div", {
	name: "MuiTimelineSeparator",
	slot: "Root"
})({
	display: "flex",
	flexDirection: "column",
	flex: 0,
	alignItems: "center"
});
var TimelineSeparator = /* @__PURE__ */ import_react.forwardRef(function TimelineSeparator$1(inProps, ref) {
	const props = useThemeProps({
		props: inProps,
		name: "MuiTimelineSeparator"
	});
	const { className, ...other } = props;
	const ownerState = props;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TimelineSeparatorRoot, {
		className: clsx_default(useUtilityClasses(ownerState).root, className),
		ownerState,
		ref,
		...other
	});
});
TimelineSeparator.propTypes = {
	children: import_prop_types.default.node,
	classes: import_prop_types.default.object,
	className: import_prop_types.default.string,
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
var TimelineSeparator_default = TimelineSeparator;

//#endregion
export { TimelineSeparator_default as default, getTimelineSeparatorUtilityClass, timelineSeparatorClasses_default as timelineSeparatorClasses };
//# sourceMappingURL=@mui_lab_TimelineSeparator.js.map